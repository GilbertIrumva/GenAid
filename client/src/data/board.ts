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
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
  },
  {
    key: "treasurer",
    name: "Treasurer",
    role: "Finance & oversight",
    bio: "Oversees financial stewardship, audits and transparent reporting to partners and donors.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
  },
  {
    key: "secretary",
    name: "Board Secretary",
    role: "Governance & compliance",
    bio: "Maintains board records, governance policies and ensures compliance with statutory obligations.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",
  },
];
