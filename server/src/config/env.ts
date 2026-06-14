import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

/**
 * Server environment schema. Fails fast at boot if anything required is missing
 * or malformed — much better than a 500 mid-request.
 */
const schema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(5000),

  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET must be at least 32 chars (use a random hex string)"),

  /**
   * Comma-separated list of allowed origins for CORS, e.g.
   *   "https://generationaid.org,https://www.generationaid.org,http://localhost:5173"
   */
  CLIENT_ORIGIN: z
    .string()
    .default("http://localhost:5173")
    .transform((v) =>
      v
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    ),

  /** Upload size cap in megabytes. */
  UPLOAD_MAX_MB: z.coerce.number().int().positive().default(200),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "Invalid environment configuration:\n" +
      parsed.error.issues
        .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
        .join("\n")
  );
  process.exit(1);
}

export const env = parsed.data;
