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

async function downloadGoogleDriveImage(fileId: string, destPath: string): Promise<boolean> {
  const candidateUrls = [
    `https://lh3.googleusercontent.com/d/${fileId}`,
    `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`,
    `https://drive.google.com/uc?export=download&id=${fileId}`,
  ];

  for (const url of candidateUrls) {
    try {
      console.log(`Attempting download from: ${url}`);
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
          console.log(`✓ Successfully downloaded ${buffer.length} bytes to ${destPath}`);
          return true;
        } else {
          console.warn(`URL returned non-image content (${buffer.length} bytes)`);
        }
      } else {
        console.warn(`Fetch returned status ${res.status} for ${url}`);
      }
    } catch (err: any) {
      console.warn(`Error fetching ${url}: ${err.message}`);
    }
  }
  return false;
}

async function uploadLocalImage(absPath: string, maxRetries = 5): Promise<any> {
  if (!fs.existsSync(absPath)) {
    console.warn(`File does not exist: ${absPath}`);
    return undefined;
  }

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Uploading ${path.basename(absPath)} (attempt ${attempt}/${maxRetries})...`);
      const stream = fs.createReadStream(absPath);
      const asset = await client.assets.upload("image", stream, {
        filename: path.basename(absPath),
      });
      return {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
      };
    } catch (err: any) {
      console.warn(`Attempt ${attempt} failed for ${absPath}: ${err.message}`);
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 2000 * attempt));
      }
    }
  }
  return undefined;
}

async function main() {
  console.log("=== UPDATING ENGLISH LANGUAGE & LITERACY SKILLS PROGRAM ===");

  // 1. Download Google Drive image
  const fileId = "1cuoImeWwFaioE5nnikSJS7t2ShY5EkHP";
  const destPath = path.resolve(clientPublicDir, "programs/english-why-it-matters.jpg");
  const downloaded = await downloadGoogleDriveImage(fileId, destPath);

  let assetRef: any = null;
  if (downloaded) {
    console.log("✓ Uploading downloaded image to Sanity...");
    assetRef = await uploadLocalImage(destPath);
  } else {
    console.warn("Could not download image from Google Drive automatically.");
  }

  // 2. Prepare media video for success story
  const successStoryVideo = {
    _key: "english-success-story-1",
    _type: "programMediaVideo",
    title: "English Language & Literacy Success Story: Unlocking Possibilities in Kakuma",
    outlet: "Success Story",
    youtubeId: "HoWTNc58HZg",
    url: "https://www.youtube.com/watch?v=HoWTNc58HZg",
    description:
      "Watch how English language training and digital literacy empower refugee students in Kakuma to overcome language barriers, unlock educational pathways, and build sustainable futures.",
  };

  const docId = "program-english-language-literacy";
  const patchData: any = {
    mediaVideos: [successStoryVideo],
  };

  if (assetRef) {
    patchData.whyItMattersImage = assetRef;
  }

  console.log("Patching document in Sanity:", docId);
  await client.patch(docId).set(patchData).commit();
  await client.delete(`drafts.${docId}`).catch(() => {});
  console.log("✓ Successfully updated Sanity document:", docId);

  const updatedDoc = await client.fetch<any>(
    `*[_type == "program" && _id == "${docId}"][0] {
      title,
      "whyItMattersImage": whyItMattersImage.asset->url,
      mediaVideos
    }`
  );
  console.log("Verified Sanity Document:", JSON.stringify(updatedDoc, null, 2));
}

main().catch(console.error);
