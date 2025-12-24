import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Skill {
  name: string;
  percentage: number;
  description: string;
  category: "technical" | "soft" | "language";
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface UserProfile {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

export interface GeminiSkillResponse {
  skills: {
    name: string;
    percentage: number;
    description: string;
    category: string;
  }[];
}
export type Project = {
  _createdAt: string;
  title: string;
  description: string; // Arabic description
  _id: string;
  image: SanityImageSource;
  link: string;
  techStack: string[];
};
