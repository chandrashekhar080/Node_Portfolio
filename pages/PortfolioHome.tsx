
import React, { useEffect } from 'react';
import { PortfolioData } from '../types';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { DynamicIcon } from '../components/Icons';
import ContactForm from '../components/ContactForm';

interface PortfolioHomeProps {
  data: PortfolioData;
  onThemeToggle: () => void;
}

const PortfolioHome: React.FC<PortfolioHomeProps> = ({ data, onThemeToggle }) => {
  useEffect(() => {
    document.title = data.meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', data.meta.description);
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) metaKeywords.setAttribute('content', data.meta.keywords);
    
    // Scroll to section if hash exists on load
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
        }
      }, 500);
    }
  }, [data]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', '#home');
  };

  return (
    <div className="min-h-screen">
      <Navbar data={data} onThemeToggle={onThemeToggle} />

      {/* Hero Section */}
      <section id="home" className="relative pt-48 pb-24 px-6 overflow-hidden min-h-screen flex items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-accent/10 blur-[150px] rounded-full -z-10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 w-full">
          <div className="flex-1 space-y-10 text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/5 border border-accent/20 text-accent text-xs font-black uppercase tracking-widest">
              Available for Global Projects
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[1.1] tracking-tighter">
              Build. <span className="text-gradient">Innovate.</span><br />
              Scale.
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {data.general.description}
            </p>
            <div className="flex flex-wrap gap-5 justify-center lg:justify-start">
              <a href="#projects" className="px-10 py-5 rounded-2xl bg-gradient-accent text-white font-extrabold transition-all btn-shadow uppercase tracking-wide">
                View My Portfolio
              </a>
              <a href="#contact" className="px-10 py-5 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-extrabold border border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all uppercase tracking-wide">
                Let's Talk
              </a>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-8 pt-6">
              {data.socials.map(social => (
                <a key={social.id} href={social.url} target="_blank" className="text-slate-400 hover:text-accent transition-all transform hover:scale-125">
                  <DynamicIcon name={social.icon} className="w-7 h-7" />
                </a>
              ))}
            </div>
          </div>
          {data.settings.showHeroImage && (
            <div className="flex-1 max-w-lg">
               <div className="relative group">
                    <div className="absolute -inset-6 bg-accent/20 rounded-[2rem] blur-3xl group-hover:bg-accent/30 transition-all duration-700"></div>
                    <div className="relative rounded-[2rem] overflow-hidden border-4 border-white/10 aspect-[4/5] lg:aspect-square shadow-2xl">
                      <img 
                          src={data.general.heroImage} 
                          alt={data.general.name} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    </div>
               </div>
            </div>
          )}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-32 px-6 bg-slate-50 dark:bg-slate-950/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Expert Services</h2>
            <div className="w-20 h-1.5 bg-accent mx-auto rounded-full"></div>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg pt-4">Engineering premium digital solutions tailored to your business needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {data.services.map(service => (
              <div key={service.id} className="p-10 rounded-[2.5rem] bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-accent/40 transition-all group hover:-translate-y-2 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-8 group-hover:bg-accent group-hover:text-white transition-all shadow-inner">
                  <DynamicIcon name={service.icon} className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black mb-4 group-hover:text-accent transition-colors">{service.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-base">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-20">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Latest Works</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg">Showcasing recent full-stack accomplishments and experiments.</p>
            </div>
            <a href="#projects" className="px-8 py-3 rounded-xl border border-accent/30 text-accent font-bold hover:bg-accent hover:text-white transition-all">
              Explore All Projects
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {data.projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-32 px-6 bg-slate-50 dark:bg-slate-950/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Technical <span className="text-accent">Arsenal</span></h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
                I maintain a high-performance tech stack focused on scalability, maintainability, and exceptional user experiences.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
                 {['PostgreSQL', 'Docker', 'AWS', 'GraphQL', 'Next.js', 'Redux'].map(tool => (
                   <div key={tool} className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-sm">
                      <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse"></div>
                      <span className="font-bold text-slate-700 dark:text-slate-200">{tool}</span>
                   </div>
                 ))}
              </div>
            </div>
            <div className="space-y-8 bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-xl">
              {data.skills.map(skill => (
                <div key={skill.id} className="space-y-3">
                  <div className="flex justify-between text-sm font-black uppercase tracking-widest">
                    <span className="text-slate-400">{skill.name}</span>
                    <span className="text-accent">{skill.level}%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-accent rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="space-y-12">
              <div className="space-y-6 text-center lg:text-left">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter">Let's connect <span className="text-accent">&</span> create.</h2>
                <p className="text-slate-500 dark:text-slate-400 text-xl leading-relaxed">Got a vision? Let's turn it into a high-scale reality. Reach out today.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-accent/20 transition-all">
                  <DynamicIcon name="Mail" className="w-8 h-8 text-accent mb-4" />
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Email</p>
                  <p className="text-lg font-bold break-all">{data.general.email}</p>
                </div>
                <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-accent/20 transition-all">
                  <DynamicIcon name="Phone" className="w-8 h-8 text-accent mb-4" />
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">WhatsApp</p>
                  <p className="text-lg font-bold">{data.general.whatsapp}</p>
                </div>
                <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-accent/20 transition-all sm:col-span-2">
                  <DynamicIcon name="MapPin" className="w-8 h-8 text-accent mb-4" />
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Based In</p>
                  <p className="text-lg font-bold">{data.general.location}</p>
                </div>
              </div>
            </div>

            <div className="p-10 md:p-14 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-2xl">
              <ContactForm data={data} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-200 dark:border-white/5 px-6 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="space-y-4 text-center md:text-left">
              <button 
                onClick={scrollToTop}
                className="text-4xl font-black text-gradient uppercase tracking-tighter hover:opacity-80 transition-opacity"
              >
                {data.general.logoText}
              </button>
              <p className="text-slate-500 text-sm font-medium tracking-wide italic">"Excellence is not an act, but a habit."</p>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">© {new Date().getFullYear()} {data.general.name}.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-10">
              {data.socials.map(social => (
                <a key={social.id} href={social.url} target="_blank" className="text-slate-400 hover:text-accent transition-all transform hover:scale-125">
                   <DynamicIcon name={social.icon} className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-200/50 dark:border-white/5 text-center">
             <a href="#home" onClick={scrollToTop} className="text-xs font-bold text-slate-400 hover:text-accent uppercase tracking-[0.2em] transition-colors">Back to top</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioHome;
