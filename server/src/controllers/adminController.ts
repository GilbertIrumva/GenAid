import { Response } from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { User } from "../models/User";
import { ContactMessage } from "../models/ContactMessage";
import { Video } from "../models/Video";
import { Photo } from "../models/Photo";
import { AuthRequest } from "../middleware/auth";

/* ------------------------------------------------------------------ stats */

export async function getDashboardStats(_req: AuthRequest, res: Response) {
  try {
    const [
      totalUsers,
      pendingUsers,
      totalMessages,
      unreadMessages,
      totalVideos,
      totalPhotos,
      recentMessages,
    ] = await Promise.all([
      User.countDocuments({}),
      User.countDocuments({ approved: false }),
      ContactMessage.countDocuments({}),
      ContactMessage.countDocuments({ read: false }),
      Video.countDocuments({}),
      Photo.countDocuments({}),
      ContactMessage.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name email subject createdAt read"),
    ]);

    res.json({
      totalUsers,
      pendingUsers,
      totalMessages,
      unreadMessages,
      totalVideos,
      totalPhotos,
      recentMessages,
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

/* ------------------------------------------------------------------ users */

const updateUserSchema = z.object({
  role: z.enum(["admin", "editor"]).optional(),
  approved: z.boolean().optional(),
  name: z.string().trim().min(2).max(80).optional(),
});

export async function listUsers(_req: AuthRequest, res: Response) {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ approved: 1, createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function updateUser(req: AuthRequest, res: Response) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid user id" });
    }
    const parsed = updateUserSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: parsed.error.issues,
      });
    }
    const user = await User.findByIdAndUpdate(req.params.id, parsed.data, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}

export async function deleteUser(req: AuthRequest, res: Response) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid user id" });
    }
    // Don't allow the caller to delete themselves.
    if (req.user && String(req.user._id) === req.params.id) {
      return res.status(400).json({ error: "You cannot delete your own account" });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

/* --------------------------------------------------------------- messages */

export async function listMessages(req: AuthRequest, res: Response) {
  try {
    const onlyUnread = req.query.unread === "true";
    const filter = onlyUnread ? { read: false } : {};
    const messages = await ContactMessage.find(filter).sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function markMessageRead(req: AuthRequest, res: Response) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid message id" });
    }
    const read = req.body?.read !== false;
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { read },
      { new: true }
    );
    if (!message) return res.status(404).json({ error: "Message not found" });
    res.json(message);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}

export async function deleteMessage(req: AuthRequest, res: Response) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid message id" });
    }
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ error: "Message not found" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
