import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import programRoutes from "./routes/programRoutes";
import storyRoutes from "./routes/storyRoutes";
import partnerRoutes from "./routes/partnerRoutes";
import impactRoutes from "./routes/impactRoutes";
import contactRoutes from "./routes/contactRoutes";
import authRoutes from "./routes/authRoutes";
import videoRoutes from "./routes/videoRoutes";
import { notFound, errorHandler } from "./middleware/error";
import { UPLOADS_ROOT } from "./middleware/upload";

const app = express();

app.use(cors());
app.use(express.json());

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

app.use(notFound);
app.use(errorHandler);

export default app;