import { Schema, model, Document } from "mongoose";

export interface IStory extends Document {
  title: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  /** URL-friendly identifier, auto-generated from title if not provided. */
  slug: string;
  /** Optional display fields used by the public Stories page. */
  role: string;
  program: string;
  location: string;
  excerpt: string;
  createdAt: Date;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const storySchema = new Schema<IStory>({
  title: { type: String, required: true, trim: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, default: "" },
  author: { type: String, required: true, trim: true },
  slug: { type: String, trim: true, unique: true, sparse: true, index: true },
  role: { type: String, default: "", trim: true },
  program: { type: String, default: "", trim: true },
  location: { type: String, default: "", trim: true },
  excerpt: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

// Auto-derive slug from title if missing/empty so older records still get one.
// Mongoose v9 pre-save returns void after mutating `this` (no `next` callback).
storySchema.pre("save", function (this: IStory) {
  if (!this.slug || this.slug.trim() === "") {
    this.slug = slugify(this.title);
  }
});

export const Story = model<IStory>("Story", storySchema);
