import { Request, Response } from "express";
import mongoose from "mongoose";
import { Post } from "../models/Post";

/**
 * Public list of published posts. Admin can list all via /admin endpoint later
 * if needed; for now the admin UI consumes the same endpoint and filters
 * client-side, which keeps surface area small.
 */
export async function getPosts(req: Request, res: Response) {
  try {
    // Hidden query flag so the admin list can include drafts.
    const includeDrafts = req.query.includeDrafts === "true";
    const filter = includeDrafts ? {} : { published: true };
    const posts = await Post.find(filter).sort({ publishedAt: -1, createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

/** Look up a post by `_id` or `slug` so public URLs can stay friendly. */
export async function getPostById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Missing id" });
    const isObjectId = mongoose.isValidObjectId(id);
    // Cast to satisfy Mongoose's strict filter typing for $or + slug lookups.
    const filter = (
      isObjectId ? { $or: [{ _id: id }, { slug: id }] } : { slug: id }
    ) as Record<string, unknown>;
    const post = await Post.findOne(filter);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function createPost(req: Request, res: Response) {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}

export async function updatePost(req: Request, res: Response) {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}

export async function deletePost(req: Request, res: Response) {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
