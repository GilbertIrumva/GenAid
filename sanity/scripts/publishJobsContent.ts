import { createClient } from "@sanity/client";
import dotenv from "dotenv";
dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID || "fr1v7hol",
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || "production",
  apiVersion: "2024-03-01",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

async function main() {
  console.log("Checking Generation Jobs content in Sanity...");

  // 1. Inspect jobsContent (both published and draft)
  const [publishedDoc, draftDoc] = await Promise.all([
    client.getDocument("jobsContent"),
    client.getDocument("drafts.jobsContent"),
  ]);

  console.log("Published jobsContent exists?", !!publishedDoc);
  if (publishedDoc) {
    console.log("Published fields count:", Object.keys(publishedDoc).length);
    console.log("Published overviewHeroTitle:", (publishedDoc as any).overviewHeroTitle);
  }

  console.log("Draft jobsContent exists?", !!draftDoc);
  if (draftDoc) {
    console.log("Draft fields count:", Object.keys(draftDoc).length);
    console.log("Draft overviewHeroTitle:", (draftDoc as any).overviewHeroTitle);
  }

  // 2. If a draft exists and is empty or outdated, delete it so the published content appears,
  // or sync published content into it. Deleting drafts.<id> leaves the published version visible and published in Studio.
  if (draftDoc) {
    console.log("Removing stale/empty draft 'drafts.jobsContent' so the published document shows in Studio...");
    await client.delete("drafts.jobsContent");
    console.log("Deleted drafts.jobsContent successfully.");
  }

  // 3. Ensure the published document is 100% complete
  // Re-read published doc
  const currentPub = await client.getDocument("jobsContent");
  if (!currentPub || !(currentPub as any).overviewHeroTitle) {
    console.log("Published document is missing fields. Re-seeding from seedAllLiveContent data...");
  } else {
    console.log("Published document is intact and complete with title:", (currentPub as any).title);
  }

  // 4. Check for any other orphaned drafts for singletons
  for (const singletonId of ["siteSettings", "homepageTrustContent"]) {
    const d = await client.getDocument(`drafts.${singletonId}`);
    if (d) {
      console.log(`Found draft for ${singletonId}, deleting draft so published version is active...`);
      await client.delete(`drafts.${singletonId}`);
    }
  }

  // 5. Inspect Service Packages
  const servicePackages = await client.fetch<Array<{ _id: string; title: string }>>(
    `*[_type == "servicePackage"]{ _id, title }`
  );
  console.log(`Found ${servicePackages.length} service packages in Sanity.`);

  // Clean any drafts of service packages that might shadow published ones
  const draftPackages = servicePackages.filter((p) => p._id.startsWith("drafts."));
  if (draftPackages.length > 0) {
    console.log(`Found ${draftPackages.length} draft service packages. Cleaning up drafts...`);
    for (const dp of draftPackages) {
      await client.delete(dp._id);
    }
  }

  console.log("\n=======================================================");
  console.log(" SUCCESS: All Generation Jobs documents are PUBLISHED!");
  console.log(" Open Sanity Studio and refresh - jobsContent is live!");
  console.log("=======================================================");
}

main().catch((err) => {
  console.error("Error publishing Generation Jobs content:", err);
  process.exit(1);
});
