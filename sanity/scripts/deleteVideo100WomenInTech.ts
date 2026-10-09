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
  console.log("=== REMOVING 100 WOMEN IN TECH VIDEO FROM SANITY ===");
  const docId = "video-100-women-in-tech-overcoming-hurdles-in-kakuma";

  await client.delete(docId).catch((err) => console.log("Not found or deleted:", err.message));
  await client.delete(`drafts.${docId}`).catch(() => {});
  console.log(`✓ Deleted ${docId} and its draft from Sanity.`);
}

main().catch(console.error);
