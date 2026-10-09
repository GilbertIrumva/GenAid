import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { createClient } from "@sanity/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const projectRoot = path.resolve(__dirname, "../..");
const clientPublicDir = path.resolve(projectRoot, "client/public");

const token = process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN;

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "fr1v7hol",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

async function downloadGoogleDriveImage(fileId: string, destPath: string): Promise<boolean> {
  const candidateUrls = [
    `https://lh3.googleusercontent.com/d/${fileId}`,
    `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`,
    `https://drive.google.com/uc?export=download&id=${fileId}`,
  ];

  for (const url of candidateUrls) {
    try {
      console.log(`Downloading image from: ${url}`);
      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        redirect: "follow",
      });

      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        const header = buffer.slice(0, 100).toString("utf8");
        if (!header.includes("<!DOCTYPE") && !header.includes("<html") && buffer.length > 3000) {
          fs.mkdirSync(path.dirname(destPath), { recursive: true });
          fs.writeFileSync(destPath, buffer);
          console.log(`✓ Downloaded ${buffer.length} bytes to ${destPath}`);
          return true;
        } else {
          console.warn(`URL returned non-image content (${buffer.length} bytes)`);
        }
      } else {
        console.warn(`Fetch returned status ${res.status} for ${url}`);
      }
    } catch (err: any) {
      console.warn(`Fetch error for ${url}: ${err.message}`);
    }
  }
  return false;
}

async function main() {
  console.log("--------------------------------------------------");
  console.log("Updating Strategic Impact Sourcing image & fields in Sanity...");
  console.log("--------------------------------------------------");

  const fileId = "1OQcpbrhngvrU7HoI7nkKKAqVxP-gqka_";
  const localDest = path.resolve(clientPublicDir, "gen jobs/strategic-impact-sourcing.jpg");

  const downloaded = await downloadGoogleDriveImage(fileId, localDest);
  if (!downloaded && !fs.existsSync(localDest)) {
    throw new Error("Could not download image from Google Drive!");
  }

  console.log("Uploading asset to Sanity...");
  const stream = fs.createReadStream(localDest);
  const asset = await client.assets.upload("image", stream, {
    filename: "strategic-impact-sourcing.jpg",
  });
  console.log("Uploaded asset ID:", asset._id);

  console.log("Patching jobsContent in Sanity...");
  const patchRes = await client
    .patch("jobsContent")
    .set({
      strategicImpactTag: "Strategic impact sourcing",
      strategicImpactImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
      },
      esgImpactImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
      },
    })
    .commit();

  console.log("Successfully patched jobsContent:", patchRes._id);
}

main().catch((err) => {
  console.error("Error in updateStrategicImpactImage:", err);
  process.exit(1);
});
