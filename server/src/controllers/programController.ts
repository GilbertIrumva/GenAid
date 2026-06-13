import { Request, Response } from "express";
import { Program } from "../models/Program";

export async function getPrograms(_req: Request, res: Response) {
  try {
    const programs = await Program.find().sort({ createdAt: -1 });
    res.json(programs);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function getProgramById(req: Request, res: Response) {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ error: "Program not found" });
    res.json(program);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function createProgram(req: Request, res: Response) {
  try {
    const program = await Program.create(req.body);
    res.status(201).json(program);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}

export async function updateProgram(req: Request, res: Response) {
  try {
    const program = await Program.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!program) return res.status(404).json({ error: "Program not found" });
    res.json(program);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}

export async function deleteProgram(req: Request, res: Response) {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) return res.status(404).json({ error: "Program not found" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
