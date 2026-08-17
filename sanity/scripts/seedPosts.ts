import { config } from "dotenv";
import { createClient } from "@sanity/client";

config();

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  "your-project-id";
const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.SANITY_DATASET ||
  "production";

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

type SeedPost = {
  _id: string;
  _type: "post";
  title: string;
  slug: { _type: "slug"; current: string };
  excerpt: string;
  body: Array<{
    _key: string;
    _type: "block";
    children: Array<{
      _key: string;
      _type: "span";
      marks: string[];
      text: string;
    }>;
    markDefs: Array<unknown>;
    style: "normal";
  }>;
  publishedAt: string;
  authorName: string;
};

const posts: SeedPost[] = [
  {
    _id: "post-generation-jobs-launches-in-kakuma",
    _type: "post",
    title: "Generation Jobs Launches in Kakuma",
    slug: { _type: "slug", current: "generation-jobs-launches-in-kakuma" },
    excerpt:
      "A new era of refugee digital jobs in Kakuma has begun. Generation Aid proudly announces the launch of Generation Jobs.",
    body: [
      {
        _key: "b1",
        _type: "block",
        children: [
          {
            _key: "c1",
            _type: "span",
            marks: [],
            text: "Generation Jobs is now live in Kakuma, connecting young people with digital-work readiness, mentorship, and remote employment pathways.",
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
    _id: "post-how-foreign-aid-cuts-threaten-refugee-led-initiatives",
    _type: "post",
    title: "How Foreign Aid Cuts Threaten Refugee-Led Initiatives",
    slug: {
      _type: "slug",
      current: "how-foreign-aid-cuts-threaten-refugee-led-initiatives",
    },
    excerpt:
      "Foreign aid cuts are undermining refugee-led tech programs in Kakuma, threatening digital training and education for thousands.",
    body: [
      {
        _key: "b2",
        _type: "block",
        children: [
          {
            _key: "c2",
            _type: "span",
            marks: [],
            text: "Recent cuts to international aid are creating a difficult environment for refugee-led initiatives, but the community continues to adapt and organise.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    publishedAt: "2025-03-05T00:00:00.000Z",
    authorName: "Admin",
  },
];

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.warn(
      "SANITY_API_TOKEN is not set. Seed skipped. Set it and rerun the script to publish content.",
    );
    return;
  }

  for (const post of posts) {
    await client.createOrReplace(post);
  }

  console.log(`Seeded ${posts.length} posts.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
