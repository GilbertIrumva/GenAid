import { createClient } from "@sanity/client";
import dotenv from "dotenv";
dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "fr1v7hol",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  apiVersion: "2024-03-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function main() {
  console.log("=== SYNCING ALL 8 VIDEOS TO SANITY ===");
  const { videos } = await import("../../client/src/data/videos");
  console.log(`Found ${videos.length} videos to sync.`);

  for (const v of videos) {
    const slugValue = v.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const docId = `video-${slugValue}`;

    const doc: Record<string, unknown> = {
      _id: docId,
      _type: "video",
      title: v.title,
      slug: { _type: "slug", current: slugValue },
      description: v.description,
      source: v.youtubeId ? "youtube" : "url",
      youtubeId: v.youtubeId || undefined,
      videoUrl: v.videoUrl || (v.youtubeId ? `https://www.youtube.com/watch?v=${v.youtubeId}` : ""),
      publishedAt: new Date().toISOString(),
    };

    await client.createOrReplace(doc as any);
    await client.delete(`drafts.${docId}`).catch(() => {});
    console.log(`✓ Synced video: "${v.title}" (${docId})`);
  }

  console.log("\n=== ALL VIDEOS SYNCED TO SANITY ===");
}

main().catch(console.error);
