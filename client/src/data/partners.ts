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
    logo: "/UN HCR.png",
  },
  {
    key: "globalgiving",
    name: "Global Giving",
    category: "Funding",
    description:
      "Our primary international donation platform — providing the rails for individual giving and corporate matching campaigns.",
    url: "https://www.globalgiving.org/",
    logo: "/GlobalGiving-logo.png",
  },
  {
    key: "konexio",
    name: "Konexio Africa",
    category: "Strategic",
    description:
      "Pan-African network partner connecting refugee-led organisations with digital-skills curricula, mentorship and cross-border learning exchanges.",
    url: "https://www.konexio.eu/",
    logo: "/konexio.png",
  },
  {
    key: "refugepoint",
    name: "Refugee Point",
    category: "Implementation",
    description:
      "Implementing partner on durable solutions, livelihoods training and resettlement-ready skills programmes.",
    url: "https://www.refugepoint.org/",
    logo: "/refugee point.png",
  },
  {
    key: "svcf",
    name: "Silicon Valley Community Foundation",
    category: "Funding",
    description:
      "Philanthropic partner supporting community-driven solutions, capacity building and economic inclusion initiatives.",
    url: "https://www.siliconvalleycf.org/",
    logo: "/SVCF.png",
  },
  {
    key: "stem-access",
    name: "Stem Access Foundation",
    category: "Strategic",
    description:
      "Advancing science, technology, engineering and math education and digital pathways for underserved refugee youth.",
    url: "https://stemaccessfoundation.org/",
    logo: "/Stem Access.png",
  },
  {
    key: "tawingo",
    name: "Tawingo Fund",
    category: "Funding",
    description:
      "Catalytic grantmaker and philanthropic partner empowering grassroots community development and resilience.",
    url: "https://tawingofund.org/",
    logo: "/Tawingo.jpeg",
  },
  {
    key: "mama-hope",
    name: "MAMA Hope",
    category: "Strategic",
    description:
      "Global advocate and partner championing community-led development, self-reliance and sustainable local leadership.",
    url: "https://www.mamahope.org/",
    logo: "/mama hope.jpeg",
  },
  {
    key: "accountability-lab",
    name: "Accountability Lab",
    category: "Implementation",
    description:
      "Partner in fostering integrity, good governance, youth civic engagement and transparent accountability practices.",
    url: "https://accountabilitylab.org/",
    logo: "/Accountability Lab.jpeg",
  },
  {
    key: "close-the-gap",
    name: "Close the Gap",
    category: "Corporate",
    description:
      "Social enterprise bridging the digital divide by providing quality refurbished IT equipment and digital infrastructure.",
    url: "https://www.close-the-gap.org/",
    logo: "/Close-the-gap.png",
  },
  {
    key: "icdl",
    name: "ICDL",
    category: "Strategic",
    description:
      "International certification body delivering globally recognized digital skills standards and workforce readiness.",
    url: "https://icdl.org/",
    logo: "/ICDL.png",
  },
  {
    key: "my-little-zen",
    name: "My Little Zen",
    category: "Funding",
    description:
      "Dedicated partner advancing mental health, wellbeing and creative empowerment for youth and vulnerable communities.",
    url: "https://mylittlezen.com/",
    logo: "/My little zen.jpeg",
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
