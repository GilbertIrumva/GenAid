import { Router } from "express";
import {
  getPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
} from "../controllers/programController";
import { protect } from "../middleware/auth";

const router = Router();

router.get("/", getPrograms);
router.get("/:id", getProgramById);
router.post("/", protect, createProgram);
router.put("/:id", protect, updateProgram);
router.delete("/:id", protect, deleteProgram);

export default router;
