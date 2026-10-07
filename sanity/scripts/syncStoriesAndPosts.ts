import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "fr1v7hol",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  apiVersion: "2024-03-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function uploadLocalImage(relPath: string | undefined): Promise<any> {
  if (!relPath) return undefined;
  if (relPath.startsWith("http://") || relPath.startsWith("https://")) {
    return undefined; // We leave external URLs to coalesce or upload
  }

  const cleanPath = relPath.replace(/^\/+/, "");
  const publicDir = path.resolve(process.cwd(), "../client/public");
  const absPath = path.resolve(publicDir, cleanPath);

  if (!fs.existsSync(absPath)) return undefined;

  try {
    const stream = fs.createReadStream(absPath);
    const asset = await client.assets.upload("image", stream, {
      filename: path.basename(absPath),
    });
    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  } catch (err) {
    console.warn(`Could not upload ${relPath}:`, err);
    return undefined;
  }
}

async function main() {
  console.log("=== SYNCING REAL STORIES AND BLOG POSTS ===");

  // 1. Purge the fake Amani stories and any legacy dummy stories/posts
  const fakeStories = await client.fetch<Array<{ _id: string }>>(
    `*[_type == "story" && (name match "Amani*" || title match "Amani*" || slug.current match "*amani*")]{ _id }`
  );
  for (const s of fakeStories) {
    console.log(`Deleting fake story: ${s._id}`);
    await client.delete(`drafts.${s._id}`).catch(() => {});
    await client.delete(s._id).catch(() => {});
  }
  await client.delete("story-amani-from-trainee-to-remote-designer").catch(() => {});
  await client.delete("drafts.story-amani-from-trainee-to-remote-designer").catch(() => {});

  // 2. Import Real Stories from client/src/data/stories.ts
  const { stories } = await import("../../client/src/data/stories");
  console.log(`\nSeeding ${stories.length} real Stories...`);

  for (const st of stories) {
    const docId = `story-${st.slug}`;
    console.log(` -> Processing Story: "${st.name}" (${st.slug})`);
    const imgRef = await uploadLocalImage(st.image);

    const doc: Record<string, unknown> = {
      _id: docId,
      _type: "story",
      name: st.name,
      title: st.name,
      slug: { _type: "slug", current: st.slug },
      role: st.role,
      program: st.program,
      location: st.location,
      excerpt: st.excerpt,
      content: st.content,
      videoUrl: st.videoUrl || "",
      publishedAt: new Date().toISOString(),
    };
    if (imgRef) {
      doc.image = imgRef;
      doc.coverImage = imgRef;
    }

    await client.createOrReplace(doc as any);
    await client.delete(`drafts.${docId}`).catch(() => {});
  }

  // 3. Import Real Blog Posts from client/src/data/posts.ts
  const { posts } = await import("../../client/src/data/posts");
  console.log(`\nSeeding ${posts.length} real Blog Posts...`);

  // Delete legacy dummy posts from early seedContent.ts
  const validSlugs = posts.map(p => p.slug);
  const existingPosts = await client.fetch<Array<{ _id: string; slug?: string }>>(
    `*[_type == "post"]{ _id, "slug": slug.current }`
  );
  for (const ep of existingPosts) {
    if (ep.slug && !validSlugs.includes(ep.slug)) {
      console.log(`Deleting legacy/unmatched post: ${ep._id} (${ep.slug})`);
      await client.delete(`drafts.${ep._id}`).catch(() => {});
      await client.delete(ep._id).catch(() => {});
    }
  }

  for (const p of posts) {
    const docId = `post-${p.slug}`;
    console.log(` -> Processing Blog Post: "${p.title}" (${p.slug})`);
    const coverRef = await uploadLocalImage(p.cover);

    const doc: Record<string, unknown> = {
      _id: docId,
      _type: "post",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      date: p.date,
      author: p.author,
      authorName: p.author,
      excerpt: p.excerpt,
      content: p.content,
      youtubeId: p.youtubeId || "",
      videoTitle: p.videoTitle || "",
      videoDescription: p.videoDescription || "",
      publishedAt: new Date(p.date || Date.now()).toISOString(),
    };
    if (coverRef) {
      doc.coverImage = coverRef;
    }

    await client.createOrReplace(doc as any);
    await client.delete(`drafts.${docId}`).catch(() => {});
  }

  console.log("\n=== SYNC COMPLETE ===");
  const finalStories = await client.fetch<Array<{ _id: string; name: string; slug: string }>>(
    `*[_type == "story"]{ _id, "name": coalesce(name, title), "slug": slug.current }`
  );
  console.log("Current Stories in Sanity:");
  console.table(finalStories);

  const finalPosts = await client.fetch<Array<{ _id: string; title: string; slug: string }>>(
    `*[_type == "post"]{ _id, title, "slug": slug.current }`
  );
  console.log("Current Posts in Sanity:");
  console.table(finalPosts);
}

main().catch(console.error);
