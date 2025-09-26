
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800 py-8 px-4 md:px-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} CitizenSolar. A foundational protocol for the DFT ecosystem.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Telegram</a>
          <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Twitter</a>
          <a href="#/whitepaper" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Whitepaper</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
