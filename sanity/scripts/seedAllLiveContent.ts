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
  console.log("========================================================");
  console.log(" Starting Complete Content & Schema Seed (Both Sites) ");
  console.log(" Target Sanity Project: fr1v7hol (production)");
  console.log("========================================================");

  // 1. IMPORT DATA DIRECTLY FROM CLIENT
  const { defaultPrograms } = await import("../../client/src/data/programsData");
  const { stories } = await import("../../client/src/data/stories");
  const { posts } = await import("../../client/src/data/posts");
  const { team } = await import("../../client/src/data/team");
  const { board } = await import("../../client/src/data/board");
  const { partners } = await import("../../client/src/data/partners");
  const { causes } = await import("../../client/src/data/causes");
  const { testimonials } = await import("../../client/src/data/testimonials");
  const { news } = await import("../../client/src/data/news");
  const { reports } = await import("../../client/src/data/reports");
  const { videos } = await import("../../client/src/data/videos");
  const { SITE } = await import("../../client/src/data/site");
  const { servicePackages } = await import("../../client/src/data/jobsBoard");

  // ========================================================
  // SITE 1: GENERATION AID CORE
  // ========================================================

  // ----------------------------------------
  // A. SEED PROGRAMS (11 Detailed Programs)
  // ----------------------------------------
  console.log(`\n[1/13] Seeding ${defaultPrograms.length} Programs...`);
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
  console.log(`\n[2/13] Seeding ${stories.length} Impact Stories...`);
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
  console.log(`\n[3/13] Seeding ${posts.length} Blog Posts...`);
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
  console.log(`\n[4/13] Seeding Team & Board Members...`);
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
  console.log(`\n[5/13] Seeding ${partners.length} Partners...`);
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

  // ----------------------------------------
  // F. SEED URGENT CAUSES
  // ----------------------------------------
  console.log(`\n[6/13] Seeding ${causes.length} Urgent Causes...`);
  let causeOrder = 0;
  for (const c of causes) {
    const docId = `cause-${c.key}`;
    console.log(` -> Processing Cause: "${c.title}"`);
    const imageRef = await uploadLocalImage(c.image);

    const doc: Record<string, unknown> = {
      _id: docId,
      _type: "cause",
      title: c.title,
      slug: { _type: "slug", current: c.key },
      description: c.description,
      goal: c.goal,
      raised: c.raised,
      donateUrl: c.donateUrl,
      order: causeOrder++,
    };
    if (imageRef) doc.image = imageRef;
    await withRetry(async () => client.createOrReplace(doc as any));
  }

  // ----------------------------------------
  // G. SEED TESTIMONIALS
  // ----------------------------------------
  console.log(`\n[7/13] Seeding ${testimonials.length} Testimonials...`);
  let testOrder = 0;
  for (const t of testimonials) {
    const docId = `testimonial-${t.key}`;
    console.log(` -> Processing Testimonial: "${t.name}"`);
    const imageRef = await uploadLocalImage(t.image);

    const doc: Record<string, unknown> = {
      _id: docId,
      _type: "testimonial",
      name: t.name,
      slug: { _type: "slug", current: t.key },
      role: t.role,
      quote: t.quote,
      order: testOrder++,
    };
    if (imageRef) doc.image = imageRef;
    await withRetry(async () => client.createOrReplace(doc as any));
  }

  // ----------------------------------------
  // H. SEED NEWS & PRESS
  // ----------------------------------------
  console.log(`\n[8/13] Seeding ${news.length} News Articles...`);
  for (const n of news) {
    const docId = `news-${n.key}`;
    console.log(` -> Processing News: "${n.title}"`);
    const imageRef = await uploadLocalImage(n.image);

    const doc: Record<string, unknown> = {
      _id: docId,
      _type: "news",
      title: n.title,
      slug: { _type: "slug", current: n.key },
      source: n.source,
      date: n.date,
      category: n.category || "General",
      summary: n.summary,
      url: n.url || "",
    };
    if (imageRef) doc.image = imageRef;
    await withRetry(async () => client.createOrReplace(doc as any));
  }

  // ----------------------------------------
  // I. SEED ANNUAL & IMPACT REPORTS
  // ----------------------------------------
  console.log(`\n[9/13] Seeding ${reports.length} Reports...`);
  for (const r of reports) {
    const docId = `report-${r.key}`;
    console.log(` -> Processing Report: "${r.title}" (${r.year})`);

    const doc: Record<string, unknown> = {
      _id: docId,
      _type: "report",
      title: r.title,
      slug: { _type: "slug", current: r.key },
      year: r.year,
      kind: r.kind,
      summary: r.summary,
      pages: r.pages,
      downloadUrl: r.downloadUrl || "",
    };
    await withRetry(async () => client.createOrReplace(doc as any));
  }

  // ----------------------------------------
  // J. SEED GALLERY & MEDIA VIDEOS
  // ----------------------------------------
  console.log(`\n[10/13] Seeding ${videos.length} Media Videos...`);
  for (const v of videos) {
    const slugKey = (v.youtubeId || v.title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const docId = `video-${slugKey}`;
    console.log(` -> Processing Video: "${v.title}"`);
    const thumbRef = await uploadLocalImage(v.poster);

    const doc: Record<string, unknown> = {
      _id: docId,
      _type: "video",
      title: v.title,
      slug: { _type: "slug", current: slugKey },
      description: v.description,
      source: v.youtubeId ? "youtube" : "url",
      youtubeId: v.youtubeId || "",
      videoUrl: v.videoUrl || "",
      date: v.date || "",
      publishedAt: new Date().toISOString(),
    };
    if (thumbRef) doc.thumbnail = thumbRef;
    await withRetry(async () => client.createOrReplace(doc as any));
  }

  // ----------------------------------------
  // K. SEED SITE SETTINGS
  // ----------------------------------------
  console.log(`\n[11/13] Seeding Global Site Settings...`);
  const logoRef = await uploadLocalImage("logo.jpg");
  const siteDoc: Record<string, unknown> = {
    _id: "siteSettings",
    _type: "siteSettings",
    title: "Generation Aid | Refugee-Led Education & Livelihoods in Kakuma",
    description: "Empowering refugee youth in Kakuma with digital skills, education, and career pathways.",
    donateUrl: SITE.donateUrl,
    phoneKenya: SITE.phoneKenya,
    phoneInternational: SITE.phoneInternational,
    email: SITE.email,
    address: SITE.address,
    socials: {
      facebook: SITE.socials.facebook,
      linkedin: SITE.socials.linkedin,
      twitter: SITE.socials.twitter,
      youtube: SITE.socials.youtube,
    },
  };
  if (logoRef) siteDoc.logo = logoRef;
  await withRetry(async () => client.createOrReplace(siteDoc as any));

  // ========================================================
  // SITE 2: GENERATION JOBS CORE
  // ========================================================

  // ----------------------------------------
  // L. SEED GENERATION JOBS CMS CONTENT
  // ----------------------------------------
  console.log(`\n[12/13] Seeding Generation Jobs CMS Content...`);
  const heroImageRef = await uploadLocalImage("gen jobs/home slide images (1).jpg");
  const jobsLogoRef = await uploadLocalImage("gen jobs/Generation job's logo.png");
  const pipelineImageRef = await uploadLocalImage("gen jobs/IMG-20260529-WA0065.jpg");
  const talentHeroImageRef = await uploadLocalImage("gen jobs/IMG_20260630_104952_312.jpg");
  const employerHeroImageRef = await uploadLocalImage("gen jobs/Copy of IMG_20260611_111051_050.jpg");
  const esgImpactImageRef = await uploadLocalImage("gen jobs/served clients (1).jpg");
  const employerInfraImageRef = await uploadLocalImage("gen jobs/served clients (2).jpg");

  const jobsDoc: Record<string, unknown> = {
    _id: "jobsContent",
    _type: "jobsContent",
    title: "Generation Jobs CMS Content & Imagery",

    // Overview Page (/jobs)
    overviewHeroTitle: "Talent that delivers. Costs that make sense.",
    overviewHeroSubtitle:
      "Access skilled, multilingual, and loyal digital workers in Kakuma, backed by end-to-end operational support and fair European pricing.",
    marketNeedTitle: "The market challenge",
    marketProblems: [
      {
        _type: "cardItem",
        title: "Hiring gap",
        body: "Employers need dependable remote talent, but many teams struggle to find candidates who are ready, responsive, and consistent.",
      },
      {
        _type: "cardItem",
        title: "Untapped supply",
        body: "Kakuma has capable people with strong motivation and relevant skills, but limited access to global work opportunities.",
      },
      {
        _type: "cardItem",
        title: "Need for trust",
        body: "Employers want a partner that can reduce hiring risk, support quality, and keep teams stable over time.",
      },
    ],
    pipelineTitle: "A clear path from skills development to employer placement",
    pipelineSteps: [
      {
        _type: "stepItem",
        stepNumber: "01",
        title: "Generation Aid | Training",
        body: "Build foundational skills through ICT, English, vocational learning, and work-readiness preparation.",
      },
      {
        _type: "stepItem",
        stepNumber: "02",
        title: "Generation Jobs | Placement",
        body: "Match vetted talent to employer needs, then support onboarding, retention, and team integration.",
      },
      {
        _type: "stepItem",
        stepNumber: "03",
        title: "Ongoing support",
        body: "Maintain quality through follow-up, coordination, and performance support after placement.",
      },
    ],
    talentCategories: [
      {
        _type: "cardItem",
        title: "Customer Support (Email, Chat & CRM)",
        body: "Multi-channel ticket handling, live chat, customer retention, and CRM management for client-facing teams.",
      },
      {
        _type: "cardItem",
        title: "Google Ads & Meta Ads",
        body: "Paid performance advertising, audience targeting, ROAS optimization, and multi-channel campaign funnels.",
      },
      {
        _type: "cardItem",
        title: "Graphic Design",
        body: "Brand visual assets, social media creatives, ad banners, marketing decks, and design production.",
      },
      {
        _type: "cardItem",
        title: "Transcripts & Translation",
        body: "Accurate multi-speaker transcription, timecoding, and professional multi-language translation and localization.",
      },
      {
        _type: "cardItem",
        title: "Full Amazon Growth Agency Support",
        body: "Brands/suppliers acquisition, total account management, catalog hygiene, variations, and Seller Support case handling.",
      },
      {
        _type: "cardItem",
        title: "Social Media & Community Engagement",
        body: "Content scheduling, audience engagement, comment moderation, brand voice monitoring, and community growth.",
      },
    ],
    howHiringWorks: [
      {
        _type: "stepItem",
        stepNumber: "01",
        title: "Needs analysis",
        body: "We understand role duties, workload volume, schedule constraints, and required software stacks.",
      },
      {
        _type: "stepItem",
        stepNumber: "02",
        title: "Targeted matching",
        body: "We select shortlisted candidates whose profile, communications skills, and technical ability match your scope.",
      },
      {
        _type: "stepItem",
        stepNumber: "03",
        title: "Direct interview",
        body: "You speak directly with the candidate to assess culture alignment and communication before confirming.",
      },
      {
        _type: "stepItem",
        stepNumber: "04",
        title: "Zero-risk pilot onboarding",
        body: "Start with our Month 1 at $0 pilot. We coordinate tool access, schedule syncing, and operational tracking.",
      },
    ],
    employerBenefits: [
      {
        _type: "cardItem",
        title: "Transparent & ethical pricing",
        body: "Fair remuneration for workers combined with significant budget efficiency for international employers.",
      },
      {
        _type: "cardItem",
        title: "Bilingual English proficiency",
        body: "Fluency across written and spoken communication, supporting European and North American working hours.",
      },
      {
        _type: "cardItem",
        title: "End-to-end operational resilience",
        body: "Dedicated Kakuma workstation hub equipped with redundant fiber internet and solar backup power.",
      },
    ],
    proofAndTrust: [
      {
        _type: "cardItem",
        title: "Supervised work hub",
        body: "Talent works inside structured delivery rooms equipped with backup generators, solar cells, and fiber connections.",
      },
      {
        _type: "cardItem",
        title: "Active coordination",
        body: "Generation Jobs team maintains active contact with both employer and remote worker to resolve questions rapidly.",
      },
      {
        _type: "cardItem",
        title: "Refugee-led leadership",
        body: "Founded and operated by refugee leaders with deep local trust and strong international execution track records.",
      },
    ],
    impactStats: [
      { _type: "metricItem", label: "Remote Talent Deployed", value: "35+" },
      { _type: "metricItem", label: "Talent Retention Rate", value: "94%" },
      { _type: "metricItem", label: "Client Operational Savings", value: "Up to 70%" },
      { _type: "metricItem", label: "Placement Timeframe", value: "3-5 Days" },
    ],

    // Talent Model Page (/jobs/talent)
    talentHeroTitle: "Rigorous training. Global market readiness.",
    talentHeroSubtitle:
      "Our talent model transforms motivated individuals into reliable, client-ready remote professionals through practical coaching, real workflows, and continuous mentorship.",
    profilePillars: [
      {
        _type: "cardItem",
        title: "Foundational digital literacy",
        body: "Mastery of modern office software, cloud suites (Google Workspace, Microsoft 365), and task tracking systems.",
      },
      {
        _type: "cardItem",
        title: "Specialized vocational streams",
        body: "Deep practical training in digital marketing, customer support, transcription, data annotation, and graphic design.",
      },
      {
        _type: "cardItem",
        title: "Professional remote workplace habits",
        body: "Timezone punctuality, proactive communication, async updates, English business writing, and professional ethics.",
      },
    ],
    journeySteps: [
      {
        _type: "stepItem",
        stepNumber: "01",
        title: "Assessment & entry",
        body: "Aptitude evaluation, English proficiency verification, and motivation interviews for prospective candidates.",
      },
      {
        _type: "stepItem",
        stepNumber: "02",
        title: "Simulated task environments",
        body: "Real-world project simulations using live briefs to build confidence before client placement.",
      },
      {
        _type: "stepItem",
        stepNumber: "03",
        title: "Employer matching & onboarding",
        body: "Structured introduction, technical integration, and guided onboarding alongside client lead.",
      },
      {
        _type: "stepItem",
        stepNumber: "04",
        title: "Continuous career coaching",
        body: "Regular check-ins and upskilling pathways to ensure steady performance improvement and long-term retention.",
      },
    ],
    leadershipTitle: "Refugee-Led Leadership",
    leadershipBody:
      "Generation Aid and Generation Jobs are founded and led by Hubert Senga, a visionary refugee leader in Kakuma. Having lived the journey firsthand, our leadership builds sustainable pathways from learning to livelihoods.",

    // For Employers Page (/jobs/employers)
    employerHeroTitle: "Built for employers who demand quality and predictability.",
    employerHeroSubtitle:
      "Scale your team with dedicated remote professionals in Kakuma. Zero-risk trial structure, managed physical infrastructure, and reliable English communication.",
    valuePillars: [
      {
        _type: "cardItem",
        title: "Zero-risk pilot structure",
        body: "Experience candidate capabilities risk-free: Month 1 is $0, Month 2 is $250, followed by a flat $399-$499 monthly retainer.",
      },
      {
        _type: "cardItem",
        title: "Complete operational stability",
        body: "Our Kakuma facility ensures continuous solar electricity, backup diesel power, and fiber optic connectivity.",
      },
      {
        _type: "cardItem",
        title: "Direct management, zero red tape",
        body: "Manage your assigned professional directly via Slack, Teams, or email just like any in-house team member.",
      },
    ],
    serviceLines: [
      {
        _type: "cardItem",
        title: "Outbound Lead Gen & Sales",
        body: "List building, email sequencing, LinkedIn prospecting, and qualified appointment setting.",
      },
      {
        _type: "cardItem",
        title: "Customer Support (Omnichannel)",
        body: "High CSAT email and live chat response handling, Zendesk/Freshdesk management, and ticket resolution.",
      },
      {
        _type: "cardItem",
        title: "Full Amazon Growth Agency Support",
        body: "Brands/suppliers discovery, catalog hygiene, ticket escalation, and day-to-day operations.",
      },
      {
        _type: "cardItem",
        title: "Graphic Design & Content Creation",
        body: "Marketing collateral, banners, social graphics, slide decks, and digital media production.",
      },
    ],
    esgPillars: [
      {
        _type: "cardItem",
        title: "True Impact Sourcing",
        body: "Directly create life-changing digital employment inside Kakuma Refugee Camp without compromising performance.",
      },
      {
        _type: "cardItem",
        title: "SDG Alignment (Goals 1, 8, 10)",
        body: "Measurable contributions to No Poverty, Decent Work and Economic Growth, and Reduced Inequalities.",
      },
    ],
    qualityPillars: [
      {
        _type: "cardItem",
        title: "Dual-redundant power",
        body: "Solar arrays paired with backup generator power prevent work interruptions during camp-wide grid outages.",
      },
      {
        _type: "cardItem",
        title: "Fast fiber internet",
        body: "Commercial fiber links ensure high-speed file transfers, video calls, and responsive cloud tool performance.",
      },
    ],

    // Hire Page (/jobs/hire)
    hireHeroTitle: "Hire Vetted Remote Talent from Kakuma",
    hireHeroSubtitle:
      "Skip recruitment fatigue. Access dependable, English-speaking digital specialists backed by turnkey infrastructure and our zero-risk pilot.",
    clientFormUrl: "https://forms.gle/wydDfQ8Y9GduXxi26",
    hireBenefits: [
      {
        _type: "cardItem",
        title: "Save Time & Skip Screening",
        body: "Avoid weeks sorting through unqualified resumes. We match you with vetted, job-ready professionals within 3-5 days.",
      },
      {
        _type: "cardItem",
        title: "Cut Operational Overhead by 70%",
        body: "High-caliber remote talent starting with Month 1 at $0 and Month 2 at $250, followed by a flat $399-$499/mo retainer.",
      },
      {
        _type: "cardItem",
        title: "Turnkey Infrastructure Hub",
        body: "Modern workstations, solar and generator backup power, high-speed fiber internet, and active oversight inside Kakuma.",
      },
    ],
  };

  if (heroImageRef) jobsDoc.overviewHeroImage = heroImageRef;
  if (jobsLogoRef) jobsDoc.jobsLogo = jobsLogoRef;
  if (pipelineImageRef) jobsDoc.pipelineImage = pipelineImageRef;
  if (talentHeroImageRef) jobsDoc.talentHeroImage = talentHeroImageRef;
  if (employerHeroImageRef) jobsDoc.employerHeroImage = employerHeroImageRef;
  if (esgImpactImageRef) jobsDoc.esgImpactImage = esgImpactImageRef;
  if (employerInfraImageRef) jobsDoc.employerInfraImage = employerInfraImageRef;

  await withRetry(async () => client.createOrReplace(jobsDoc as any));

  // ----------------------------------------
  // M. SEED SERVICE PACKAGES (14 Offerings)
  // ----------------------------------------
  console.log(`\n[13/13] Seeding ${servicePackages.length} Generation Jobs Service Packages...`);
  let pkgOrder = 0;
  for (const pkg of servicePackages) {
    const docId = `servicePackage-${pkg.slug}`;
    console.log(` -> Processing Service Package: "${pkg.title}" (${pkg.category})`);

    const doc: Record<string, unknown> = {
      _id: docId,
      _type: "servicePackage",
      title: pkg.title,
      slug: { _type: "slug", current: pkg.slug },
      category: pkg.category,
      firstMonthPrice: pkg.firstMonthPrice,
      secondMonthPrice: pkg.secondMonthPrice,
      monthlyPrice: pkg.monthlyPrice,
      description: pkg.description,
      deliverables: pkg.deliverables,
      impact: pkg.impact,
      order: pkgOrder++,
    };

    await withRetry(async () => client.createOrReplace(doc as any));
  }

  console.log("\n========================================================");
  console.log(" COMPLETE SEED SUCCEEDED FOR BOTH SITES! ");
  console.log(" All 13 content categories and schemas are live in Sanity!");
  console.log("========================================================");
}

runSeed().catch((err) => {
  console.error("FATAL SEED ERROR:", err);
  process.exit(1);
});
