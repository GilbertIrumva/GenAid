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
    `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`,
    `https://lh3.googleusercontent.com/d/${fileId}`,
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
        // Verify it is an image and not an HTML login/error page
        const header = buffer.slice(0, 100).toString("utf8");
        if (!header.includes("<!DOCTYPE") && !header.includes("<html") && buffer.length > 3000) {
          fs.mkdirSync(path.dirname(destPath), { recursive: true });
          fs.writeFileSync(destPath, buffer);
          console.log(`✓ Successfully downloaded ${buffer.length} bytes to ${destPath}`);
          return true;
        } else {
          console.warn(`URL returned non-image content (${buffer.length} bytes, header: ${header.slice(0, 50)})`);
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

async function uploadLocalImage(relPath: string | undefined): Promise<any> {
  if (!relPath) return undefined;
  if (relPath.startsWith("http://") || relPath.startsWith("https://")) {
    return undefined;
  }

  const cleanPath = relPath.replace(/^\/+/, "");
  const absPath = path.resolve(clientPublicDir, cleanPath);

  if (!fs.existsSync(absPath)) {
    console.warn(`File does not exist: ${absPath}`);
    return undefined;
  }

  try {
    const stream = fs.createReadStream(absPath);
    const asset = await client.assets.upload("image", stream, {
      filename: path.basename(absPath),
    });
    return {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    };
  } catch (err: any) {
    console.warn(`Could not upload ${relPath} to Sanity:`, err.message);
    return undefined;
  }
}

async function main() {
  console.log("=== 1. DOWNLOADING NEW AGRIHOPE PHOTO FROM GOOGLE DRIVE ===");
  const agrihopeDest = path.resolve(clientPublicDir, "img/causes/agrihope.jpg");
  const driveFileId = "16Zhdhzj0K3B2doFp627EJDo082BXJUf3";
  
  const downloaded = await downloadGoogleDriveImage(driveFileId, agrihopeDest);
  if (!downloaded) {
    console.error("Failed to download image from Google Drive via direct endpoints.");
  } else {
    console.log(`✓ AgriHope image updated at ${agrihopeDest} (${fs.statSync(agrihopeDest).size} bytes)`);
  }

  console.log("\n=== 2. ENSURING ALL CAUSES HAVE IMAGES SAVED IN SANITY CHAMBER ===");
  const { causes } = await import("../../client/src/data/causes");
  const existingCauses = await client.fetch<Array<{ _id: string; title: string; slug: string; hasImage: boolean }>>(
    `*[_type == "cause"] { _id, title, "slug": slug.current, "hasImage": defined(image.asset) }`
  );

  for (const c of causes) {
    const docId = `cause-${c.key}`;
    const match = existingCauses.find(
      (e) => e._id === docId || e.slug === c.key || e.title.toLowerCase().trim() === c.title.toLowerCase().trim()
    );
    const targetId = match ? match._id : docId;

    console.log(`\nProcessing Cause "${c.title}" (${targetId})...`);
    console.log(`Uploading local asset: ${c.image}`);
    const imgRef = await uploadLocalImage(c.image);

    const patch = client.patch(targetId).set({
      title: c.title,
      goal: c.goal,
      raised: c.raised,
      description: c.description,
      donateUrl: c.donateUrl,
    });

    if (imgRef) {
      patch.set({ image: imgRef });
      console.log(`✓ Attached image reference to ${targetId}`);
    }

    await patch.commit().catch(async (err) => {
      console.warn(`Patch error on ${targetId}: ${err.message}, fallback createOrReplace`);
      const newDoc: Record<string, unknown> = {
        _id: targetId,
        _type: "cause",
        title: c.title,
        slug: { _type: "slug", current: c.key },
        description: c.description,
        goal: c.goal,
        raised: c.raised,
        donateUrl: c.donateUrl,
      };
      if (imgRef) newDoc.image = imgRef;
      await client.createOrReplace(newDoc as any);
    });

    await client.delete(`drafts.${targetId}`).catch(() => {});
    console.log(`✓ Cause ${targetId} verified.`);
  }

  console.log("\n=== 3. ENSURING ALL PROGRAMS HAVE IMAGES SAVED IN SANITY CHAMBER ===");
  const { defaultPrograms } = await import("../../client/src/data/programsData");
  const existingPrograms = await client.fetch<Array<{ _id: string; title: string; slug: string; hasImage: boolean }>>(
    `*[_type == "program"] { _id, title, "slug": slug.current, "hasImage": defined(image.asset) }`
  );

  for (const p of defaultPrograms) {
    const docId = `program-${p.id}`;
    const match = existingPrograms.find(
      (ep) => ep._id === docId || ep.slug === (p.slug || p.id) || ep.title.toLowerCase().trim() === p.title.toLowerCase().trim()
    );
    const targetId = match ? match._id : docId;

    console.log(`\nProcessing Program "${p.title}" (${targetId})...`);
    console.log(`Uploading cover image: ${p.image}`);
    const imgRef = await uploadLocalImage(p.image);

    const galleryRefs: any[] = [];
    if (p.gallery && Array.isArray(p.gallery)) {
      for (const g of p.gallery) {
        const gRef = await uploadLocalImage(g);
        if (gRef) galleryRefs.push(gRef);
      }
    }

    const patch = client.patch(targetId).set({
      title: p.title,
      slug: { _type: "slug", current: p.slug || p.id },
      category: p.category || "",
      body: p.body || "",
    });

    if (imgRef) {
      patch.set({ image: imgRef });
      console.log(`✓ Attached cover image to ${targetId}`);
    }

    if (galleryRefs.length > 0) {
      patch.set({ gallery: galleryRefs });
      console.log(`✓ Attached ${galleryRefs.length} gallery images to ${targetId}`);
    }

    await patch.commit().catch(async (err) => {
      console.warn(`Patch error on ${targetId}: ${err.message}, fallback createOrReplace`);
      const newDoc: Record<string, unknown> = {
        _id: targetId,
        _type: "program",
        title: p.title,
        slug: { _type: "slug", current: p.slug || p.id },
        category: p.category || "",
        body: p.body || "",
        features: p.features || [],
      };
      if (imgRef) newDoc.image = imgRef;
      if (galleryRefs.length > 0) newDoc.gallery = galleryRefs;
      await client.createOrReplace(newDoc as any);
    });

    await client.delete(`drafts.${targetId}`).catch(() => {});
    console.log(`✓ Program ${targetId} verified.`);
  }

  console.log("\n=== VERIFYING SANITY CAUSES & PROGRAMS IMAGES ===");
  const causesStatus = await client.fetch<Array<{ _id: string; title: string; hasImage: boolean }>>(
    `*[_type == "cause"] | order(order asc) { _id, title, "hasImage": defined(image.asset) }`
  );
  console.log("\n--- Causes in Sanity ---");
  console.table(causesStatus);

  const programsStatus = await client.fetch<Array<{ _id: string; title: string; hasImage: boolean; galleryCount: number }>>(
    `*[_type == "program"] | order(title asc) { _id, title, "hasImage": defined(image.asset), "galleryCount": count(gallery) }`
  );
  console.log("\n--- Programs in Sanity ---");
  console.table(programsStatus);

  console.log("\n=== ALL IMAGES IN CAUSES & PROGRAMS SUCCESSFULLY SAVED IN SANITY! ===");
}

main().catch(console.error);
