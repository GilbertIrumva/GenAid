import { Request, Response } from "express";
import { Photo } from "../models/Photo";
import { AuthRequest } from "../middleware/auth";
import { cloudinary } from "../config/cloudinary";

export async function getPhotos(_req: Request, res: Response) {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function createPhoto(req: AuthRequest, res: Response) {
  try {
    const file = req.file;
    const { title, description } = req.body as {
      title?: string;
      description?: string;
    };

    if (!title || !title.trim()) {
      return res.status(400).json({ error: "title is required" });
    }
    if (!description || !description.trim()) {
      return res.status(400).json({ error: "description is required" });
    }
    if (!file) {
      return res.status(400).json({ error: "image file is required" });
    }

    const photo = await Photo.create({
      title: title.trim(),
      description: description.trim(),
      imageUrl: file.path,
      imagePublicId: file.filename,
      uploadedBy: String(req.user?._id ?? ""),
    });

    res.status(201).json(photo);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}

export async function updatePhoto(req: AuthRequest, res: Response) {
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

    const photo = await Photo.findByIdAndUpdate(req.params.id, patch, {
      new: true,
      runValidators: true,
    });
    if (!photo) return res.status(404).json({ error: "Photo not found" });
    res.json(photo);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}

export async function deletePhoto(req: Request, res: Response) {
  try {
    const photo = await Photo.findByIdAndDelete(req.params.id);
    if (!photo) return res.status(404).json({ error: "Photo not found" });

    // Best-effort cleanup of the Cloudinary asset.
    if (photo.imagePublicId) {
      cloudinary.uploader
        .destroy(photo.imagePublicId, { resource_type: "image" })
        .catch(() => {});
    }

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
