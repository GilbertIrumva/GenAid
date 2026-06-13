export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
}

export const team: TeamMember[] = [
  {
    name: "Hubert Senga",
    role: "Founder & CEO",
    bio: "Congolese refugee, social entrepreneur and changemaker. Founded Generation Aid in 2019 to rewrite the narrative for refugee youth in Kakuma.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80",
    linkedin: "https://www.linkedin.com/in/hubert-sengap/",
  },
  {
    name: "Programs Lead",
    role: "Vocational & Livelihood Programs",
    bio: "Designs and runs our vocational, livelihood and entrepreneurship tracks across the Kakuma camp.",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
  },
  {
    name: "Digital Skills Trainer",
    role: "Remote Work Bootcamp",
    bio: "Mentors learners through graphic design, content writing and virtual-assistant tracks that lead to paid remote contracts.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    name: "Community Lead",
    role: "Outreach & Volunteers",
    bio: "Coordinates volunteers, community partners and intake for every cohort that enters the Generation Aid hub.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",
  },
];
