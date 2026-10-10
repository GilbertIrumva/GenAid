import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "fr1v7hol",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  apiVersion: "2024-03-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN,
});

async function main() {
  console.log("Updating amazonAgencyCapabilities in Sanity jobsContent...");

  const capabilities = [
    "Brand & Supplier Prospecting",
    "Catalog Health & Compliance",
    "Full catalog operations and inventory health",
    "Sponsored Ads monitoring and daily optimizations",
    "Cross-functional operational execution without silos",
  ];

  console.log("Patching published document 'jobsContent'...");
  await client.patch("jobsContent").set({ amazonAgencyCapabilities: capabilities }).commit();
  console.log("Successfully patched published 'jobsContent'!");

  const draftDoc = await client.getDocument("drafts.jobsContent");
  if (draftDoc) {
    console.log("Found drafts.jobsContent, patching draft document as well...");
    await client.patch("drafts.jobsContent").set({ amazonAgencyCapabilities: capabilities }).commit();
    console.log("Patched drafts.jobsContent!");
  }

  const updated = await client.fetch(
    `*[_id == "jobsContent"][0]{
      amazonAgencyTitle,
      amazonAgencyCapabilities
    }`
  );
  console.log("\nVerified Updated Document in Sanity:", JSON.stringify(updated, null, 2));
}

main().catch((err) => {
  console.error("Error updating capabilities:", err);
  process.exit(1);
});
