import { config } from "dotenv";
import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables from sanity/.env
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../..");
const clientPublicDir = path.resolve(projectRoot, "client/public");

const client = createClient({
  projectId:
    process.env.SANITY_STUDIO_PROJECT_ID ||
    process.env.SANITY_PROJECT_ID ||
    "fr1v7hol",
  dataset:
    process.env.SANITY_STUDIO_DATASET ||
    process.env.SANITY_DATASET ||
    "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function withRetry<T>(fn: () => Promise<T>, retries = 4, delayMs = 1500): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      lastError = err;
      const msg = err?.message || String(err);
      console.warn(`    ⚠️ [Attempt ${i + 1}/${retries} failed: ${msg}]. Retrying in ${delayMs}ms...`);
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  throw lastError;
}

// Cache uploaded image assets by relative path so we don't re-upload duplicates
const uploadedAssetCache = new Map<string, string>();

async function uploadLocalImage(relPath?: string): Promise<{ _type: "image"; asset: { _type: "reference"; _ref: string } } | undefined> {
  if (!relPath || relPath.startsWith("http")) return undefined;

  const cleanPath = relPath.replace(/^\/+/, "");
  if (uploadedAssetCache.has(cleanPath)) {
    const assetId = uploadedAssetCache.get(cleanPath)!;
    return { _type: "image", asset: { _type: "reference", _ref: assetId } };
  }

  const absPath = path.resolve(clientPublicDir, cleanPath);
  if (!fs.existsSync(absPath)) {
    return undefined;
  }

  try {
    const filename = path.basename(absPath);
    console.log(`  Uploading asset: ${cleanPath}...`);
    const asset = await withRetry(async () => {
      const stream = fs.createReadStream(absPath);
      return await client.assets.upload("image", stream, { filename });
    });
    uploadedAssetCache.set(cleanPath, asset._id);
    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`  Warning: skipped uploading image ${cleanPath}:`, msg);
    return undefined;
  }
}

async function runSeed() {
  console.log("==========================================");
  console.log(" Starting Comprehensive Live Content Seed ");
  console.log(" Target Sanity Project: fr1v7hol (production)");
  console.log("==========================================");

  // 1. IMPORT DATA DIRECTLY FROM CLIENT
  const { defaultPrograms } = await import("../../client/src/data/programsData.ts");
  const { stories } = await import("../../client/src/data/stories.ts");
  const { posts } = await import("../../client/src/data/posts.ts");
  const { team } = await import("../../client/src/data/team.ts");
  const { board } = await import("../../client/src/data/board.ts");
  const { partners } = await import("../../client/src/data/partners.ts");

  // ----------------------------------------
  // A. SEED PROGRAMS (11 Detailed Programs)
  // ----------------------------------------
  console.log(`\n[1/5] Seeding ${defaultPrograms.length} Programs...`);
  for (const p of defaultPrograms) {
    const docId = `program-${p.id}`;
    console.log(` -> Processing Program: "${p.title}" (${p.id})`);

    const imageRef = await uploadLocalImage(p.image);
    const galleryRefs = [];
    if (p.gallery && Array.isArray(p.gallery)) {
      for (const g of p.gallery) {
        const ref = await uploadLocalImage(g);
        if (ref) galleryRefs.push(ref);
      }
    }

    const doc: Record<string, unknown> = {
      _id: docId,
      _type: "program",
      title: p.title,
      slug: { _type: "slug", current: p.slug || p.id },
      category: p.category || "",
      tagline: p.tagline || "",
      speaker: p.speaker || "",
      partner: p.partner || "",
      excerpt: p.body?.slice(0, 180) || "",
      body: p.body || "",
      features: p.features || [],
      problemStatement: p.problemStatement || "",
      targetAudience: p.targetAudience || "",
      whyItMatters: p.whyItMatters || "",
      goals: p.goals?.map((g) => ({ _type: "programGoal", title: g.title, description: g.description })) || [],
      components: p.components?.map((c) => ({ _type: "programComponent", title: c.title, description: c.description })) || [],
      gains: p.gains || [],
      howToJoin: p.howToJoin || "",
      specialHighlight: p.specialHighlight ? { title: p.specialHighlight.title, description: p.specialHighlight.description } : undefined,
      vision: p.vision || "",
      quote: p.quote ? { text: p.quote.text, author: p.quote.author, role: p.quote.role } : undefined,
      bookingUrl: p.bookingUrl || "",
      ctaText: p.ctaText || "",
      ctaLink: p.ctaLink || "",
      mediaVideos: p.mediaVideos?.map((mv) => ({
        _type: "programMediaVideo",
        title: mv.title,
        outlet: mv.outlet,
        youtubeId: mv.youtubeId || "",
        url: mv.url || "",
        description: mv.description || "",
      })) || [],
    };

    if (imageRef) doc.image = imageRef;
    if (galleryRefs.length > 0) doc.gallery = galleryRefs;

    await withRetry(async () => client.createOrReplace(doc as any));
  }

  // ----------------------------------------
  // B. SEED STORIES (3 Impact Stories)
  // ----------------------------------------
  console.log(`\n[2/5] Seeding ${stories.length} Impact Stories...`);
  for (const s of stories) {
    const docId = `story-${s.slug}`;
    console.log(` -> Processing Story: "${s.name}" (${s.slug})`);

    const imageRef = await uploadLocalImage(s.image);
    const posterRef = await uploadLocalImage(s.videoPoster);

    const doc: Record<string, unknown> = {
      _id: docId,
      _type: "story",
      name: s.name,
      slug: { _type: "slug", current: s.slug },
      role: s.role || "",
      program: s.program || "",
      location: s.location || "Kakuma, Kenya",
      excerpt: s.excerpt || "",
      videoUrl: s.videoUrl || "",
      content: s.content || [],
      publishedAt: new Date().toISOString(),
    };

    if (imageRef) doc.image = imageRef;
    if (posterRef) doc.videoPoster = posterRef;

    await withRetry(async () => client.createOrReplace(doc as any));
  }

  // ----------------------------------------
  // C. SEED BLOG POSTS (5 Articles)
  // ----------------------------------------
  console.log(`\n[3/5] Seeding ${posts.length} Blog Posts...`);
  for (const p of posts) {
    const docId = `post-${p.slug}`;
    console.log(` -> Processing Blog Post: "${p.title}" (${p.slug})`);

    const coverRef = await uploadLocalImage(p.cover);

    const doc: Record<string, unknown> = {
      _id: docId,
      _type: "post",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      date: p.date,
      author: p.author || "Generation Aid",
      excerpt: p.excerpt || "",
      youtubeId: p.youtubeId || "",
      videoTitle: p.videoTitle || "",
      videoDescription: p.videoDescription || "",
      content: p.content || [],
      publishedAt: new Date().toISOString(),
    };

    if (coverRef) doc.coverImage = coverRef;

    await withRetry(async () => client.createOrReplace(doc as any));
  }

  // ----------------------------------------
  // D. SEED TEAM & BOARD MEMBERS
  // ----------------------------------------
  console.log(`\n[4/5] Seeding Team & Board Members...`);
  let orderIndex = 0;
  for (const m of team) {
    const docId = `team-${m.key}`;
    console.log(` -> Processing Core Team: "${m.name}" (${m.role})`);
    const imgRef = await uploadLocalImage(m.image);

    const doc: Record<string, unknown> = {
      _id: docId,
      _type: "teamMember",
      name: m.name,
      slug: { _type: "slug", current: m.key },
      role: m.role,
      category: "team",
      bio: m.bio || "",
      linkedin: m.linkedin || "",
      order: orderIndex++,
      active: true,
    };
    if (imgRef) doc.image = imgRef;
    await withRetry(async () => client.createOrReplace(doc as any));
  }

  for (const b of board) {
    const docId = `board-${b.key}`;
    console.log(` -> Processing Board Member: "${b.name}" (${b.role})`);
    const imgRef = await uploadLocalImage(b.image);

    const doc: Record<string, unknown> = {
      _id: docId,
      _type: "teamMember",
      name: b.name,
      slug: { _type: "slug", current: b.key },
      role: b.role,
      category: "board",
      bio: b.bio || "",
      linkedin: b.linkedin || "",
      order: orderIndex++,
      active: true,
    };
    if (imgRef) doc.image = imgRef;
    await withRetry(async () => client.createOrReplace(doc as any));
  }

  // ----------------------------------------
  // E. SEED PARTNERS
  // ----------------------------------------
  console.log(`\n[5/5] Seeding ${partners.length} Partners...`);
  for (const pr of partners) {
    const docId = `partner-${pr.key}`;
    console.log(` -> Processing Partner: "${pr.name}"`);
    const logoRef = await uploadLocalImage(pr.logo);

    const doc: Record<string, unknown> = {
      _id: docId,
      _type: "partner",
      name: pr.name,
      slug: { _type: "slug", current: pr.key },
      category: pr.category || "Strategic",
      website: pr.url || "",
      description: pr.description || "",
    };
    if (logoRef) doc.logo = logoRef;
    await withRetry(async () => client.createOrReplace(doc as any));
  }

  console.log("\n==========================================");
  console.log(" SEED COMPLETED SUCCESSFULLY! ");
  console.log(" All live content & assets are now in Sanity!");
  console.log("==========================================");
}

runSeed().catch((err) => {
  console.error("FATAL SEED ERROR:", err);
  process.exit(1);
});
