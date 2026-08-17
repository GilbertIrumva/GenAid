import { createClient } from "@sanity/client";
import fs from "fs";

const env = fs.readFileSync(".env", "utf8");
const match = (key) => {
  const regex = new RegExp(`^${key}=(.*)$`, "m");
  const value = env.match(regex)?.[1]?.trim();
  return value ? value.replace(/^['"]|['"]$/g, "") : undefined;
};

const client = createClient({
  projectId: match("SANITY_STUDIO_PROJECT_ID") || match("SANITY_PROJECT_ID"),
  dataset: match("SANITY_STUDIO_DATASET") || match("SANITY_DATASET"),
  apiVersion: "2024-01-01",
  useCdn: false,
  token: match("SANITY_API_TOKEN"),
});

const query =
  '*[_type in ["post","story","program","partner"]] | order(_createdAt desc) [0..9] { _id, _type, title, name, slug }';

try {
  const docs = await client.fetch(query);
  console.log(JSON.stringify(docs, null, 2));
} catch (err) {
  console.error(err);
}
