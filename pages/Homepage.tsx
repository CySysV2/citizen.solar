import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import ProblemSection from '../components/sections/ProblemSection';
import SolutionSection from '../components/sections/SolutionSection';
import MarketSection from '../components/sections/MarketSection';
import TractionSection from '../components/sections/TractionSection';
import BusinessModelSection from '../components/sections/BusinessModelSection';
import RoadmapSection from '../components/sections/RoadmapSection';
import AskSection from '../components/sections/AskSection';
import CtaSection from '../components/sections/CtaSection';
import AnimatedSection from '../components/AnimatedSection';
import TokenomicsSection from '../components/sections/TokenomicsSection';
import GovernanceSection from '../components/sections/GovernanceSection';
import MasAgentsSection from '../components/sections/MasAgentsSection';


interface HomepageProps {
  onFundNode: () => void;
  onOpenContact: () => void;
}

const Homepage: React.FC<HomepageProps> = ({ onFundNode, onOpenContact }) => {
  return (
    <>
      <HeroSection onFundNode={onFundNode} onOpenContact={onOpenContact} />
      <AnimatedSection>
        <ProblemSection />
      </AnimatedSection>
      <AnimatedSection>
        <SolutionSection />
      </AnimatedSection>
      <AnimatedSection>
        <MarketSection />
      </AnimatedSection>
      <AnimatedSection>
        <TractionSection />
      </AnimatedSection>
      <AnimatedSection>
        <BusinessModelSection />
      </AnimatedSection>
      <AnimatedSection>
        <TokenomicsSection />
      </AnimatedSection>
      <AnimatedSection>
          <GovernanceSection />
      </AnimatedSection>
      <AnimatedSection>
        <MasAgentsSection />
      </AnimatedSection>
      <AnimatedSection>
        <RoadmapSection />
      </AnimatedSection>
      <AnimatedSection>
        <AskSection onRequestPack={onOpenContact} />
      </AnimatedSection>
      <AnimatedSection>
        <CtaSection onFundNode={onFundNode} onOpenContact={onOpenContact} />
      </AnimatedSection>
    </>
  );
};

export default Homepage;