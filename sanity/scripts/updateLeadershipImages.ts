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

async function uploadLocal(relPath: string) {
  const absPath = path.resolve(clientPublicDir, relPath);
  if (!fs.existsSync(absPath)) {
    throw new Error(`File not found: ${absPath}`);
  }
  console.log(`Uploading ${relPath} (${fs.statSync(absPath).size} bytes)...`);
  const stream = fs.createReadStream(absPath);
  const asset = await client.assets.upload("image", stream, {
    filename: path.basename(absPath),
  });
  console.log(`Uploaded ${relPath} => Asset ID: ${asset._id}`);
  return {
    _type: "image" as const,
    asset: {
      _type: "reference" as const,
      _ref: asset._id,
    },
  };
}

async function main() {
  console.log("--------------------------------------------------");
  console.log("Updating Leadership Dual Images in Sanity...");
  console.log("--------------------------------------------------");

  const img1Ref = await uploadLocal("gen jobs/IMG-20260318-WA0031 - Copy.jpg");
  const img2Ref = await uploadLocal("gen jobs/hubert-leadership-partnership.jpg");

  const fields = {
    leadershipTitle: "Rooted in Kakuma, built for global collaboration.",
    leadershipBody:
      "Generation Jobs, founded by Hubert Senga under Generation Aid, is Generation Aid’s employment and sustainability arm connecting skilled refugees and host-community professionals to global work while generating revenue to strengthen the organization’s long-term sustainability. Generation Aid and Generation Jobs combine local trust, authentic leadership, and global execution standards.",
    leadershipImage: img1Ref,
    leadershipImageSecondary: img2Ref,
  };

  console.log("Patching 'jobsContent' in Sanity...");
  await client.patch("jobsContent").set(fields).commit();
  console.log("Successfully patched published 'jobsContent'!");

  const draftDoc = await client.getDocument("drafts.jobsContent");
  if (draftDoc) {
    console.log("Patching 'drafts.jobsContent'...");
    await client.patch("drafts.jobsContent").set(fields).commit();
    console.log("Patched draft document!");
  }

  const result = await client.fetch(
    `*[_id == "jobsContent"][0]{
      leadershipTitle,
      "leadershipImageUrl": leadershipImage.asset->url,
      "leadershipImageSecondaryUrl": leadershipImageSecondary.asset->url
    }`
  );

  console.log("\nVerified Updated Document:", JSON.stringify(result, null, 2));
  console.log("\nDone! Both images are uploaded and configured in Sanity.");
}

main().catch((err) => {
  console.error("Error updating leadership images:", err);
  process.exit(1);
});
