
import React from 'react';
import Section, { SectionTitle, SectionSubtitle } from '../Section';

const roles = [
    { name: 'Donor', function: 'Issues pledges (can be anonymous or registered via ScrollID).' },
    { name: 'Recipient', function: 'Receives funds or equipment, validated via ζπθ ethics filter.' },
    { name: 'Node Operator', function: 'Manages a CitizenNode or GridCommons site, registers with ScrollID.' },
    { name: 'DAO Member', function: 'Participates in local or regional DAO governance using zk-votes.' },
    { name: 'Agent Administrator', function: 'Configures MAS agent behavior and control scripts.' },
    { name: 'ScrollAuditor', function: 'Has access to zkLedger + ethics logs, can trigger public disclosures if abuse is detected.' },
];

const GovernanceSection: React.FC = () => {
    return (
        <Section id="governance">
            <SectionTitle>Governance & Roles</SectionTitle>
            <SectionSubtitle>
                CitizenSolar is not governed by a central entity but by a distributed, layered, and programmable sovereign governance model. Find your role in the ecosystem.
            </SectionSubtitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roles.map(role => (
                    <div key={role.name} className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800 backdrop-blur-sm transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-600 hover:-translate-y-1">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{role.name}</h3>
                        <p className="text-slate-600 dark:text-slate-400 mt-2">{role.function}</p>
                    </div>
                ))}
            </div>
        </Section>
    )
}

export default GovernanceSection;