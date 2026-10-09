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
    key: "empoweringRefugees",
    title: "Empowering Refugees in Kakuma with Generation Aid",
    description:
      "Equipping refugees with vocational, digital, entrepreneurship, and English language skills through practical training, mentorship, and youth focused programs to achieve self reliance.",
    image: "/img/causes/hub.jpg",
    goal: 60000,
    raised: 3936,
    donateUrl:
      "https://www.globalgiving.org/donate/103731/humanitarian-resilience-aid/",
  },
  {
    key: "createJobsWomen",
    title: "Empowering Refugees with Generation Jobs Project",
    description:
      "Supporting employment pathways that connect talented refugee professionals with remote jobs, while investing in refugee women through vocational training and entrepreneurship.",
    image: "/img/causes/create-jobs.jpg",
    goal: 50000,
    raised: 362,
    donateUrl:
      "https://www.globalgiving.org/donate/103731/humanitarian-resilience-aid/",
  },
  {
    key: "emergencyFoodMedical",
    title: "Emergency Food & Medical Support",
    description:
      "Helping vulnerable refugee families in Kakuma and Kalobeyei access life saving food assistance and essential healthcare when crises and acute emergencies arise.",
    image: "/programs/emergency/globalgiving-23.jpg",
    goal: 30000,
    raised: 15600,
    donateUrl:
      "https://www.globalgiving.org/projects/emergency-refugees-in-kakuma-are-suffering/",
  },
  {
    key: "languageOfHope",
    title: "Language of Hope for African & Afghan Refugees",
    description:
      "Providing structured English literacy and communication training to overcome language barriers for women, girls, and children from Afghanistan, Pakistan, and across Africa.",
    image: "/programs/english (1).jpg",
    goal: 10000,
    raised: 7061,
    donateUrl:
      "https://www.globalgiving.org/donate/103731/humanitarian-resilience-aid/",
  },
  {
    key: "agrihopeInitiative",
    title: "AgriHope Initiative for Resilience and Livelihood",
    description:
      "Combating chronic food insecurity in Kakuma through permaculture, micro drip irrigation, climate smart agriculture, and kitchen gardens for youth and women.",
    image: "/img/causes/agrihope.jpg",
    goal: 13800,
    raised: 411,
    donateUrl:
      "https://www.globalgiving.org/donate/103731/humanitarian-resilience-aid/",
  },
];
