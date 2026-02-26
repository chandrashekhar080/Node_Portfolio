
import React from 'react';
import { 
  Github, Linkedin, Twitter, ExternalLink, Code, 
  Palette, Terminal, Server, Database, Layers, 
  Mail, Phone, MapPin, Send, MessageSquare, 
  CheckCircle, Globe, Layout, Settings, Image, 
  Plus, Trash, Edit, Save, LogOut, ChevronRight,
  User, Briefcase, Star, Instagram, Youtube, Sun, Moon
} from 'lucide-react';

export const IconMap: Record<string, any> = {
  Github, Linkedin, Twitter, Instagram, Youtube,
  Code, Palette, Terminal, Server, Database, Layers,
  Mail, Phone, MapPin, Send, MessageSquare, Globe, Layout,
  Settings, Image, User, Briefcase, Star, Plus, Trash,
  Edit, Save, LogOut, ChevronRight, ExternalLink, CheckCircle,
  Sun, Moon
};

export const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  const Icon = IconMap[name] || Code;
  return <Icon className={className} />;
};
