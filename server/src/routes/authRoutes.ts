import { Router } from "express";
import { register, login, me } from "../controllers/authController";
import { protect } from "../middleware/auth";
import { authLimiter } from "../middleware/rateLimit";
import { validateBody } from "../middleware/validate";
import { loginSchema, registerSchema } from "../schemas";

const router = Router();

router.post("/register", authLimiter, validateBody(registerSchema), register);
router.post("/login", authLimiter, validateBody(loginSchema), login);
router.get("/me", protect, me);

export default router;
