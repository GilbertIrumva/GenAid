import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().toLowerCase().email().max(120),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128),
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(120),
  password: z.string().min(1).max(128),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().toLowerCase().email().max(120),
  subject: z.string().trim().min(2).max(160).default("Website message"),
  message: z.string().trim().min(5).max(5000),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const programSchema = z.object({
  title: z.string().trim().min(2).max(160),
  description: z.string().trim().min(5).max(5000),
  image: z.string().trim().max(2000).optional().default(""),
  category: z.string().trim().min(2).max(80),
  featured: z.boolean().optional().default(false),
});
export type ProgramInput = z.infer<typeof programSchema>;

export const programUpdateSchema = programSchema.partial();
export type ProgramUpdateInput = z.infer<typeof programUpdateSchema>;
