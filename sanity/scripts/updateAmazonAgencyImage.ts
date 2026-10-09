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
  console.log("Uploading Amazon Growth Agency Image to Sanity and updating jobsContent...");
  console.log("--------------------------------------------------");

  const imageRelPath = "gen jobs/amazon-growth-agency.jpg";
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

  const agencyFields = {
    amazonAgencyTag: "FOR FULL AMAZON GROWTH AGENCY",
    amazonAgencyTitle: "Specialized Support for Amazon Growth Agencies",
    amazonAgencySubtitle:
      "Are you a full channel Amazon Growth Agency founded to help brands scale profitably through advertising, creative optimization, and marketplace strategy?",
    amazonAgencyBody:
      "We got you covered too. We specialize in researching and finding brands/suppliers that agencies like yours would be excited to work with.",
    amazonAgencyImage: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    },
  };

  console.log("Patching published document 'jobsContent'...");
  await client.patch("jobsContent").set(agencyFields).commit();
  console.log("Successfully patched published 'jobsContent'!");

  const draftDoc = await client.getDocument("drafts.jobsContent");
  if (draftDoc) {
    console.log("Found drafts.jobsContent, patching draft document as well...");
    await client.patch("drafts.jobsContent").set(agencyFields).commit();
    console.log("Patched drafts.jobsContent!");
  }

  const updated = await client.fetch(
    `*[_id == "jobsContent"][0]{
      amazonAgencyTitle,
      "amazonAgencyImageUrl": amazonAgencyImage.asset->url
    }`
  );
  console.log("\nVerified Updated Document:", JSON.stringify(updated, null, 2));
  console.log("\nDone! Sanity jobsContent Amazon Agency schema & image successfully synced.");
}

main().catch((err) => {
  console.error("Error updating Sanity Amazon Agency:", err);
  process.exit(1);
});
