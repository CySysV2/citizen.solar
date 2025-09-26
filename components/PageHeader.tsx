
import React from 'react';

interface PageHeaderProps {
    title: string;
    subtitle: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
    return (
        <header className="pt-32 pb-16 md:pt-40 md:pb-24 text-center px-4">
            <div className="relative z-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-slate-900 dark:text-white mb-4">
                    {title}
                </h1>
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400">
                    {subtitle}
                </p>
            </div>
        </header>
    );
};

export default PageHeader;