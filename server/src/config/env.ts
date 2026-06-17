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

  /** Cloudinary credentials (required: uploads always go to Cloudinary). */
  CLOUDINARY_CLOUD_NAME: z.string().min(1, "CLOUDINARY_CLOUD_NAME is required"),
  CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY is required"),
  CLOUDINARY_API_SECRET: z.string().min(1, "CLOUDINARY_API_SECRET is required"),

  /**
   * Optional offline-recovery admin. When BOTH `FALLBACK_ADMIN_EMAIL` and
   * `FALLBACK_ADMIN_PASSWORD` are set, the login endpoint will accept that
   * credential pair (and issue a real JWT) WITHOUT touching MongoDB.
   * This means the admin can still sign in if the database is unreachable.
   * Most data-driven admin pages will still appear empty while the DB is
   * down, but you can at least authenticate and verify the outage.
   *
   * Leave both unset to disable the fallback entirely.
   */
  FALLBACK_ADMIN_EMAIL: z
    .string()
    .email("FALLBACK_ADMIN_EMAIL must be a valid email")
    .optional(),
  FALLBACK_ADMIN_PASSWORD: z
    .string()
    .min(8, "FALLBACK_ADMIN_PASSWORD must be at least 8 chars")
    .optional(),
  FALLBACK_ADMIN_NAME: z.string().default("Fallback Admin"),
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
