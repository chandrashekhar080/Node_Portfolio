
import React, { useState, useEffect } from 'react';
import { PortfolioData, Lead, Project, Skill, Service, SocialLink } from '../types';
import { savePortfolioData, getLeads, deleteLead } from '../store';
import { DynamicIcon, IconMap } from '../components/Icons';

interface AdminDashboardProps {
  data: PortfolioData;
  onLogout: () => void;
  onUpdate: (data: PortfolioData) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ data, onLogout, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'projects' | 'skills' | 'services' | 'leads' | 'settings' | 'socials'>('general');
  const [localData, setLocalData] = useState<PortfolioData>(data);
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    setLeads(getLeads());
  }, []);

  const handleSave = () => {
    onUpdate(localData);
    alert('Portfolio successfully updated!');
  };

  const addItem = (type: 'projects' | 'skills' | 'services' | 'socials') => {
    const newItem: any = { id: Date.now().toString() };
    if (type === 'projects') {
      newItem.title = 'New Project';
      newItem.description = 'Project description...';
      newItem.image = 'https://picsum.photos/600/400';
      newItem.tags = ['React'];
      newItem.link = '#';
      newItem.category = 'General';
    } else if (type === 'skills') {
      newItem.name = 'New Skill';
      newItem.level = 80;
      newItem.category = 'General';
    } else if (type === 'services') {
      newItem.title = 'New Service';
      newItem.description = 'Service description...';
      newItem.icon = 'Code';
    } else if (type === 'socials') {
      newItem.platform = 'Platform';
      newItem.url = 'https://';
      newItem.icon = 'Github';
    }
    setLocalData({ ...localData, [type]: [newItem, ...localData[type]] });
  };

  const deleteItem = (type: 'projects' | 'skills' | 'services' | 'socials', id: string) => {
    const filtered = (localData[type] as any[]).filter(item => item.id !== id);
    setLocalData({ ...localData, [type]: filtered });
  };

  const SidebarItem = ({ id, label, icon }: { id: any, label: string, icon: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        activeTab === id ? 'bg-accent text-slate-950 shadow-lg shadow-accent/20' : 'text-slate-400 hover:bg-slate-800'
      }`}
    >
      <DynamicIcon name={icon} className="w-5 h-5" />
      <span className="font-bold text-sm">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-white/5 p-6 flex flex-col justify-between">
        <div className="space-y-8">
          <div className="px-2">
            <h2 className="text-xl font-black text-gradient uppercase tracking-tighter">CSG ADMIN</h2>
          </div>
          <nav className="space-y-2">
            <SidebarItem id="general" label="Profile" icon="User" />
            <SidebarItem id="projects" label="Projects" icon="Briefcase" />
            <SidebarItem id="skills" label="Skills" icon="Star" />
            <SidebarItem id="services" label="Services" icon="Layers" />
            <SidebarItem id="socials" label="Social Links" icon="Globe" />
            <SidebarItem id="leads" label="Leads" icon="Mail" />
            <SidebarItem id="settings" label="Settings" icon="Settings" />
          </nav>
        </div>
        <button onClick={onLogout} className="mt-8 flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all font-bold text-sm">
          <DynamicIcon name="LogOut" className="w-5 h-5" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto max-h-screen">
        <div className="max-w-4xl mx-auto space-y-10 pb-20">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-black capitalize tracking-tight">{activeTab} Manager</h1>
            <button 
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-gradient-accent text-white font-bold flex items-center gap-2 transition-all shadow-lg btn-shadow"
            >
              <DynamicIcon name="Save" className="w-4 h-4" /> Deploy Updates
            </button>
          </div>

          <div className="bg-slate-900 border border-white/5 rounded-3xl p-8 space-y-8 shadow-2xl">
            
            {activeTab === 'general' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Portfolio Name</label>
                  <input className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none text-slate-200" 
                    value={localData.general.name} onChange={e => setLocalData({...localData, general: {...localData.general, name: e.target.value}})} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Role Title</label>
                  <input className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none text-slate-200" 
                    value={localData.general.role} onChange={e => setLocalData({...localData, general: {...localData.general, role: e.target.value}})} />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Logo Text (e.g. CSG)</label>
                   <input className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none text-slate-200" 
                    value={localData.general.logoText} onChange={e => setLocalData({...localData, general: {...localData.general, logoText: e.target.value}})} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Hero Description</label>
                  <textarea rows={4} className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none resize-none text-slate-200" 
                    value={localData.general.description} onChange={e => setLocalData({...localData, general: {...localData.general, description: e.target.value}})} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Hero Image URL</label>
                  <input className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none text-slate-200" 
                    value={localData.general.heroImage} onChange={e => setLocalData({...localData, general: {...localData.general, heroImage: e.target.value}})} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Contact Email</label>
                  <input className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none text-slate-200" 
                    value={localData.general.email} onChange={e => setLocalData({...localData, general: {...localData.general, email: e.target.value}})} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-500 tracking-widest">WhatsApp Number</label>
                  <input className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none text-slate-200" 
                    value={localData.general.whatsapp} onChange={e => setLocalData({...localData, general: {...localData.general, whatsapp: e.target.value}})} />
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-6">
                <button onClick={() => addItem('projects')} className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl hover:border-accent hover:bg-accent/5 transition-all text-slate-400 font-bold flex items-center justify-center gap-2">
                  <DynamicIcon name="Plus" className="w-5 h-5" /> Add Professional Project
                </button>
                {localData.projects.map((proj, idx) => (
                  <div key={proj.id} className="p-8 bg-slate-950 border border-white/5 rounded-[2rem] relative group animate-in fade-in slide-in-from-bottom-4">
                    <button onClick={() => deleteItem('projects', proj.id)} className="absolute top-6 right-6 p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all">
                      <DynamicIcon name="Trash" className="w-5 h-5" />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-600">Project Title</label>
                          <input className="w-full bg-slate-900 border border-white/10 p-3 rounded-lg outline-none focus:border-accent text-white" 
                            value={proj.title} onChange={e => {
                              const newProjects = [...localData.projects];
                              newProjects[idx].title = e.target.value;
                              setLocalData({...localData, projects: newProjects});
                            }} />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-600">External Link</label>
                          <input className="w-full bg-slate-900 border border-white/10 p-3 rounded-lg outline-none focus:border-accent text-white" 
                            value={proj.link} placeholder="https://" onChange={e => {
                              const newProjects = [...localData.projects];
                              newProjects[idx].link = e.target.value;
                              setLocalData({...localData, projects: newProjects});
                            }} />
                       </div>
                       <div className="md:col-span-2 space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-600">Thumbnail URL</label>
                          <input className="w-full bg-slate-900 border border-white/10 p-3 rounded-lg outline-none focus:border-accent text-white" 
                            value={proj.image} onChange={e => {
                              const newProjects = [...localData.projects];
                              newProjects[idx].image = e.target.value;
                              setLocalData({...localData, projects: newProjects});
                            }} />
                       </div>
                       <div className="md:col-span-2 space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-600">Description</label>
                          <textarea className="w-full bg-slate-900 border border-white/10 p-4 rounded-lg outline-none focus:border-accent resize-none text-slate-300" 
                            rows={3} value={proj.description} onChange={e => {
                              const newProjects = [...localData.projects];
                              newProjects[idx].description = e.target.value;
                              setLocalData({...localData, projects: newProjects});
                            }} />
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-6">
                 <button onClick={() => addItem('skills')} className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl hover:border-accent hover:bg-accent/5 transition-all text-slate-400 font-bold flex items-center justify-center gap-2">
                  <DynamicIcon name="Plus" className="w-5 h-5" /> Add Skill Badge
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {localData.skills.map((skill, idx) => (
                    <div key={skill.id} className="p-5 bg-slate-950 border border-white/5 rounded-2xl flex flex-col gap-4">
                       <div className="flex justify-between items-center">
                          <input className="bg-transparent font-bold text-white outline-none border-b border-transparent focus:border-accent" 
                            value={skill.name} onChange={e => {
                              const newItems = [...localData.skills];
                              newItems[idx].name = e.target.value;
                              setLocalData({...localData, skills: newItems});
                            }} />
                          <button onClick={() => deleteItem('skills', skill.id)} className="text-red-400 opacity-50 hover:opacity-100 transition-opacity">
                            <DynamicIcon name="Trash" className="w-4 h-4" />
                          </button>
                       </div>
                       <div className="flex items-center gap-4">
                          <input type="range" min="0" max="100" className="flex-1 accent-accent" 
                            value={skill.level} onChange={e => {
                              const newItems = [...localData.skills];
                              newItems[idx].level = parseInt(e.target.value);
                              setLocalData({...localData, skills: newItems});
                            }} />
                          <span className="text-xs font-black text-accent w-8">{skill.level}%</span>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6">
                 <button onClick={() => addItem('services')} className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl hover:border-accent hover:bg-accent/5 transition-all text-slate-400 font-bold flex items-center justify-center gap-2">
                  <DynamicIcon name="Plus" className="w-5 h-5" /> Add New Service
                </button>
                {localData.services.map((service, idx) => (
                  <div key={service.id} className="p-6 bg-slate-950 border border-white/5 rounded-2xl relative group">
                    <button onClick={() => deleteItem('services', service.id)} className="absolute top-4 right-4 text-red-400 opacity-50 hover:opacity-100 transition-all">
                      <DynamicIcon name="Trash" className="w-5 h-5" />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input className="bg-transparent text-xl font-bold text-white border-b border-white/10 pb-2 focus:border-accent outline-none" 
                          value={service.title} onChange={e => {
                            const newItems = [...localData.services];
                            newItems[idx].title = e.target.value;
                            setLocalData({...localData, services: newItems});
                          }} />
                        <select className="bg-slate-900 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-accent"
                          value={service.icon} onChange={e => {
                            const newItems = [...localData.services];
                            newItems[idx].icon = e.target.value;
                            setLocalData({...localData, services: newItems});
                          }}>
                          {Object.keys(IconMap).map(icon => <option key={icon} value={icon}>{icon}</option>)}
                        </select>
                        <textarea className="md:col-span-2 bg-transparent border border-white/10 p-3 rounded-lg outline-none focus:border-accent text-slate-400" 
                          value={service.description} onChange={e => {
                            const newItems = [...localData.services];
                            newItems[idx].description = e.target.value;
                            setLocalData({...localData, services: newItems});
                          }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'socials' && (
              <div className="space-y-6">
                 <button onClick={() => addItem('socials')} className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl hover:border-accent hover:bg-accent/5 transition-all text-slate-400 font-bold flex items-center justify-center gap-2">
                  <DynamicIcon name="Plus" className="w-5 h-5" /> Add Social Account
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {localData.socials.map((social, idx) => (
                     <div key={social.id} className="p-5 bg-slate-950 border border-white/5 rounded-2xl flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                           <div className="p-3 bg-accent/10 rounded-xl">
                              <DynamicIcon name={social.icon} className="w-6 h-6 text-accent" />
                           </div>
                           <input className="bg-transparent font-bold text-white outline-none border-b border-transparent focus:border-accent flex-1" 
                              value={social.platform} onChange={e => {
                                const newItems = [...localData.socials];
                                newItems[idx].platform = e.target.value;
                                setLocalData({...localData, socials: newItems});
                              }} />
                            <button onClick={() => deleteItem('socials', social.id)} className="text-red-400">
                               <DynamicIcon name="Trash" className="w-4 h-4" />
                            </button>
                        </div>
                        <input className="bg-slate-900 border border-white/10 rounded-lg p-2 text-xs text-slate-400 outline-none focus:border-accent" 
                           value={social.url} placeholder="https://" onChange={e => {
                             const newItems = [...localData.socials];
                             newItems[idx].url = e.target.value;
                             setLocalData({...localData, socials: newItems});
                           }} />
                        <select className="bg-slate-900 border border-white/10 rounded-lg p-2 text-xs text-slate-400 outline-none focus:border-accent"
                          value={social.icon} onChange={e => {
                            const newItems = [...localData.socials];
                            newItems[idx].icon = e.target.value;
                            setLocalData({...localData, socials: newItems});
                          }}>
                          {Object.keys(IconMap).map(icon => <option key={icon} value={icon}>{icon}</option>)}
                        </select>
                     </div>
                   ))}
                </div>
              </div>
            )}

            {activeTab === 'leads' && (
              <div className="space-y-4">
                {leads.length === 0 ? (
                  <div className="py-20 flex flex-col items-center gap-4 text-slate-600">
                     <DynamicIcon name="MessageSquare" className="w-16 h-16 opacity-20" />
                     <p className="font-bold">Inbox is empty. Time to market more!</p>
                  </div>
                ) : (
                  leads.map(lead => (
                    <div key={lead.id} className="p-8 bg-slate-950 border border-white/5 rounded-3xl group relative">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent font-black">
                              {lead.name.charAt(0)}
                           </div>
                           <div>
                              <h4 className="font-bold text-xl text-white">{lead.name}</h4>
                              <p className="text-accent text-sm font-medium">{lead.email}</p>
                           </div>
                        </div>
                        <button 
                          onClick={() => {
                            deleteLead(lead.id);
                            setLeads(getLeads());
                          }}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <DynamicIcon name="Trash" className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="p-6 bg-slate-900/50 rounded-2xl text-slate-300 border border-white/5">
                        <p className="font-black text-[10px] uppercase text-slate-500 mb-2 tracking-widest">Subject: {lead.subject}</p>
                        <p className="leading-relaxed">{lead.message}</p>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Received: {new Date(lead.date).toLocaleString()}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-12">
                <div className="space-y-6">
                  <h3 className="font-black text-xl text-slate-300 tracking-tight">Contact Intelligence</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['all', 'whatsapp', 'email', 'admin'].map(t => (
                      <button 
                        key={t}
                        onClick={() => setLocalData({...localData, settings: {...localData.settings, contactTarget: t as any}})}
                        className={`p-6 rounded-2xl border-2 font-black capitalize transition-all flex items-center justify-center gap-3 ${
                          localData.settings.contactTarget === t 
                            ? 'bg-accent text-slate-950 border-accent shadow-lg shadow-accent/20 scale-105' 
                            : 'bg-slate-950 border-white/5 text-slate-500 hover:border-white/20'
                        }`}
                      >
                        <DynamicIcon name={t === 'whatsapp' ? 'Phone' : t === 'email' ? 'Mail' : 'Settings'} className="w-5 h-5" />
                        {t} Target
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-black text-xl text-slate-300 tracking-tight">SEO Engine</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Browser Tab Title</label>
                      <input className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent text-white" 
                        value={localData.meta.title} onChange={e => setLocalData({...localData, meta: {...localData.meta, title: e.target.value}})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Description (for Google)</label>
                      <textarea className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent resize-none text-slate-400" rows={3}
                        value={localData.meta.description} onChange={e => setLocalData({...localData, meta: {...localData.meta, description: e.target.value}})} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
