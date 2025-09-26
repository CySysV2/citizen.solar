import React from 'react';
import Section, { SectionTitle, SectionSubtitle } from '../Section';

const features = [
  {
    title: "Sovereign GridCommons",
    description: "Community-owned and governed microgrids.",
    image: "https://placehold.co/600x400/08F7FE/000000?text=AI+Art%3A%0AGlowing+energy+mesh+connecting+a+green+community"
  },
  {
    title: "Ethical Finance Layer",
    description: "Programmable ethics filter (ζπθ) for all capital.",
    image: "https://placehold.co/600x400/F72585/FFFFFF?text=AI+Art%3A%0AData+streams+passing+through+ethical+filter"
  },
  {
    title: "zk-Native Pledges",
    description: "Privacy-preserving donations and investments.",
    image: "https://placehold.co/600x400/7209B7/FFFFFF?text=AI+Art%3A%0ACryptographic+shield+protecting+energy+flow"
  },
  {
    title: "Autonomous Agent Control",
    description: "AI agents optimize grid performance for community goals.",
    image: "https://placehold.co/600x400/3A0CA3/FFFFFF?text=AI+Art%3A%0ADigital+brain+optimizing+an+energy+grid"
  },
  {
    title: "Regenerative by Design",
    description: "SSRL tokenomics reward ethical participation.",
    image: "https://placehold.co/600x400/4361EE/FFFFFF?text=AI+Art%3A%0AGreen+plant+growing+from+a+glowing+token"
  },
  {
    title: "Verifiable Transparency",
    description: "Public zk-ledger for all network activity.",
    image: "https://placehold.co/600x400/4CC9F0/000000?text=AI+Art%3A%0AOpen+ledger+with+glowing,+linked+data+blocks"
  }
];

const SolutionSection: React.FC = () => {
  return (
    <Section id="solution">
      <SectionTitle>A Sovereign, Ethical Energy Mesh</SectionTitle>
      <SectionSubtitle>
        CitizenSolar is a full-stack protocol for deploying and governing sovereign energy systems. We replace brittle, top-down grids with a resilient, bottom-up, and community-centric mesh network.
      </SectionSubtitle>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div key={feature.title} className="bg-white dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10">
            <div className="relative">
              <img src={feature.image} alt={feature.title} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <h3 className="absolute bottom-0 left-0 p-4 text-lg font-bold text-white">{feature.title}</h3>
            </div>
            <div className="p-6 flex-grow">
              <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default SolutionSection;
