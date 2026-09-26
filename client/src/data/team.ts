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
    key: "carla",
    name: "Carla Sinatra",
    role: "Strategic Advisory Board Member",
    bio: "Global development advisor guiding institutional partnerships and sustainable growth across international programs. Dedicated to empowering refugee-led leadership and community innovation.",
    image: "/img/board/Carla Sinatra.jpg",
  },
  {
    key: "mollie",
    name: "Mollie van Horn",
    role: "Operations & Finance Advisor",
    bio: "Operations and finance leader with 8+ years of experience building scalable systems across East Africa. Holds a BA from San José State University with cross-sector expertise in microfinance, e-mobility, and nonprofit growth.",
    image: "/img/board/Mollie van horn.jpg",
  },
  {
    key: "arturo",
    name: "Arturo Osorio",
    role: "Strategy & Governance Advisor",
    bio: "Professor of Practice and executive advisor specializing in social entrepreneurship, strategy, and governance. Focuses on scalable organizational models and impactful community development.",
    image: "/img/board/Arturo Osorio.jpg",
  },
];
