export interface Program {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  createdAt: string;
}

export interface Story {
  _id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  createdAt: string;
}

export interface Partner {
  _id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
}

export interface ImpactMetric {
  _id: string;
  title: string;
  value: number;
  icon: string;
  order: number;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
  createdAt?: string;
}
