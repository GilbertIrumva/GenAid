import { config } from "dotenv";
import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../..");
const clientPublicDir = path.resolve(projectRoot, "client/public");

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "fr1v7hol",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
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

async function seedJobs() {
  console.log("==========================================");
  console.log(" Seeding Generation Jobs CMS Content ");
  console.log(" Target Sanity Project: fr1v7hol (production)");
  console.log("==========================================");

  const heroImageRef = await uploadLocalImage("gen jobs/home slide images (1).jpg");
  const logoImageRef = await uploadLocalImage("gen jobs/Generation job's logo.png");
  const pipelineImageRef = await uploadLocalImage("gen jobs/IMG-20260529-WA0065.jpg");
  const talentHeroImageRef = await uploadLocalImage("gen jobs/IMG_20260630_104952_312.jpg");
  const employerHeroImageRef = await uploadLocalImage("gen jobs/Copy of IMG_20260611_111051_050.jpg");
  const esgImpactImageRef = await uploadLocalImage("gen jobs/served clients (1).jpg");
  const employerInfraImageRef = await uploadLocalImage("gen jobs/served clients (2).jpg");
  const hireCalloutImageRef = await uploadLocalImage("gen jobs/work-smarter-impact.jpg");
  const leadershipImageRef = await uploadLocalImage("gen jobs/IMG-20260318-WA0031 - Copy.jpg");
  const leadershipImageSecondaryRef = await uploadLocalImage("gen jobs/hubert-leadership-partnership.jpg");
  const amazonAgencyImageRef = await uploadLocalImage("gen jobs/amazon-growth-agency.jpg");
  const whyHireImageRef = await uploadLocalImage("gen jobs/why-hire-feature.jpg");
  const strategicImpactImageRef = await uploadLocalImage("gen jobs/strategic-impact-sourcing.jpg");

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
      {
        _type: "cardItem",
        title: "SEO, Content & On-Page Strategy",
        body: "Keyword research, metadata optimization, content drafting, blog formatting, and on-page SEO health audits.",
      },
      {
        _type: "cardItem",
        title: "Digital Campaigns & Conversion A/B Testing",
        body: "Landing page variation testing, email automation workflows, newsletter management, and funnel analytics.",
      },
      {
        _type: "cardItem",
        title: "Website Support & Routine CMS Maintenance",
        body: "WordPress/Shopify updates, page publishing, asset optimization, broken link checks, and web maintenance.",
      },
      {
        _type: "cardItem",
        title: "Ecommerce Operations & Catalog Management",
        body: "Product listings, inventory data entry, order tracking, SKU management, and merchant portal operations.",
      },
      {
        _type: "cardItem",
        title: "Data Preparation & AI Operations Support",
        body: "Data labeling, text/image annotation, prompt testing, RLHF review, and human-in-the-loop task delivery.",
      },
      {
        _type: "cardItem",
        title: "Virtual Assistance & Administrative Operations",
        body: "Calendar scheduling, email triage, data research, document preparation, and recurring back-office workflows.",
      },
    ],
    howHiringWorks: [
      {
        _type: "stepItem",
        stepNumber: "01",
        title: "Define role and requirements",
        body: "Share task needs, tools, timezone preferences, and communication cadence.",
      },
      {
        _type: "stepItem",
        stepNumber: "02",
        title: "Candidate matching and review",
        body: "Receive pre-vetted profiles matched to your operational workflows.",
      },
      {
        _type: "stepItem",
        stepNumber: "03",
        title: "Guided onboarding",
        body: "Begin with structured check-ins, performance tracking, and support coordination.",
      },
      {
        _type: "stepItem",
        stepNumber: "04",
        title: "Ongoing retention support",
        body: "Maintain stability and continuous quality through proactive follow-up.",
      },
    ],
    employerBenefits: [
      {
        _type: "cardItem",
        title: "European standard, fraction of cost",
        body: "Save up to 60-70% on operational payroll while keeping professional communication and reliable delivery standards.",
      },
      {
        _type: "cardItem",
        title: "Managed legal and compliance",
        body: "Zero local employment overhead. Generation Jobs handles administrative coordination, compliance, and workplace support.",
      },
      {
        _type: "cardItem",
        title: "Dedicated digital hub infrastructure",
        body: "Talent works from our secure facility in Kakuma equipped with high-speed fiber internet, solar backup, and professional workstations.",
      },
      {
        _type: "cardItem",
        title: "High loyalty and team stability",
        body: "Benefit from industry-low attrition rates and talent dedicated to long-term professional partnerships.",
      },
    ],
    proofAndTrust: [
      {
        _type: "cardItem",
        title: "Workstation and power redundancy",
        body: "Reliable internet and solar-backed power maintain uninterrupted delivery schedules.",
      },
      {
        _type: "cardItem",
        title: "Supervised work environments",
        body: "Hub-based coordination supports discipline, security, and regular communication.",
      },
      {
        _type: "cardItem",
        title: "Dedicated point of contact",
        body: "Employers have responsive channel support for fast coordination and feedback.",
      },
      {
        _type: "cardItem",
        title: "Ethical and transparent compensation",
        body: "Talent receives fair, empowering income that drives household and community self-reliance.",
      },
    ],
    impactStats: [
      { _type: "metricItem", label: "Talent Pool Ready", value: "150+" },
      { _type: "metricItem", label: "Cost Savings vs Agency", value: "60-70%" },
      { _type: "metricItem", label: "Hub Uptime & Power", value: "99.5%" },
      { _type: "metricItem", label: "Placement Retention", value: "94%" },
    ],

    // Talent Page (/jobs/talent)
    talentHeroTitle: "Unlocking global talent from Kakuma",
    talentHeroSubtitle:
      "Generation Jobs transforms trained potential into globally deployable talent through a rigorous journey and quality assurance model.",
    profilePillars: [
      {
        _type: "cardItem",
        title: "Multilingual communication",
        body: "Fluency in English (minimum B2), French, Swahili, and Arabic supports global customer and operations workflows.",
      },
      {
        _type: "cardItem",
        title: "Technical proficiency",
        body: "Strong digital literacy, fast typing, and practical use of BPO tools shaped by market-driven training.",
      },
      {
        _type: "cardItem",
        title: "Human + AI readiness",
        body: "Talent prepared for prompt testing, data workflows, and hybrid human-in-the-loop operations.",
      },
      {
        _type: "cardItem",
        title: "Loyalty and retention",
        body: "A highly motivated workforce with low attrition and strong commitment to long-term growth.",
      },
    ],
    journeySteps: [
      {
        _type: "stepItem",
        stepNumber: "01",
        title: "Training",
        body: "Intensive digital literacy, English communication, and vocational pathways build strong baseline capability.",
      },
      {
        _type: "stepItem",
        stepNumber: "02",
        title: "Vetting",
        body: "Selection criteria cover technical proficiency, communication, adaptability, and reliability.",
      },
      {
        _type: "stepItem",
        stepNumber: "03",
        title: "Placement",
        body: "Talent is matched to client needs with role clarity, onboarding support, and manager supervision.",
      },
      {
        _type: "stepItem",
        stepNumber: "04",
        title: "Ongoing support",
        body: "Continuous mentoring, QA feedback, and performance follow-up secure sustained professional growth.",
      },
    ],

    // Employers Page (/jobs/employers)
    employerHeroTitle: "Scale operations with high-retention talent",
    employerHeroSubtitle:
      "Access reliable digital delivery teams, managed onboarding, and competitive cost efficiency tailored for European and international businesses.",
    valuePillars: [
      {
        _type: "cardItem",
        title: "Unmatched daily rates",
        body: "Access digital workers around $8/day compared with freelancers, agencies, or internal teams at much higher cost.",
      },
      {
        _type: "cardItem",
        title: "Rapid onboarding",
        body: "Deploy managed teams within days with clear KPIs, QA oversight, and project management from Day 1.",
      },
      {
        _type: "cardItem",
        title: "Retention and stability",
        body: "Loyal talent and low attrition provide continuity, lower replacement costs, and consistent delivery performance.",
      },
    ],
    serviceLines: [
      {
        _type: "cardItem",
        title: "Sales and Outbound",
        body: "Lead generation and qualification, CRM and database management, email and LinkedIn outreach.",
      },
      {
        _type: "cardItem",
        title: "Google Ads & Meta Ads",
        body: "Paid advertising campaign setup, audience targeting, budget optimization, copy & creative testing, and multichannel performance tracking across Google and Meta platforms.",
      },
      {
        _type: "cardItem",
        title: "Customer Support (Email, Chat & CRM)",
        body: "Multichannel customer service, ticket resolution, live chat assistance, CRM management, and customer satisfaction optimization.",
      },
      {
        _type: "cardItem",
        title: "Graphic Design",
        body: "Brand identity assets, marketing collateral, social media creatives, ad banners, presentations, and visual design solutions.",
      },
      {
        _type: "cardItem",
        title: "Transcripts & Translation",
        body: "Accurate, timely audio and video transcription, speaker identification, timestamping, and formatted transcripts for interviews, media, and corporate meetings.",
      },
      {
        _type: "cardItem",
        title: "Social Media & Community Engagement",
        body: "Content scheduling, audience engagement, comment moderation, brand voice monitoring, and community growth.",
      },
      {
        _type: "cardItem",
        title: "SEO, Content & On-Page Strategy",
        body: "Social media marketing and blog strategy, keyword optimization, and on-page SEO checks.",
      },
      {
        _type: "cardItem",
        title: "Digital Campaigns & A/B Testing",
        body: "Paid ads performance management, marketing automation, and conversion A/B testing.",
      },
      {
        _type: "cardItem",
        title: "Web Support & Maintenance",
        body: "CMS and content updates, speed and performance enhancements, and technical troubleshooting.",
      },
      {
        _type: "cardItem",
        title: "Ecommerce Operations",
        body: "Order management, catalog updates, payment verification, security, and routine backups.",
      },
      {
        _type: "cardItem",
        title: "Data and AI Services",
        body: "Data annotation and dataset preparation, AI prompt testing, and human in the loop operations.",
      },
      {
        _type: "cardItem",
        title: "Virtual Assistance & Admin",
        body: "Operational focus, key admin tasks, executive scheduling, and strategic workflow value.",
      },
    ],
    esgPillars: [
      {
        _type: "cardItem",
        title: "Direct community impact",
        body: "100% of income flows directly to displaced professionals in Kakuma, generating a 3x economic multiplier for local households.",
      },
      {
        _type: "cardItem",
        title: "Gender inclusion & parity",
        body: "Over 50% of our active talent cohorts are women specializing in data, AI testing, and customer operations.",
      },
      {
        _type: "cardItem",
        title: "Sustainable SDG alignment",
        body: "Delivering measurable progress on SDG 8 (Decent Work & Economic Growth) and SDG 10 (Reduced Inequalities).",
      },
    ],
  };

  if (heroImageRef) jobsDoc.overviewHeroImage = heroImageRef;
  if (logoImageRef) jobsDoc.jobsLogo = logoImageRef;
  if (pipelineImageRef) jobsDoc.pipelineImage = pipelineImageRef;
  if (talentHeroImageRef) jobsDoc.talentHeroImage = talentHeroImageRef;
  if (employerHeroImageRef) jobsDoc.employerHeroImage = employerHeroImageRef;
  if (esgImpactImageRef) jobsDoc.esgImpactImage = esgImpactImageRef;
  if (employerInfraImageRef) jobsDoc.employerInfraImage = employerInfraImageRef;
  if (hireCalloutImageRef) jobsDoc.hireCalloutImage = hireCalloutImageRef;
  if (leadershipImageRef) jobsDoc.leadershipImage = leadershipImageRef;
  if (leadershipImageSecondaryRef) jobsDoc.leadershipImageSecondary = leadershipImageSecondaryRef;
  if (amazonAgencyImageRef) jobsDoc.amazonAgencyImage = amazonAgencyImageRef;
  if (whyHireImageRef) jobsDoc.whyHireImage = whyHireImageRef;
  if (strategicImpactImageRef) jobsDoc.strategicImpactImage = strategicImpactImageRef;

  jobsDoc.whyHireTag = "Why Hire Through Generation Jobs";
  jobsDoc.whyHireTitle = "Competitive delivery economics with built-in social impact";
  jobsDoc.strategicImpactTag = "Strategic impact sourcing";

  jobsDoc.hireCalloutTag = "Why Hire With Us";
  jobsDoc.hireCalloutTitle = "Work smarter, grow faster, and create meaningful global impact.";
  jobsDoc.hireCalloutBody =
    "Hiring through Generation Jobs gives you access to loyal, highly trained digital talent with built-in oversight, managed infrastructure, and a 100% free Month 1 pilot.";

  jobsDoc.amazonAgencyTag = "FOR FULL AMAZON GROWTH AGENCY";
  jobsDoc.amazonAgencyTitle = "Specialized Support for Amazon Growth Agencies";
  jobsDoc.amazonAgencySubtitle =
    "Are you a full channel Amazon Growth Agency founded to help brands scale profitably through advertising, creative optimization, and marketplace strategy?";
  jobsDoc.amazonAgencyBody =
    "We got you covered too. We specialize in researching and finding brands/suppliers that agencies like yours would be excited to work with.";

  console.log("Saving jobsContent document in Sanity...");
  await withRetry(async () => client.createOrReplace(jobsDoc as any));
  console.log("==========================================");
  console.log(" GENERATION JOBS CMS SEED COMPLETED! ");
  console.log("==========================================");
}

seedJobs().catch((err) => {
  console.error("FATAL JOBS SEED ERROR:", err);
  process.exit(1);
});
