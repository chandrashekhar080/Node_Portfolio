
import React, { useState } from 'react';
import { PortfolioData } from '../types';
import { saveLead } from '../store';
import { DynamicIcon } from './Icons';

interface ContactFormProps {
  data: PortfolioData;
}

const ContactForm: React.FC<ContactFormProps> = ({ data }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // 1. Save to Local Storage (Admin Panel)
    const newLead = {
      id: Date.now().toString(),
      ...formData,
      date: new Date().toISOString()
    };
    saveLead(newLead);

    // 2. Handle specific targets
    const target = data.settings.contactTarget;
    
    if (target === 'whatsapp' || target === 'all') {
      const text = encodeURIComponent(`Hello, I'm ${formData.name}. ${formData.message}`);
      window.open(`https://wa.me/${data.general.whatsapp}?text=${text}`, '_blank');
    }

    if (target === 'email' || target === 'all') {
       const mailto = `mailto:${data.general.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`;
       window.location.href = mailto;
    }

    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-400">Your Name</label>
          <input 
            required
            type="text" 
            placeholder="John Doe"
            className="w-full bg-slate-950 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-400">Email Address</label>
          <input 
            required
            type="email" 
            placeholder="john@example.com"
            className="w-full bg-slate-950 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-400">Subject</label>
        <input 
          required
          type="text" 
          placeholder="How can I help you?"
          className="w-full bg-slate-950 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all"
          value={formData.subject}
          onChange={e => setFormData({...formData, subject: e.target.value})}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-400">Message</label>
        <textarea 
          required
          rows={5}
          placeholder="Tell me about your project..."
          className="w-full bg-slate-950 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all resize-none"
          value={formData.message}
          onChange={e => setFormData({...formData, message: e.target.value})}
        ></textarea>
      </div>
      
      <button 
        type="submit" 
        disabled={status === 'sending'}
        className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
          status === 'success' ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {status === 'sending' ? 'Sending...' : status === 'success' ? (
          <>
            <DynamicIcon name="CheckCircle" className="w-6 h-6" />
            Message Sent!
          </>
        ) : (
          <>
            Send Message
            <DynamicIcon name="Send" className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
