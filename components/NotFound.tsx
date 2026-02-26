
import React from 'react';
import { DynamicIcon } from './Icons';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-6">
      <div className="relative">
        <h1 className="text-[10rem] md:text-[15rem] font-black opacity-10 leading-none">404</h1>
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
          <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center animate-bounce">
            <DynamicIcon name="Layout" className="w-10 h-10 text-accent" />
          </div>
          <h2 className="text-3xl font-bold">Lost in Space?</h2>
          <p className="text-slate-400 max-w-md text-center">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <a 
            href="#home" 
            className="mt-8 px-8 py-3 bg-gradient-accent rounded-xl font-bold btn-shadow"
            onClick={() => window.location.hash = '#home'}
          >
            Back to Reality
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
