
import React, { useState, useEffect } from 'react';
import { getPortfolioData, savePortfolioData } from './store';
import { PortfolioData } from './types';
import PortfolioHome from './pages/PortfolioHome';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import NotFound from './components/NotFound';

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [route, setRoute] = useState(window.location.hash || '#home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const portfolioData = getPortfolioData();
    setData(portfolioData);
    
    // Set initial theme
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' || portfolioData.settings.theme || 'dark';
    setTheme(savedTheme);
    applyTheme(savedTheme);

    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const applyTheme = (newTheme: 'dark' | 'light') => {
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const handleUpdatePortfolio = (newData: PortfolioData) => {
    setData(newData);
    savePortfolioData(newData);
  };

  if (!data) return (
     <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
     </div>
  );

  // Router logic
  const renderRoute = () => {
    const path = route.split('?')[0];

    // Home / Section routes
    if (!path || path === '#' || path === '#home' || path === '#services' || path === '#projects' || path === '#skills' || path === '#contact') {
      return <PortfolioHome data={data} onThemeToggle={toggleTheme} />;
    }

    // Admin routes
    if (path.startsWith('#/admin')) {
      if (!isAdmin) {
        return <AdminLogin onLogin={() => setIsAdmin(true)} />;
      }
      return (
        <AdminDashboard 
          data={data} 
          onLogout={() => setIsAdmin(false)} 
          onUpdate={handleUpdatePortfolio} 
        />
      );
    }

    // Default to 404
    return <NotFound />;
  };

  return renderRoute();
};

export default App;
