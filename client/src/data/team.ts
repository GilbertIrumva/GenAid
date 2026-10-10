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
    image: "/img/team/Hubert Senga.jpg",
  },
  {
    key: "charles",
    name: "Charles Ochiro",
    role: "Operations Manager",
    bio: "Leads day-to-day operations, logistical planning and program delivery across the Generation Aid hub in Kakuma.",
    image: "/img/team/Cherles P.jpg",
  },
  {
    key: "melodie",
    name: "Melodie Cochet",
    role: "Partnership Lead",
    bio: "Cultivates strategic relationships, donor engagement and international collaborations to scale refugee-led impact.",
    image: "/img/team/Melody Coche.png",
  },
  {
    key: "aisling",
    name: "Aisling Rachel",
    role: "Partnership Coordinator",
    bio: "Coordinates partner communications, onboarding and joint initiatives across our global supporter network.",
    image: "/img/team/Aisling Kennedy.jpg",
  },
  {
    key: "rigobert",
    name: "Rigobert Kisimba",
    role: "Finance Lead",
    bio: "Directs financial planning, audits, budget execution and transparent donor stewardship.",
    image: "/img/team/Rigobert KS .jpg",
  },
  {
    key: "bernard",
    name: "Bernard Mapembe",
    role: "Treasurer / Finance Associate",
    bio: "Supports financial tracking, expenditure reporting and compliance across all active community projects.",
    image: "/img/team/bernard.png",
  },
  {
    key: "nyagoa",
    name: "Santino Nyagoa",
    role: "Project Coordinator",
    bio: "Coordinates project workflows, community field engagement, and grassroots program implementation across Kakuma.",
    image: "/img/team/Santino nyagoa.jpeg",
  },
  {
    key: "jasmine",
    name: "Jasmine Flores",
    role: "Communication Associate",
    bio: "Supports communications, brand narrative, digital storytelling, and media outreach for Generation Aid.",
    image: "/img/team/Jasmine Flores, Communcation associate.png",
  },
  {
    key: "marelle",
    name: "Marielle Williamson",
    role: "Fundraising Coordinator",
    bio: "Leads fundraising campaigns, donor engagement, grant proposals, and sustainable resource mobilization to scale refugee empowerment.",
    image: "/img/team/Marielle Williamson (1).jpg",
  },
];

export const advisors: TeamMember[] = [
  {
    key: "njeri",
    name: "Nancy Njeri",
    role: "Chair of the Board of Directors",
    bio: "Visionary governance and leadership strategist steering Generation Aid's institutional growth, fiduciary stewardship, and long-term impact for displaced communities.",
    image: "/img/board/Nancy Njeri.jpeg",
  },
  {
    key: "hubert-secretary",
    name: "Hubert Senga",
    role: "Board Secretary",
    bio: "Founder and Board Secretary maintaining board records, institutional governance policies, and statutory compliance while aligning executive operations with board stewardship.",
    image: "/img/team/Hubert Senga.jpg",
  },
  {
    key: "carla",
    name: "Carla Sinatra",
    role: "Strategic Advisor",
    bio: "Carla brings decades of experience in business development, media, technology, and entrepreneurship, having spent her career supporting organizations in identifying new opportunities, navigating change, and building sustainable growth.",
    image: "/img/board/Carla Sinatra.jpg",
  },
  {
    key: "mollie",
    name: "Mollie van Horn",
    role: "Strategic Advisor",
    bio: "Mollie has served for 10 years as founding Executive Director of the Tawingo Fund, based out of Boston, MA,  She supports organizations focused on healthcare, disability services, and job training, with a strong belief in empowering people to improve their own lives.",
    image: "/img/board/Mollie van horn.jpg",
  },
  {
    key: "arturo",
    name: "Arturo Osorio",
    role: "Strategic Advisor",
    bio: "Arturo is the Co-founder of The Greenwheels.africa , with  8+ years of experience strengthening startups and mission-driven organizations across East Africa, with expertise in financial management, operations, and process improvement. Holds a BA in International Business and has cross-sector experience in microfinance, electric mobility, and nonprofits.",
    image: "/img/board/Arturo Osorio.jpg",
  },
];
