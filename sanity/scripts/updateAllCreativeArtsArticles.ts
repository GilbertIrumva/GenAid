import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "fr1v7hol",
  dataset: process.env.SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: "2023-01-01",
});

async function main() {
  console.log("=== UPDATING ALL CREATIVE ARTS ARTICLES IN SANITY ===");
  const docId = "program-creative-arts";
  const doc = (await client.getDocument(docId)) as any;

  if (!doc) {
    console.error(`Document ${docId} not found!`);
    return;
  }

  const workshopsUrl =
    "https://www.every-place.org/our-work#:~:text=00%3A00-,Featured%20project,-Kakuma%20Refugee%20Camp";
  const exhibitionsUrl =
    "https://www.bbc.com/news/articles/c87yg0rx4npo";
  const pricingUrl =
    "https://www.every-place.org/our-work/kenya#:~:text=A%20selection%20of%20work%20by%20Brighter%20artists%20%E2%80%94%20painted%2C%20gathered%2C%20and%20shown%20at%20the%20public%20exhibition%20in%20Kakuma.";
  const sengaGalleryLinkedInUrl =
    "https://www.linkedin.com/posts/hubert-sengap_refugeeart-kakumavoices-thesengagallery-ugcPost-7330257466212958208-QMQX/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAClBGikBTHoy6JXtv7jQ2lbqFZPmPaoXmEA";

  const updatedComponents = (doc.components || []).map((c: any) => {
    const t = (c.title || "").toLowerCase();
    if (t.includes("workshops & masterclasses") || t.includes("studio workshops")) {
      return { ...c, url: workshopsUrl };
    }
    if (t.includes("curated exhibitions & senga gallery")) {
      return { ...c, url: exhibitionsUrl };
    }
    if (t.includes("art business & fair trade pricing") || t.includes("fair trade")) {
      return { ...c, url: pricingUrl };
    }
    return c;
  });

  const updatedHighlight = {
    ...(doc.specialHighlight || {}),
    title: "The Senga Gallery & Community Art Space",
    description:
      "A dedicated cultural venue in Kakuma where refugee artists exhibit their original work, engage with visitors, and sell artwork to international collectors and partners.",
    url: sengaGalleryLinkedInUrl,
  };

  await client
    .patch(docId)
    .set({
      components: updatedComponents,
      specialHighlight: updatedHighlight,
    })
    .commit();

  await client.delete(`drafts.${docId}`).catch(() => {});
  console.log(`✓ Successfully updated ${docId} with all article links!`);

  const verified = await client.fetch<any>(
    `*[_type == "program" && _id == "${docId}"][0] {
      title,
      specialHighlight,
      components
    }`
  );
  console.log("Verified Document in Sanity:", JSON.stringify(verified, null, 2));
}

main().catch(console.error);
