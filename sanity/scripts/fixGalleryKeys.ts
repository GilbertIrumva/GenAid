import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "fr1v7hol",
  dataset: process.env.SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: "2023-01-01",
});

function generateKey(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 12);
}

async function retry<T>(fn: () => Promise<T>, retries = 5, delay = 1000): Promise<T> {
  let lastError: any;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      lastError = err;
      console.warn(`    ⚠️ Attempt ${i + 1} failed: ${err.message}. Retrying in ${delay}ms...`);
      await new Promise((r) => setTimeout(r, delay));
      delay *= 1.5;
    }
  }
  throw lastError;
}

async function fixGalleryKeys() {
  console.log("=== FIXING MISSING KEYS IN SANITY GALLERIES ===");

  // Fetch all program documents
  const programs = await client.fetch<any[]>(`*[_type == "program"]{ _id, title, gallery }`);
  console.log(`Found ${programs.length} program documents.`);

  for (const prog of programs) {
    if (!prog.gallery || !Array.isArray(prog.gallery) || prog.gallery.length === 0) {
      continue;
    }

    let needsUpdate = false;
    const updatedGallery = prog.gallery.map((item: any) => {
      if (!item._key) {
        needsUpdate = true;
        return {
          ...item,
          _key: generateKey(),
        };
      }
      return item;
    });

    if (needsUpdate) {
      console.log(`Fixing missing keys in "${prog.title}" (${prog._id})...`);
      
      await retry(() =>
        client
          .patch(prog._id)
          .set({ gallery: updatedGallery })
          .commit()
      );

      // Also remove any draft document that might have the old stale array without keys
      await client.delete(`drafts.${prog._id}`).catch(() => {});

      console.log(`✓ Successfully updated gallery with unique keys for "${prog.title}"!`);
    } else {
      console.log(`✓ "${prog.title}" gallery already has valid keys.`);
    }
  }

  // Also check if any cause or other documents have gallery fields
  const causes = await client.fetch<any[]>(`*[_type == "cause"]{ _id, title, gallery }`);
  for (const cause of causes) {
    if (!cause.gallery || !Array.isArray(cause.gallery) || cause.gallery.length === 0) {
      continue;
    }

    let needsUpdate = false;
    const updatedGallery = cause.gallery.map((item: any) => {
      if (!item._key) {
        needsUpdate = true;
        return {
          ...item,
          _key: generateKey(),
        };
      }
      return item;
    });

    if (needsUpdate) {
      console.log(`Fixing missing keys in cause "${cause.title}" (${cause._id})...`);
      await client
        .patch(cause._id)
        .set({ gallery: updatedGallery })
        .commit();
      await client.delete(`drafts.${cause._id}`).catch(() => {});
      console.log(`✓ Successfully updated gallery with unique keys for "${cause.title}"!`);
    }
  }

  console.log("\n=== ALL GALLERIES VERIFIED AND FIXED! ===");
}

fixGalleryKeys().catch((err) => {
  console.error("Error fixing gallery keys:", err);
  process.exit(1);
});
