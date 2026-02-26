
import React, { useState, useEffect } from 'react';
import { PortfolioData } from '../types';
import { DynamicIcon } from './Icons';

interface NavbarProps {
  data: PortfolioData;
  onThemeToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ data, onThemeToggle }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', id);
    } else if (id === '#home') {
       window.scrollTo({ top: 0, behavior: 'smooth' });
       window.history.pushState(null, '', '#home');
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-4 dark-glass border-b border-slate-200/10 dark:border-white/10 shadow-lg' 
          : 'py-6 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a 
            href="#home" 
            onClick={(e) => scrollToSection(e, '#home')}
            className="text-3xl font-black tracking-tighter text-gradient uppercase hover:opacity-80 transition-opacity"
          >
            {data.general.logoText}
          </a>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-accent dark:hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            <div className="flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-white/10">
              <button 
                onClick={onThemeToggle}
                className="p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-accent/10 transition-colors"
                title="Toggle Theme"
              >
                <span className="hidden dark:block"><DynamicIcon name="Sun" className="w-5 h-5 text-accent" /></span>
                <span className="block dark:hidden"><DynamicIcon name="Moon" className="w-5 h-5 text-slate-600" /></span>
              </button>
              
              <a 
                href="/#/admin" 
                className="px-5 py-2 rounded-full bg-accent/10 text-accent text-sm font-bold border border-accent/20 hover:bg-gradient-accent hover:text-white transition-all"
              >
                Admin Panel
              </a>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
             <button onClick={onThemeToggle} className="p-2">
                <span className="hidden dark:block"><DynamicIcon name="Sun" className="w-5 h-5 text-accent" /></span>
                <span className="block dark:hidden"><DynamicIcon name="Moon" className="w-5 h-5 text-slate-600" /></span>
             </button>
             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-500 dark:text-white">
                <DynamicIcon name={mobileMenuOpen ? "Trash" : "Layout"} className="w-6 h-6" />
             </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-slate-950 transition-transform duration-500 transform ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'} md:hidden flex flex-col items-center justify-center space-y-8`}>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-4xl font-black text-white hover:text-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="/#/admin" 
            className="px-8 py-4 rounded-xl bg-gradient-accent text-white font-bold"
            onClick={() => setMobileMenuOpen(false)}
          >
            Go to Admin Panel
          </a>
      </div>
    </>
  );
};

export default Navbar;
