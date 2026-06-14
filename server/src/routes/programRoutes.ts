import { Router } from "express";
import {
  getPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
} from "../controllers/programController";
import { protect } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { programSchema, programUpdateSchema } from "../schemas";

const router = Router();

router.get("/", getPrograms);
router.get("/:id", getProgramById);
router.post("/", protect, validateBody(programSchema), createProgram);
router.put("/:id", protect, validateBody(programUpdateSchema), updateProgram);
router.delete("/:id", protect, deleteProgram);

export default router;
