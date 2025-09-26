import React from 'react';
import { navLinks } from '../utils/navigate';

interface MobileNavProps {
    onClose: () => void;
    currentPath: string;
}

const MobileNav: React.FC<MobileNavProps> = ({ onClose, currentPath }) => {
    return (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden" onClick={onClose}>
            <div
                className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-slate-900 p-6 shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-slate-500 dark:text-slate-400 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Close navigation"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <nav className="mt-12 flex flex-col space-y-4">
                    {navLinks.map(link => {
                        const isActive = link.path === `#${currentPath}`;
                        return (
                            <a
                                key={link.path}
                                href={link.path}
                                onClick={onClose}
                                className={`text-lg font-medium transition-colors ${
                                    isActive
                                        ? 'text-cyan-500 dark:text-cyan-400'
                                        : 'text-slate-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400'
                                }`}
                            >
                                {link.label}
                            </a>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
};

export default MobileNav;