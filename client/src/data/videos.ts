export interface VideoItem {
  /** YouTube video id (the part after ?v=). Set null for a placeholder or when using direct videoUrl. */
  youtubeId: string | null;
  /** Direct mp4 or video stream URL */
  videoUrl?: string;
  poster?: string;
  title: string;
  description: string;
  date?: string;
}

export const videos: VideoItem[] = [
  {
    youtubeId: "R0TnjpZkQjc",
    title: "Generation Aid: Empowering Refugees & Community in Kakuma",
    description:
      "An inside look at Generation Aid's mission, community learning center, and refugee led educational and digital programs in Kakuma Refugee Camp.",
    date: "Official Channel",
  },
  {
    youtubeId: "AKa99PyFqUg",
    title: "The Launch of Generation Jobs: Unlocking Employment Opportunities",
    description:
      "Watch the official launch of Generation Jobs, our brand new initiative to unlock remote and local employment pathways for talented refugee youth.",
    date: "Generation Jobs",
  },
  {
    youtubeId: "FC2ds91MJJk",
    title: "Who Is a Refugee and Why We Do What We Do?",
    description:
      "A personal reflection on the real meaning of being a refugee, the power of human potential, and why Generation Aid exists to create opportunity.",
    date: "Reflections & Mission",
  },
  {
    youtubeId: "vIK-iBooRfo",
    title: "PBS News: Foreign Aid Cuts Threaten Kakuma Programs",
    description:
      "Generation Aid founder Hubert Senga speaks on PBS News Weekend about how foreign aid budget cuts affect refugees in Kakuma and the need for sustainable solutions.",
    date: "March 2025",
  },
  {
    youtubeId: "_VxfVs41DRM",
    title: "France 24: Le cri d'alarme d'un réfugié au Kenya après la fin de l'USAID",
    description:
      "Hubert Senga speaks on France 24 about the devastating impact of sudden humanitarian aid cuts in Kakuma and the urgent necessity of refugee self-reliance and digital inclusion.",
    date: "July 2025",
  },
  {
    youtubeId: null,
    videoUrl: "/videos/akia-success-story.mp4",
    poster: "/videos/akia-poster.jpg",
    title: "From Education to Earning: Akia's Story",
    description:
      "Watch Akia Abil share how the Digital Skills for Women program funded by RefugePoint helped her transition from learning computer basics to working as a Curriculum Associate at Konexio Africa.",
    date: "August 2026",
  },
];
