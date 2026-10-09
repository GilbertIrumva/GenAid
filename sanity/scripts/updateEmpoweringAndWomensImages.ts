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
  console.log("=== 1. DOWNLOADING EMPOWERING REFUGEES CAUSE PHOTO ===");
  const empoweringDest = path.resolve(clientPublicDir, "img/causes/hub.jpg");
  const empoweringFileId = "1qDl9fK7OQ3rjHu0hXPpAIZd7Jf79H3mI";
  const ok1 = await downloadGoogleDriveImage(empoweringFileId, empoweringDest);
  if (!ok1) {
    console.error("Failed to download Empowering Refugees image from Google Drive.");
  } else {
    console.log(`✓ Saved new photo to ${empoweringDest} (${fs.statSync(empoweringDest).size} bytes)`);
  }

  console.log("\n=== 2. DOWNLOADING WOMEN'S DIGITAL SKILLS PROGRAM PHOTO ===");
  const womensDest = path.resolve(clientPublicDir, "programs/Women in digital skills (1).jpg");
  const womensFileId = "1_XrtwPKyW8IGry15Rf-5o-FxLUQZNsnh";
  const ok2 = await downloadGoogleDriveImage(womensFileId, womensDest);
  if (!ok2) {
    console.error("Failed to download Women's Digital Skills image from Google Drive.");
  } else {
    console.log(`✓ Saved new photo to ${womensDest} (${fs.statSync(womensDest).size} bytes)`);
  }

  console.log("\n=== 3. UPLOADING & ATTACHING TO SANITY ===");
  if (ok1) {
    console.log("Uploading Empowering Refugees photo to Sanity...");
    const assetRef1 = await uploadLocalImage(empoweringDest);
    if (assetRef1) {
      await client
        .patch("cause-empoweringRefugees")
        .set({ image: assetRef1 })
        .commit();
      await client.delete("drafts.cause-empoweringRefugees").catch(() => {});
      console.log("✓ Attached new cover image to cause-empoweringRefugees in Sanity!");
    }
  }

  if (ok2) {
    console.log("Uploading Women's Digital Skills photo to Sanity...");
    const assetRef2 = await uploadLocalImage(womensDest);
    if (assetRef2) {
      await client
        .patch("program-womens-digital-skills")
        .set({ image: assetRef2 })
        .commit();
      await client.delete("drafts.program-womens-digital-skills").catch(() => {});
      console.log("✓ Attached new cover image to program-womens-digital-skills in Sanity!");
    }
  }

  console.log("\n=== 4. VERIFYING IN SANITY ===");
  const causeDoc = await client.fetch<any>(
    `*[_type == "cause" && _id == "cause-empoweringRefugees"][0] { _id, title, "image": image.asset->url }`
  );
  console.log("Cause:", causeDoc);

  const progDoc = await client.fetch<any>(
    `*[_type == "program" && _id == "program-womens-digital-skills"][0] { _id, title, "image": image.asset->url }`
  );
  console.log("Program:", progDoc);

  console.log("\n=== ALL DONE! ===");
}

main().catch(console.error);
