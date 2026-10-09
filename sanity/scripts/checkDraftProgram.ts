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
  const doc = await client.getDocument("drafts.program-digital-livelihood-program");
  console.log("Draft doc:", doc);
  
  // Also check if there is a published version of program-digital-livelihood-program
  const pub = await client.getDocument("program-digital-livelihood-program");
  console.log("Published doc:", pub);
}

main();
