import React, { useState, useEffect, useRef } from 'react';
import Section, { SectionTitle, SectionSubtitle } from '../Section';
import SSRLTokenCard from '../interactive/SSRLTokenCard';
import { CitizenSolarKernel } from '../../lib/knowledgeKernel';

const PledgeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-cyan-500 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const ZkProofIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-cyan-500 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const MintIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-cyan-500 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const DaoVoteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-cyan-500 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const UtilityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-cyan-500 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 21.945A9.001 9.001 0 0013 3.055v18.89z" />
    </svg>
);

const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400 dark:text-slate-600 hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);


const lifecycleSteps = [
    { name: 'Pledge', icon: <PledgeIcon />, description: 'A donor makes a verified pledge to a GridCommons node.' },
    { name: 'zkProof', icon: <ZkProofIcon />, description: 'A zero-knowledge proof is generated to ensure privacy and verify the flow.' },
    { name: 'Token Mint', icon: <MintIcon />, description: 'SSRL tokens are ethically minted based on the verified pledge and ethics score.' },
    { name: 'DAO Vote', icon: <DaoVoteIcon />, description: 'Tokens are used by the DAO to govern the commons and allocate resources.' },
    { name: 'Utility Use', icon: <UtilityIcon />, description: 'SSRL is integrated into regional economics for services and incentives.' },
];

const TokenomicsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <Section id="tokenomics" ref={sectionRef}>
      <SectionTitle>SSRL: The Kernel-Driven Token</SectionTitle>
      <SectionSubtitle>
        SSRL's logic is not just a document; it's live code. Interact with the kernel parameters below to see how the protocol ensures ethical, non-extractive value creation.
      </SectionSubtitle>
      
       <div className="mt-16 text-center">
        <h3 className={`text-3xl font-bold text-slate-900 dark:text-white mb-8 transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>Core SSRL Parameters (from Kernel)</h3>
        <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-center">
          <div className={`transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
            <div className="bg-white dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800 h-full">
              <p className="text-slate-500 dark:text-slate-400 text-sm">Ethics Threshold</p>
              <p className="text-2xl text-pink-500 dark:text-pink-400 font-bold">{CitizenSolarKernel.ethics.minScore}</p>
            </div>
          </div>
          <div className={`transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
            <div className="bg-white dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800 h-full">
                <p className="text-slate-500 dark:text-slate-400 text-sm">zk-Proof Required</p>
                <p className="text-2xl text-cyan-500 dark:text-cyan-400 font-bold">{String(CitizenSolarKernel.ssrl.rules.includes('zkProof_of_flow_required'))}</p>
            </div>
          </div>
           <div className={`transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
             <div className="bg-white dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800 h-full">
                <p className="text-slate-500 dark:text-slate-400 text-sm">Supply Control</p>
                <p className="text-lg text-slate-800 dark:text-white font-bold">{CitizenSolarKernel.ssrl.daoCap}</p>
             </div>
           </div>
        </div>
      </div>
      
      <div className={`max-w-md mx-auto mt-12 transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '500ms' }}>
        <SSRLTokenCard />
      </div>

      <div className="mt-24 text-center">
        <h3 className={`text-3xl font-bold text-slate-900 dark:text-white mb-16 transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '600ms' }}>SSRL Token Lifecycle</h3>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-4">
          {lifecycleSteps.map((step, index) => (
            <React.Fragment key={step.name}>
              <div className={`flex-1 text-center transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${700 + index * 150}ms` }}>
                <div className="mb-4">{step.icon}</div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-2">{step.name}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs mx-auto">{step.description}</p>
              </div>
              {index < lifecycleSteps.length - 1 && (
                 <div className={`transition-opacity duration-700 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${750 + index * 150}ms` }}>
                    <ArrowIcon />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default TokenomicsSection;
