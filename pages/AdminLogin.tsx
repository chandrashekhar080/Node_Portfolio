
import React, { useState } from 'react';
import { DynamicIcon } from '../components/Icons';

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [credentials, setCredentials] = useState({ user: '', pass: '' });
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be a real API call. 
    // For this prototype, we'll use demo credentials.
    if (credentials.user === 'admin' && credentials.pass === 'admin123') {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950">
      <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900 border border-white/5 shadow-2xl space-y-8">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-600/20">
            <DynamicIcon name="Settings" className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Admin Portal</h1>
          <p className="text-slate-400 text-sm">Secure access for portfolio management</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Username</label>
            <input 
              type="text" 
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all"
              placeholder="admin"
              value={credentials.user}
              onChange={e => setCredentials({...credentials, user: e.target.value})}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
            <input 
              type="password" 
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all"
              placeholder="••••••••"
              value={credentials.pass}
              onChange={e => setCredentials({...credentials, pass: e.target.value})}
            />
          </div>

          {error && <p className="text-red-500 text-xs font-bold text-center">Invalid credentials provided.</p>}

          <button className="w-full py-5 rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold transition-all shadow-lg shadow-blue-600/20">
            Authenticate
          </button>
        </form>

        <p className="text-center text-slate-500 text-xs">
          Tip: use <span className="text-slate-300">admin / admin123</span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
