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
  console.log("=== TESTING PROGRAM FETCH ===");
  try {
    const list = await client.fetch(`*[_type == "program"] | order(_createdAt desc) [0...30] {
      _id,
      _type,
      title,
      category,
      "media": image.asset->url
    }`);
    console.log(`Successfully fetched ${list.length} programs!`);
    list.forEach((p: any) => console.log(`- [${p._id}] ${p.title} (${p.category})`));
  } catch (err: any) {
    console.error("GROQ fetch failed:", err);
  }
}

main();
