export interface VideoItem {
  /** YouTube video id (the part after ?v=). Set null for a placeholder or when using direct videoUrl. */
  youtubeId: string | null;
  /** Direct mp4 or video stream URL */
  videoUrl?: string;
  poster?: string;
  title: string;
  description: string;
  date?: string;
  category?: string;
}

export const videos: VideoItem[] = [
  {
    youtubeId: null,
    videoUrl: "/videos/akia-success-story.mp4",
    poster: "/videos/akia-poster.jpg",
    title: "From Education to Earning: Akia Abil's Story",
    description:
      "Watch Akia Abil share how the Digital Skills for Women program funded by RefugePoint helped her transition from learning computer basics to working as a Curriculum Associate at Konexio Africa.",
    date: "Graduate Testimonial · Kakuma",
    category: "Stories",
  },
  {
    youtubeId: "VRoXjJpB854",
    title: "Employer Testimonial: Inspiring Reflection by Michelle Lee",
    description:
      "Hear firsthand feedback from Michelle Lee on the talent caliber, dedication, and transformative global collaboration delivered by Generation Jobs graduates.",
    date: "Employer Reflection · Generation Jobs",
    category: "Stories",
  },
  {
    youtubeId: "HoWTNc58HZg",
    title: "English Language & Literacy Success Story: Unlocking Possibilities in Kakuma",
    description:
      "Watch refugee students share how practical English communication and literacy opened doors to scholarships, jobs, and renewed hope in Kakuma.",
    date: "Student Success Story · Kakuma",
    category: "Stories",
  },
  {
    youtubeId: "o3gR64PDTZU",
    title: "Emergency Relief & Community Support: Standing Together in Kakuma",
    description:
      "Witness community solidarity and emergency food distribution as refugee leaders step forward during critical humanitarian funding cuts in Kakuma.",
    date: "Community Lifeline · Kakuma",
    category: "Stories",
  },
  {
    youtubeId: "rnSZrhR1PCw",
    title: "Refugee Voices & Lived Experience: Journeys of Transformation",
    description:
      "Inspiring stories and lived experiences of refugee youth in Kakuma turning adversity into opportunity through skills, solidarity, and education.",
    date: "Lived Experience · Kakuma",
    category: "Stories",
  },
  {
    youtubeId: "AKa99PyFqUg",
    title: "The Launch of Generation Jobs: Unlocking Employment Opportunities",
    description:
      "Watch the official launch of Generation Jobs, our brand new initiative to unlock remote and local employment pathways for talented refugee youth.",
    date: "Hub Launch · June 2025",
    category: "Blog & Hub",
  },
  {
    youtubeId: "vIK-iBooRfo",
    title: "PBS News: Foreign Aid Cuts Threaten Kakuma Programs",
    description:
      "Generation Aid founder Hubert Senga speaks on PBS News Weekend about how foreign aid budget cuts affect refugees in Kakuma and the need for sustainable solutions.",
    date: "PBS News Broadcast · March 2025",
    category: "Media",
  },
  {
    youtubeId: "R0TnjpZkQjc",
    title: "Generation Aid: Empowering Refugees & Community in Kakuma",
    description:
      "An inside look at Generation Aid's mission, community learning center, and refugee led educational and digital programs in Kakuma Refugee Camp.",
    date: "Hub Overview · Official Channel",
    category: "Community",
  },
  {
    youtubeId: "FC2ds91MJJk",
    title: "Who Is a Refugee and Why We Do What We Do?",
    description:
      "A personal reflection on the real meaning of being a refugee, the power of human potential, and why Generation Aid exists to create opportunity.",
    date: "Reflections & Mission",
    category: "Mission",
  },
  {
    youtubeId: "_VxfVs41DRM",
    title: "France 24: Le cri d'alarme d'un réfugié au Kenya après la fin de l'USAID",
    description:
      "Hubert Senga speaks on France 24 about the devastating impact of sudden humanitarian aid cuts in Kakuma and the urgent necessity of refugee self-reliance and digital inclusion.",
    date: "France 24 Broadcast · July 2025",
    category: "Media",
  },
];
