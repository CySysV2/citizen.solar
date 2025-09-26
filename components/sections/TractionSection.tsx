import React from 'react';
import Section, { SectionTitle, SectionSubtitle } from '../Section';

const tractionItems = [
    { value: '3', label: 'Pilot GridCommons Deployed', details: '(EU, LATAM, APAC)' },
    { value: '€2.1M', label: 'Pledged to Date', details: 'via ScrollPledge v1' },
    { value: '15+', label: 'DAO Proposals Executed', details: 'across pilot sites' },
    { value: '4.2k', label: 'Active Community Members', details: 'on Telegram & Discord' },
];

const TractionSection: React.FC = () => {
  return (
    <Section id="traction">
      <SectionTitle>Protocol Traction</SectionTitle>
      <SectionSubtitle>
        We are building in public with a growing community of contributors, node operators, and partners. Our pilots are already demonstrating the viability of a sovereign energy future.
      </SectionSubtitle>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {tractionItems.map(item => (
          <div key={item.label} className="bg-white dark:bg-slate-900/50 p-8 rounded-lg border border-slate-200 dark:border-slate-800">
            <p className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#08F7FE] to-[#F72585] mb-2">{item.value}</p>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.label}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{item.details}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default TractionSection;
