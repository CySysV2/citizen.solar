import React from 'react';
import Section, { SectionTitle, SectionSubtitle } from '../Section';

interface AskSectionProps {
  onRequestPack: () => void;
}

const useOfFunds = [
    { item: 'Protocol Development (Solidity & Rust)', percentage: 40, color: 'bg-cyan-500' },
    { item: 'Hardware Deployment (Pilot Sites)', percentage: 30, color: 'bg-pink-500' },
    { item: 'Community Growth & Onboarding', percentage: 20, color: 'bg-yellow-500' },
    { item: 'Operations & Legal', percentage: 10, color: 'bg-slate-500' },
];

const kpis = [
    "Onboard 25+ new GridCommons nodes globally",
    "Process €10M+ in verified pledges via zkLedger",
    "Achieve 5000+ active DAO members",
    "Testnet -> Mainnet rollout with security audits",
];

const AskSection: React.FC<AskSectionProps> = ({ onRequestPack }) => {
  return (
    <Section id="ask">
      <SectionTitle>The Ask: Join Our Seed Round</SectionTitle>
      <SectionSubtitle>
        We are raising a €2–5M seed round via a SAFE note to scale our protocol deployment, expand the core engineering team, and secure strategic partnerships to accelerate the transition to a sovereign energy future.
      </SectionSubtitle>
      <div className="max-w-4xl mx-auto bg-slate-50 dark:bg-slate-900/50 p-8 rounded-lg border border-slate-200 dark:border-slate-800">
        <div className="text-center mb-10">
            <h3 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">€2,000,000 – €5,000,000</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">SAFE Note (Post-Money Cap TBD)</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Use of Funds */}
            <div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Use of Funds</h4>
                <div className="space-y-4">
                    {useOfFunds.map(fund => (
                        <div key={fund.item}>
                            <div className="flex justify-between mb-1">
                                <span className="text-base font-medium text-slate-700 dark:text-slate-300">{fund.item}</span>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{fund.percentage}%</span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                                <div className={`${fund.color} h-2.5 rounded-full`} style={{width: `${fund.percentage}%`}}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Key Milestones */}
            <div>
                 <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Key Milestones (by EOY 2025)</h4>
                 <ul className="space-y-3">
                     {kpis.map(kpi => (
                         <li key={kpi} className="flex items-start text-slate-600 dark:text-slate-300">
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            {kpi}
                         </li>
                     ))}
                 </ul>
            </div>
        </div>

        <div className="text-center mt-12">
            <button onClick={onRequestPack} className="bg-[#F72585] text-white font-bold py-3 px-8 rounded-lg hover:bg-pink-600 transition-all duration-300 transform hover:scale-105">
                Request Investment Memorandum
            </button>
        </div>
      </div>
    </Section>
  );
};

export default AskSection;