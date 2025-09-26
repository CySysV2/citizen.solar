import React from 'react';
import Section, { SectionTitle, SectionSubtitle } from '../Section';

const problems = [
    { title: 'Fragile Grids', description: 'Centralized energy grids are inefficient, vulnerable to failure, and controlled by monopolies.' },
    { title: 'Extractive Capital', description: 'Traditional energy finance prioritizes profit over community well-being and ecological health.' },
    { title: 'Lack of Sovereignty', description: 'Communities have no ownership or control over their most critical infrastructure: energy.' },
];

const ProblemSection: React.FC = () => {
    return (
        <Section id="problem">
            <SectionTitle>The Incumbent System is Broken</SectionTitle>
            <SectionSubtitle>
                Our global energy infrastructure is built on an outdated, extractive, and centralized paradigm that is failing both people and the planet.
            </SectionSubtitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {problems.map(problem => (
                    <div key={problem.title} className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{problem.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400">{problem.description}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default ProblemSection;
