import { Router } from "express";
import {
  getVideos,
  createVideo,
  updateVideo,
  deleteVideo,
} from "../controllers/videoController";
import { protect } from "../middleware/auth";
import { uploadVideo } from "../middleware/upload";

const router = Router();

router.get("/", getVideos);
router.post("/", protect, uploadVideo, createVideo);
router.patch("/:id", protect, updateVideo);
router.delete("/:id", protect, deleteVideo);

export default router;
