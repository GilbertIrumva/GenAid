export type PartnerCategory =
  | "Strategic"
  | "Funding"
  | "Implementation"
  | "Corporate";

export interface Partner {
  key: string;
  name: string;
  category: PartnerCategory;
  description: string;
  url?: string;
  /** Optional logo URL. If omitted, the card renders an initials avatar. */
  logo?: string;
}

export const partners: Partner[] = [
  {
    key: "unhcr",
    name: "UNHCR",
    category: "Strategic",
    description:
      "Long-standing collaboration on protection, education access and refugee-led programming inside the Kakuma camp.",
    url: "https://www.unhcr.org/",
    logo: "https://www.google.com/s2/favicons?domain=unhcr.org&sz=128",
  },
  {
    key: "globalgiving",
    name: "GlobalGiving",
    category: "Funding",
    description:
      "Our primary international donation platform — providing the rails for individual giving and corporate matching campaigns.",
    url: "https://www.globalgiving.org/",
    logo: "https://www.google.com/s2/favicons?domain=globalgiving.org&sz=128",
  },
  {
    key: "refugepoint",
    name: "RefugePoint",
    category: "Implementation",
    description:
      "Implementing partner on durable solutions, livelihoods training and resettlement-ready skills programmes.",
    url: "https://www.refugepoint.org/",
    logo: "https://www.google.com/s2/favicons?domain=refugepoint.org&sz=128",
  },
  {
    key: "salesforce",
    name: "Salesforce.org",
    category: "Corporate",
    description:
      "Technology partner — providing the CRM backbone for our beneficiary tracking, alumni engagement and donor stewardship.",
    url: "https://www.salesforce.org/",
    logo: "https://www.google.com/s2/favicons?domain=salesforce.com&sz=128",
  },
  {
    key: "lwf",
    name: "Lutheran World Federation",
    category: "Implementation",
    description:
      "Joint delivery of education programming and shared infrastructure across the Kalobeyei integrated settlement.",
    url: "https://www.lutheranworld.org/",
    logo: "https://www.google.com/s2/favicons?domain=lutheranworld.org&sz=128",
  },
  {
    key: "konexio",
    name: "Konexio Africa",
    category: "Strategic",
    description:
      "Pan-African network partner connecting refugee-led organisations with digital-skills curricula, mentorship and cross-border learning exchanges.",
    url: "https://www.konexio.eu/",
    logo: "https://www.google.com/s2/favicons?domain=konexio.eu&sz=128",
  },
  {
    key: "turkana",
    name: "Turkana County Government",
    category: "Strategic",
    description:
      "Host-community engagement, business permits and joint youth-employment initiatives across Turkana West.",
    url: "https://www.turkana.go.ke/",
    logo: "https://www.google.com/s2/favicons?domain=turkana.go.ke&sz=128",
  },
];

export const partnershipBenefits = [
  {
    key: "rooted",
    title: "Community-rooted delivery",
    body: "Every program is designed and run by refugees themselves — meaning higher uptake, lower cost-per-beneficiary and outcomes that stick.",
  },
  {
    key: "measured",
    title: "Measured impact",
    body: "We track every learner from intake through graduation and into employment. Quarterly reports tied to your funding, no exceptions.",
  },
  {
    key: "visibility",
    title: "Brand & ESG visibility",
    body: "Co-branded campaigns, on-the-ground photography and named-room sponsorship in our Digital Community Hub.",
  },
  {
    key: "talent",
    title: "Talent pipeline",
    body: "Direct hiring access to our Generation Jobs graduates — designers, writers, developers, virtual assistants and customer-support specialists.",
  },
];
