export interface ProgramGoal {
  title: string;
  description: string;
}

export interface ProgramComponent {
  title: string;
  description: string;
}

export interface ProgramQuote {
  text: string;
  author: string;
  role?: string;
}

export interface DetailedProgram {
  id: string;
  slug?: string;
  title: string;
  category: string;
  tagline?: string;
  speaker?: string;
  partner?: string;
  body: string;
  image: string;
  features: string[];
  problemStatement?: string;
  goals?: ProgramGoal[];
  targetAudience?: string;
  whyItMatters?: string;
  components?: ProgramComponent[];
  gains?: string[];
  howToJoin?: string;
  specialHighlight?: {
    title: string;
    description: string;
  };
  vision?: string;
  quote?: ProgramQuote;
  bookingUrl?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const defaultPrograms: DetailedProgram[] = [
  {
    id: "learning-through-play",
    slug: "learning-through-play",
    title: "Learning through Play: Empowering Kakuma's Children",
    category: "Playful Learning & SEL",
    partner: "Humanitarian Resilience Aid (HRA)",
    body: '"Learning through Play: Empowering Kakuma\'s Children" is a transformative project designed by Humanitarian Resilience Aid (HRA) to address the educational and psychological needs of children in the Kakuma Refugee Camp. This project integrates playful learning, social and emotional learning (SEL), and basic computer skills training, targeting children whose educational journeys have been disrupted by war and conflict.',
    image: "/img/programs/hero.jpg",
    problemStatement:
      "The children of Kakuma refugee camp have faced significant disruption due to war and conflict, affecting their educational and emotional development. Traditional educational approaches often fail to address the trauma and unique needs of refugee children, hindering their ability to learn and thrive.",
    goals: [
      {
        title: "Enhance Learning Outcomes",
        description:
          "Utilize play to make learning engaging and accessible, helping children to grasp basic literacy and numeracy.",
      },
      {
        title: "Improve Emotional Resilience",
        description:
          "Incorporate SEL to help children develop coping mechanisms, emotional awareness, and interpersonal skills.",
      },
      {
        title: "Boost Digital Literacy",
        description:
          "Equip children with fundamental computer skills, preparing them for future educational and employment opportunities.",
      },
    ],
    targetAudience:
      "Children aged 6–12 residing in the Kakuma refugee camp, with a special focus on those who have had limited or no access to formal education.",
    components: [
      {
        title: "Playful Learning Curriculum",
        description:
          "Develop and deliver a curriculum that uses interactive games, educational play, and creative problem solving to teach core academic and life skills.",
      },
      {
        title: "Social and Emotional Learning (SEL) Workshops",
        description:
          "Regular workshops focusing on foundational SEL competencies: self-awareness, self-management, social awareness, relationship skills, and responsible decision-making.",
      },
      {
        title: "Basic Computer Skills Training",
        description:
          "Weekly hands-on computer classes using engaging, interactive software to teach typing, digital literacy, internet navigation, and basic software use.",
      },
    ],
    features: [
      "Play-Based Literacy & Numeracy",
      "Social & Emotional Learning (SEL)",
      "Interactive Digital & Computer Skills",
      "Trauma-Informed Safe Learning Spaces",
    ],
    howToJoin:
      "Enrollment is open through Generation Aid community learning centres and local partner schools. Parents, guardians, and educators can register eligible children during intake periods.",
  },
  {
    id: "women-in-ai",
    slug: "women-in-ai",
    title: "Women in AI Program",
    category: "Emerging Tech & AI",
    partner: "Generation Aid Tech Initiative",
    body: "Generation Aid’s Women in AI Program is a three-month learning and fellowship initiative designed to equip refugee women with practical knowledge, confidence, and opportunities in Artificial Intelligence and emerging technologies. The program introduces participants to AI concepts, Generative AI, prompt engineering, responsible AI, digital innovation, and practical AI applications.",
    image: "/img/programs/coding-academy.jpg",
    targetAudience:
      "Primarily for refugee women and young women in Kakuma and surrounding communities interested in technology, innovation, and the future of work. Participants do not need advanced technical backgrounds—just basic digital literacy and an eager commitment to learn.",
    whyItMatters:
      "By increasing women’s access to AI knowledge and networks, Generation Aid aims to reduce the digital and gender gap and ensure that refugee women are not left behind in the rapidly growing AI economy.",
    gains: [
      "Practical skills in Generative AI, prompt engineering, and digital tools",
      "Responsible AI frameworks and technology-driven problem solving",
      "Application of AI for education, research, content creation, and business",
      "Confidence, leadership, and connection with global tech mentors and networks",
    ],
    components: [
      {
        title: "Foundations of AI & Generative Tools",
        description:
          "Hands-on immersion into modern AI models, prompt craft, image generation, and productivity acceleration.",
      },
      {
        title: "Responsible AI & Ethics",
        description:
          "Critical evaluation of bias, data privacy, safety, and community-centered ethical AI practices.",
      },
      {
        title: "Fellowship & Community Capstone",
        description:
          "Collaborative capstone projects designing AI-powered solutions for challenges in refugee communities.",
      },
    ],
    features: [
      "Generative AI & Prompt Engineering",
      "Responsible AI & Digital Ethics",
      "3-Month Fellowship & Mentorship",
      "Community Innovation Capstone Projects",
    ],
    howToJoin:
      "Interested refugee women can follow Generation Aid's official cohort announcements and apply online or at the digital lab. Applicants participate in an introductory interview and onboarding session.",
  },
  {
    id: "storytelling",
    slug: "storytelling",
    title: "Storytelling Program",
    category: "Media & Narrative",
    partner: "Shared Studios & HOME Storytellers",
    body: "Generation Aid’s Storytelling Program, in partnership with Shared Studios and HOME Storytellers, creates a platform for refugees in Kakuma to share their stories, experiences, talents, culture, challenges, and dreams directly with audiences around the world. The program uses storytelling and digital connection to help change the global narrative about refugees.",
    image: "/img/programs/bpo.jpg",
    targetAudience:
      "Open to refugees and community members in Kakuma who have a story, talent, experience, or message they want to share. You do not need to be a professional storyteller—lived experience and creativity are what matter.",
    whyItMatters:
      "Shifts the global narrative from people defined merely by displacement to individuals with voices, skills, vision, and agency. It enables refugees to tell their own stories rather than having others speak for them.",
    gains: [
      "Story crafting, creative writing, and public speaking confidence",
      "Direct engagement with international audiences through live portal connections",
      "Media production basics including photography, audio recording, and video narrative",
      "Global networking, advocacy reach, and professional visibility",
    ],
    components: [
      {
        title: "Narrative & Creative Expression Workshops",
        description:
          "Guidance on story arc, character development, cultural heritage preservation, and authentic voice.",
      },
      {
        title: "Digital Portals & Global Dialogues",
        description:
          "Live interactive audio-visual sessions connecting Kakuma storytellers with universities, museums, and forums worldwide.",
      },
      {
        title: "Multimedia Story Publishing",
        description:
          "Publishing written essays, photo essays, and podcasts on international platforms and partner channels.",
      },
    ],
    features: [
      "First-Person Narrative Workshops",
      "Global Live Portals & Dialogues",
      "Multimedia & Digital Content Creation",
      "Advocacy & International Reach",
    ],
    howToJoin:
      "Refugees and community members can express their interest via Generation Aid or submit a short story concept during open pitch windows.",
  },
  {
    id: "creative-arts",
    slug: "creative-arts",
    title: "Creative Art Program",
    category: "Arts & Culture",
    partner: "Kakuma Art Project (KAP)",
    body: "Generation Aid’s Creative Art Program, developed in collaboration with the Kakuma Art Project, creates opportunities for refugees to use art for self-expression, storytelling, cultural preservation, and economic empowerment. It gives refugee artists a platform to share their talents and perspectives with local and international audiences.",
    image: "/img/programs/artists-painting.jpg",
    targetAudience:
      "Refugees and displaced individuals in Kakuma interested in creative arts—including painting, drawing, photography, crafts, poetry, creative writing, music, and performance. Both emerging and experienced artists are welcome.",
    whyItMatters:
      "Refugees are often portrayed only through displacement and hardship. Creative arts provide a narrative of talent, identity, resilience, and beauty, transforming artistic passion into sustainable livelihoods.",
    specialHighlight: {
      title: "The Senga Gallery & Community Art Space",
      description:
        "A dedicated cultural venue in Kakuma where refugee artists exhibit their original work, engage with visitors, and sell artwork to international collectors and partners.",
    },
    gains: [
      "Fine arts and mixed-media technique refinement",
      "Portfolio development and professional artist branding",
      "Exhibition opportunities at Senga Gallery and global partner galleries",
      "Direct income generation through art sales, commissions, and craft licensing",
    ],
    components: [
      {
        title: "Studio Workshops & Masterclasses",
        description:
          "Hands-on sessions with experienced guest artists covering painting, sculpture, sketching, and traditional textile crafts.",
      },
      {
        title: "Curated Exhibitions & Senga Gallery",
        description:
          "Regular physical and digital exhibitions showcasing refugee artists to buyers, NGOs, and art enthusiasts globally.",
      },
      {
        title: "Art Business & Fair-Trade Pricing",
        description:
          "Practical guidance on artwork valuation, shipping logistics, copyright, and ethical marketplace representation.",
      },
    ],
    features: [
      "Painting, Drawing & Sculpture Studios",
      "Senga Gallery Exhibitions & Sales",
      "Masterclasses with International Artists",
      "Fair-Trade Creative Livelihoods",
    ],
    howToJoin:
      "Artists can bring samples of their work to Senga Gallery or sign up for upcoming masterclasses during community open calls.",
  },
  {
    id: "climate-action",
    slug: "climate-action",
    title: "Climate Action & Sustainable Agriculture",
    category: "Environment & Green Livelihoods",
    partner: "Kakuma Green Resilience Initiative",
    body: "Generation Aid’s Climate Action program is a refugee-led initiative that combines environmental restoration, climate-smart agriculture, and sustainable livelihood development. The program supports refugees and host communities in Kakuma and Kalobeyei to respond to ecological challenges while creating reliable food production and income generation.",
    image: "/img/programs/art-landscape.jpg",
    targetAudience:
      "Refugees, women, youth, local farmers, aspiring green entrepreneurs, and host-community members, especially those vulnerable to food insecurity and drought.",
    whyItMatters:
      "Kakuma faces severe climatic stress, including recurring drought, soil degradation, and water scarcity. Empowering community members with regenerative practices ensures self-sufficiency and environmental regeneration.",
    gains: [
      "Climate-smart farming techniques and permaculture design",
      "Drip irrigation, water harvesting, and organic composting skills",
      "Tree nursery management and agroforestry practices",
      "Green enterprise setup, produce marketing, and cooperatives management",
    ],
    components: [
      {
        title: "Climate-Smart Farming & Kitchen Gardens",
        description:
          "Training in drought-resilient crops, micro-gardening, soil enrichment, and water-conserving drip irrigation.",
      },
      {
        title: "Tree Nurseries & Reforestation",
        description:
          "Community seedbeds propagating indigenous shade, fruit, and nitrogen-fixing trees for camp-wide greening.",
      },
      {
        title: "Green Entrepreneurship & Cooperatives",
        description:
          "Supporting farmers with seedling sales, vegetable markets, and sustainable bio-waste composting businesses.",
      },
    ],
    features: [
      "Climate-Smart Agriculture & Permaculture",
      "Micro-Drip Irrigation & Water Harvesting",
      "Indigenous Tree Nurseries & Reforestation",
      "Green Agribusiness & Food Security",
    ],
    howToJoin:
      "Join as a trainee farmer, volunteer nursery keeper, or community climate champion by connecting with the Generation Aid eco-hub.",
  },
  {
    id: "social-emotional-learning",
    slug: "social-emotional-learning",
    title: "Children’s Social-Emotional Learning & Yoga Programme",
    category: "Child Wellbeing & Mindfulness",
    partner: "My Little Zen & The LEGO Foundation",
    body: "The Generation Aid Children’s Social-Emotional Learning (SEL) and Yoga Programme, implemented with My Little Zen and in partnership with the LEGO Foundation, creates a safe, playful, and supportive environment where refugee children develop emotional, social, and physical wellbeing through yoga, mindfulness, breathing exercises, movement, and play.",
    image: "/img/programs/hero.jpg",
    targetAudience:
      "Refugee and vulnerable children in Kakuma and surrounding communities, especially those coping with displacement, disrupted education, and challenging camp conditions.",
    whyItMatters:
      "Children affected by conflict require specialized emotional care and safe spaces to release stress, process emotions, and build social trust with peers and mentors.",
    vision:
      "To raise a generation of confident, resilient, compassionate, and emotionally healthy refugee children who are better prepared to learn, build positive relationships, and contribute to their communities.",
    gains: [
      "Emotional self-awareness, stress reduction, and healthy coping tools",
      "Improved focus, concentration, and classroom readiness",
      "Physical flexibility, balance, motor coordination, and body awareness",
      "Empathy, kindness, conflict resolution, and teamwork skills",
    ],
    components: [
      {
        title: "Mindfulness & Yoga Play Sessions",
        description:
          "Child-friendly movement, stretching, and guided mindfulness activities that make emotional regulation fun.",
      },
      {
        title: "Breathwork & Calm-Down Strategies",
        description:
          "Teaching simple breathing techniques that children can use anytime they feel overwhelmed, scared, or anxious.",
      },
      {
        title: "Lego-Powered Playful Learning",
        description:
          "Cooperative building exercises that foster teamwork, creative problem-solving, and emotional expression.",
      },
    ],
    features: [
      "Mindful Movement & Children's Yoga",
      "Breathwork & Emotional Self-Regulation",
      "LEGO® Playful Teamwork Workshops",
      "Safe, Trauma-Informed Community Spaces",
    ],
    howToJoin:
      "Children participate through Generation Aid learning centers. Parents, caregivers, schools, and community partners can register children at the start of each term.",
  },
  {
    id: "advocacy",
    slug: "advocacy",
    title: "Global Refugee Advocacy & Inclusion",
    category: "Advocacy & Thought Leadership",
    speaker: "Hubert Senga | Founder & CEO, Generation Aid",
    partner: "International Alliances & Global Platforms",
    body: "Hubert Senga is a refugee advocate, social entrepreneur, and digital inclusion leader dedicated to empowering displaced communities through digital skills, innovative education, and pathways to meaningful employment. As a Congolese refugee and founder of Generation Aid in Kakuma, Kenya, Hubert works to bridge literacy, digital access, and unemployment gaps while connecting refugees to opportunities in the global economy. A recognized voice on refugee-led solutions and economic inclusion, Hubert has advocated for refugees and Refugee-Led Organizations through platforms including PBS News, FRANCE 24, the International Labour Organization (ILO), and Accountability Lab East & Southern Africa (ALESA).",
    image: "/img/heroes/about.jpg",
    problemStatement:
      "Traditional humanitarian approaches often view refugees merely as recipients of emergency aid rather than professionals, innovators, and contributors. In the wake of critical funding cuts, the need for refugee self-reliance, cross-border remote work rights, and direct support for Refugee-Led Organizations (RLOs) is more urgent than ever.",
    whyItMatters:
      "Refugees bring immense talent, resilience, and vision. Hubert’s advocacy moves the conversation from 'How do we help refugees?' to 'How do we remove the structural barriers preventing refugees from contributing?' Connecting lived experience from Kakuma directly with global decision-making spaces ensures sustainable and dignity-centered policies.",
    quote: {
      text: "I am not advocating for refugees because I feel sorry for them. I advocate because I have seen what refugees can accomplish when they are given access to opportunity. The problem is not a lack of talent in refugee communities; it is a lack of access to education, technology, employment, capital, networks and decision-making spaces. My work is about changing that.",
      author: "Hubert Senga",
      role: "Founder & CEO, Generation Aid",
    },
    goals: [
      {
        title: "From Dependency to Opportunity",
        description:
          "Champion a paradigm shift positioning refugees as skilled contributors, remote professionals, and innovators in the global economy.",
      },
      {
        title: "Global Policy & Media Visibility",
        description:
          "Bring the realities of Kakuma directly into international media, UN & ILO forums, technology summits, and development policy roundtables.",
      },
      {
        title: "Strategic Corporate & Donor Alliances",
        description:
          "Foster cross-border partnerships for inclusive remote employment, digital infrastructure, and direct funding for refugee-led initiatives.",
      },
    ],
    targetAudience:
      "UN & multilateral forums, international refugee conferences, TED-style platforms, technology summits, universities, think tanks, global journalists, corporate leaders, and impact investors looking for authentic lived-experience leadership.",
    components: [
      {
        title: "Keynote Speaking & Panel Leadership",
        description:
          "Delivering compelling keynote addresses and panel insights at global refugee, technology, and international development conferences.",
      },
      {
        title: "International Media & Policy Dialogues",
        description:
          "Providing informed commentary for international news outlets (PBS News, France 24, etc.) on aid cuts, digital inclusion, and economic mobility.",
      },
      {
        title: "Inclusive Employment & Partner Consultations",
        description:
          "Advising global corporations, tech platforms, and donors on structuring remote work pipelines and ethical refugee talent hiring.",
      },
    ],
    features: [
      "UN & Multilateral Policy Representation",
      "PBS News & France 24 Media Feature",
      "Global Keynote & Panel Speaking",
      "Corporate Remote Hiring Consultations",
    ],
    howToJoin:
      "Book a speaking engagement, media interview, or 15-minute introductory partnership call with Hubert Senga to explore strategic collaborations.",
    bookingUrl: "/contact?subject=Speaking+or+Partnership+with+Hubert+Senga",
    ctaText: "Book a 15-min Call with Hubert",
    ctaLink: "/contact?subject=Speaking+or+Partnership+with+Hubert+Senga",
  },
  {
    id: "english-language-literacy",
    slug: "english-language-literacy",
    title: "English Language & Literacy Skills Program",
    category: "Language & Career Readiness",
    partner: "Kakuma Community Education Hub",
    body: "Generation Aid’s English Language & Literacy Skills Program is designed for refugees and displaced young people in Kakuma and Kalobeyei who want to strengthen their ability to communicate in English. The program supports learners at all levels—beginners, intermediate, and advanced—focusing on practical speaking, reading, writing, and professional workplace communication.",
    image: "/img/programs/english.png",
    targetAudience:
      "Refugee youth, women, and community members facing language barriers when trying to access education, vocational training, digital opportunities, freelancing, and essential services.",
    whyItMatters:
      "English proficiency is a vital foundation for economic independence. It unlocks access to international scholarships, remote work opportunities, professional networking, and active participation in the global digital economy.",
    gains: [
      "Stronger Spoken & Conversational Communication (fluency, pronunciation, vocabulary)",
      "Functional Reading & Writing Skills (forms, professional documents, business emails)",
      "Increased Confidence in Classrooms, Job Interviews, and Community Meetings",
      "Access to Vocational Training, Online Courses, and Higher Education Scholarships",
      "Career & Employment Readiness (CV preparation, professional workplace etiquette)",
      "Digital Economy Participation (navigating remote platforms, client communication)",
    ],
    components: [
      {
        title: "Everyday Conversational & Functional English",
        description:
          "Interactive speaking and listening practice focused on everyday life, community leadership, and practical dialogue.",
      },
      {
        title: "Professional Reading & Workplace Writing",
        description:
          "Writing clear CVs, cover letters, formal emails, official forms, and business communication.",
      },
      {
        title: "Interview Mastery & Presentation Skills",
        description:
          "Mock interview sessions, public speaking workshops, and digital communication tailored for remote client collaboration.",
      },
    ],
    features: [
      "Beginner to Advanced Learning Tracks",
      "Workplace & Business English",
      "CV & Interview Preparation",
      "Pathway to Higher Ed & Remote Jobs",
    ],
    howToJoin:
      "Follow Generation Aid announcements for the next cohort intake. Space is allocated based on a brief placement assessment at our learning center.",
  },
  {
    id: "womens-digital-skills",
    slug: "womens-digital-skills",
    title: "Women’s Digital Skills for Economic Empowerment",
    category: "Women & Digital Livelihoods",
    partner: "In partnership with RefugePoint",
    body: "Generation Aid’s Women’s Digital Skills for Economic Empowerment Program is a 12-week initiative designed to equip refugee women in Kakuma with practical digital skills that open pathways to employment, entrepreneurship, freelancing, remote work, and active participation in the global digital economy. Implemented in partnership with RefugePoint, the program connects digital training with structured career mentorship and economic opportunities.",
    image: "/img/programs/computer-literacy.jpg",
    targetAudience:
      "Refugee women aged 18–35 living in Kakuma Refugee Camp who have basic computer literacy and English skills, motivated to build careers, launch businesses, or access digital work.",
    whyItMatters:
      "Refugee women often face steep barriers to economic opportunity, including limited access to technology, digital skills, and professional networks. Equipping women with digital proficiency bridges this gender divide and creates direct pathways from learning to sustainable income generation.",
    gains: [
      "💼 Employment Readiness & Workplace Confidence",
      "💻 Practical Digital, Office & Cloud Tools Mastery",
      "🌍 Remote Work & Freelancing Market Exposure",
      "🚀 Entrepreneurship & Small Business Management",
      "🧑‍💼 1-on-1 Career Guidance & Mentorship",
      "🤝 Connection to Global Professional Networks & Job Linkages",
    ],
    components: [
      {
        title: "12-Week Core Digital Skills & Cloud Productivity",
        description:
          "Comprehensive training in essential office applications, cloud collaboration, data management, and digital research.",
      },
      {
        title: "Remote Work & Freelancing Bootcamp",
        description:
          "Setting up freelance profiles, client communication, task execution, time management, and online payments.",
      },
      {
        title: "Mentorship & Job-Linkage Support",
        description:
          "Direct mentorship from tech professionals, portfolio building, and connections to inclusive employers and partners.",
      },
    ],
    features: [
      "12-Week Intensive Curriculum",
      "RefugePoint Partnership & Mentorship",
      "Remote Work & Freelancing Exposure",
      "Direct Job-Linkage Opportunities",
    ],
    howToJoin:
      "Eligible refugee women aged 18–35 can register during upcoming cohort intake calls announced jointly by Generation Aid and RefugePoint.",
  },
  {
    id: "computer-literacy-skills",
    slug: "computer-literacy-skills",
    title: "Computer Literacy Skills Program for Inclusivity",
    category: "Digital Literacy & Inclusion",
    tagline: "Equipping refugees and underserved communities with essential digital foundations for life, school, and work.",
    body: "Generation Aid’s Computer Literacy Skills Program equips refugees and underserved community members with essential digital skills needed for education, employment, entrepreneurship, and everyday life. The program provides practical, hands-on training in computer use, digital tools, internet navigation, communication, online safety, and workplace applications. It serves as an entry point for refugees who want to build confidence with technology and progress toward more advanced digital skills and economic opportunities.",
    image: "/img/programs/coding-academy.jpg",
    problemStatement:
      "In displaced settings like Kakuma, the digital divide remains one of the largest obstacles to education, job readiness, and economic inclusion. Many community members lack basic computer access and foundational digital skills, locking them out of online services, employment platforms, and global learning opportunities.",
    targetAudience:
      "Refugees, youth, women, and underserved community members in Kakuma looking to build foundational digital competencies from the ground up.",
    whyItMatters:
      "Participants will gain practical computer and digital skills that can be immediately applied in school, work, business, and daily life. Participants will learn how to confidently operate a computer, create and manage documents and files, use Microsoft Office tools, navigate the internet, communicate through email, conduct online research, and practice safe and responsible digital habits. The program also provides a foundation for progressing into advanced digital skills, programming, AI, freelancing, remote work, and other digital livelihood opportunities.",
    gains: [
      "💻 Computer Skills: Learn to confidently use computers and essential software.",
      "📝 Office Skills: Develop practical skills in Word, Excel, and PowerPoint.",
      "🌐 Internet & Email: Learn to browse, research, communicate, and use online platforms.",
      "🔐 Digital Safety: Learn how to protect your accounts, data, and personal information online.",
      "💼 Job Readiness: Build digital skills needed for modern workplaces and employment opportunities.",
      "🚀 Digital Career Pathways: Gain a foundation for freelancing, remote work, entrepreneurship, programming, and AI.",
      "🌍 Confidence & Opportunity: Become a confident digital user and gain greater access to education, work, and the global digital economy.",
    ],
    components: [
      {
        title: "Hands-on Computer & Operating System Fundamentals",
        description:
          "Learn keyboard navigation, file management, operating system settings, and core computer troubleshooting.",
      },
      {
        title: "Microsoft Office & Workplace Applications",
        description:
          "Practical mastery of Word for document creation, Excel for spreadsheets and budgeting, and PowerPoint for presentations.",
      },
      {
        title: "Internet Navigation, Email & Digital Research",
        description:
          "Professional communication via email, web research strategies, online forms, and digital collaboration tools.",
      },
      {
        title: "Digital Safety, Cybersecurity & Account Protection",
        description:
          "Protecting personal data, secure passwords, recognizing scams and phishing, and responsible digital habits.",
      },
    ],
    features: [
      "Foundational Computer & OS Mastery",
      "Microsoft Office (Word, Excel, PowerPoint)",
      "Internet Research & Professional Email",
      "Cybersecurity & Online Data Safety",
      "Pathway to AI, Coding & Remote Work",
    ],
    howToJoin:
      "Interested participants can contact Generation Aid to find out about upcoming training cohorts, registration dates, eligibility requirements, schedules, and available spaces. Training opportunities may vary depending on the current cohort and program capacity.",
    ctaText: "Enroll / Inquire About Cohort",
    ctaLink: "/contact",
  },
];


