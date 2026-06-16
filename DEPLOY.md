# Deploying Generation Aid

End-to-end production setup. You'll wire up four free services:

| Layer       | Service              | What it hosts                                  |
| ----------- | -------------------- | ---------------------------------------------- |
| Database    | MongoDB Atlas (M0)   | All app data                                   |
| Media       | Cloudinary (Free)    | Uploaded videos, posters, photos               |
| API server  | Render (Free Web)    | `server/` — Express + Mongoose                 |
| Web client  | Vercel (Hobby)       | `client/` — Vite + React SPA                   |

Estimated total cost: **$0/month** at low traffic.

---

## 1. MongoDB Atlas (≈5 min)

1. Sign up at <https://www.mongodb.com/cloud/atlas/register> (or sign in).
2. **Create a deployment** → choose **M0 (Free)**, pick a region close to your Render region, name it `gn-aid`.
3. **Database Access** → Add a database user (e.g. `gnaid-app`) with a strong auto-generated password. Save the password somewhere safe.
4. **Network Access** → Add IP Address → **Allow access from anywhere** (`0.0.0.0/0`). Render's egress IPs are dynamic so this is the practical choice for free tier.
5. **Connect** → **Drivers** → copy the connection string. It looks like:

   ```
   mongodb+srv://gnaid-app:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

   Insert your password and **add a database name** before the `?`, e.g.:

   ```
   mongodb+srv://gnaid-app:s3cret@cluster0.xxxxx.mongodb.net/gnaid?retryWrites=true&w=majority
   ```

   Keep this string — you'll paste it into Render as `MONGODB_URI`.

---

## 2. Cloudinary (≈3 min)

1. Sign up at <https://cloudinary.com/users/register/free>.
2. From the **Dashboard** copy these three values into a scratchpad:
   - **Cloud name**
   - **API Key**
   - **API Secret**

That's it. The server uploads straight into the folders `gnaid/videos`, `gnaid/posters`, `gnaid/photos` — no buckets to pre-create.

---

## 3. Generate a JWT secret

In a terminal on any machine:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Copy the 96-character hex string. This is your `JWT_SECRET`.

---

## 4. API server on Render (≈10 min)

1. Push the repo to GitHub if you haven't already.
2. Sign in to <https://dashboard.render.com>.
3. Click **New → Blueprint**. Select this repo. Render will detect [render.yaml](render.yaml) and propose a service called `gn-aid-api`. Click **Apply**.
4. After the service is created, open it and go to **Environment**. Add the following **secret** environment variables (the non-secret ones are already populated from `render.yaml`):

   | Key                       | Value                                                                |
   | ------------------------- | -------------------------------------------------------------------- |
   | `MONGODB_URI`             | The Atlas connection string from step 1                              |
   | `JWT_SECRET`              | The 96-char hex from step 3                                          |
   | `CLIENT_ORIGIN`           | `http://localhost:5173` for now — you'll add the Vercel URL in step 5 |
   | `CLOUDINARY_CLOUD_NAME`   | From step 2                                                          |
   | `CLOUDINARY_API_KEY`      | From step 2                                                          |
   | `CLOUDINARY_API_SECRET`   | From step 2                                                          |

5. Click **Manual Deploy → Deploy latest commit**. Wait for the build to finish (~3–5 min). When it's healthy you can hit:

   ```
   https://gn-aid-api.onrender.com/api/health
   ```

   You should see `{ "status": "ok", ... "db": "connected" }`.

   > **Free tier note:** Render free web services sleep after 15 minutes of inactivity. The first request after sleep takes ~30s to wake up. If that's a problem, upgrade the service to a paid plan or set up an external pinger.

6. Copy the **Render service URL** (e.g. `https://gn-aid-api.onrender.com`) — you'll need it for the SPA.

---

## 5. Web client on Vercel (≈5 min)

1. Sign in to <https://vercel.com>.
2. **Add New → Project** → import your GitHub repo.
3. In the import screen:
   - **Root Directory:** `client`
   - **Framework Preset:** Vite (auto-detected)
   - **Build Command / Output Directory:** leave the defaults — [client/vercel.json](client/vercel.json) wires up SPA rewrites.
4. Expand **Environment Variables** and add:

   | Key            | Value                                              |
   | -------------- | -------------------------------------------------- |
   | `VITE_API_URL` | `https://gn-aid-api.onrender.com/api` (from step 4) |

5. Click **Deploy**. After ~1 minute Vercel will give you a URL like `https://gn-aid-client.vercel.app`.

6. **Now circle back to Render:** edit `CLIENT_ORIGIN` on the API service to your Vercel URL (no trailing slash):

   ```
   CLIENT_ORIGIN=https://gn-aid-client.vercel.app
   ```

   Save — Render will redeploy automatically.

7. Open the Vercel URL in a browser. The site should render, language toggle should work, and `Programs` / `Stories` etc. should load from the live API.

---

## 6. Create the first admin user

The API expects users to exist before login. SSH-style scripts don't work on Render free, so the easiest path is locally:

```bash
# In a terminal with the server's .env populated with the LIVE Atlas URI:
cd server
npm run create-admin
```

The script will prompt you for an email, name, and password and insert the user into Atlas.

You can then sign in at `https://<your-vercel-url>/login` and access `/admin`.

---

## 7. Custom domain (optional)

- **Vercel:** Project → Settings → Domains → add `generationaid.org`. Follow Vercel's DNS instructions.
- **Render:** API service → Settings → Custom Domains → add e.g. `api.generationaid.org`. Update Vercel `VITE_API_URL` and Render `CLIENT_ORIGIN` to use the new hostnames.

---

## 8. CI

[.github/workflows/typecheck.yml](.github/workflows/typecheck.yml) runs `tsc --noEmit` on both packages for every push and PR. No setup required beyond pushing the repo to GitHub.

---

## Local development quick reference

```bash
# server
cd server
cp .env.example .env       # then fill in MONGODB_URI, JWT_SECRET, CLOUDINARY_*
npm install
npm run dev                # http://localhost:5000

# client (in another terminal)
cd client
npm install
npm run dev                # http://localhost:5173
```

Vite proxies `/api` → `http://localhost:5000` so the SPA's `VITE_API_URL=/api` default just works.

---

## Migrating from the old `/uploads` disk storage

If you had local uploads from before the Cloudinary switch, the URLs stored in MongoDB (`/uploads/photos/foo.jpg`, etc.) will 404 in production because Render has no persistent disk. Options:

1. **Re-upload from the admin UI** (simplest if you have only a few items).
2. **Bulk-migrate**: write a one-off script that downloads each `/uploads/...` file from your dev machine, uses `cloudinary.uploader.upload()` to push it, and updates the corresponding Mongo document's `*Url` and `*PublicId` fields.

For a fresh deploy with no legacy data this section doesn't apply.
