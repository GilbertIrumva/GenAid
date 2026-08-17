export interface DetailedProgram {
  id: string;
  title: string;
  body: string;
  image: string;
  features: string[];
}

export const defaultPrograms: DetailedProgram[] = [
  {
    id: "computer-literacy",
    title: "Basic ICT & Computer Literacy",
    body: "Comprehensive training in essential digital skills, operating systems, internet navigation, office software, and digital communication tools tailored for refugee youth.",
    image: "/img/programs/computer-literacy.jpg",
    features: [
      "Computer Fundamentals & OS Usage",
      "Office Applications & Cloud Workspace",
      "Internet Research & Online Safety",
      "Email & Professional Communication",
    ],
  },
  {
    id: "tailoring",
    title: "Tailoring & Fashion Design",
    body: "Vocational garment creation and entrepreneurship training empowering individuals—especially women—to create quality apparel, build income, and achieve self-reliance.",
    image: "/img/programs/tailoring.jpg",
    features: [
      "Garment Pattern Design & Cutting",
      "Sewing Machine Operation & Maintenance",
      "Textile Craft & Product Design",
      "Small Business & Pricing Basics",
    ],
  },
  {
    id: "english",
    title: "English & Professional Communication",
    body: "Interactive language instruction focusing on practical speaking, reading, writing, and professional vocabulary needed for higher education, remote work, and international clients.",
    image: "/img/programs/english.png",
    features: [
      "Functional Spoken English",
      "Business Email Writing",
      "Interview & Presentation Skills",
      "Digital Collaboration Vocabulary",
    ],
  },
];
