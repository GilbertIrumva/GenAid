import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { User } from "../models/User";
import { AuthRequest } from "../middleware/auth";

function signToken(id: string): string {
  return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: "7d" });
}

export async function register(req: Request, res: Response) {
  try {
    // Body has already been validated and sanitized by validateBody(registerSchema).
    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already in use" });
    }

    // Never trust `role` from the request body. New self-signups always
    // land as unapproved editors. Promotion to admin or flipping `approved`
    // must happen manually in the DB (or via a future admin-only endpoint).
    await User.create({
      name,
      email,
      password,
      role: "editor",
      approved: false,
    });

    // Do NOT return a token here — the account is pending approval.
    res.status(201).json({
      ok: true,
      message:
        "Account created. An administrator must approve it before you can sign in.",
    });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body as { email: string; password: string };

    const user = await User.findOne({ email });
    // Use a constant-time-ish path regardless of whether the user exists.
    const valid = user ? await user.comparePassword(password) : false;
    if (!user || !valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!user.approved) {
      return res
        .status(403)
        .json({ error: "Account pending administrator approval" });
    }

    const token = signToken(String(user._id));
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function me(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ error: "Not authorized" });
  const { _id, name, email, role, createdAt } = req.user;
  res.json({ id: _id, name, email, role, createdAt });
}
