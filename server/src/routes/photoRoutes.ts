import { Router } from "express";
import {
  getPhotos,
  createPhoto,
  updatePhoto,
  deletePhoto,
} from "../controllers/photoController";
import { protect } from "../middleware/auth";
import { uploadPhoto } from "../middleware/upload";

const router = Router();

router.get("/", getPhotos);
router.post("/", protect, uploadPhoto, createPhoto);
router.patch("/:id", protect, updatePhoto);
router.delete("/:id", protect, deletePhoto);

export default router;
