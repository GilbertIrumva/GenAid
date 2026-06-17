import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { env } from "../config/env";
import { User } from "../models/User";
import { AuthRequest } from "../middleware/auth";

/**
 * Synthetic user id encoded in JWTs issued for the env-defined fallback
 * admin. The auth middleware recognises this id and skips the DB lookup,
 * constructing an in-memory user object instead.
 */
export const FALLBACK_ADMIN_ID = "__fallback_admin__";

function signToken(id: string): string {
  return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: "7d" });
}

function fallbackEnabled(): boolean {
  return Boolean(env.FALLBACK_ADMIN_EMAIL && env.FALLBACK_ADMIN_PASSWORD);
}

function matchesFallback(email: string, password: string): boolean {
  if (!fallbackEnabled()) return false;
  return (
    email.trim().toLowerCase() === env.FALLBACK_ADMIN_EMAIL!.toLowerCase() &&
    password === env.FALLBACK_ADMIN_PASSWORD
  );
}

function dbConnected(): boolean {
  // 1 = connected. 2 = connecting (treat as up for our purposes), others down.
  return mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2;
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

    // 1) Try the env-defined fallback admin first. This works even if Mongo
    //    is unreachable, so a sysadmin can always recover access.
    if (matchesFallback(email, password)) {
      const token = signToken(FALLBACK_ADMIN_ID);
      return res.json({
        token,
        user: {
          id: FALLBACK_ADMIN_ID,
          name: env.FALLBACK_ADMIN_NAME,
          email: env.FALLBACK_ADMIN_EMAIL,
          role: "admin",
        },
      });
    }

    // 2) Otherwise we need the database. If it isn't connected, give a clear
    //    503 — much friendlier than the generic "Invalid credentials" the
    //    Mongoose timeout would otherwise produce.
    if (!dbConnected()) {
      return res.status(503).json({
        error:
          "Database is currently unavailable. Please try again in a moment.",
      });
    }

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
    // Mongo network / timeout errors land here. Surface them as 503 so the
    // client can show a "service unavailable" message instead of a generic 500.
    const message = (err as Error).message || "Login failed";
    const isNetwork =
      /ECONN|ETIMEDOUT|ENOTFOUND|connect|timed? out|topology|MongoNetwork/i.test(
        message
      );
    res.status(isNetwork ? 503 : 500).json({
      error: isNetwork
        ? "Database is currently unavailable. Please try again in a moment."
        : message,
    });
  }
}

export async function me(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ error: "Not authorized" });
  const { _id, name, email, role, createdAt } = req.user;
  res.json({ id: _id, name, email, role, createdAt });
}
