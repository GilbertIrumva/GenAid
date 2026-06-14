export interface Story {
  slug: string;
  name: string;
  role: string;
  program: string;
  location: string;
  image: string;
  excerpt: string;
  /** Paragraph blocks. */
  content: string[];
}

export const stories: Story[] = [
  {
    slug: "amani-from-trainee-to-remote-designer",
    name: "Amani",
    role: "Remote graphic designer",
    program: "Remote Work Bootcamp",
    location: "Kakuma, Kenya",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&q=80",
    excerpt:
      "From a six-month bootcamp to a long-term contract with a U.S. design studio — Amani now supports five family members from inside the camp.",
    content: [
      "Before joining Generation Aid in 2023, Amani had taught himself the basics of design on a borrowed phone. The hardest part, he says, was not the software — it was access. No reliable power. No stable internet. No client willing to take a chance on a refugee with no portfolio.",
      "He enrolled in our Remote Work Bootcamp in March 2024. Six months of structured training in Figma, brand systems, client communication and time-zone discipline, paired with a workstation in the Digital Community Hub.",
      "By month seven, Amani had landed his first paid gig — a logo for a fitness coach in Cincinnati. Three months later, a U.S. design studio offered him a part-time contract. Today he supports his mother and four siblings entirely from remote work.",
      "“Generation Aid did not give me a job,” he says. “They gave me the tools, the room, and the proof that I belong here. The job came after.”",
    ],
  },
  {
    slug: "mwangi-painting-kakuma-into-galleries",
    name: "Mwangi",
    role: "Visual artist",
    program: "Kakuma Art Project",
    location: "Kakuma, Kenya",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&q=80",
    excerpt:
      "Through the Senga Gallery, Mwangi's paintings have travelled from Kakuma to exhibitions in Nairobi and beyond — telling stories the world rarely hears.",
    content: [
      "Mwangi has been painting since he was twelve. For years he made his own brushes from scavenged materials and used cardboard for canvases. Visibility, not talent, was the missing piece.",
      "The Kakuma Art Project provided studio space, professional materials and, crucially, an exhibition pipeline through the Senga Gallery. His first show in Nairobi sold seven pieces in one weekend.",
      "“For the first time, my paintings are seen — and they tell the story of where I come from,” he says. He now mentors three younger artists in the program, paying forward what he was given.",
    ],
  },
  {
    slug: "leila-english-to-classroom",
    name: "Leila",
    role: "Community English tutor",
    program: "English Language Skills",
    location: "Kakuma, Kenya",
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=900&q=80",
    excerpt:
      "Leila completed all three levels of our English program in 18 months — then came back to teach the next cohort of women in her block.",
    content: [
      "When Leila joined our Basic English class, she could not introduce herself in English. Eighteen months later she had completed the Pre-Intermediate and Advanced courses and was assisting her teacher with conversation practice.",
      "She now leads a women-only evening class in her block — bringing the curriculum to learners who can't easily travel to the main centre. Twenty-three women have completed Basic English under her instruction in the last year.",
      "“The classroom does not have to be a building,” she says. “It has to be a person who believes you can learn.”",
    ],
  },
  {
    slug: "yusuf-from-tailoring-to-cooperative",
    name: "Yusuf",
    role: "Tailoring cooperative founder",
    program: "Tailoring & Dressmaking",
    location: "Kakuma, Kenya",
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=900&q=80",
    excerpt:
      "Yusuf turned a six-month tailoring course into a five-person cooperative that now fulfils school-uniform contracts across the camp.",
    content: [
      "Yusuf's father had been a tailor before the family fled — but the family lost everything when they crossed the border. He saw the Tailoring & Dressmaking Craft Training as a way to rebuild what was lost.",
      "After completing the course and the entrepreneurship module, he convinced four classmates to pool their stipends and rent a shared workshop. The cooperative landed its first school-uniform contract within four months.",
      "Today the cooperative employs five people full-time and trains two new apprentices each year. Yusuf is reinvesting profits to buy a second sewing machine and expand into custom orders for visiting NGO staff.",
    ],
  },
  {
    slug: "fatima-coding-her-future",
    name: "Fatima",
    role: "Junior front-end developer",
    program: "Computer Literacy & Programming",
    location: "Kakuma, Kenya",
    image:
      "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=900&q=80",
    excerpt:
      "Fatima discovered code at our Hub at 17. Two years later she ships React components for a remote agency — and is teaching her younger sister to do the same.",
    content: [
      "Fatima walked into the Digital Community Hub at seventeen looking for a quiet place to study. She left, three hours later, with a browser open to a JavaScript tutorial and a question she has not stopped asking: how does this work?",
      "She moved from Basic ICT to the intro-to-programming track to a self-directed front-end curriculum the team helped her shape. At nineteen she joined a remote agency as a junior developer, building React components for a client portal used by hundreds of small businesses.",
      "Her next goal is to mentor her thirteen-year-old sister through the same path — only faster. “The hardest part was believing it was possible,” she says. “Once you see someone do it, the door opens for everyone behind you.”",
    ],
  },
];
