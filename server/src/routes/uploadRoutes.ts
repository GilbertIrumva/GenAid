import { Router } from "express";
import { uploadImage } from "../controllers/uploadController";
import { protect } from "../middleware/auth";
import { uploadPhoto } from "../middleware/upload";

const router = Router();

/**
 * Generic image upload. Returns `{ url, public_id, size }` so admin forms can
 * pre-upload an image and then submit its URL as part of a Story / Post / etc.
 *
 * Single `image` field, max 10 MB, jpg/png/webp only (enforced by uploadPhoto).
 */
router.post("/image", protect, uploadPhoto, uploadImage);

export default router;
