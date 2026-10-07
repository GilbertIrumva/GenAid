import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "fr1v7hol",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  apiVersion: "2024-03-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function main() {
  console.log("=== SYNCING TEAM & BOARD TO SEPARATE CHAMBERS ===");

  // 1. Ensure Digital Skills Trainer is 100% gone
  await client.delete("drafts.teamMember-digital-skills-trainer").catch(() => {});
  await client.delete("teamMember-digital-skills-trainer").catch(() => {});
  console.log("✓ 'Digital Skills Trainer' removed.");

  // 2. Publish any drafts for team members so they appear as published
  const drafts = await client.fetch<Array<{ _id: string }>>(`*[_id in path("drafts.team-*") || _id in path("drafts.board-*")]`);
  for (const d of drafts) {
    const publishedId = d._id.replace("drafts.", "");
    const draftDoc = await client.getDocument(d._id);
    if (draftDoc) {
      console.log(`Publishing draft: ${d._id} -> ${publishedId}`);
      await client.createOrReplace({
        ...draftDoc,
        _id: publishedId,
      });
      await client.delete(d._id);
    }
  }

  // 3. Seed the real Board of Directors & Advisors from client/src/data/team.ts
  const { advisors } = await import("../../client/src/data/team");
  const publicDir = path.resolve(process.cwd(), "../client/public");

  let order = 0;
  for (const adv of advisors) {
    const docId = `board-${adv.key}`;
    console.log(`Syncing Board Member: "${adv.name}" (${adv.role})`);

    let imgAsset: any = undefined;
    const cleanImg = adv.image.replace(/^\/+/, "");
    const absPath = path.resolve(publicDir, cleanImg);
    if (fs.existsSync(absPath)) {
      try {
        const stream = fs.createReadStream(absPath);
        const uploaded = await client.assets.upload("image", stream, {
          filename: path.basename(absPath),
        });
        imgAsset = { _type: "image", asset: { _type: "reference", _ref: uploaded._id } };
      } catch (err) {
        console.warn(`Could not upload image for ${adv.name}:`, err);
      }
    }

    const doc: Record<string, unknown> = {
      _id: docId,
      _type: "teamMember",
      name: adv.name,
      slug: { _type: "slug", current: adv.key },
      role: adv.role,
      category: "board",
      bio: adv.bio || "",
      linkedin: adv.linkedin || "",
      order: order++,
      active: true,
    };
    if (imgAsset) doc.image = imgAsset;

    await client.createOrReplace(doc as any);
  }

  // 4. Remove duplicate and old orphan entries
  const cleanupIds = [
    "board-secretary",
    "f7171764-99de-41c7-a84d-3a401e0935c7"
  ];
  for (const cid of cleanupIds) {
    await client.delete(`drafts.${cid}`).catch(() => {});
    await client.delete(cid).catch(() => {});
  }

  // 5. Ensure all core team members are fully published
  for (const slug of ["hubert", "melodie", "aisling", "bernard"]) {
    const draft = await client.getDocument(`drafts.team-${slug}`);
    if (draft) {
      const { _id, _rev, ...content } = draft;
      await client.createOrReplace({
        ...content,
        _id: `team-${slug}`,
      });
      await client.delete(`drafts.team-${slug}`).catch(() => {});
    }
  }

  console.log("\nSync complete! Inspecting current members in Sanity:");
  const finalDocs = await client.fetch<Array<{ _id: string; name: string; role: string; category?: string }>>(
    `*[_type == "teamMember"] | order(category asc, order asc){ _id, name, role, category }`
  );
  console.table(finalDocs);
}

main().catch(console.error);
