import { Router } from "express";
import {
  getPartners,
  createPartner,
  updatePartner,
  deletePartner,
} from "../controllers/partnerController";
import { protect } from "../middleware/auth";

const router = Router();

router.get("/", getPartners);
router.post("/", protect, createPartner);
router.put("/:id", protect, updatePartner);
router.delete("/:id", protect, deletePartner);

export default router;
