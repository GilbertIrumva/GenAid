import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { Video } from "../models/Video";
import { AuthRequest } from "../middleware/auth";
import { UPLOADS_ROOT } from "../middleware/upload";

export async function getVideos(_req: Request, res: Response) {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function createVideo(req: AuthRequest, res: Response) {
  try {
    const files = req.files as
      | { video?: Express.Multer.File[]; poster?: Express.Multer.File[] }
      | undefined;

    const videoFile = files?.video?.[0];
    const posterFile = files?.poster?.[0];

    const { title, description } = req.body as { title?: string; description?: string };

    if (!title || !description) {
      return res.status(400).json({ error: "title and description are required" });
    }
    if (!videoFile) {
      return res.status(400).json({ error: "video file is required" });
    }

    const videoUrl = `/uploads/videos/${videoFile.filename}`;
    const posterUrl = posterFile ? `/uploads/posters/${posterFile.filename}` : "";

    const video = await Video.create({
      title: title.trim(),
      description: description.trim(),
      videoUrl,
      posterUrl,
      uploadedBy: String(req.user?._id ?? ""),
    });

    res.status(201).json(video);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}

export async function deleteVideo(req: Request, res: Response) {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ error: "Video not found" });

    // Best-effort cleanup of files on disk.
    for (const url of [video.videoUrl, video.posterUrl]) {
      if (!url) continue;
      const rel = url.replace(/^\/uploads\//, "");
      const abs = path.join(UPLOADS_ROOT, rel);
      fs.promises.unlink(abs).catch(() => {});
    }

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
