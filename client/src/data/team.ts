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
    image: "/Hubert Senga.jpg",
  },
  {
    key: "charles",
    name: "Charles Ochiro",
    role: "Operations Manager",
    bio: "Leads day-to-day operations, logistical planning and program delivery across the Generation Aid hub in Kakuma.",
    image: "/Cherles P.jpg",
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
];

export const advisors: TeamMember[] = [
  {
    key: "carla",
    name: "Carla Sinatra",
    role: "Strategic Advisory Board Member",
    bio: "Global development advisor guiding institutional partnerships and sustainable growth across international programs. Dedicated to empowering refugee-led leadership and community innovation.",
    image: "/Carla Sinatra.jpg",
  },
  {
    key: "mollie",
    name: "Mollie Bi",
    role: "Operations & Finance Advisor",
    bio: "Operations and finance leader with 8+ years of experience building scalable systems across East Africa. Holds a BA from San José State University with cross-sector expertise in microfinance, e-mobility, and nonprofit growth.",
    image: "/Mollie.jpg",
  },
  {
    key: "arturo",
    name: "Arturo Osorio",
    role: "Strategy & Governance Advisor",
    bio: "Professor of Practice and executive advisor specializing in social entrepreneurship, strategy, and governance. Focuses on scalable organizational models and impactful community development.",
    image: "/Arturo Osorio.jpg",
  },
];


