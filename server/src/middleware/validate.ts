import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

/**
 * Validates `req.body` against a Zod schema and replaces it with the parsed
 * (sanitized, type-narrowed) value. On failure returns 400 with field errors.
 */
export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: result.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      });
    }
    req.body = result.data;
    next();
  };
}
