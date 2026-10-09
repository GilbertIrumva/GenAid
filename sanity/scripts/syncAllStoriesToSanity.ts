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

async function downloadIfHttp(url: string, destRelPath: string): Promise<string> {
  if (!url || !url.startsWith("http")) return url;
  const absDest = path.resolve(clientPublicDir, destRelPath.replace(/^\/+/, ""));
  if (fs.existsSync(absDest) && fs.statSync(absDest).size > 1000) {
    return destRelPath;
  }
  try {
    console.log(`Downloading ${url} -> ${destRelPath}...`);
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    if (res.ok) {
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.mkdirSync(path.dirname(absDest), { recursive: true });
      fs.writeFileSync(absDest, buffer);
      console.log(`Saved ${destRelPath} (${buffer.length} bytes)`);
      return destRelPath;
    }
  } catch (err) {
    console.warn(`Failed downloading ${url}:`, err);
  }
  return url;
}

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
  console.log("=== SYNCING ALL STORIES TO SANITY DATASET ===");
  const { stories } = await import("../../client/src/data/stories");
  console.log(`Found ${stories.length} stories in client/src/data/stories.ts\n`);

  for (let i = 0; i < stories.length; i++) {
    const st = stories[i];
    const docId = `story-${st.slug}`;
    console.log(`[${i + 1}/${stories.length}] Processing Story: "${st.name}" (${st.slug})...`);

    // Download any external posters or images to local public folder if needed
    let imagePath = st.image;
    if (imagePath && imagePath.startsWith("http")) {
      imagePath = await downloadIfHttp(imagePath, `stories/${st.slug}-cover.jpg`);
    }

    let posterPath = st.videoPoster;
    if (posterPath && posterPath.startsWith("http")) {
      posterPath = await downloadIfHttp(posterPath, `videos/${st.slug}-poster.jpg`);
    }

    const imgRef = await uploadLocalImage(imagePath);
    const posterRef = await uploadLocalImage(posterPath);

    const doc: Record<string, unknown> = {
      _id: docId,
      _type: "story",
      name: st.name,
      title: st.name,
      slug: { _type: "slug", current: st.slug },
      role: st.role,
      program: st.program,
      location: st.location,
      excerpt: st.excerpt,
      content: st.content,
      videoUrl: st.videoUrl || "",
      // Order descending: first story gets most recent timestamp
      publishedAt: new Date(Date.now() - i * 86400000).toISOString(),
    };

    if (imgRef) {
      doc.image = imgRef;
      doc.coverImage = imgRef;
    }
    if (posterRef) {
      doc.videoPoster = posterRef;
    }

    await client.createOrReplace(doc as any);
    await client.delete(`drafts.${docId}`).catch(() => {});
    console.log(`✓ Published to Sanity: ${docId}\n`);
  }

  console.log("=== VERIFYING SANITY STORIES ===");
  const sanityList = await client.fetch<Array<{ _id: string; name?: string; "slug": string }>>(
    `*[_type == "story"] | order(publishedAt desc) { _id, "name": coalesce(name, title), "slug": slug.current }`
  );
  console.table(sanityList);
  console.log("=== ALL STORIES SUCCESSFULLY SYNCED! ===");
}

main().catch(console.error);
