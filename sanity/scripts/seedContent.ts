import { config } from "dotenv";
import { createClient } from "@sanity/client";

config();

const client = createClient({
  projectId:
    process.env.SANITY_STUDIO_PROJECT_ID ||
    process.env.SANITY_PROJECT_ID ||
    "your-project-id",
  dataset:
    process.env.SANITY_STUDIO_DATASET ||
    process.env.SANITY_DATASET ||
    "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

type SeedDocument = {
  _type: string;
  [key: string]: unknown;
};

const documents: SeedDocument[] = [
  {
    _type: "post",
    title: "Generation Jobs Launches in Kakuma",
    slug: { _type: "slug", current: "generation-jobs-launches-in-kakuma" },
    excerpt:
      "A new era of refugee digital jobs in Kakuma has begun. Generation Aid proudly announces the launch of Generation Jobs.",
    body: [
      {
        _key: "post-1",
        _type: "block",
        children: [
          {
            _key: "child-1",
            _type: "span",
            marks: [],
            text: "Generation Jobs is now active in Kakuma, connecting refugee youth with digital work readiness, mentorship, and remote employment pathways.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    publishedAt: "2025-06-06T00:00:00.000Z",
    authorName: "Hubert",
  },
  {
    _type: "story",
    title: "Amani from trainee to remote designer",
    slug: { _type: "slug", current: "amani-from-trainee-to-remote-designer" },
    excerpt:
      "Amani went from a learner with no portfolio to a remote designer supporting his family from Kakuma.",
    body: [
      {
        _key: "story-1",
        _type: "block",
        children: [
          {
            _key: "child-2",
            _type: "span",
            marks: [],
            text: "Amani joined the Remote Work Bootcamp and built a portfolio through practical assignments and mentor feedback.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    role: "Remote graphic designer",
    program: "Remote Work Bootcamp",
    location: "Kakuma, Kenya",
    publishedAt: "2025-05-20T00:00:00.000Z",
  },
  {
    _type: "program",
    title: "Digital Livelihood Program",
    slug: { _type: "slug", current: "digital-livelihood-program" },
    excerpt:
      "A practical digital skills pathway that prepares young people for online work and entrepreneurship.",
    body: [
      {
        _key: "program-1",
        _type: "block",
        children: [
          {
            _key: "child-3",
            _type: "span",
            marks: [],
            text: "The program combines digital literacy, remote work readiness, and business skills to prepare learners for the global economy.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    features: [
      "Digital literacy",
      "Remote work readiness",
      "Entrepreneurship support",
    ],
  },
  {
    _type: "partner",
    name: "UNHCR",
    slug: { _type: "slug", current: "unhcr" },
    description:
      "A strategic partner supporting protection, education access, and refugee-led programming.",
    category: "Strategic",
    website: "https://www.unhcr.org/",
  },
  {
    _type: "news",
    title:
      "Generation Aid joins East African refugee-led innovators in Nairobi",
    slug: {
      _type: "slug",
      current: "generation-aid-joins-innovators-in-nairobi",
    },
    source: "Refugee-Led Innovation Forum",
    date: "2025-11-04",
    category: "Recognition",
    summary:
      "Our team was invited to share the Generation Aid EdTech and livelihoods model with refugee-led organisations from five East African countries during the regional forum.",
  },
  {
    _type: "report",
    title: "2025 Annual Report",
    slug: { _type: "slug", current: "2025-annual-report" },
    year: 2025,
    kind: "annual",
    pages: 28,
    summary:
      "A full year in review: 120-learner ICT cohort, the tailoring exchange with Kalobeyei, employer partnerships, and how every dollar was spent.",
  },
  {
    _type: "teamMember",
    name: "Hubert Senga",
    slug: { _type: "slug", current: "hubert-senga" },
    role: "Founder & CEO",
    bio: "Congolese refugee, social entrepreneur and changemaker. Founded Generation Aid in 2019 to rewrite the narrative for refugee youth in Kakuma.",
    linkedin: "https://www.linkedin.com/in/hubert-sengap/",
    order: 0,
    active: true,
  },
  {
    _type: "teamMember",
    name: "Programs Lead",
    slug: { _type: "slug", current: "programs-lead" },
    role: "Vocational & Livelihood Programs",
    bio: "Designs and runs our vocational, livelihood and entrepreneurship tracks across the Kakuma camp.",
    order: 1,
    active: true,
  },
  {
    _type: "teamMember",
    name: "Digital Skills Trainer",
    slug: { _type: "slug", current: "digital-skills-trainer" },
    role: "Remote Work Bootcamp",
    bio: "Mentors learners through graphic design, content writing and virtual-assistant tracks that lead to paid remote contracts.",
    order: 2,
    active: true,
  },
  {
    _type: "teamMember",
    name: "Community Lead",
    slug: { _type: "slug", current: "community-lead" },
    role: "Outreach & Volunteers",
    bio: "Coordinates volunteers, community partners and intake for every cohort that enters the Generation Aid hub.",
    order: 3,
    active: true,
  },
];

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.warn(
      "SANITY_API_TOKEN is not set. Seed skipped. Set it and rerun the script to publish content.",
    );
    return;
  }

  for (const doc of documents) {
    await client.createOrReplace({
      _id: `${doc._type}-${String(
        (doc.slug as { current?: string } | undefined)?.current || doc.title,
      )
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")}`,
      ...doc,
    });
  }

  console.log(`Seeded ${documents.length} Sanity documents.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
