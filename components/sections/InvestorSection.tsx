import React from 'react';
import Section, { SectionTitle, SectionSubtitle } from '../Section';

interface InvestorSectionProps {
  onRequestPack: () => void;
}

const keyDetails = [
    {
        title: 'Seed Round Details',
        items: [
            'Raise Amount: €2M – €5M',
            'Instrument: SAFE Note',
            'Valuation: Post-Money Cap TBD'
        ]
    },
    {
        title: 'Category Defining Market',
        items: [
            'Intersection of VPP ($15B+)',
            'Distributed Energy ($1T+)',
            'Regenerative Infrastructure ($20T+)'
        ]
    },
    {
        title: 'Our Competitive Edge',
        items: [
            'Sovereign & Ethical by Design',
            'Live zk-Native Protocol',
            'Community-Owned Infrastructure',
            'Zero-Extraction Economic Model',
        ]
    }
];

const InvestorSection: React.FC<InvestorSectionProps> = ({ onRequestPack }) => {
  return (
    <Section id="investor-details">
      <SectionTitle>Investor & SAFE Note Details</SectionTitle>
      <SectionSubtitle>
        A deeper look into our seed round, market position, and the opportunity for early investors in a category-defining protocol.
      </SectionSubtitle>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {keyDetails.map(detail => (
            <div key={detail.title} className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{detail.title}</h3>
                <ul className="space-y-2">
                    {detail.items.map(item => (
                         <li key={item} className="flex items-start text-slate-600 dark:text-slate-300">
                            <svg className="flex-shrink-0 w-5 h-5 text-cyan-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{item}</span>
                         </li>
                    ))}
                </ul>
            </div>
        ))}
      </div>
      <div className="text-center mt-12">
            <button onClick={onRequestPack} className="bg-[#F72585] text-white font-bold py-3 px-8 rounded-lg hover:bg-pink-600 transition-all duration-300 transform hover:scale-105">
                Request Full Investment Memorandum
            </button>
      </div>
    </Section>
  );
};

export default InvestorSection;
