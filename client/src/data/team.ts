export interface TeamMember {
  key: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
}

export const team: TeamMember[] = [
  {
    key: "hubert",
    name: "Hubert Senga",
    role: "Founder & CEO",
    bio: "Congolese refugee, social entrepreneur and changemaker. Founded Generation Aid in 2019 to rewrite the narrative for refugee youth in Kakuma.",
    image: "/hubert.jpg",
    linkedin: "https://www.linkedin.com/in/hubert-sengap/",
  },
  {
    key: "charles",
    name: "Charles Ochiro",
    role: "Operations Manager",
    bio: "Leads day-to-day operations, logistical planning and program delivery across the Generation Aid hub in Kakuma.",
    image: "/Cherles P.jpg",
  },
  {
    key: "kwot",
    name: "Kwot Ajak",
    role: "Center Admin",
    bio: "Oversees center administration, facility management and student coordination for all training cohorts.",
    image: "/Kwot Ajak A.jpg",
  },
  {
    key: "melodie",
    name: "Melodie Cochet",
    role: "Partnership Lead",
    bio: "Cultivates strategic relationships, donor engagement and international collaborations to scale refugee-led impact.",
    image: "/Melody Coche.png",
  },
  {
    key: "aisling",
    name: "Aisling Rachel",
    role: "Partnership Coordinator",
    bio: "Coordinates partner communications, onboarding and joint initiatives across our global supporter network.",
    image: "/Aisling Kennedy.jpg",
  },
  {
    key: "rigobert",
    name: "Rigobert Kisimba",
    role: "Finance Lead",
    bio: "Directs financial planning, audits, budget execution and transparent donor stewardship.",
    image: "/Rigobert KS .jpg",
  },
  {
    key: "bernard",
    name: "Bernard Mapembe",
    role: "Treasurer / Finance Associate",
    bio: "Supports financial tracking, expenditure reporting and compliance across all active community projects.",
    image: "/bernard.png",
  },
  {
    key: "carla",
    name: "Carla Sinatra",
    role: "Adviser",
    bio: "Provides strategic guidance, governance advisory and mentorship to executive leadership.",
    image: "/Carla Sinatra.jpg",
  },
];
