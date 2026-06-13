import { Request, Response } from "express";
import { Partner } from "../models/Partner";

export async function getPartners(_req: Request, res: Response) {
  try {
    const partners = await Partner.find();
    res.json(partners);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function createPartner(req: Request, res: Response) {
  try {
    const partner = await Partner.create(req.body);
    res.status(201).json(partner);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}

export async function updatePartner(req: Request, res: Response) {
  try {
    const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!partner) return res.status(404).json({ error: "Partner not found" });
    res.json(partner);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}

export async function deletePartner(req: Request, res: Response) {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);
    if (!partner) return res.status(404).json({ error: "Partner not found" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
