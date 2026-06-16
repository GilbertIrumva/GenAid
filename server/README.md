# Generation Aid — Backend

Express 5 + TypeScript + MongoDB API powering the Generation Aid website and admin dashboard.

---

## 1. Stack & process boot

- **Runtime:** Node.js + Express 5, TypeScript (CommonJS).
- **Database:** MongoDB via Mongoose 9.
- **Auth:** JWT (Bearer tokens) with bcrypt-hashed passwords.
- **Uploads:** Multer (disk storage under `server/uploads/`).
- **Validation:** Zod schemas at the route boundary.

**Boot order:**
1. [src/server.ts](src/server.ts) — single entry point. Calls `connectDB(MONGODB_URI)` then `app.listen(PORT)`. If either fails, the process exits.
2. [src/config/db.ts](src/config/db.ts) — opens the Mongo connection with `strictQuery: true`, logs connection events.
3. [src/app.ts](src/app.ts) — builds the Express app: middleware → static files → health endpoints → API routes → error handlers.

---

## 2. The request pipeline (in order)

Every API call flows through this pipeline:

```
client request
  → trust proxy (so req.ip is real IP behind Render/Nginx)
  → helmet  (security headers: CSP, HSTS, X-Frame-Options…)
  → cors    (strict origin allowlist from env.CLIENT_ORIGIN)
  → express.json({ limit: "100kb" })   (body parser)
  → apiLimiter on /api/*               (rate limit per IP)
  → route handler (one of /api/*)
  → notFound fallback (404)
  → errorHandler   (catches multer / CORS / generic errors)
```

`errorHandler` hides internal error messages in production and translates Multer errors into 400 responses.

---

## 3. The MVC-ish layering

Each domain (Programs, Stories, Partners, Impact, Posts, Photos, Videos, Contact, Auth, Admin) follows the same three-file pattern:

| Folder | Responsibility | Example |
|---|---|---|
| `models/` | Mongoose schema + types (the **shape**) | [src/models/Post.ts](src/models/Post.ts) |
| `controllers/` | Business logic (the **behaviour**) | [src/controllers/postController.ts](src/controllers/postController.ts) |
| `routes/` | URL → controller wiring + middleware chain | [src/routes/postRoutes.ts](src/routes/postRoutes.ts) |

Routes are then mounted in `app.ts` under `/api/{name}`. So adding a new domain = 3 files + 1 line in `app.ts`.

---

## 4. The auth model

Two pieces:

**a. [User model](src/models/User.ts)** with:
- `password` is **never stored in plain text** — a `pre("save")` hook runs `bcrypt.hash(password, salt cost 12)` automatically.
- `comparePassword(candidate)` method wraps `bcrypt.compare`.
- `role: "admin" | "editor"` + `approved: boolean` (new accounts default to `approved: false` to prevent random signups becoming editors).

**b. [middleware/auth.ts](src/middleware/auth.ts)** with two guards:
- `protect` — reads `Authorization: Bearer <token>`, verifies the JWT with `JWT_SECRET`, loads the user, attaches it to `req.user`. Rejects if missing/invalid/not approved.
- `requireRole(...roles)` — must run **after** `protect`. Returns 403 if the user's role isn't in the list.

**c. Token flow** (in [authController.ts](src/controllers/authController.ts)):
- `POST /api/auth/register` → creates the user, **does not return a token** (account is unapproved).
- `POST /api/auth/login` → checks password, checks `approved`, signs a JWT with `{ id }` payload, 7-day expiry. Returns `{ token, user }`.
- `GET /api/auth/me` (behind `protect`) → returns the current user.

The client stores the token in `localStorage` and the axios instance attaches it as a Bearer header on every request.

---

## 5. The "public read, protected write" pattern

Every content route looks the same. Example [storyRoutes.ts](src/routes/storyRoutes.ts):

```ts
router.get("/",        getStories);          // public — anyone can read
router.get("/:id",     getStoryById);        // public
router.post("/",       protect, createStory); // editor must be logged in
router.put("/:id",     protect, updateStory);
router.delete("/:id",  protect, deleteStory);
```

The **public site** can fetch content with no token, but the **admin UI** must send the JWT to mutate anything. The middleware chain enforces this — there's no per-handler auth check duplicated.

---

## 6. The `getById` "slug-or-id" trick

Used in `Story` and `Post`. The same endpoint serves both `/api/posts/615abc…` and `/api/posts/my-blog-post-slug`:

```ts
const isObjectId = mongoose.isValidObjectId(id);
const filter = isObjectId
  ? { $or: [{ _id: id }, { slug: id }] }
  : { slug: id };
const post = await Post.findOne(filter);
```

Why: editors work with `_id` in the admin UI, but public URLs use friendly slugs. One endpoint serves both — no duplication.

---

## 7. Slug auto-generation

In `Post.ts` and `Story.ts`, a `pre("save")` hook calls `slugify(this.title)` when no slug is provided. So editors don't have to type one, but they can override it.

---

## 8. The admin dashboard endpoint

[adminController.getDashboardStats](src/controllers/adminController.ts) is the only place that **fans out** to multiple models. It runs ~16 queries in parallel via `Promise.all`:
- Counts (users, messages, posts, stories, programs, partners, videos, photos, drafts)
- Time-bucketed counts (messages last 30 days vs prior 30 days for the trend)
- Latest 5 messages + latest 5 unpublished posts (for the dashboard widgets)

All bundled in one response so the dashboard makes a single HTTP call.

---

## 9. Uploads (Videos & Photos)

- [middleware/upload.ts](src/middleware/upload.ts) configures Multer with disk storage in `server/uploads/{videos,posters,photos}`, file-type filters, and size caps.
- After the file is saved, the controller stores `imageUrl = /uploads/photos/<filename>` in Mongo.
- `app.ts` serves these via `express.static("/uploads", { maxAge: "7d" })` so the SPA can `<img src="/uploads/...">` them directly.

---

## 10. Security layers (defense in depth)

| Concern | Where it's handled |
|---|---|
| XSS / clickjacking | `helmet()` security headers |
| Cross-origin abuse | `cors()` with explicit allowlist, no `*` |
| Brute force / DDoS | `apiLimiter` per-IP rate limit on `/api/*` |
| Large payloads | `express.json({ limit: "100kb" })` + Multer file caps |
| Bad input | Zod schemas (in `schemas/`) called by `validateBody` middleware |
| Privilege escalation | `protect` + `requireRole` middleware chain, `approved` flag |
| Password leaks | bcrypt hashing in the model hook, `select: false` patterns |
| Information leaks | `errorHandler` masks internal errors in production |

---

## 11. Data flow — one full example

**Public visitor opens `/blog/generation-jobs-launches-in-kakuma`:**

1. React `BlogPost.tsx` calls `api.get("/posts/generation-jobs-launches-in-kakuma")`.
2. Browser → `app.ts` → cors → rate-limit → `app.use("/api/posts", postRoutes)`.
3. `postRoutes` matches `GET /:id` (no `protect`) → calls `getPostById`.
4. Controller: `isValidObjectId("generation-jobs…")` = false → filter is `{ slug: "generation-jobs…" }`.
5. Mongoose runs the query against the `posts` collection.
6. Doc returned → `res.json(post)`.
7. React renders.

**Admin saves a draft:**

1. React `AdminBlog.tsx` calls `api.post("/posts", payload)` with `Authorization: Bearer eyJ…`.
2. Pipeline runs cors → rate-limit → `postRoutes.post("/", protect, createPost)`.
3. `protect` decodes the JWT, loads the user, attaches `req.user`. Rejects if missing/expired/unapproved.
4. `createPost` calls `Post.create(req.body)`.
5. The model's `pre("save")` hook auto-generates a slug from the title.
6. Doc saved → `res.status(201).json(post)`.

---

## Folder map

```
server/src/
  app.ts              # Express app factory (middleware + routes)
  server.ts           # Bootstrap (connectDB → listen)
  config/
    db.ts             # Mongoose connection
    env.ts            # Validated env var loader
  middleware/
    auth.ts           # protect, requireRole, AuthRequest
    error.ts          # notFound, errorHandler
    rateLimit.ts      # apiLimiter
    upload.ts         # Multer disk storage
    validate.ts       # Zod → 400 wrapper
    verifyUpload.ts   # Post-upload checks
  models/             # Mongoose schemas (User, Post, Story, …)
  controllers/        # Route handlers
  routes/             # Express routers
  schemas/            # Zod input schemas
  utils/              # Helpers (slugify, etc.)
  scripts/            # One-off scripts (seeders)
uploads/              # Multer destination (videos, posters, photos)
```

---

## Adding a new domain — checklist

1. **Model** — `src/models/Foo.ts` with `Schema`, `IFoo extends Document`, `model<IFoo>("Foo", …)`.
2. **Zod schema** (optional) — `src/schemas/foo.ts` for input validation.
3. **Controller** — `src/controllers/fooController.ts` exporting `getFoos`, `getFooById`, `createFoo`, `updateFoo`, `deleteFoo`.
4. **Routes** — `src/routes/fooRoutes.ts`: public GET, `protect` on POST/PUT/DELETE.
5. **Mount** — add `app.use("/api/foos", fooRoutes)` in `src/app.ts`.

The pattern is intentionally repetitive — once you understand one domain (Posts), all the others work the same way.
