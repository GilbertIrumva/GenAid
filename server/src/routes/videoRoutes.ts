import { Router } from "express";
import {
  getVideos,
  createVideo,
  deleteVideo,
} from "../controllers/videoController";
import { protect } from "../middleware/auth";
import { uploadVideo } from "../middleware/upload";

const router = Router();

router.get("/", getVideos);
router.post("/", protect, uploadVideo, createVideo);
router.delete("/:id", protect, deleteVideo);

export default router;
