export interface Cause {
  key: string;
  title: string;
  description: string;
  image: string;
  goal: number;
  raised: number;
  donateUrl: string;
}

export const causes: Cause[] = [
  {
    key: "hub",
    title: "A Hub of Hope in the Heart of Kakuma",
    description:
      "Help us expand our Digital Community Hub — workstations, solar power and high-speed internet for refugee youth.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
    goal: 50000,
    raised: 18250,
    donateUrl:
      "https://www.globalgiving.org/donate/103731/humanitarian-resilience-aid/",
  },
  {
    key: "jobs",
    title: "Empowering Refugees with Generation Jobs",
    description:
      "Train refugee youth in remote work skills and connect them to real, paying international contracts.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
    goal: 30000,
    raised: 12400,
    donateUrl:
      "https://www.globalgiving.org/donate/103731/humanitarian-resilience-aid/",
  },
  {
    key: "artists",
    title: "Empowering Refugee Artists",
    description:
      "Support the Kakuma Art Project and the Senga Gallery — materials, workshops and global exhibitions.",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80",
    goal: 20000,
    raised: 6800,
    donateUrl:
      "https://www.globalgiving.org/donate/103731/humanitarian-resilience-aid/",
  },
];
