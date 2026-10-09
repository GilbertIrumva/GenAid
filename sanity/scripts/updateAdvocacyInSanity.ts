import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import crypto from "crypto";

dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "fr1v7hol",
  dataset: process.env.SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: "2023-01-01",
});

function generateKey(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 12);
}

async function retry<T>(fn: () => Promise<T>, retries = 5, delay = 1000): Promise<T> {
  let lastError: any;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      lastError = err;
      console.warn(`    ⚠️ [Attempt ${i + 1}/${retries} failed: ${err.message}]. Retrying in ${delay}ms...`);
      await new Promise((r) => setTimeout(r, delay));
      delay *= 1.5;
    }
  }
  throw lastError;
}

async function downloadGoogleDriveFile(fileId: string, destPath: string): Promise<boolean> {
  const urls = [
    `https://lh3.googleusercontent.com/d/${fileId}`,
    `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`,
    `https://drive.google.com/uc?export=download&id=${fileId}`,
  ];

  for (const url of urls) {
    try {
      console.log(`Attempting download from: ${url}`);
      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      });

      if (!res.ok) {
        console.warn(`HTTP ${res.status} from ${url}`);
        continue;
      }

      const buffer = Buffer.from(await res.arrayBuffer());
      if (buffer.length < 5000) {
        const text = buffer.toString("utf-8");
        if (text.includes("<!DOCTYPE html") || text.includes("<html")) {
          console.warn(`Got HTML page instead of image from ${url}`);
          continue;
        }
      }

      fs.writeFileSync(destPath, buffer);
      console.log(`✓ Successfully downloaded ${buffer.length} bytes to ${destPath}`);
      return true;
    } catch (e: any) {
      console.warn(`Error fetching ${url}:`, e?.message || e);
    }
  }
  return false;
}

async function uploadLocalImage(absPath: string) {
  return retry(async () => {
    const stream = fs.createReadStream(absPath);
    const assetDocument = await client.assets.upload("image", stream, {
      filename: path.basename(absPath),
    });
    return {
      _type: "image",
      _key: generateKey(),
      asset: {
        _type: "reference",
        _ref: assetDocument._id,
      },
    };
  }, 5, 2000);
}

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log("=== 1. DOWNLOADING HUBERT CONNECT IMAGE ===");
  const fileId = "18NVeROqFdPfWsBkWpfIM-AZ-6JkbRvNc";
  const clientPublicDir = path.resolve(__dirname, "../../client/public/programs");
  const destPath = path.join(clientPublicDir, "Hubert connect.jpg");
  const destCopy = path.join(clientPublicDir, "GL advocacy (2).jpg");

  const downloaded = await downloadGoogleDriveFile(fileId, destPath);
  if (!downloaded) {
    console.error("Failed to download image from Google Drive!");
  } else {
    fs.copyFileSync(destPath, destCopy);
    console.log(`✓ Copied image to ${destCopy}`);
  }

  console.log("\n=== 2. UPLOADING IMAGE TO SANITY ===");
  let gainsAssetRef: any = undefined;
  if (fs.existsSync(destPath)) {
    gainsAssetRef = await uploadLocalImage(destPath);
    console.log("✓ Uploaded gains image asset to Sanity:", gainsAssetRef?.asset?._ref);
  }

  console.log("\n=== 3. PATCHING SANITY ADVOCACY DOCUMENT ===");
  const docId = "program-advocacy";
  const patch = client.patch(docId);

  // New quote
  const quoteText =
    "“ I advocate for refugees because I am one of them. I know what it feels like to flee home, lose so much, arrive in a refugee camp, and still carry dreams for a better future. I have experienced how displacement can limit opportunities, but I have also seen the incredible talent and resilience within refugee communities. That is why I use my journey and my voice to open doors for others so being a refugee never means giving up on your dreams.”";

  patch.set({
    quote: {
      text: quoteText,
      author: "Hubert Senga",
      role: "Founder & CEO, Generation Aid",
    },
    gainsTitle: "Want to Connect with Hubert?",
    connectLinks: [
      {
        _key: generateKey(),
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/hubert-sengap/",
        icon: "linkedin",
      },
      {
        _key: generateKey(),
        label: "Facebook",
        url: "https://www.facebook.com/people/Hubert-Pridjoh/61552635191538/",
        icon: "facebook",
      },
      {
        _key: generateKey(),
        label: "Instagram",
        url: "https://www.instagram.com/hubertprigon/",
        icon: "instagram",
      },
      {
        _key: generateKey(),
        label: "Email Me",
        url: "mailto:info@generationaid.org",
        icon: "email",
      },
      {
        _key: generateKey(),
        label: "Read My Articles",
        url: "https://www.linkedin.com/in/hubert-sengap/recent-activity/articles/",
        icon: "article",
      },
    ],
    features: [
      "LinkedIn: Hubert Senga",
      "Facebook: Hubert Pridjoh",
      "Instagram: @hubertprigon",
      "Email Me: info@generationaid.org",
      "Read My Articles (LinkedIn Articles)",
    ],
    gains: [
      "LinkedIn: Hubert Senga",
      "Facebook: Hubert Pridjoh",
      "Instagram: @hubertprigon",
      "Email Me: info@generationaid.org",
      "Read My Articles (LinkedIn Articles)",
    ],
  });

  if (gainsAssetRef) {
    patch.set({
      gainsImage: gainsAssetRef,
    });

    // Also update the document's gallery array
    const existingDoc = (await client.getDocument(docId)) as any;
    const currentGallery: any[] = existingDoc?.gallery || [];
    const newGallery: any[] = [];
    if (currentGallery[0]) newGallery.push(currentGallery[0]);
    newGallery.push(gainsAssetRef);
    for (let i = 2; i < currentGallery.length; i++) {
      newGallery.push(currentGallery[i]);
    }
    patch.set({ gallery: newGallery });
  }

  await retry(() => patch.commit());
  await client.delete(`drafts.${docId}`).catch(() => {});
  console.log(`✓ Successfully patched ${docId} in Sanity and cleared draft!`);

  console.log("\n=== 4. VERIFYING DOCUMENT IN SANITY ===");
  const verified = await client.fetch<any>(
    `*[_type == "program" && _id == "${docId}"][0] {
      _id,
      title,
      quote,
      gainsTitle,
      "gainsImage": gainsImage.asset->url,
      connectLinks
    }`
  );
  console.log("Verified Document:", JSON.stringify(verified, null, 2));

  console.log("\n=== ALL COMPLETED SUCCESSFULLY! ===");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
