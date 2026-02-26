
export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  category: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioData {
  general: {
    name: string;
    role: string;
    description: string;
    logoText: string;
    heroImage: string;
    cvUrl: string;
    email: string;
    whatsapp: string;
    location: string;
  };
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  socials: SocialLink[];
  projects: Project[];
  skills: Skill[];
  services: Service[];
  settings: {
    contactTarget: 'email' | 'whatsapp' | 'admin' | 'all';
    theme: 'dark' | 'light';
    showHeroImage: boolean;
  };
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}
