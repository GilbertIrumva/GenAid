import { Schema, model, Document } from "mongoose";

export interface IVideo extends Document {
  title: string;
  description: string;
  /** Public URL path to the uploaded video file (e.g. /uploads/videos/foo.mp4). */
  videoUrl: string;
  /** Public URL path to the poster image (e.g. /uploads/posters/foo.jpg). Optional. */
  posterUrl: string;
  /** Mongo ObjectId of the user who uploaded it. */
  uploadedBy: string;
  createdAt: Date;
}

const videoSchema = new Schema<IVideo>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  posterUrl: { type: String, default: "" },
  uploadedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Video = model<IVideo>("Video", videoSchema);
