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
    title: "Learning through Play: Empowering Kakuma's Children",
    slug: { _type: "slug", current: "learning-through-play" },
    excerpt:
      "A transformative initiative integrating playful learning, social-emotional skills, and basic computer training for refugee children.",
    body: [
      {
        _key: "program-1",
        _type: "block",
        children: [
          {
            _key: "child-1",
            _type: "span",
            marks: [],
            text: "Learning through Play integrates playful learning, social and emotional learning (SEL), and basic computer skills training, targeting children whose educational journeys have been disrupted by war and conflict.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    features: [
      "Play-Based Literacy & Numeracy",
      "Social & Emotional Learning (SEL)",
      "Interactive Digital & Computer Skills",
      "Trauma-Informed Safe Learning Spaces",
    ],
  },
  {
    _type: "program",
    title: "Women in AI Program",
    slug: { _type: "slug", current: "women-in-ai" },
    excerpt:
      "A three-month learning and fellowship initiative equipping refugee women with practical AI and emerging technology skills.",
    body: [
      {
        _key: "program-2",
        _type: "block",
        children: [
          {
            _key: "child-2",
            _type: "span",
            marks: [],
            text: "Equipping refugee women with practical knowledge, confidence, and opportunities in Artificial Intelligence, Generative AI, and digital innovation.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    features: [
      "Generative AI & Prompt Engineering",
      "Responsible AI & Digital Ethics",
      "3-Month Fellowship & Mentorship",
      "Community Innovation Capstone Projects",
    ],
  },
  {
    _type: "program",
    title: "Storytelling Program",
    slug: { _type: "slug", current: "storytelling" },
    excerpt:
      "In partnership with Shared Studios and HOME Storytellers, connecting Kakuma storytellers with global audiences.",
    body: [
      {
        _key: "program-3",
        _type: "block",
        children: [
          {
            _key: "child-3",
            _type: "span",
            marks: [],
            text: "A platform for refugees to share their stories, culture, and dreams directly with audiences worldwide, shifting the global narrative.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    features: [
      "First-Person Narrative Workshops",
      "Global Live Portals & Dialogues",
      "Multimedia & Digital Content Creation",
      "Advocacy & International Reach",
    ],
  },
  {
    _type: "program",
    title: "Creative Art Program",
    slug: { _type: "slug", current: "creative-arts" },
    excerpt:
      "Developed with Kakuma Art Project and Senga Gallery, using art for self-expression, storytelling, and sustainable livelihoods.",
    body: [
      {
        _key: "program-4",
        _type: "block",
        children: [
          {
            _key: "child-4",
            _type: "span",
            marks: [],
            text: "Supporting refugee artists through workshops, masterclasses, and exhibitions at the Senga Gallery & Community Art Space.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    features: [
      "Painting, Drawing & Sculpture Studios",
      "Senga Gallery Exhibitions & Sales",
      "Masterclasses with International Artists",
      "Fair-Trade Creative Livelihoods",
    ],
  },
  {
    _type: "program",
    title: "Climate Action & Sustainable Agriculture",
    slug: { _type: "slug", current: "climate-action" },
    excerpt:
      "A refugee-led initiative combining ecological restoration, climate-smart agriculture, and green livelihoods.",
    body: [
      {
        _key: "program-5",
        _type: "block",
        children: [
          {
            _key: "child-5",
            _type: "span",
            marks: [],
            text: "Training in kitchen gardens, drip irrigation, compost production, indigenous tree nurseries, and green entrepreneurship.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    features: [
      "Climate-Smart Agriculture & Permaculture",
      "Micro-Drip Irrigation & Water Harvesting",
      "Indigenous Tree Nurseries & Reforestation",
      "Green Agribusiness & Food Security",
    ],
  },
  {
    _type: "program",
    title: "Children’s Social-Emotional Learning & Yoga Programme",
    slug: { _type: "slug", current: "social-emotional-learning" },
    excerpt:
      "Implemented with My Little Zen and in partnership with the LEGO Foundation, nurturing emotional wellbeing and resilience in refugee children.",
    body: [
      {
        _key: "program-6",
        _type: "block",
        children: [
          {
            _key: "child-6",
            _type: "span",
            marks: [],
            text: "Safe, playful spaces where refugee children develop emotional awareness, focus, and physical wellbeing through yoga, mindfulness, and LEGO® play.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    features: [
      "Mindful Movement & Children's Yoga",
      "Breathwork & Emotional Self-Regulation",
      "LEGO® Playful Teamwork Workshops",
      "Safe, Trauma-Informed Community Spaces",
    ],
  },
  {
    _type: "program",
    title: "Global Refugee Advocacy & Inclusion",
    slug: { _type: "slug", current: "advocacy" },
    excerpt:
      "Hubert Senga's global advocacy positioning refugees as skilled contributors, innovators, and leaders in the global economy.",
    body: [
      {
        _key: "program-7",
        _type: "block",
        children: [
          {
            _key: "child-7",
            _type: "span",
            marks: [],
            text: "Bringing lived-experience perspectives from Kakuma into international policy, UN & ILO forums, technology summits, and media.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    features: [
      "UN & Multilateral Policy Representation",
      "PBS News & France 24 Media Feature",
      "Global Keynote & Panel Speaking",
      "Corporate Remote Hiring Consultations",
    ],
  },
  {
    _type: "program",
    title: "English Language & Literacy Skills Program",
    slug: { _type: "slug", current: "english-language-literacy" },
    excerpt:
      "Strengthening English communication, workplace writing, and literacy for refugee youth in Kakuma and Kalobeyei.",
    body: [
      {
        _key: "program-8",
        _type: "block",
        children: [
          {
            _key: "child-8",
            _type: "span",
            marks: [],
            text: "Practical English communication, professional writing, and public speaking connecting learners to education and employment.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    features: [
      "Beginner to Advanced Learning Tracks",
      "Workplace & Business English",
      "CV & Interview Preparation",
      "Pathway to Higher Ed & Remote Jobs",
    ],
  },
  {
    _type: "program",
    title: "Women’s Digital Skills for Economic Empowerment",
    slug: { _type: "slug", current: "womens-digital-skills" },
    excerpt:
      "A 12-week initiative in partnership with RefugePoint opening pathways to freelancing, remote work, and entrepreneurship for refugee women.",
    body: [
      {
        _key: "program-9",
        _type: "block",
        children: [
          {
            _key: "child-9",
            _type: "span",
            marks: [],
            text: "Equipping refugee women aged 18–35 with practical digital tools, career mentorship, and job linkages in the global digital economy.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    features: [
      "12-Week Intensive Curriculum",
      "RefugePoint Partnership & Mentorship",
      "Remote Work & Freelancing Exposure",
      "Direct Job-Linkage Opportunities",
    ],
  },
  {
    _type: "program",
    title: "Computer Literacy Skills Program for Inclusivity",
    slug: { _type: "slug", current: "computer-literacy-skills" },
    excerpt:
      "Essential digital skills training in computer use, office productivity, internet navigation, and cybersecurity for education and employment.",
    body: [
      {
        _key: "program-10",
        _type: "block",
        children: [
          {
            _key: "child-10",
            _type: "span",
            marks: [],
            text: "Equipping refugees and underserved community members with foundational digital literacy, Microsoft Office skills, internet communication, and online safety.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    features: [
      "Foundational Computer & OS Mastery",
      "Microsoft Office (Word, Excel, PowerPoint)",
      "Internet Research & Professional Email",
      "Cybersecurity & Online Data Safety",
      "Pathway to AI, Coding & Remote Work",
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
