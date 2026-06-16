import { Schema, model, Document } from "mongoose";

export interface IVideo extends Document {
  title: string;
  description: string;
  /** Secure HTTPS URL of the uploaded video (Cloudinary). */
  videoUrl: string;
  /** Secure HTTPS URL of the poster image (Cloudinary). Optional. */
  posterUrl: string;
  /** Cloudinary public_id for the video asset (used to delete it). */
  videoPublicId: string;
  /** Cloudinary public_id for the poster asset (used to delete it). Optional. */
  posterPublicId: string;
  /** Mongo ObjectId of the user who uploaded it. */
  uploadedBy: string;
  createdAt: Date;
}

const videoSchema = new Schema<IVideo>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  posterUrl: { type: String, default: "" },
  videoPublicId: { type: String, default: "" },
  posterPublicId: { type: String, default: "" },
  uploadedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Video = model<IVideo>("Video", videoSchema);
