import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { User, IUser } from "../models/User";

export interface AuthRequest extends Request {
  user?: IUser;
}

export async function protect(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Not authorized: missing token" });
    }

    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Not authorized: missing token" });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id).select("-password");
    if (!user || !user.approved) {
      return res.status(401).json({ error: "Not authorized" });
    }

    req.user = user;
    next();
  } catch {
    res.status(401).json({ error: "Not authorized: invalid token" });
  }
}

/**
 * Restrict a route to specific roles. Use AFTER `protect`:
 *   router.get("/secret", protect, requireRole("admin"), handler);
 */
export function requireRole(...roles: Array<"admin" | "editor">) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
}
