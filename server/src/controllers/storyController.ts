import { Request, Response } from "express";
import { Story } from "../models/Story";

export async function getStories(_req: Request, res: Response) {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function getStoryById(req: Request, res: Response) {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ error: "Story not found" });
    res.json(story);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function createStory(req: Request, res: Response) {
  try {
    const story = await Story.create(req.body);
    res.status(201).json(story);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}

export async function updateStory(req: Request, res: Response) {
  try {
    const story = await Story.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!story) return res.status(404).json({ error: "Story not found" });
    res.json(story);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}

export async function deleteStory(req: Request, res: Response) {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    if (!story) return res.status(404).json({ error: "Story not found" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
