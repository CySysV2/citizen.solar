import React from 'react';
import Section, { SectionTitle, SectionSubtitle } from '../Section';
import { CitizenSolarKernel } from '../../lib/knowledgeKernel';

const MasAgentsSection: React.FC = () => {
    return (
        <Section id="mas-agents">
            <SectionTitle>Multi-Agent System (MAS)</SectionTitle>
            <SectionSubtitle>
                The CitizenSolar network is autonomously managed and optimized by a collection of software agents. Each agent has a specific role, contributing to the overall stability, efficiency, and ethical alignment of the energy mesh.
            </SectionSubtitle>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {CitizenSolarKernel.MAS.agents.map(agent => (
                    <div key={agent.name} className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{agent.name}</h3>
                        <p className="font-mono text-sm text-cyan-500 dark:text-cyan-400 mb-2">{agent.role}</p>
                        <p className="text-slate-600 dark:text-slate-400 mt-2">{agent.contribution}</p>
                    </div>
                ))}
            </div>
            <div className="text-center mt-12">
                 <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Primary Optimization Goals</h4>
                 <div className="flex flex-wrap gap-3 justify-center">
                    {CitizenSolarKernel.MAS.optimizationGoals.map(goal => (
                        <span key={goal} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-mono px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700">
                            {goal}
                        </span>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default MasAgentsSection;