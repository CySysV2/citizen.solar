

import React from 'react';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

// FIX: Wrap Section component with React.forwardRef to allow parent components to pass a ref to the underlying <section> element.
// This resolves an error in TokenomicsSection where a ref was being passed to Section for intersection observer animations.
const Section = React.forwardRef<HTMLElement, SectionProps>(({ id, children, className = '' }, ref) => {
  return (
    <section
      id={id}
      ref={ref}
      className={`py-20 md:py-32 px-4 md:px-8 container mx-auto ${className}`}
    >
      {children}
    </section>
  );
});

Section.displayName = 'Section';

export const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-slate-900 dark:text-white tracking-tighter">{children}</h2>
);

export const SectionSubtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 text-center max-w-3xl mx-auto mb-12 md:mb-20">{children}</p>
);

export default Section;