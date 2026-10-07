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
  console.log("=== MOVING 'UNLOCKING POSSIBILITIES' TO BLOG & FEATURING AKIA ABIL ===");

  // 1. Fetch unlocking possibilities story
  const st = await client.getDocument("story-unlocking-possibilities-english-class-kakuma");
  if (st) {
    console.log("Converting 'Unlocking New Possibilities' from Story to Blog Post...");
    await client.createOrReplace({
      _id: "post-unlocking-possibilities-english-class-kakuma",
      _type: "post",
      title: st.title || st.name || "Unlocking New Possibilities: 109 Students in English Training",
      slug: { _type: "slug", current: "unlocking-possibilities-english-class-kakuma" },
      date: "February 15, 2026",
      author: "Generation Aid",
      authorName: "Generation Aid",
      excerpt: st.excerpt,
      content: st.content,
      coverImage: st.image || st.coverImage,
      publishedAt: "2026-02-15T00:00:00.000Z",
    });
    console.log("Created blog post. Deleting from stories...");
    await client.delete("story-unlocking-possibilities-english-class-kakuma");
    await client.delete("drafts.story-unlocking-possibilities-english-class-kakuma").catch(() => {});
  }

  // 2. Ensure Akia Abil is explicitly the #1 Featured Story with latest publishedAt
  const akia = await client.getDocument("story-from-skills-to-earning-success-story");
  if (akia) {
    console.log("Promoting Akia Abil to #1 Featured Story...");
    await client.patch("story-from-skills-to-earning-success-story")
      .set({ publishedAt: new Date(Date.now() + 100000000).toISOString() })
      .commit();
  }

  console.log("\nCurrent Stories in Sanity:");
  const stories = await client.fetch<Array<{ _id: string; name?: string; title?: string; publishedAt?: string }>>(
    `*[_type == "story"] | order(publishedAt desc){ _id, name, title, publishedAt }`
  );
  console.table(stories);

  console.log("\nCurrent Blog Posts in Sanity:");
  const posts = await client.fetch<Array<{ _id: string; title: string; slug: string }>>(
    `*[_type == "post"] | order(publishedAt desc){ _id, title, "slug": slug.current }`
  );
  console.table(posts);
}

main().catch(console.error);
