import fs from "fs";
import path from "path";
import multer from "multer";
import { env } from "../config/env";

/** Absolute path to <repo>/server/uploads on disk. */
export const UPLOADS_ROOT = path.resolve(process.cwd(), "uploads");
export const VIDEOS_DIR = path.join(UPLOADS_ROOT, "videos");
export const POSTERS_DIR = path.join(UPLOADS_ROOT, "posters");
export const PHOTOS_DIR = path.join(UPLOADS_ROOT, "photos");

for (const dir of [UPLOADS_ROOT, VIDEOS_DIR, POSTERS_DIR, PHOTOS_DIR]) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const ALLOWED_VIDEO_EXT = new Set([".mp4", ".webm", ".mov", ".m4v"]);
const ALLOWED_IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function safeName(original: string) {
  const ext = path.extname(original).toLowerCase();
  const base = path
    .basename(original, ext)
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 40);
  const stamp = Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
  return `${base || "file"}-${stamp}${ext}`;
}

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    if (file.fieldname === "video") cb(null, VIDEOS_DIR);
    else if (file.fieldname === "poster") cb(null, POSTERS_DIR);
    else if (file.fieldname === "image") cb(null, PHOTOS_DIR);
    else cb(new Error("Unexpected field: " + file.fieldname), "");
  },
  filename: (_req, file, cb) => cb(null, safeName(file.originalname)),
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
