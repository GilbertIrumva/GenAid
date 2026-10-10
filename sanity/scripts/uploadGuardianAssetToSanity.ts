import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagePath = path.resolve(__dirname, "../../client/public/blog/guardian-kakuma-workspace.jpg");

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "fr1v7hol",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  apiVersion: "2024-03-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN,
});

async function main() {
  console.log("Uploading Guardian cover image to Sanity assets from:", imagePath);
  const stream = fs.createReadStream(imagePath);
  const asset = await client.assets.upload("image", stream, {
    filename: "guardian-kakuma-workspace.jpg",
  });
  console.log("Uploaded asset ID:", asset._id);

  const postId = "post-someone-else-will-do-it-for-less";
  console.log("Patching post:", postId);

  await client
    .patch(postId)
    .set({
      coverImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
      },
    })
    .commit();

  console.log("Successfully patched Sanity post with coverImage asset!");
}

main().catch((err) => {
  console.error("Error uploading to Sanity:", err);
  process.exit(1);
});
