import { Router } from "express";
import {
  getStories,
  getStoryById,
  createStory,
  updateStory,
  deleteStory,
} from "../controllers/storyController";
import { protect } from "../middleware/auth";

const router = Router();

router.get("/", getStories);
router.get("/:id", getStoryById);
router.post("/", protect, createStory);
router.put("/:id", protect, updateStory);
router.delete("/:id", protect, deleteStory);

export default router;
