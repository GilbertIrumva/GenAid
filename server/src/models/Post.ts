import { Schema, model, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  cover: string;
  /** URL-friendly identifier, auto-generated from title if not provided. */
  slug: string;
  /** Whether the post should appear on the public /blog page. */
  published: boolean;
  /** Date shown in the byline — separate from createdAt so editors can backdate. */
  publishedAt: Date;
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

const postSchema = new Schema<IPost>({
  title: { type: String, required: true, trim: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true, trim: true },
  cover: { type: String, default: "" },
  slug: { type: String, trim: true, unique: true, sparse: true, index: true },
  published: { type: Boolean, default: true, index: true },
  publishedAt: { type: Date, default: Date.now, index: true },
  createdAt: { type: Date, default: Date.now },
});

// Mongoose v9 pre-save no longer uses a `next` callback for save hooks — the
// function returns void (or a Promise) after mutating `this`.
postSchema.pre("save", function (this: IPost) {
  if (!this.slug || this.slug.trim() === "") {
    this.slug = slugify(this.title);
  }
});

export const Post = model<IPost>("Post", postSchema);
