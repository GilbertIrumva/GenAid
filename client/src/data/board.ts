export interface BoardMember {
  key: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
}

export const board: BoardMember[] = [
  {
    key: "chair",
    name: "Board Chair",
    role: "Strategy & governance",
    bio: "Provides strategic leadership for the organisation and chairs the board of directors.",
    image: "/img/board/chair.jpg",
  },
  {
    key: "treasurer",
    name: "Treasurer",
    role: "Finance & oversight",
    bio: "Oversees financial stewardship, audits and transparent reporting to partners and donors.",
    image: "/img/board/treasurer.jpg",
  },
  {
    key: "secretary",
    name: "Board Secretary",
    role: "Governance & compliance",
    bio: "Maintains board records, governance policies and ensures compliance with statutory obligations.",
    image: "/img/team/community.jpg",
  },
];
