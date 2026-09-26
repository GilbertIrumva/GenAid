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
    youtubeId: null,
    videoUrl:
      "https://dms.licdn.com/playlist/vid/v2/D4D05AQHwh8xJLRFmjQ/mp4-640p-30fp-crf28/B4DaA.QDK3KcBk-/0/1787750808082?e=2147483647&v=beta&t=8UNIrbpwSNZuC4nezPpJPjFL34VFF7aLDDaU1E7fADU",
    poster:
      "https://media.licdn.com/dms/image/v2/D4D05AQHwh8xJLRFmjQ/videocover-high/B4DaA.QDK3KcBM-/0/1787750799675?e=2147483647&v=beta&t=Vk_godxuPXWuHjVHuGE_yU797aZ8G74-qJ1gj1cV3vg",
    title: "From Education to Earning: Akia's Story",
    description:
      "Watch Akia Abil share how the Digital Skills for Women program funded by RefugePoint helped her transition from learning computer basics to working as a Curriculum Associate at Konexio Africa.",
    date: "August 2026",
  },
];
