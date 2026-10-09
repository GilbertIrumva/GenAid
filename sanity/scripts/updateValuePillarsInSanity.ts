import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@sanity/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const token = process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN;

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "fr1v7hol",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

async function main() {
  const updatedPillars = [
    {
      _key: "unmatched-daily-rates",
      _type: "cardItem",
      title: "Unmatched daily rates",
      body: "Access digital workers around $8/day compared with freelancers, agencies, or internal teams at much higher cost.",
    },
    {
      _key: "rapid-onboarding",
      _type: "cardItem",
      title: "Rapid onboarding",
      body: "Deploy managed teams within days with clear KPIs, QA oversight, and project management from Day 1.",
    },
    {
      _key: "retention-stability",
      _type: "cardItem",
      title: "Retention and stability",
      body: "Loyal talent and low attrition provide continuity, lower replacement costs, and consistent delivery performance.",
    },
  ];

  console.log("Patching jobsContent.valuePillars in Sanity...");
  const res = await client
    .patch("jobsContent")
    .set({ valuePillars: updatedPillars })
    .commit();

  console.log("Updated jobsContent valuePillars successfully:", res._id);
}

main().catch((err) => {
  console.error("Error patching jobsContent:", err);
  process.exit(1);
});
