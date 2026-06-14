import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { env } from "../config/env";

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ error: "Not found" });
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // Multer-specific errors (file too big, unexpected field, etc.)
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  }

  // CORS rejection
  if (/CORS/i.test(err.message)) {
    return res.status(403).json({ error: err.message });
  }

  console.error(err);

  // In production, don't leak internal error messages.
  if (env.NODE_ENV === "production") {
    return res.status(500).json({ error: "Internal server error" });
  }
  return res.status(500).json({ error: err.message || "Internal server error" });
}
