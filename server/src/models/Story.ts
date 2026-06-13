import { Schema, model, Document } from "mongoose";

export interface IStory extends Document {
  title: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  createdAt: Date;
}

const storySchema = new Schema<IStory>({
  title: { type: String, required: true, trim: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, default: "" },
  author: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

export const Story = model<IStory>("Story", storySchema);
