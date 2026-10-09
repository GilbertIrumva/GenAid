import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "fr1v7hol",
  dataset: process.env.SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: "2023-01-01",
});

function generateKey(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 12);
}

async function retry<T>(fn: () => Promise<T>, retries = 5, delay = 1000): Promise<T> {
  let lastError: any;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      lastError = err;
      console.warn(`    ⚠️ Attempt ${i + 1} failed: ${err.message}. Retrying in ${delay}ms...`);
      await new Promise((r) => setTimeout(r, delay));
      delay *= 1.5;
    }
  }
  throw lastError;
}

// Recursively ensure every object in any array has a unique `_key`
function ensureKeysDeep(val: any, path = ""): { val: any; modified: boolean } {
  if (val === null || val === undefined || typeof val !== "object") {
    return { val, modified: false };
  }

  if (Array.isArray(val)) {
    let arrayModified = false;
    const newArr = val.map((item, idx) => {
      if (item !== null && typeof item === "object" && !Array.isArray(item)) {
        let itemModified = false;
        let newItem = { ...item };

        if (!newItem._key) {
          newItem._key = generateKey();
          itemModified = true;
          arrayModified = true;
        }

        // Recursively inspect inside this object
        const inner = ensureKeysDeep(newItem, `${path}[${idx}]`);
        if (inner.modified) {
          newItem = inner.val;
          arrayModified = true;
        }

        return newItem;
      }
      return item;
    });

    return { val: arrayModified ? newArr : val, modified: arrayModified };
  }

  // Object
  let objModified = false;
  const newObj: Record<string, any> = {};
  for (const k of Object.keys(val)) {
    // Skip internal Sanity metadata fields
    if (k.startsWith("_") && k !== "_type" && k !== "_key" && k !== "_id" && k !== "_rev") {
      newObj[k] = val[k];
      continue;
    }
    const res = ensureKeysDeep(val[k], `${path}.${k}`);
    newObj[k] = res.val;
    if (res.modified) {
      objModified = true;
    }
  }

  return { val: objModified ? newObj : val, modified: objModified };
}

async function fixAllMissingKeys() {
  console.log("=== COMPREHENSIVE SCAN FOR MISSING KEYS IN ALL SANITY DOCUMENTS ===");

  // Query all documents that are not system documents
  const docs = await client.fetch<any[]>(`*[!(_id in path("_.**"))]`);
  console.log(`Fetched ${docs.length} documents from Sanity.`);

  let totalFixed = 0;

  for (const doc of docs) {
    // Only inspect relevant fields (avoid _id, _rev, _createdAt, _updatedAt)
    const editableFields: Record<string, any> = {};
    for (const key of Object.keys(doc)) {
      if (!["_id", "_rev", "_createdAt", "_updatedAt", "_system"].includes(key)) {
        editableFields[key] = doc[key];
      }
    }

    const { val: cleanedFields, modified } = ensureKeysDeep(editableFields, doc._id);

    if (modified) {
      const docTitle = doc.title || doc.name || doc._id;
      console.log(`\nFixing missing keys in [${doc._type}] "${docTitle}" (${doc._id})...`);

      await retry(() =>
        client
          .patch(doc._id)
          .set(cleanedFields)
          .commit()
      );

      // Clean up drafts for this doc so the Studio gets the pristine keyed state
      await client.delete(`drafts.${doc._id}`).catch(() => {});

      console.log(`✓ Fixed and committed "${docTitle}"!`);
      totalFixed++;
    }
  }

  console.log(`\n=== SCAN COMPLETE: Fixed ${totalFixed} documents with missing keys! ===`);
}

fixAllMissingKeys().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
