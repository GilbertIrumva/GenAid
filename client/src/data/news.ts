/**
 * Press mentions and media coverage of Generation Aid.
 *
 * Update this list as new articles are published. Each entry renders a card
 * on the `/news` page with the source, date, headline, summary, and an
 * external link. Keep summaries to one or two sentences.
 */
export interface NewsItem {
  /** Stable slug used as the React key. */
  key: string;
  /** Name of the outlet / publication. */
  source: string;
  /** ISO 8601 date (YYYY-MM-DD) — used for sorting and locale formatting. */
  date: string;
  /** Headline as it appears on the source page. */
  title: string;
  /** Short summary written by us (~30–50 words). */
  summary: string;
  /** Optional category / kicker shown above the title. */
  category?: string;
  /** External link to the article. */
  url?: string;
  /** Cover image used on the news page. Topical stock or article photo. */
  image: string;
}

export const news: NewsItem[] = [
  {
    key: "rli-forum-2025",
    source: "Refugee-Led Innovation Forum",
    date: "2025-11-04",
    category: "Recognition",
    title: "Generation Aid joins East African refugee-led innovators in Nairobi",
    summary:
      "Our team was invited to share the Generation Aid EdTech and livelihoods model with refugee-led organisations from five East African countries during the regional forum.",
    image: "/img/news/rli-forum-2025.jpg",
  },
  {
    key: "kakuma-ict-cohort-2025",
    source: "Kakuma News Reflector",
    date: "2025-08-22",
    category: "Programs",
    title: "Largest ICT cohort to date completes digital-literacy course in Kakuma",
    summary:
      "A feature on the 120 learners — the majority young women — who graduated from our 2025 Basic ICT & Digital Literacy programme inside the camp.",
    image: "/img/news/kakuma-ict-cohort-2025.jpg",
  },
  {
    key: "globalgiving-spotlight-2025",
    source: "GlobalGiving",
    date: "2025-06-10",
    category: "Fundraising",
    title: "Project spotlight: Humanitarian resilience aid for refugee youth",
    summary:
      "GlobalGiving featured our active campaign supporting reskilling, education and employment pathways for refugee youth in Kakuma.",
    url: "https://www.globalgiving.org/donate/103731/humanitarian-resilience-aid/",
    image: "/img/news/globalgiving-spotlight-2025.jpg",
  },
  {
    key: "tailoring-exchange-2025",
    source: "Turkana Today",
    date: "2025-04-18",
    category: "Partnership",
    title: "Refugee-led tailoring exchange links Kakuma and Kalobeyei",
    summary:
      "Coverage of the first inter-camp peer-training week, where graduates from our dressmaking program ran a five-day curriculum exchange with women's groups in Kalobeyei.",
    image: "/img/news/tailoring-exchange-2025.jpg",
  },
  {
    key: "unhcr-livelihoods-2024",
    source: "UNHCR Kenya",
    date: "2024-12-02",
    category: "Sector report",
    title: "Refugee-led organisations driving livelihoods innovation",
    summary:
      "Generation Aid is cited among community-led groups expanding skills training and self-reliance opportunities for refugees in Turkana West.",
    image: "/img/news/unhcr-livelihoods-2024.jpg",
  },
  {
    key: "founding-story-2023",
    source: "The Standard",
    date: "2023-09-15",
    category: "Profile",
    title: "From learner to leader: the refugee youth rebuilding their own classrooms",
    summary:
      "A profile of our founding team and the original vision that launched Generation Aid as a refugee-led education initiative in Kakuma.",
    image: "/img/news/founding-story-2023.jpg",
  },
];
