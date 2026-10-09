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
  console.log("=== COMPREHENSIVE SANITY PROGRAMS & SCHEMA AUDIT ===");

  const programs = await client.fetch<any[]>(
    `*[_type == "program"] | order(_createdAt asc) {
      _id,
      title,
      "slug": slug.current,
      "hasWhyItMattersImage": defined(whyItMattersImage),
      "hasHeroImage": defined(heroImage),
      "mediaVideosCount": count(mediaVideos),
      "componentsCount": count(components),
      "componentsWithUrl": count(components[defined(url)]),
      "hasSpecialHighlight": defined(specialHighlight),
      "highlightUrl": specialHighlight.url,
      "connectLinksCount": count(connectLinks),
      gallery
    }`
  );

  console.log(`Found ${programs.length} programs in Sanity:`);
  for (const p of programs) {
    console.log(`\n• [${p._id}] "${p.title}" (slug: ${p.slug})`);
    console.log(`  - whyItMattersImage: ${p.hasWhyItMattersImage ? "✓ YES" : "none"}`);
    console.log(`  - mediaVideos count: ${p.mediaVideosCount || 0}`);
    console.log(`  - components count: ${p.componentsCount || 0} (${p.componentsWithUrl || 0} have links)`);
    if (p.hasSpecialHighlight) {
      console.log(`  - specialHighlight link: ${p.highlightUrl || "none"}`);
    }
    if (p.connectLinksCount) {
      console.log(`  - connectLinks count: ${p.connectLinksCount}`);
    }

    // Check if gallery items all have _key
    if (Array.isArray(p.gallery)) {
      const missingKeys = p.gallery.filter((g: any) => !g._key);
      if (missingKeys.length > 0) {
        console.warn(`  ⚠️ Warning: ${missingKeys.length} gallery items missing _key`);
      } else {
        console.log(`  - gallery: ${p.gallery.length} items (all keyed ✓)`);
      }
    }
  }

  // Check drafts
  const drafts = await client.fetch<any[]>(`*[_id in path("drafts.**")] { _id }`);
  console.log(`\nActive drafts count: ${drafts.length}`);
  for (const d of drafts) {
    console.log(`  - Draft: ${d._id}`);
  }

  console.log("\n=== AUDIT COMPLETE ===");
}

main().catch(console.error);
