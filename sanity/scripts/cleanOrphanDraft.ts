import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "fr1v7hol",
  dataset: process.env.SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: "2023-01-01",
});

async function main() {
  console.log("=== CLEANING ORPHAN DRAFT ===");
  try {
    await client.delete("drafts.program-digital-livelihood-program");
    console.log("✓ Successfully deleted orphan corrupted draft: drafts.program-digital-livelihood-program");
  } catch (e: any) {
    console.log("Note on delete:", e.message);
  }

  // Also verify that the GROQ query used by Sanity Studio documentList executes with 0 errors
  const query = `*[_type == "program"] | order(_createdAt desc) [0...30] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    category,
    image
  }`;

  const res = await client.fetch(query);
  console.log(`✓ GROQ query executed cleanly! Retrieved ${res.length} programs.`);
  res.forEach((r: any) => console.log(`  - ${r.title} (${r._id})`));
}

main().catch(console.error);
