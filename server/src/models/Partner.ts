import { Schema, model, Document } from "mongoose";

export interface IPartner extends Document {
  name: string;
  logo: string;
  website: string;
  description: string;
}

const partnerSchema = new Schema<IPartner>({
  name: { type: String, required: true, trim: true },
  logo: { type: String, default: "" },
  website: { type: String, default: "" },
  description: { type: String, default: "" },
});

export const Partner = model<IPartner>("Partner", partnerSchema);
