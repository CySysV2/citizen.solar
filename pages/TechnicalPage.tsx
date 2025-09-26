import React from 'react';
import PageHeader from '../components/PageHeader';
import AnimatedSection from '../components/AnimatedSection';
import Section, { SectionTitle, SectionSubtitle } from '../components/Section';
import ErrorBoundary from '../components/ErrorBoundary';
import DaoPlayground from '../components/simulation/DaoPlayground';
import ZkProofSimulator from '../components/simulation/ZkProofSimulator';
import SSRLVisualizer from '../components/simulation/SSRLVisualizer';
import GovernanceSection from '../components/sections/GovernanceSection';
import IntegrationFlow from '../components/visual/IntegrationFlow';

const TechnicalPage: React.FC = () => {
    return (
        <>
            <PageHeader
                title="Technical Architecture"
                subtitle="An interactive deep-dive into the core components, smart contracts, and agent systems that power the CitizenSolar protocol."
            />
            
            <AnimatedSection>
                 <Section id="integration-flow">
                    <SectionTitle>Protocol Integration Flow</SectionTitle>
                    <SectionSubtitle>
                        A high-level overview of how a pledge moves through the CitizenSolar protocol, from initial donation to being anchored on the zkLedger.
                    </SectionSubtitle>
                    <div className="max-w-4xl mx-auto">
                        <ErrorBoundary>
                            <IntegrationFlow />
                        </ErrorBoundary>
                    </div>
                </Section>
            </AnimatedSection>
            
            <AnimatedSection>
                <GovernanceSection />
            </AnimatedSection>

            <AnimatedSection>
                <ErrorBoundary>
                    <SSRLVisualizer />
                </ErrorBoundary>
            </AnimatedSection>

            <AnimatedSection>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 md:px-8 py-16">
                    <ErrorBoundary><ZkProofSimulator /></ErrorBoundary>
                    <ErrorBoundary><DaoPlayground /></ErrorBoundary>
                </div>
            </AnimatedSection>
        </>
    );
};

export default TechnicalPage;