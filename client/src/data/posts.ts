export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  cover?: string;
  /** Paragraph blocks. Wrap **bold** by hand if needed later. */
  content: string[];
}

export const posts: BlogPost[] = [
  {
    slug: "how-digital-skills-are-transforming-refugee-livelihoods",
    title: "How Digital Skills Are Transforming Refugee Livelihoods",
    date: "June 12, 2025",
    author: "Hubert Senga",
    cover: "/img/stories/coding.jpg",
    excerpt:
      "Explore how practical computer and digital skills training is creating sustainable pathways out of dependency for refugees in Kakuma, turning potential into real economic empowerment.",
    content: [
      "In Kakuma Refugee Camp and Kalobeyei Settlement, traditional humanitarian aid provides vital survival support, but digital skills provide long-term freedom and economic independence.",
      "By equipping refugees and vulnerable youth with foundational computer literacy, graphic design, content writing, data entry, and digital marketing, Generation Aid is enabling young people to compete in the digital economy without having to leave their community.",
      "Our graduates are proving every day that talent is equally distributed across the world, even if opportunity is not. Practical digital education transforms lives, builds self-reliance, and provides sustainable livelihoods for entire families.",
    ],
  },
  {
    slug: "from-kakuma-to-the-global-workforce",
    title: "From Kakuma to the Global Workforce: Success Stories from Generation Jobs",
    date: "May 28, 2025",
    author: "Generation Aid Team",
    cover: "/img/stories/leila.jpg",
    excerpt:
      "Discover how Generation Jobs connects skilled refugee professionals and graduates directly to remote employment, freelance contracts, and global business opportunities.",
    content: [
      "Generation Jobs is Generation Aid's dedicated employment linkage initiative, matching vetted graduates from our training bootcamps with remote employers, international agencies, and global companies.",
      "Through structured mentorship, client communication workshops, and high-speed internet workstations at our hub, talented refugee youth are delivering high-quality work across software development, administrative support, translation, and digital design.",
      "These success stories demonstrate the power of refugee-led innovation: moving from humanitarian relief to sustainable economic dignity and global inclusion.",
    ],
  },
  {
    slug: "empowering-women-through-skills-and-entrepreneurship",
    title: "Empowering Women Through Skills and Entrepreneurship",
    date: "May 10, 2025",
    author: "Sarah K.",
    cover: "/img/stories/tailoring.jpg",
    excerpt:
      "Highlighting our women-focused programs in technology, tailoring, and business development that break down systemic barriers and foster financial independence.",
    content: [
      "Refugee women often face compounding obstacles to education and income generation. Generation Aid’s dedicated Women in AI, Digital Inclusion, and Tailoring programs provide safe, supportive spaces to learn, create, and lead.",
      "Through hands-on vocational training, seed funding support, and business mentorship, women graduates are launching community micro-enterprises, supporting their households, and serving as role models for younger generations.",
      "Investing in women's economic empowerment creates a multiplier effect that elevates the health, education, and resilience of the entire community.",
    ],
  },
  {
    slug: "building-partnerships-that-create-lasting-change",
    title: "Building Partnerships That Create Lasting Change",
    date: "April 22, 2025",
    author: "Hubert Senga",
    cover: "/img/stories/hubert.jpg",
    excerpt:
      "Why collaborative partnerships between Refugee-Led Organizations, international NGOs, academic institutions, and private companies are the key to scalable impact.",
    content: [
      "Real, enduring change cannot happen in isolation. Generation Aid collaborates closely with local authorities, international NGOs, educational foundations, and private tech companies to scale high-impact programs.",
      "By combining grassroots refugee insight with partner resources and global networks, we co-design solutions that address real community needs and deliver measurable, accountable outcomes.",
      "We invite forward-thinking organizations, employers, and philanthropic partners to collaborate with us in expanding opportunities for displaced communities.",
    ],
  },
  {
    slug: "inside-our-digital-skills-training-centre",
    title: "Inside Our Digital Skills Training Centre",
    date: "April 05, 2025",
    author: "Tech Training Team",
    cover: "/home.jpg",
    excerpt:
      "A behind-the-scenes look at daily life in our Kakuma training facility, where learners collaborate, innovate, and master tools for the modern workplace.",
    content: [
      "Step inside Generation Aid's training centre in Kakuma: a vibrant, bustling hub where learners of diverse backgrounds gather around laptops, engage in collaborative coding sessions, and practice professional communications.",
      "With solar-powered workstations, dedicated mentors, and peer-to-peer study circles, our centre provides an inspiring learning environment where refugee youth turn curiosity into market-ready capabilities.",
      "The centre represents hope, discipline, and community resilience in action every single day.",
    ],
  },
  {
    slug: "youth-leadership-refugees-driving-community-transformation",
    title: "Youth Leadership: Refugees Driving Community Transformation",
    date: "March 18, 2025",
    author: "Hubert Senga",
    cover: "/img/stories/yusuf.jpg",
    excerpt:
      "How refugee youth are stepping up as educators, project leads, and community advocates to shape solutions from within Kakuma and Kalobeyei.",
    content: [
      "As a refugee-led organization, Generation Aid believes that those closest to the challenges are best positioned to lead the solutions. Our programs are designed, managed, and delivered by refugee youth.",
      "By cultivating youth leadership through mentorship and real project responsibilities, we empower young changemakers to advocate for their communities, drive social cohesion, and build a brighter future.",
      "Locally led leadership ensures that our interventions remain deeply empathetic, cost-effective, culturally grounded, and sustainable.",
    ],
  },
  {
    slug: "volunteer-stories-working-alongside-refugee-innovators",
    title: "Volunteer Stories: Working Alongside Refugee Innovators",
    date: "March 02, 2025",
    author: "Community Outreach",
    cover: "/img/stories/coding.jpg",
    excerpt:
      "Inspiring reflections from local and international volunteers who mentor students, share professional expertise, and build meaningful cross-cultural connections.",
    content: [
      "Volunteering with Generation Aid is a two-way exchange of inspiration, knowledge, and solidarity. Global mentors and local community volunteers work side-by-side with our learners.",
      "Whether delivering virtual guest lectures on AI, conducting CV reviews, or facilitating English conversation circles, our volunteers help bridge global knowledge gaps while gaining profound respect for refugee resilience.",
      "Join our volunteer network today to contribute your skills and walk alongside community innovators.",
    ],
  },
  {
    slug: "annual-impact-report-year-of-growth-and-opportunity",
    title: "Annual Impact Report: A Year of Growth and Opportunity",
    date: "January 15, 2025",
    author: "Generation Aid Leadership",
    cover: "/img/stories/hubert.jpg",
    excerpt:
      "A comprehensive review of our milestones, program expansions, learner outcomes, and transparent financial reporting across 2024–2025.",
    content: [
      "We are proud to share our Annual Impact Report, celebrating over 1,600+ individuals directly impacted and 1,200+ reached through community programs across Kakuma and Kalobeyei.",
      "This past year saw the launch of Generation Jobs, expansion of our Computer Literacy initiatives, and new partnerships that connected more than 50 graduates to meaningful income opportunities.",
      "We extend our heartfelt gratitude to every donor, partner, volunteer, and community member who made these milestones possible. Read the full report to explore our journey and vision for the year ahead.",
    ],
  },
];
