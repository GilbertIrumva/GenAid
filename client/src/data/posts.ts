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
    slug: "generation-jobs-launches-in-kakuma",
    title: "Generation Jobs Launches in Kakuma",
    date: "June 6, 2025",
    author: "Hubert",
    excerpt:
      "A new era of refugee digital jobs in Kakuma has begun. Generation Aid proudly announces the launch of Generation Jobs — a transformative employment initiative for skilled refugees and host community members.",
    content: [
      "A new era of refugee digital jobs in Kakuma has begun. At Generation Aid, we are proud to announce the official launch of Generation Jobs — a transformative employment initiative designed to provide skilled refugees and host community members with real, paid opportunities in the global digital economy.",
      "Generation Jobs connects trained graduates of our Remote Work Bootcamp with vetted clients around the world, covering graphic design, content writing, virtual assistance, digital marketing, web development and more. Each placement is supported by a mentor, a dedicated workstation in our Digital Community Hub, and reliable high-speed internet.",
      "Why it matters: In Kakuma, formal employment is scarce. By unlocking remote work, we are turning years of skills training into real income for hundreds of families — and proving that refugee talent belongs in the global workforce.",
      "If you are a business looking to hire skilled refugee professionals — or a donor who wants to fund the next cohort — reach out via our Contact page. The next generation is ready.",
    ],
  },
  {
    slug: "how-foreign-aid-cuts-threaten-refugee-led-initiatives",
    title:
      "How Foreign Aid Cuts Threaten Refugee-Led Initiatives: A Call for Sustainable Solutions",
    date: "March 5, 2025",
    author: "Admin",
    excerpt:
      "Foreign aid cuts are undermining refugee-led tech programs in Kakuma, threatening digital training and education for thousands. Our CEO Hubert Senga recently spoke with PBS News about the growing crisis.",
    content: [
      "Foreign aid cuts and the policy shifts driving them are undermining refugee-led tech programs across Kakuma — threatening digital training, education and the livelihoods of thousands of young people who depend on these services to break the cycle of dependency.",
      "Our CEO, Hubert Senga, recently spoke with PBS News about a growing crisis: as global donor priorities shift, refugee-led organisations are often the first to lose funding — even though they deliver some of the most cost-effective, community-rooted programs in the camp.",
      "The path forward is not more dependency on shrinking external aid. It is investing in sustainable, refugee-led models: remote work pipelines, social enterprises, and cooperative businesses that generate their own revenue while keeping decision-making in the hands of the community.",
      "Generation Aid is doubling down on this approach — building income-generating programs (Generation Jobs, the Artisan Cooperative) that can keep our doors open even when external funding falters. We invite partners, donors and policy-makers to stand with refugee-led solutions before the gap grows wider.",
    ],
  },
  {
    slug: "onboarding-remote-employees",
    title: "Onboarding Remote Employees",
    date: "February 15, 2025",
    author: "Admin",
    excerpt:
      "Onboarding remote employees in Kakuma. Generation Aid prepares youth for this shift. In the digital era, remote employment is key for people in remote areas like Kakuma Refugee Camp.",
    content: [
      "In the digital era, remote employment has become a lifeline for people living in geographically remote areas like the Kakuma Refugee Camp. By providing digital skills, structured onboarding and reliable infrastructure, Generation Aid is opening doors to global job opportunities that did not exist a decade ago.",
      "Onboarding is more than a checklist. It includes communication etiquette across time zones, professional tool use (Slack, Zoom, project boards), expectation-setting with international clients, and the soft skills that turn a freelance gig into a long-term role.",
      "Our graduates are now embedded in remote teams across design, customer support, content and software development. Each successful onboarding is proof that talent is global — opportunity should be too.",
    ],
  },
  {
    slug: "help-us-build-a-hub-of-hope-in-the-heart-of-kakuma",
    title: "Help Us Build a Hub of Hope in the Heart of Kakuma",
    date: "February 15, 2025",
    author: "Admin",
    excerpt:
      "A digital skills centre in Kakuma will create lasting change for refugee youth. Imagine this: a 7×5 metre room changed the lives of over 150 refugees in 2024 — unlocking education, digital skills and jobs.",
    content: [
      "Imagine this: a 7×5 metre room changed the lives of over 150 refugees in 2024 — unlocking access to education, digital skills and paid remote jobs despite the odds.",
      "Now imagine what a purpose-built Digital Community Hub could do. A larger space with reliable solar power, high-speed internet, modern workstations, a dedicated training room and a quiet zone for client calls — built and run by the community it serves.",
      "We are raising funds to build that hub in the heart of Kakuma. Every contribution — large or small — buys equipment, sponsors a learner, or keeps the lights on for another month.",
      "Will you stand with us? Visit our Contact page to learn how to partner, sponsor or donate.",
    ],
  },
  {
    slug: "english-alumni-graduation-2024",
    title: "English Alumni Graduation — December 28, 2024",
    date: "February 15, 2025",
    author: "Admin",
    excerpt:
      "Refugee learners in Kakuma graduate from our English training program — an essential step toward digital empowerment and career readiness.",
    content: [
      "Today we celebrate the incredible achievements of our Basic and Pre-Intermediate English course graduates. This is more than a graduation — it is a testament to resilience, discipline and the power of accessible education.",
      "Strong English communication unlocks the rest of our curriculum: digital skills, remote work, entrepreneurship and beyond. Many of our graduates have already enrolled in the next stage of their journey, joining our digital skills bootcamps.",
      "Congratulations to every learner who walked across the stage. To the families, teachers, volunteers and partners who made it possible — thank you. This is what community-led education looks like.",
    ],
  },
];
