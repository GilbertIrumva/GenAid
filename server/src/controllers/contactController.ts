import { Request, Response } from "express";
import { ContactMessage } from "../models/ContactMessage";
import type { ContactInput } from "../schemas";

export async function createContactMessage(req: Request, res: Response) {
  try {
    // Body has been validated and sanitized by validateBody(contactSchema).
    const body = req.body as ContactInput;
    const message = await ContactMessage.create(body);
    res.status(201).json({ ok: true, id: message._id });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}
