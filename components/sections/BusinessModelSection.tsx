
import React from 'react';
import Section, { SectionTitle, SectionSubtitle } from '../Section';

const modelFeatures = [
  {
    title: "ScrollPledge Donations",
    description: "Direct, DID-bound donation system with zk-anonymity, enabling sovereign funding flows from individuals and institutions.",
  },
  {
    title: "Zero-Fee Energy-as-a-Service",
    description: "We eliminate extractive business models. There are zero platform fees on donations or subscriptions, ensuring value stays within the community.",
  },
  {
    title: "Sovereign DAO Governance",
    description: "Grid access and local pricing models are capped and controlled by community-run DAOs, not by a central authority.",
  },
  {
    title: "Multi-Source Funding Logic",
    description: "We integrate institutional, public, and community funding paths including public grants, green bonds, and energy rebates.",
  },
];

const BusinessModelSection: React.FC = () => {
  return (
    <Section id="businessmodel">
      <SectionTitle>Post-Capital Economic Layer</SectionTitle>
      <SectionSubtitle>
        CitizenSolar is designed as a sovereign economic layer that enables ethical value transfer and non-extractive sustainability, moving beyond traditional business models.
      </SectionSubtitle>
      <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
        {modelFeatures.map((feature, index) => (
          <div key={feature.title} className="flex items-start space-x-4 sm:space-x-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#08F7FE] to-[#F72585] flex items-center justify-center text-black font-bold text-xl">
              {index + 1}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mt-1">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default BusinessModelSection;
