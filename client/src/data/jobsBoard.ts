export type ServiceCategory =
  | "Sales & Outbound"
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
