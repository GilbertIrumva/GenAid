import { Request, Response } from "express";
import { ContactMessage } from "../models/ContactMessage";

export async function createContactMessage(req: Request, res: Response) {
  try {
    const message = await ContactMessage.create(req.body);
    res.status(201).json({ ok: true, id: message._id });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}
