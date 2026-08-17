export type ServiceCategory =
  | "Data & AI"
  | "Customer Support"
  | "Digital Marketing"
  | "Virtual Assistance"
  | "Web Support";

export interface ServicePackage {
  slug: string;
  category: ServiceCategory;
  title: string;
  trialPrice: number;
  monthlyPrice: number;
  description: string;
  deliverables: string[];
  impact: string;
}

export const servicePackages: ServicePackage[] = [
  {
    slug: "data-ai-services",
    category: "Data & AI",
    title: "Data Annotation and AI Ops",
    trialPrice: 150,
    monthlyPrice: 399,
    description:
      "Structured support for data preparation and human-in-the-loop AI workflows for growing teams.",
    deliverables: [
      "Text, image, and video annotation",
      "Dataset cleaning and enrichment",
      "AI prompt testing and validation",
    ],
    impact: "Reliable model inputs and quality-controlled outputs.",
  },
  {
    slug: "customer-support-ops",
    category: "Customer Support",
    title: "Customer Experience Operations",
    trialPrice: 150,
    monthlyPrice: 399,
    description:
      "Multilingual support operations for front-office and back-office customer workflows.",
    deliverables: [
      "Email and chat support",
      "CRM workflow and ticketing management",
      "Multilingual outreach in English, French, Swahili, and Arabic",
    ],
    impact: "Improved response quality and stronger customer retention.",
  },
  {
    slug: "digital-growth-engine",
    category: "Digital Marketing",
    title: "Growth and Outreach Engine",
    trialPrice: 150,
    monthlyPrice: 399,
    description:
      "Execution support for demand generation, social operations, and content moderation.",
    deliverables: [
      "Lead database building and qualification",
      "LinkedIn and email outreach execution",
      "Social media scheduling and moderation",
    ],
    impact: "Consistent pipeline growth and safer community engagement.",
  },
  {
    slug: "va-admin-support",
    category: "Virtual Assistance",
    title: "Executive and Admin Support",
    trialPrice: 150,
    monthlyPrice: 399,
    description:
      "Reliable operations support that reduces coordination overhead and protects leadership focus.",
    deliverables: [
      "Calendar and scheduling coordination",
      "Database maintenance and documentation",
      "Web research and reporting assistance",
    ],
    impact: "Higher internal productivity and cleaner operational cadence.",
  },
  {
    slug: "web-support-maintenance",
    category: "Web Support",
    title: "Web Operations and Maintenance",
    trialPrice: 150,
    monthlyPrice: 399,
    description:
      "Hands-on website support for content updates, stability, and technical upkeep.",
    deliverables: [
      "CMS and content updates",
      "On-page SEO checks",
      "Troubleshooting, backups, and security routines",
    ],
    impact: "Stable digital presence and lower maintenance risk.",
  },
];
