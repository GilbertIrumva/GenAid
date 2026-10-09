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
  token: process.env.SANITY_API_TOKEN,
});

async function main() {
  console.log("=== UPDATING COVER FOR 109 STUDENTS ENGLISH TRAINING BLOG ===");

  const blogDir = path.resolve(clientPublicDir, "blog");
  fs.mkdirSync(blogDir, { recursive: true });

  const coverDest = path.resolve(blogDir, "english-class-109-students-cover.jpg");
  const localSource = path.resolve(clientPublicDir, "1783952220038.jpeg");

  if (fs.existsSync(localSource)) {
    fs.copyFileSync(localSource, coverDest);
    console.log(`✓ Copied authentic classroom photo (${fs.statSync(coverDest).size} bytes) to ${coverDest}`);
  } else {
    throw new Error(`Source photo not found at ${localSource}`);
  }

  // Upload to Sanity
  console.log("Uploading cover asset to Sanity...");
  const stream = fs.createReadStream(coverDest);
  const asset = await client.assets.upload("image", stream, {
    filename: "english-class-109-students-cover.jpg",
  });
  console.log(`✓ Asset uploaded to Sanity: ${asset._id}`);

  // Patch blog post document
  const postDocId = "post-unlocking-possibilities-english-class-kakuma";
  const postPatch = client.patch(postDocId).set({
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    },
  });
  await postPatch.commit();
  console.log(`✓ Successfully patched ${postDocId} in Sanity with coverImage!`);

  // Also patch story document if it exists
  const storyDocId = "story-unlocking-possibilities-english-class-kakuma";
  const storyDoc = await client.getDocument(storyDocId);
  if (storyDoc) {
    await client
      .patch(storyDocId)
      .set({
        image: {
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
        },
        coverImage: {
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
        },
      })
      .commit();
    console.log(`✓ Also patched story document ${storyDocId} with image in Sanity`);
  }

  console.log("\n=== ALL DONE ===");
}

main().catch(console.error);
