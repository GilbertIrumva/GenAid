import { Request, Response } from "express";
import { ImpactMetric } from "../models/ImpactMetric";

export async function getImpactMetrics(_req: Request, res: Response) {
  try {
    const metrics = await ImpactMetric.find().sort({ order: 1 });
    res.json(metrics);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function createImpactMetric(req: Request, res: Response) {
  try {
    const metric = await ImpactMetric.create(req.body);
    res.status(201).json(metric);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}

export async function updateImpactMetric(req: Request, res: Response) {
  try {
    const metric = await ImpactMetric.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!metric) return res.status(404).json({ error: "Impact metric not found" });
    res.json(metric);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}

export async function deleteImpactMetric(req: Request, res: Response) {
  try {
    const metric = await ImpactMetric.findByIdAndDelete(req.params.id);
    if (!metric) return res.status(404).json({ error: "Impact metric not found" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
