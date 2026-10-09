import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../..");
const clientPublicDir = path.resolve(projectRoot, "client/public");

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "fr1v7hol",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  apiVersion: "2024-03-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN,
});

async function main() {
  console.log("--------------------------------------------------");
  console.log("Uploading Hire Callout Image to Sanity and updating jobsContent...");
  console.log("--------------------------------------------------");

  const imageRelPath = "gen jobs/work-smarter-impact.jpg";
  const absPath = path.resolve(clientPublicDir, imageRelPath);

  if (!fs.existsSync(absPath)) {
    throw new Error(`File not found: ${absPath}`);
  }

  console.log(`Found image file at ${absPath}. Uploading asset to Sanity...`);
  const stream = fs.createReadStream(absPath);
  const asset = await client.assets.upload("image", stream, {
    filename: path.basename(absPath),
  });
  console.log(`Uploaded asset ID: ${asset._id}`);

  const calloutFields = {
    hireCalloutTag: "Why Hire With Us",
    hireCalloutTitle: "Work smarter, grow faster, and create meaningful global impact.",
    hireCalloutBody:
      "Hiring through Generation Jobs gives you access to loyal, highly trained digital talent with built-in oversight, managed infrastructure, and a 100% free Month 1 pilot.",
    hireCalloutImage: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    },
  };

  // Patch published jobsContent
  console.log("Patching published document 'jobsContent'...");
  await client
    .patch("jobsContent")
    .set(calloutFields)
    .commit();
  console.log("Successfully patched published 'jobsContent'!");

  // If there's a draft, either delete or patch it too
  const draftDoc = await client.getDocument("drafts.jobsContent");
  if (draftDoc) {
    console.log("Found drafts.jobsContent, patching draft document as well...");
    await client
      .patch("drafts.jobsContent")
      .set(calloutFields)
      .commit();
    console.log("Patched drafts.jobsContent!");
  }

  // Fetch and verify
  const updated = await client.fetch(
    `*[_id == "jobsContent"][0]{
      hireCalloutTag,
      hireCalloutTitle,
      hireCalloutBody,
      "hireCalloutImageUrl": hireCalloutImage.asset->url
    }`
  );
  console.log("\nVerified Updated Document:", JSON.stringify(updated, null, 2));
  console.log("\nDone! Sanity jobsContent schema & image successfully synced.");
}

main().catch((err) => {
  console.error("Error updating Sanity callout:", err);
  process.exit(1);
});
