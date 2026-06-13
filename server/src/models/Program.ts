import { Schema, model, Document } from "mongoose";

export interface IProgram extends Document {
  title: string;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  createdAt: Date;
}

const programSchema = new Schema<IProgram>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  image: { type: String, default: "" },
  category: { type: String, required: true, trim: true },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Program = model<IProgram>("Program", programSchema);
