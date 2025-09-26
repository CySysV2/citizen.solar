import React, { useState, useEffect } from 'react';
import MobileNav from './MobileNav';
import { navLinks } from '../utils/navigate';

type Theme = 'light' | 'dark';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
  currentPath: string;
}

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, currentPath }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      const showScrollToTop = window.scrollY > 200;
      setIsScrolled(scrolled);
      setIsScrollToTopVisible(showScrollToTop);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <a href="#/" className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white">
              Citizen<span className="text-cyan-500">Solar</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map(link => {
                const isActive = link.path === `#${currentPath}`;
                return (
                  <a
                    key={link.path}
                    href={link.path}
                    className={`font-medium transition-colors ${
                      isActive
                        ? 'text-cyan-500 dark:text-cyan-400'
                        : 'text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
               <button
                  onClick={toggleTheme}
                  className="text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-full transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                </button>
            </nav>

            {/* Mobile Nav Toggle */}
            <div className="md:hidden flex items-center gap-2">
                 <button
                      onClick={toggleTheme}
                      className="text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-full transition-colors"
                      aria-label="Toggle theme"
                    >
                      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                </button>
                <button
                    onClick={() => setMobileNavOpen(!isMobileNavOpen)}
                    className="relative w-10 h-10 z-50 -mr-2 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Toggle navigation"
                    aria-expanded={isMobileNavOpen}
                >
                    <div className="absolute top-1/2 left-1/2 w-5 -translate-x-1/2 -translate-y-1/2">
                        <span
                            aria-hidden="true"
                            className={`block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${isMobileNavOpen ? 'rotate-45' : '-translate-y-1.5'}`}
                        ></span>
                        <span
                            aria-hidden="true"
                            className={`block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${isMobileNavOpen ? 'opacity-0' : ''}`}
                        ></span>
                        <span
                            aria-hidden="true"
                            className={`block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${isMobileNavOpen ? '-rotate-45' : 'translate-y-1.5'}`}
                        ></span>
                    </div>
                </button>
            </div>
          </div>
        </div>
      </header>
      {isMobileNavOpen && <MobileNav onClose={() => setMobileNavOpen(false)} currentPath={currentPath} />}
      
      {/* Scroll to Top Button */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 rounded-full bg-slate-800/50 dark:bg-white/10 backdrop-blur-sm text-white dark:text-slate-300 flex items-center justify-center transition-opacity duration-300 ${isScrollToTopVisible ? 'opacity-100' : 'opacity-0'}`}
        aria-label="Scroll to top"
      >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
      </button>
    </>
  );
};

export default Header;