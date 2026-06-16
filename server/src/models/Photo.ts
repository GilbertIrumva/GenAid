import { Schema, model, Document } from "mongoose";

export interface IPhoto extends Document {
  title: string;
  description: string;
  /** Secure HTTPS URL of the uploaded image (Cloudinary). */
  imageUrl: string;
  /** Cloudinary public_id for the image asset (used to delete it). */
  imagePublicId: string;
  /** Mongo ObjectId of the user who uploaded it. */
  uploadedBy: string;
  createdAt: Date;
}

const photoSchema = new Schema<IPhoto>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  imagePublicId: { type: String, default: "" },
  uploadedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Photo = model<IPhoto>("Photo", photoSchema);
