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
  console.log("=== 1. DOWNLOADING NEW HERO IMAGE ===");
  const heroDest = path.resolve(clientPublicDir, "programs/Women in digital skills hero.jpg");
  const heroAltDest = path.resolve(clientPublicDir, "programs/Women in digital skills (1).jpg");
  const heroFileId = "1HX8SlB6kGNDZnlFAj5LexjRKFE0loVZy";
  const okHero = await downloadGoogleDriveImage(heroFileId, heroDest);
  if (okHero) {
    fs.copyFileSync(heroDest, heroAltDest);
    console.log(`✓ Hero image saved to ${heroDest} and copied to ${heroAltDest}`);
  } else {
    console.error("Failed to download Hero image!");
  }

  console.log("\n=== 2. DOWNLOADING 'WHY THIS INITIATIVE MATTERS' IMAGE ===");
  const whyDest = path.resolve(clientPublicDir, "programs/Women in digital skills why-it-matters.jpg");
  const whyAltDest = path.resolve(clientPublicDir, "programs/Women in digital skills (2).jpg");
  const whyFileId = "11nvxMFuLAk6cvvRc_cyihMVa52iarz-o/view".replace(/\/view$/, "");
  const okWhy = await downloadGoogleDriveImage(whyFileId, whyDest);
  if (okWhy) {
    fs.copyFileSync(whyDest, whyAltDest);
    console.log(`✓ Why It Matters image saved to ${whyDest} and copied to ${whyAltDest}`);
  } else {
    console.error("Failed to download Why It Matters image!");
  }

  console.log("\n=== 3. UPLOADING ASSETS TO SANITY ===");
  let heroAssetRef = undefined;
  if (okHero) {
    heroAssetRef = await uploadLocalImage(heroDest);
    console.log("✓ Hero image uploaded to Sanity:", heroAssetRef?.asset?._ref);
  }

  let whyAssetRef = undefined;
  if (okWhy) {
    whyAssetRef = await uploadLocalImage(whyDest);
    console.log("✓ Why It Matters image uploaded to Sanity:", whyAssetRef?.asset?._ref);
  }

  console.log("\n=== 4. PATCHING SANITY PROGRAM DOCUMENT ===");
  const docId = "program-womens-digital-skills";
  const patch = client.patch(docId);

  if (heroAssetRef) {
    patch.set({
      image: heroAssetRef,
      heroImage: heroAssetRef,
    });
  }

  if (whyAssetRef) {
    patch.set({
      whyItMattersImage: whyAssetRef,
    });
  }

  // Update gallery so [0] is hero and [1] is whyItMatters
  const existingDoc = await client.getDocument(docId) as any;
  const currentGallery: any[] = existingDoc?.gallery || [];
  const newGallery: any[] = [];
  if (heroAssetRef) newGallery.push(heroAssetRef);
  if (whyAssetRef) newGallery.push(whyAssetRef);
  // Keep subsequent gallery images
  if (currentGallery.length > 2) {
    for (let i = 2; i < currentGallery.length; i++) {
      newGallery.push(currentGallery[i]);
    }
  }

  if (newGallery.length > 0) {
    patch.set({ gallery: newGallery });
  }

  await patch.commit();
  await client.delete(`drafts.${docId}`).catch(() => {});
  console.log(`✓ Patched ${docId} with heroImage, whyItMattersImage, image, and updated gallery!`);

  console.log("\n=== 5. VERIFYING PROGRAM IN SANITY ===");
  const verified = await client.fetch<any>(
    `*[_type == "program" && _id == "${docId}"][0] {
      _id,
      title,
      "image": image.asset->url,
      "heroImage": heroImage.asset->url,
      "whyItMattersImage": whyItMattersImage.asset->url,
      "gallery": gallery[].asset->url
    }`
  );
  console.log("Verified Document in Sanity:", verified);

  console.log("\n=== ALL COMPLETED SUCCESSFULLY! ===");
}

main().catch(console.error);
