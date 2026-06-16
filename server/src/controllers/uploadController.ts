import { Response } from "express";
import { AuthRequest } from "../middleware/auth";

/**
 * Generic image-upload helper used by admin forms (Stories, Blog covers) that
 * need to save an image and store its URL on a different document.
 *
 * The route mounts `uploadPhoto` middleware (multer.single("image")) which
 * pipes the file straight to Cloudinary; we echo back the secure URL and
 * public_id so callers can persist them on the related document.
 */
export async function uploadImage(req: AuthRequest, res: Response) {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "image file is required" });
  }
  res.status(201).json({
    url: file.path,
    public_id: file.filename,
    size: file.size,
  });
}
