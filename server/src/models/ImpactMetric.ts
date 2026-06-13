import { Schema, model, Document } from "mongoose";

export interface IImpactMetric extends Document {
  title: string;
  value: number;
  icon: string;
  order: number;
}

const impactMetricSchema = new Schema<IImpactMetric>({
  title: { type: String, required: true, trim: true },
  value: { type: Number, required: true },
  icon: { type: String, default: "" },
  order: { type: Number, default: 0 },
});

export const ImpactMetric = model<IImpactMetric>("ImpactMetric", impactMetricSchema);
