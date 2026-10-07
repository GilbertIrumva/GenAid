import { createClient } from "@sanity/client";
import dotenv from "dotenv";
dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "fr1v7hol",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  apiVersion: "2024-03-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN,
});

async function main() {
  console.log("Token exists?", !!client.config().token);
  try {
    const res = await client.delete("teamMember-digital-skills-trainer");
    console.log("Delete result:", res);
  } catch (err) {
    console.error("Delete error:", err);
  }

  const docs = await client.fetch<Array<{ _id: string; name: string; role: string; category?: string }>>(
    `*[_type == "teamMember"]{ _id, name, role, category }`
  );
  console.log("\n=== REMAINING TEAM MEMBERS IN SANITY ===");
  for (const d of docs) {
    console.log(`ID: ${d._id} | Name: "${d.name}" | Role: "${d.role}" | Category: ${d.category || "undefined"}`);
  }
}

main().catch(console.error);
