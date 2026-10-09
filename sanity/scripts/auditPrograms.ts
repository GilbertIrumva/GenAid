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
  const docs = await client.fetch(`*[_type == "program"]`);
  console.log(`Found ${docs.length} program documents.`);
  for (const doc of docs) {
    console.log(`\nDoc: ${doc._id} (${doc.title})`);
    console.log(`- type of body:`, Array.isArray(doc.body) ? "ARRAY OF BLOCKS" : typeof doc.body);
    console.log(`- image:`, doc.image ? (typeof doc.image === "object" ? "object" : typeof doc.image) : "none");
    console.log(`- gallery:`, Array.isArray(doc.gallery) ? `array of ${doc.gallery.length}` : typeof doc.gallery);
    console.log(`- slug:`, doc.slug?.current || doc.slug);
  }
}

main();
