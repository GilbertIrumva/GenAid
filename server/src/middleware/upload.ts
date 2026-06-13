import fs from "fs";
import path from "path";
import multer from "multer";

/** Absolute path to <repo>/server/uploads on disk. */
export const UPLOADS_ROOT = path.resolve(process.cwd(), "uploads");
export const VIDEOS_DIR = path.join(UPLOADS_ROOT, "videos");
export const POSTERS_DIR = path.join(UPLOADS_ROOT, "posters");

for (const dir of [UPLOADS_ROOT, VIDEOS_DIR, POSTERS_DIR]) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

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
    else cb(new Error("Unexpected field: " + file.fieldname), "");
  },
  filename: (_req, file, cb) => cb(null, safeName(file.originalname)),
});

function fileFilter(
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  if (file.fieldname === "video") {
    if (!file.mimetype.startsWith("video/")) {
      return cb(new Error("Video field must be a video file"));
    }
  } else if (file.fieldname === "poster") {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Poster field must be an image file"));
    }
  }
  cb(null, true);
}

/** Accepts one `video` (required) and optional `poster` image. 200MB cap. */
export const uploadVideo = multer({
  storage,
  fileFilter,
  limits: { fileSize: 200 * 1024 * 1024 },
}).fields([
  { name: "video", maxCount: 1 },
  { name: "poster", maxCount: 1 },
]);
