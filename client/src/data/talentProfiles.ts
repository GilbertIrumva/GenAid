export interface TalentProfile {
  slug: string;
  name: string;
  title: string;
  location: string;
  languages: string[];
  expertise: string[];
  bio: string;
  readiness: "Ready for Placement" | "Interviewing";
  image?: string;
}

export const talentProfiles: TalentProfile[] = [
  {
    slug: "amina-hassan",
    name: "Amina Hassan",
    title: "Customer Support and CRM Associate",
    location: "Kakuma, Kenya",
    languages: ["English (B2)", "Swahili", "French"],
    expertise: [
      "CRM ticket handling",
      "Email and chat support",
      "Data entry and quality checks",
    ],
    bio: "Amina completed Generation Aid digital literacy and business communication tracks and now supports multilingual customer workflows.",
    readiness: "Ready for Placement",
  },
  {
    slug: "david-otieno",
    name: "David Otieno",
    title: "Data Annotation and AI Ops Assistant",
    location: "Kakuma, Kenya",
    languages: ["English (B2)", "Swahili"],
    expertise: [
      "Text and image annotation",
      "Prompt testing",
      "Spreadsheet and reporting operations",
    ],
    bio: "David specializes in human-in-the-loop AI tasks with strong attention to detail and consistent quality assurance performance.",
    readiness: "Interviewing",
  },
  {
    slug: "fatuma-abdi",
    name: "Fatuma Abdi",
    title: "Virtual Assistant and Outreach Coordinator",
    location: "Kakuma, Kenya",
    languages: ["English (B2)", "Arabic", "Swahili"],
    expertise: [
      "Calendar and admin support",
      "Lead research",
      "Community and client communication",
    ],
    bio: "Fatuma supports startup operations through structured admin systems, outreach coordination, and multilingual communication.",
    readiness: "Ready for Placement",
  },
];
