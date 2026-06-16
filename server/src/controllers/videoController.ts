import { Request, Response } from "express";
import { Video } from "../models/Video";
import { AuthRequest } from "../middleware/auth";
import { cloudinary } from "../config/cloudinary";

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

    // multer-storage-cloudinary exposes the secure URL on `path` and the
    // Cloudinary public_id on `filename`.
    const video = await Video.create({
      title: title.trim(),
      description: description.trim(),
      videoUrl: videoFile.path,
      posterUrl: posterFile?.path ?? "",
      videoPublicId: videoFile.filename,
      posterPublicId: posterFile?.filename ?? "",
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

    // Best-effort cleanup of Cloudinary assets.
    if (video.videoPublicId) {
      cloudinary.uploader
        .destroy(video.videoPublicId, { resource_type: "video" })
        .catch(() => {});
    }
    if (video.posterPublicId) {
      cloudinary.uploader
        .destroy(video.posterPublicId, { resource_type: "image" })
        .catch(() => {});
    }

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function updateVideo(req: Request, res: Response) {
  try {
    const { title, description } = req.body as {
      title?: string;
      description?: string;
    };

    const patch: { title?: string; description?: string } = {};
    if (typeof title === "string") {
      const t = title.trim();
      if (t.length < 2 || t.length > 160) {
        return res
          .status(400)
          .json({ error: "title must be 2-160 characters" });
      }
      patch.title = t;
    }
    if (typeof description === "string") {
      const d = description.trim();
      if (d.length < 5 || d.length > 5000) {
        return res
          .status(400)
          .json({ error: "description must be 5-5000 characters" });
      }
      patch.description = d;
    }

    if (Object.keys(patch).length === 0) {
      return res.status(400).json({ error: "Nothing to update" });
    }

    const video = await Video.findByIdAndUpdate(req.params.id, patch, {
      new: true,
      runValidators: true,
    });
    if (!video) return res.status(404).json({ error: "Video not found" });
    res.json(video);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}
