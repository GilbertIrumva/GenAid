import path from "path";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../config/cloudinary";
import { env } from "../config/env";

const ALLOWED_VIDEO_EXT = new Set([".mp4", ".webm", ".mov", ".m4v"]);
const ALLOWED_IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

/**
 * Cloudinary storage. `folder` and `resource_type` are picked based on the
 * incoming field name so videos / posters / photos land in tidy buckets.
 *
 * After upload, multer exposes the file as:
 *   - `req.file.path`     -> the secure HTTPS URL of the asset
 *   - `req.file.filename` -> the Cloudinary `public_id` (used for deletion)
 */
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => {
    const ext = path.extname(file.originalname).replace(".", "").toLowerCase();
    if (file.fieldname === "video") {
      return {
        folder: "gnaid/videos",
        resource_type: "video",
        format: ext || "mp4",
      };
    }
    if (file.fieldname === "poster") {
      return {
        folder: "gnaid/posters",
        resource_type: "image",
        format: ext || "jpg",
      };
    }
    return {
      folder: "gnaid/photos",
      resource_type: "image",
      format: ext || "jpg",
    };
  },
});

function fileFilter(
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (file.fieldname === "video") {
    if (!file.mimetype.startsWith("video/") || !ALLOWED_VIDEO_EXT.has(ext)) {
      return cb(new Error("Video must be mp4 / webm / mov / m4v"));
    }
  } else if (file.fieldname === "poster" || file.fieldname === "image") {
    if (!file.mimetype.startsWith("image/") || !ALLOWED_IMAGE_EXT.has(ext)) {
      return cb(new Error("Image must be jpg / png / webp"));
    }
  }
  cb(null, true);
}

/** Accepts one `video` (required) and optional `poster` image. Cap from env. */
export const uploadVideo = multer({
  storage,
  fileFilter,
  limits: { fileSize: env.UPLOAD_MAX_MB * 1024 * 1024 },
}).fields([
  { name: "video", maxCount: 1 },
  { name: "poster", maxCount: 1 },
]);

/**
 * Single `image` upload for blog photos. Capped at 10 MB regardless of the
 * (much larger) video cap — photos shouldn't need more than that.
 */
export const uploadPhoto = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single("image");
