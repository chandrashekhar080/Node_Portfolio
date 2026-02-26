
import { PortfolioData, Lead } from './types';

const STORAGE_KEY = 'portfolio_cms_data_v2';
const LEADS_KEY = 'portfolio_leads_v2';

export const DEFAULT_DATA: PortfolioData = {
  general: {
    name: "Chandra Shekhar",
    role: "Senior Full Stack Engineer & UI Expert",
    description: "I engineer high-performance, scalable web ecosystems using the latest modern stack. Specializing in React, Node.js, and Cloud Architecture to bring complex visions to life with pixel-perfect precision.",
    logoText: "CSG",
    heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    cvUrl: "#",
    email: "chandrashekhar@example.com",
    whatsapp: "+919876543210",
    location: "New Delhi, India"
  },
  meta: {
    title: "CSG | Professional Portfolio",
    description: "Full Stack Development portfolio of Chandra Shekhar (CSG). Expert in React, Node, and UI/UX.",
    keywords: "CSG, Developer, Full Stack, React, Chandra Shekhar, Portfolio"
  },
  socials: [
    { id: '1', platform: 'Github', url: 'https://github.com', icon: 'Github' },
    { id: '2', platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin' },
    { id: '3', platform: 'Twitter', url: 'https://twitter.com', icon: 'Twitter' },
    { id: '4', platform: 'Instagram', url: 'https://instagram.com', icon: 'Instagram' }
  ],
  projects: [
    { 
      id: '1', 
      title: "Fintech Dashboard", 
      description: "A real-time financial analytics engine with complex data visualizations and secure transactional workflows.", 
      image: "https://images.unsplash.com/photo-1551288049-bbbda5366391?q=80&w=1000&auto=format&fit=crop",
      tags: ["React", "TypeScript", "D3.js"],
      link: "#",
      category: "Fintech"
    },
    { 
      id: '2', 
      title: "Cloud Stream", 
      description: "Distributed video streaming platform with edge caching and low-latency delivery protocols.", 
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
      tags: ["Node.js", "Redis", "AWS"],
      link: "#",
      category: "Saas"
    }
  ],
  skills: [
    { id: '1', name: "React / Next.js", level: 98, category: "Frontend" },
    { id: '2', name: "Node.js / Express", level: 92, category: "Backend" },
    { id: '3', name: "PostgreSQL / MongoDB", level: 88, category: "Database" },
    { id: '4', name: "UI/UX & Branding", level: 95, category: "Design" }
  ],
  services: [
    { id: '1', title: "Full Stack Development", description: "End-to-end web solutions from robust database architecture to interactive frontends.", icon: "Code" },
    { id: '2', title: "UI/UX Strategy", description: "Deep analysis of user behavior to craft intuitive interfaces that drive engagement.", icon: "Palette" },
    { id: '3', title: "API Integration", description: "Seamless connection of third-party services and custom API development.", icon: "Server" }
  ],
  settings: {
    contactTarget: 'all',
    theme: 'dark',
    showHeroImage: true
  }
};

export const getPortfolioData = (): PortfolioData => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : DEFAULT_DATA;
};

export const savePortfolioData = (data: PortfolioData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getLeads = (): Lead[] => {
  const leads = localStorage.getItem(LEADS_KEY);
  return leads ? JSON.parse(leads) : [];
};

export const saveLead = (lead: Lead) => {
  const currentLeads = getLeads();
  localStorage.setItem(LEADS_KEY, JSON.stringify([lead, ...currentLeads]));
};

export const deleteLead = (id: string) => {
  const currentLeads = getLeads();
  localStorage.setItem(LEADS_KEY, JSON.stringify(currentLeads.filter(l => l.id !== id)));
};
