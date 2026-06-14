import { Router } from "express";
import { createContactMessage } from "../controllers/contactController";
import { writeLimiter } from "../middleware/rateLimit";
import { validateBody } from "../middleware/validate";
import { contactSchema } from "../schemas";

const router = Router();

router.post("/", writeLimiter, validateBody(contactSchema), createContactMessage);

export default router;
