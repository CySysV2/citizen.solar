import React from 'react';
import PageHeader from '../components/PageHeader';
import AnimatedSection from '../components/AnimatedSection';
import Section from '../components/Section';
import { CitizenSolarKernel } from '../lib/knowledgeKernel';

const WhitepaperPage: React.FC = () => {
    return (
        <>
            <PageHeader
                title="Whitepaper"
                subtitle="The foundational document detailing the vision, architecture, and economic model of the CitizenSolar protocol."
            />
            <AnimatedSection>
                <Section id="whitepaper-content">
                    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900/50 p-8 rounded-lg border border-slate-200 dark:border-slate-800 prose prose-slate dark:prose-invert">
                        
                        <h2>Abstract</h2>
                        <p>
                            This paper introduces CitizenSolar, a sovereign, vertically integrated Energy-as-a-Service framework designed for citizen-governed deployment. We propose a new model for energy infrastructure that is decentralized, ethical, and resilient. By combining a novel tokenomic model (SSRL), a programmable ethics filter (ζπθ), and a multi-agent system (MAS) for autonomous control, CitizenSolar creates a participatory and programmable energy mesh to replace fragile, centralized grids.
                        </p>
                        
                        <hr />

                        <h2 id="token-economics">Onchain Token Economics (SSRL Rules)</h2>
                        <p>
                            The Sovereign Regenerative Ledger (SSRL) token is the core utility and governance asset of the CitizenSolar ecosystem. Its behavior is not merely described but is programmatically enforced by smart contracts. The following parameters are pulled live from our Knowledge Kernel, reflecting the onchain reality.
                        </p>
                        <ul>
                            <li><strong>Name:</strong> {CitizenSolarKernel.ssrl.name}</li>
                            <li><strong>Symbol:</strong> {CitizenSolarKernel.ssrl.symbol}</li>
                            <li><strong>Ethics Threshold for Minting:</strong> A pledge's ethics score must be ≥ <strong>{CitizenSolarKernel.ethics.minScore}</strong>.</li>
                            <li><strong>Minting Rules:</strong>
                                <ul>
                                    {CitizenSolarKernel.ssrl.rules.map(rule => <li key={rule}>{rule.replace(/_/g, ' ')}</li>)}
                                </ul>
                            </li>
                            <li><strong>Supply Control:</strong> {CitizenSolarKernel.ssrl.daoCap}.</li>
                        </ul>
                        
                        <hr />

                        <h2 id="dao-governance">DAO Governance</h2>
                        <p>
                            The network is governed by a system of DAOs. Key governance parameters are defined in the kernel and enforced onchain to ensure decentralized control and resilience.
                        </p>
                        <ul>
                            <li><strong>Quorum:</strong> A minimum of <strong>{CitizenSolarKernel.dao.quorum * 100}%</strong> of voting power is required to pass a proposal.</li>
                            <li><strong>Emergency Quorum:</strong> For critical network proposals, the quorum is raised to <strong>{CitizenSolarKernel.dao.emergencyQuorum * 100}%</strong>.</li>
                            <li><strong>Vote Types:</strong> The DAO supports multiple voting mechanisms: {CitizenSolarKernel.dao.voteTypes.join(', ')}.</li>
                             <li><strong>Multisig Threshold:</strong> The treasury multisig requires <strong>{CitizenSolarKernel.dao.multisigThreshold}</strong> signatures to execute transactions.</li>
                        </ul>
                        
                        <hr />
                        
                        <h2 id="deployment-plan">Testnet Deployment Plan</h2>
                        <p>
                            CitizenSolar is actively deployed and being tested on public testnets to ensure security, scalability, and reliability before the mainnet launch. Our current focus, as outlined in our roadmap, is on the <strong>Sepolia testnet</strong>. This phase allows us to validate our smart contracts, test DAO governance mechanisms, and refine the user experience for node operators and donors in a live, decentralized environment. Future phases will explore integration with other high-performance networks like Hedera and ICP where applicable.
                        </p>

                        <div className="text-center mt-12 not-prose">
                             <a 
                                href="#" 
                                onClick={(e) => { e.preventDefault(); alert('Full whitepaper download is not yet available.'); }}
                                className="inline-block bg-[#08F7FE] text-black font-bold py-3 px-8 rounded-lg hover:bg-cyan-300 dark:hover:bg-white transition-all duration-300"
                            >
                                Download Full PDF (Coming Soon)
                            </a>
                        </div>
                    </div>
                </Section>
            </AnimatedSection>
        </>
    );
};

export default WhitepaperPage;
