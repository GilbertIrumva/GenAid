import { Router } from "express";
import { protect, requireRole } from "../middleware/auth";
import {
  getDashboardStats,
  listUsers,
  updateUser,
  deleteUser,
  listMessages,
  markMessageRead,
  deleteMessage,
} from "../controllers/adminController";

const router = Router();

// Every /api/admin/* route requires a valid token first.
router.use(protect);

// Dashboard stats: any logged-in staff member can see.
router.get("/stats", getDashboardStats);

// Messages inbox: editor or admin.
router.get("/messages", listMessages);
router.patch("/messages/:id", markMessageRead);
router.delete("/messages/:id", deleteMessage);

// User management: admin only.
router.get("/users", requireRole("admin"), listUsers);
router.patch("/users/:id", requireRole("admin"), updateUser);
router.delete("/users/:id", requireRole("admin"), deleteUser);

export default router;
