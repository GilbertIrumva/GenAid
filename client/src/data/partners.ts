export type PartnerCategory =
  | "Strategic"
  | "Funding"
  | "Implementation"
  | "Corporate";

export interface Partner {
  key: string;
  name: string;
  category?: string;
  description?: string;
  url?: string;
  /** Optional logo URL. If omitted, the card renders an initials avatar. */
  logo?: string;
}

export const partners: Partner[] = [
  {
    key: "unhcr",
    name: "UNHCR",
    category: "Strategic",
    url: "https://www.unhcr.org/",
    logo: "/partners/UN HCR.png",
  },
  {
    key: "globalgiving",
    name: "Global Giving",
    category: "Funding",
    url: "https://www.globalgiving.org/",
    logo: "/partners/GlobalGiving-logo.png",
  },
  {
    key: "konexio",
    name: "Konexio Africa",
    category: "Strategic",
    url: "https://www.konexio.eu/",
    logo: "/partners/konexio.png",
  },
  {
    key: "refugepoint",
    name: "Refugee Point",
    category: "Implementation",
    url: "https://www.refugepoint.org/",
    logo: "/partners/refugee point.png",
  },
  {
    key: "svcf",
    name: "Silicon Valley Community Foundation",
    category: "Funding",
    url: "https://www.siliconvalleycf.org/",
    logo: "/partners/SVCF.png",
  },
  {
    key: "stem-access",
    name: "Stem Access Foundation",
    category: "Strategic",
    url: "https://stemaccessfoundation.org/",
    logo: "/partners/Stem Access.png",
  },
  {
    key: "lego-foundation",
    name: "The LEGO Foundation",
    category: "Strategic",
    url: "https://learningthroughplay.com/",
    logo: "/partners/the Lego foundation.jpeg",
  },
  {
    key: "mama-hope",
    name: "MAMA Hope",
    category: "Strategic",
    url: "https://www.mamahope.org/",
    logo: "/partners/mama hope.jpeg",
  },
  {
    key: "accountability-lab",
    name: "Accountability Lab",
    category: "Implementation",
    url: "https://accountabilitylab.org/",
    logo: "/partners/Accountability Lab.jpeg",
  },
  {
    key: "close-the-gap",
    name: "Close the Gap",
    category: "Corporate",
    url: "https://www.close-the-gap.org/",
    logo: "/partners/Close-the-gap.png",
  },
  {
    key: "icdl",
    name: "ICDL",
    category: "Strategic",
    url: "https://icdl.org/",
    logo: "/partners/ICDL.png",
  },
  {
    key: "my-little-zen",
    name: "My Little Zen",
    category: "Funding",
    url: "https://mylittlezen.com/",
    logo: "/partners/My little zen.jpeg",
  },
];

export const partnershipBenefits = [
  {
    key: "rooted",
    title: "Community rooted delivery",
    body: "Every program is designed and run by refugees themselves meaning higher uptake, lower cost per beneficiary and outcomes that stick.",
  },
  {
    key: "measured",
    title: "Measured impact",
    body: "We track every learner from intake through graduation and into employment. Quarterly reports tied to your funding, no exceptions.",
  },
  {
    key: "visibility",
    title: "Brand and ESG visibility",
    body: "Co branded campaigns, on the ground photography and named room sponsorship in our Digital Community Hub.",
  },
  {
    key: "talent",
    title: "Talent pipeline",
    body: "Direct hiring access to our Generation Jobs graduates: designers, writers, developers, virtual assistants and customer support specialists.",
  },
];
