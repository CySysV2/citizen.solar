import React from 'react';
import PageHeader from '../components/PageHeader';
import AnimatedSection from '../components/AnimatedSection';
import TokenomicsSection from '../components/sections/TokenomicsSection';
import Section, { SectionTitle, SectionSubtitle } from '../components/Section';

const distribution = [
    { category: 'Community & Ecosystem Fund', percentage: '40%', details: 'Incentives for node operators, grants for developers, and community rewards.' },
    { category: 'Public Sale', percentage: '25%', details: 'To bootstrap network liquidity and distribute governance power.' },
    { category: 'Founding Team & Advisors', percentage: '20%', details: 'Vested over 4 years with a 1-year cliff to align long-term incentives.' },
    { category: 'Treasury & Foundation', percentage: '15%', details: 'For long-term protocol development, operational costs, and strategic partnerships.' },
];

const TokenomicsPage: React.FC = () => {
    return (
        <>
            <PageHeader
                title="Tokenomics"
                subtitle="Understanding the role of the Sovereign Regenerative Ledger (SSRL) token in the CitizenSolar ecosystem."
            />
            
            {/* The wrapper is removed here, as animations are now handled inside TokenomicsSection */}
            <TokenomicsSection />

            <AnimatedSection>
                <Section id="distribution">
                    <SectionTitle>Token Distribution</SectionTitle>
                    <SectionSubtitle>
                        A transparent and fair distribution model designed to foster a decentralized, community-driven ecosystem from day one.
                    </SectionSubtitle>
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800">
                            {distribution.map((item, index) => (
                                <div key={item.category} className={`flex flex-col md:flex-row items-start p-6 ${index < distribution.length - 1 ? 'border-b border-slate-200 dark:border-slate-800' : ''}`}>
                                    <div className="w-full md:w-1/3 mb-2 md:mb-0">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.category}</h3>
                                        <p className="text-3xl font-bold text-[#08F7FE]">{item.percentage}</p>
                                    </div>
                                    <div className="w-full md:w-2/3">
                                        <p className="text-slate-600 dark:text-slate-400">{item.details}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>
            </AnimatedSection>
        </>
    );
};

export default TokenomicsPage;