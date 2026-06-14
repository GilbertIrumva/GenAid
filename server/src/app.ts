import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import { env } from "./config/env";
import programRoutes from "./routes/programRoutes";
import storyRoutes from "./routes/storyRoutes";
import partnerRoutes from "./routes/partnerRoutes";
import impactRoutes from "./routes/impactRoutes";
import contactRoutes from "./routes/contactRoutes";
import authRoutes from "./routes/authRoutes";
import videoRoutes from "./routes/videoRoutes";
import photoRoutes from "./routes/photoRoutes";
import adminRoutes from "./routes/adminRoutes";
import { notFound, errorHandler } from "./middleware/error";
import { UPLOADS_ROOT } from "./middleware/upload";
import { apiLimiter } from "./middleware/rateLimit";

const app = express();

// Trust the first proxy hop (Render, Vercel, Nginx) so req.ip is the real
// client IP — required for rate-limit to work correctly behind a proxy.
app.set("trust proxy", 1);

// Security headers (CSP, HSTS, X-Frame-Options, etc.).
// crossOriginResourcePolicy is relaxed so /uploads can be embedded by the SPA.
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// CORS: strict allowlist instead of "*".
app.use(
  cors({
    origin: (origin, cb) => {
      // Allow same-origin / curl / server-side calls (no Origin header).
      if (!origin) return cb(null, true);
      if (env.CLIENT_ORIGIN.includes(origin)) return cb(null, true);
      return cb(new Error(`Origin not allowed by CORS: ${origin}`));
    },
    credentials: true,
  })
);

// Body size cap — JSON payloads are small (forms only); uploads use multer.
app.use(express.json({ limit: "100kb" }));

// Apply baseline rate-limit to all /api/* routes.
app.use("/api", apiLimiter);

// Serve uploaded media files (videos, posters).
app.use("/uploads", express.static(UPLOADS_ROOT, { maxAge: "7d" }));

app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "Gn-aid API server is running" });
});

app.get("/api/health", (_req, res) => {
  const dbStates: Record<number, string> = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };
  res.json({
    status: "ok",
    uptime: process.uptime(),
    db: dbStates[mongoose.connection.readyState] ?? "unknown",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/impact", impactRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;