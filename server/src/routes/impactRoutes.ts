import { Router } from "express";
import {
  getImpactMetrics,
  createImpactMetric,
  updateImpactMetric,
  deleteImpactMetric,
} from "../controllers/impactController";
import { protect } from "../middleware/auth";

const router = Router();

router.get("/", getImpactMetrics);
router.post("/", protect, createImpactMetric);
router.put("/:id", protect, updateImpactMetric);
router.delete("/:id", protect, deleteImpactMetric);

export default router;
