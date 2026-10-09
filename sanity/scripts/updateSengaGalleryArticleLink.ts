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
  console.log("=== UPDATING SENGA GALLERY ARTICLE LINK IN SANITY ===");
  const docId = "program-creative-arts";
  const doc = (await client.getDocument(docId)) as any;

  if (!doc) {
    console.error(`Document ${docId} not found!`);
    return;
  }

  const articleUrl = "https://www.bbc.com/news/articles/c87yg0rx4npo";

  const updatedComponents = (doc.components || []).map((c: any) => {
    if (c.title && c.title.toLowerCase().includes("curated exhibitions & senga gallery")) {
      return {
        ...c,
        url: articleUrl,
      };
    }
    return c;
  });

  await client
    .patch(docId)
    .set({ components: updatedComponents })
    .commit();

  await client.delete(`drafts.${docId}`).catch(() => {});
  console.log(`✓ Successfully updated ${docId} with BBC News article hyperlink!`);

  const verified = await client.fetch<any>(
    `*[_type == "program" && _id == "${docId}"][0].components`
  );
  console.log("Verified components in Sanity:", verified);
}

main().catch(console.error);
