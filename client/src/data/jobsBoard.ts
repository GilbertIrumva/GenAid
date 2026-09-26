export type ServiceCategory =
  | "Sales & Outbound"
  | "Google & Meta Ads"
  | "Customer Support"
  | "Graphic Design"
  | "Transcripts & Translation"
  | "Amazon Growth Agency"
  | "Social Engagement"
  | "Social & SEO"
  | "Campaigns"
  | "Web Support"
  | "E-Commerce"
  | "Data & AI"
  | "Virtual Assistance";

export interface ServicePackage {
  slug: string;
  category: ServiceCategory;
  title: string;
  firstMonthPrice: number;
  secondMonthPrice: number;
  monthlyPrice: number;
  description: string;
  deliverables: string[];
  impact: string;
}

export const servicePackages: ServicePackage[] = [
  {
    slug: "sales-and-outbound",
    category: "Sales & Outbound",
    title: "Sales and Outbound (Outbound Engine)",
    firstMonthPrice: 0,
    secondMonthPrice: 250,
    monthlyPrice: 399,
    description:
      "Outbound pipeline generation and targeted prospecting engine to scale discovery and outreach.",
    deliverables: [
      "Lead generation and qualification",
      "CRM and database management",
      "Email and LinkedIn outreach",
    ],
    impact: "Consistent lead flow and high-intent qualified pipeline.",
  },
  {
    slug: "google-ads-meta-ads",
    category: "Google & Meta Ads",
    title: "Google Ads & Meta Ads",
    firstMonthPrice: 0,
    secondMonthPrice: 250,
    monthlyPrice: 399,
    description:
      "Multi-channel paid ads execution across Google Search/Display and Meta platforms (Facebook & Instagram).",
    deliverables: [
      "Paid ads campaign setup & structure",
      "Audience targeting & retargeting funnels",
      "Ad copy, creative testing & ROAS optimization",
    ],
    impact: "Maximized ad spend efficiency and scalable customer acquisition.",
  },
  {
    slug: "customer-support-crm",
    category: "Customer Support",
    title: "Customer Support (Email, Chat & CRM)",
    firstMonthPrice: 0,
    secondMonthPrice: 250,
    monthlyPrice: 399,
    description:
      "Omnichannel customer support delivering fast resolution times, empathetic service, and meticulous ticket tracking.",
    deliverables: [
      "Email and live chat support coverage",
      "Helpdesk & CRM management (Zendesk, HubSpot, Freshdesk)",
      "Customer satisfaction monitoring & resolution logs",
    ],
    impact: "High CSAT scores, rapid response times, and increased customer retention.",
  },
  {
    slug: "graphic-design",
    category: "Graphic Design",
    title: "Graphic Design",
    firstMonthPrice: 0,
    secondMonthPrice: 250,
    monthlyPrice: 399,
    description:
      "Creative brand design and digital visual assets to power marketing campaigns, social media, and brand identity.",
    deliverables: [
      "Social media creatives & ad banners",
      "Marketing decks, one-pagers & brochures",
      "Brand identity assets & visual guidelines",
    ],
    impact: "Elevated visual presence and polished high-converting brand assets.",
  },
  {
    slug: "transcripts",
    category: "Transcripts & Translation",
    title: "Transcripts",
    firstMonthPrice: 0,
    secondMonthPrice: 250,
    monthlyPrice: 399,
    description:
      "Precise audio and video transcription with speaker identification, timestamps, and formatting for business needs.",
    deliverables: [
      "Clean verbatim & full verbatim transcriptions",
      "Speaker identification & timecode synchronization",
      "Meeting summaries & structured interview notes",
    ],
    impact: "Flawless documentation and accessible, searchable multimedia content.",
  },
  {
    slug: "translation",
    category: "Transcripts & Translation",
    title: "Translation",
    firstMonthPrice: 0,
    secondMonthPrice: 250,
    monthlyPrice: 399,
    description:
      "Accurate, culturally nuanced multi-language translation and localization across corporate, technical, and humanitarian domains.",
    deliverables: [
      "Multi-language document & website translation",
      "Cultural adaptation & localization checks",
      "Quality assurance & proofreading",
    ],
    impact: "Seamless cross-border communication and culturally resonant messaging.",
  },
  {
    slug: "amazon-brand-acquisition",
    category: "Amazon Growth Agency",
    title: "Brands/Suppliers Acquisition",
    firstMonthPrice: 0,
    secondMonthPrice: 250,
    monthlyPrice: 499,
    description:
      "Identifying, attracting, and closing new business accounts including brands and suppliers for Amazon Growth Agencies.",
    deliverables: [
      "Targeted brand research and qualification",
      "Supplier discovery and outreach pipelines",
      "High-value lead generation and retainer conversion",
    ],
    impact: "Continuous flow of qualified high-ticket brand retainers for your agency.",
  },
  {
    slug: "amazon-account-management",
    category: "Amazon Growth Agency",
    title: "Total Account Management",
    firstMonthPrice: 0,
    secondMonthPrice: 250,
    monthlyPrice: 499,
    description:
      "End-to-end management of your Amazon business across catalog, advertising, operations, and execution.",
    deliverables: [
      "Full catalog operations and inventory health",
      "Sponsored Ads monitoring and daily optimizations",
      "Cross-functional operational execution without silos",
    ],
    impact: "Eliminates operational bottlenecks and accelerates profitable growth.",
  },
  {
    slug: "amazon-catalog-case-management",
    category: "Amazon Growth Agency",
    title: "Catalog & Case Management",
    firstMonthPrice: 0,
    secondMonthPrice: 250,
    monthlyPrice: 499,
    description:
      "Keeping your Amazon catalog clean, compliant, and optimized to support advertising performance and conversion.",
    deliverables: [
      "Listing creation, variations, and attribute hygiene",
      "Suppression resolution and brand registry support",
      "Seller Support cases tracking and proactive resolution",
    ],
    impact: "Maximum listing visibility, zero downtime, and robust compliance.",
  },
  {
    slug: "social-engagement",
    category: "Social Engagement",
    title: "Social Engagement",
    firstMonthPrice: 0,
    secondMonthPrice: 250,
    monthlyPrice: 399,
    description:
      "Active digital community stewardship, consistent content distribution, and responsive social engagement.",
    deliverables: [
      "Content scheduling",
      "Community management",
      "Digital marketing",
    ],
    impact: "Vibrant community presence and higher organic brand engagement.",
  },
  {
    slug: "social-and-seo",
    category: "Social & SEO",
    title: "Social and SEO",
    firstMonthPrice: 0,
    secondMonthPrice: 250,
    monthlyPrice: 399,
    description:
      "Unified organic strategy combining search engine optimization and social content to expand brand discoverability.",
    deliverables: [
      "Social media marketing and blog strategy",
      "Keyword optimization",
      "On-page SEO checks",
    ],
    impact: "Higher search rankings and sustained inbound website traffic.",
  },
  {
    slug: "campaigns",
    category: "Campaigns",
    title: "Campaigns",
    firstMonthPrice: 0,
    secondMonthPrice: 250,
    monthlyPrice: 399,
    description:
      "Data-driven advertising campaigns, marketing automation funnels, and continuous conversion optimization.",
    deliverables: [
      "Paid ads performance",
      "Automation",
      "A/B testing",
    ],
    impact: "Maximized ROI on advertising spend and scalable conversion funnels.",
  },
  {
    slug: "web-support-maintenance",
    category: "Web Support",
    title: "Web Support (Technical Maintenance)",
    firstMonthPrice: 0,
    secondMonthPrice: 250,
    monthlyPrice: 399,
    description:
      "Reliable website maintenance, performance tuning, content updates, and technical troubleshooting.",
    deliverables: [
      "CMS and content updates",
      "Speed and performance enhancements",
      "Troubleshooting and fixes",
    ],
    impact: "Fast, secure web presence with zero downtime headaches.",
  },
  {
    slug: "ecommerce-operations",
    category: "E-Commerce",
    title: "E-Commerce",
    firstMonthPrice: 0,
    secondMonthPrice: 250,
    monthlyPrice: 399,
    description:
      "Complete online store operations, product inventory updates, order fulfillment workflows, and security routines.",
    deliverables: [
      "Order management",
      "Security",
      "Backups",
    ],
    impact: "Smooth checkout operations and secure e-commerce fulfillment.",
  },
  {
    slug: "data-and-ai-services",
    category: "Data & AI",
    title: "Data and AI Services",
    firstMonthPrice: 0,
    secondMonthPrice: 250,
    monthlyPrice: 399,
    description:
      "Human-in-the-loop data labeling, AI dataset cleaning, prompt engineering validation, and operations.",
    deliverables: [
      "Data annotation and preparation",
      "AI prompt testing",
      "Operations and management",
    ],
    impact: "Accurate model training data and high-quality AI operations.",
  },
  {
    slug: "virtual-assistance-admin",
    category: "Virtual Assistance",
    title: "Virtual Assistance and Admin Support",
    firstMonthPrice: 0,
    secondMonthPrice: 250,
    monthlyPrice: 399,
    description:
      "Dedicated administrative support, calendar management, and operational assistance to free leadership bandwidth.",
    deliverables: [
      "Operational focus",
      "Key admin tasks",
      "Strategic value",
    ],
    impact: "Reduced overhead and increased focus on core growth priorities.",
  },
];
