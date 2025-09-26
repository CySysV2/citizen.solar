import React, { useState } from 'react';
import Section, { SectionTitle, SectionSubtitle } from '../Section';

interface CtaSectionProps {
    onFundNode: () => void;
    onOpenContact: () => void;
}

const CtaSection: React.FC<CtaSectionProps> = ({ onFundNode, onOpenContact }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Thank you! ${email} has been added to our mailing list.`);
        setEmail('');
    };

  return (
    <Section id="cta" className="text-center">
      <SectionTitle>Build the Future of Energy With Us</SectionTitle>
      <SectionSubtitle>
        Whether you're an investor, a community leader, or a developer, there's a role for you in the CitizenSolar ecosystem. Let's build a sovereign, ethical, and resilient energy commons, together.
      </SectionSubtitle>
      
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
        <button onClick={onFundNode} className="w-full sm:w-auto bg-[#08F7FE] text-black font-bold py-3 px-8 rounded-lg hover:bg-cyan-300 dark:hover:bg-white transition-all duration-300 transform hover:scale-105">
            Fund a Node
        </button>
        <button onClick={onOpenContact} className="w-full sm:w-auto bg-[#F72585] text-white font-bold py-3 px-8 rounded-lg hover:bg-pink-600 transition-all duration-300 transform hover:scale-105">
            Request Investor Pack
        </button>
        <button onClick={onOpenContact} className="w-full sm:w-auto border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white font-medium py-3 px-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300">
            Activate a GridCommons
        </button>
      </div>

      <div className="max-w-xl mx-auto">
        <p className="mb-4 text-slate-600 dark:text-slate-300">Stay updated on our progress:</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@address.com"
                required
                className="flex-grow bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md py-3 px-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-[#08F7FE] focus:outline-none transition"
            />
            <button type="submit" className="bg-slate-700 text-white font-semibold py-3 px-6 rounded-md hover:bg-slate-600 transition">
                Subscribe
            </button>
        </form>
      </div>
    </Section>
  );
};

export default CtaSection;