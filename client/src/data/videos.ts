export interface VideoItem {
  /** YouTube video id (the part after ?v=). Set null for a placeholder. */
  youtubeId: string | null;
  title: string;
  description: string;
  date?: string;
}

export const videos: VideoItem[] = [
  {
    youtubeId: null,
    title: "Inside the Generation Aid Digital Hub",
    description:
      "A walkthrough of our community workspace in Kakuma — workstations, solar power and the team behind it.",
    date: "Coming soon",
  },
  {
    youtubeId: null,
    title: "From Bootcamp to First Remote Job",
    description:
      "Graduates share their journey from the Remote Work Bootcamp to landing real, paid international contracts.",
    date: "Coming soon",
  },
  {
    youtubeId: null,
    title: "The Senga Gallery — Art Crossing Borders",
    description:
      "Behind the scenes at the first art gallery in Kakuma Refugee Camp.",
    date: "Coming soon",
  },
];
