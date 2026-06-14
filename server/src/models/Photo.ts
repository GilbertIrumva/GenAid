import { Schema, model, Document } from "mongoose";

export interface IPhoto extends Document {
  title: string;
  description: string;
  /** Public URL path to the uploaded image (e.g. /uploads/photos/foo.jpg). */
  imageUrl: string;
  /** Mongo ObjectId of the user who uploaded it. */
  uploadedBy: string;
  createdAt: Date;
}

const photoSchema = new Schema<IPhoto>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  uploadedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Photo = model<IPhoto>("Photo", photoSchema);
