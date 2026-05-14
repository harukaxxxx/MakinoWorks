// Profile
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  photo: string;
  socials: SocialLink[];
}

// Experience
export interface Experience {
  id: string;
  period: string;
  title: string;
  organization?: string;
  description: string;
  image?: string;
}

// Skills
export interface Skill {
  name: string;
  level: number;
  maxLevel: number;
}

// Tools
export interface Tool {
  name: string;
  url: string;
  category?: string;
}

// Works / Portfolio
export interface Work {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  image: string;
  url?: string;
  year?: number;
}

// Testimonials
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

// Clients
export interface Client {
  name: string;
  logo: string;
  url?: string;
}