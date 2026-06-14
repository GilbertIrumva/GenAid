export type PartnerCategory =
  | "Strategic"
  | "Funding"
  | "Implementation"
  | "Corporate";

export interface Partner {
  name: string;
  category: PartnerCategory;
  description: string;
  url?: string;
  /** Optional logo URL. If omitted, the card renders an initials avatar. */
  logo?: string;
}

export const partners: Partner[] = [
  {
    name: "UNHCR",
    category: "Strategic",
    description:
      "Long-standing collaboration on protection, education access and refugee-led programming inside the Kakuma camp.",
    url: "https://www.unhcr.org/",
  },
  {
    name: "GlobalGiving",
    category: "Funding",
    description:
      "Our primary international donation platform — providing the rails for individual giving and corporate matching campaigns.",
    url: "https://www.globalgiving.org/",
  },
  {
    name: "RefugePoint",
    category: "Implementation",
    description:
      "Implementing partner on durable solutions, livelihoods training and resettlement-ready skills programmes.",
    url: "https://www.refugepoint.org/",
  },
  {
    name: "Salesforce.org",
    category: "Corporate",
    description:
      "Technology partner — providing the CRM backbone for our beneficiary tracking, alumni engagement and donor stewardship.",
    url: "https://www.salesforce.org/",
  },
  {
    name: "Lutheran World Federation",
    category: "Implementation",
    description:
      "Joint delivery of education programming and shared infrastructure across the Kalobeyei integrated settlement.",
    url: "https://www.lutheranworld.org/",
  },
  {
    name: "Turkana County Government",
    category: "Strategic",
    description:
      "Host-community engagement, business permits and joint youth-employment initiatives across Turkana West.",
  },
];

export const partnershipBenefits = [
  {
    title: "Community-rooted delivery",
    body: "Every program is designed and run by refugees themselves — meaning higher uptake, lower cost-per-beneficiary and outcomes that stick.",
  },
  {
    title: "Measured impact",
    body: "We track every learner from intake through graduation and into employment. Quarterly reports tied to your funding, no exceptions.",
  },
  {
    title: "Brand & ESG visibility",
    body: "Co-branded campaigns, on-the-ground photography and named-room sponsorship in our Digital Community Hub.",
  },
  {
    title: "Talent pipeline",
    body: "Direct hiring access to our Generation Jobs graduates — designers, writers, developers, virtual assistants and customer-support specialists.",
  },
];
