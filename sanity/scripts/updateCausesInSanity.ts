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
    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  } catch (err) {
    console.warn(`Could not upload ${relPath} to Sanity:`, err);
    return undefined;
  }
}

async function main() {
  console.log("=== UPDATING CAUSES & IMAGES IN SANITY ===");
  const { causes } = await import("../../client/src/data/causes");

  // Fetch existing causes in Sanity
  const existingCauses = await client.fetch<Array<{ _id: string; title: string; "slug": string; goal: number; raised: number }>>(
    `*[_type == "cause"] { _id, title, "slug": slug.current, goal, raised }`
  );
  console.log(`Found ${existingCauses.length} cause documents in Sanity.`);

  for (const c of causes) {
    console.log(`\nProcessing cause "${c.title}": Goal: $${c.goal}, Raised: $${c.raised}`);

    const docId = `cause-${c.key}`;
    const match = existingCauses.find(
      (e) => e._id === docId || e.slug === c.key || e.title.toLowerCase().trim() === c.title.toLowerCase().trim()
    );

    const targetId = match ? match._id : docId;

    // Upload image asset if local
    console.log(`Checking image for ${c.key}: ${c.image}`);
    const imageRef = await uploadLocalImage(c.image);

    const patch = client.patch(targetId).set({
      title: c.title,
      goal: c.goal,
      raised: c.raised,
      description: c.description,
      donateUrl: c.donateUrl,
    });

    if (imageRef) {
      patch.set({ image: imageRef });
      console.log(`✓ Attached image asset to ${targetId}`);
    }

    await patch.commit().catch(async (err) => {
      console.warn(`Patch failed for ${targetId}, recreating...`, err.message);
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
      if (imageRef) newDoc.image = imageRef;
      await client.createOrReplace(newDoc as any);
    });

    // Delete draft if it exists
    await client.delete(`drafts.${targetId}`).catch(() => {});
    console.log(`✓ Successfully updated ${targetId}`);
  }

  console.log("\n=== VERIFYING SANITY CAUSES ===");
  const updatedList = await client.fetch<Array<{ _id: string; title: string; goal: number; raised: number; hasImage: boolean }>>(
    `*[_type == "cause"] | order(order asc) { _id, title, goal, raised, "hasImage": defined(image.asset) }`
  );
  console.table(updatedList);
  console.log("=== ALL CAUSES & IMAGES UPDATED IN SANITY! ===");
}

main().catch(console.error);
