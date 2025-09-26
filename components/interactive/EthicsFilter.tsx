import React, { useState, useMemo } from 'react';
import Section, { SectionTitle, SectionSubtitle } from '../Section';

interface FilterRules {
  allowedSources: string[];
  blockedEntities: string[];
  geoFilter: Record<string, 'allow' | 'deny'>;
}

const initialRules: FilterRules = {
  allowedSources: ['DRC', 'EU_Horizon', 'Hedera_Grant', 'Community_DAO'],
  blockedEntities: ['fossil_corp_X', 'sanctioned_state_Y', 'predatory_fund_Z'],
  geoFilter: {
    EU: 'allow',
    US: 'allow',
    CN: 'deny',
    RU: 'deny'
  },
};

const scenarios = [
    { name: 'EU Horizon Grant', source: 'EU_Horizon', entity: 'EU_Commission', country: 'EU', expected: 'allow' },
    { name: 'Fossil Corp Donation', source: 'Corporate_Donation', entity: 'fossil_corp_X', country: 'US', expected: 'deny' },
    { name: 'Russian Investor', source: 'Private_Equity', entity: 'Investor_Group_A', country: 'RU', expected: 'deny' },
    { name: 'Community Pledge', source: 'Community_DAO', entity: 'Local_Coop', country: 'EU', expected: 'allow' },
];

const EthicsFilter: React.FC = () => {
    const [rules] = useState<FilterRules>(initialRules);
    const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);

    const result = useMemo(() => {
        if (rules.blockedEntities.includes(selectedScenario.entity)) {
            return { decision: 'deny', reason: `Entity '${selectedScenario.entity}' is on the blocked list.` };
        }
        if (rules.geoFilter[selectedScenario.country] === 'deny') {
            return { decision: 'deny', reason: `Country '${selectedScenario.country}' is on the geo-filter deny list.` };
        }
        if (rules.allowedSources.includes(selectedScenario.source)) {
             return { decision: 'allow', reason: `Source '${selectedScenario.source}' is on the allowed list.` };
        }
        // Default to deny if not explicitly allowed
        return { decision: 'deny', reason: `Source '${selectedScenario.source}' is not on the explicit allow list.`};
    }, [rules, selectedScenario]);

    return (
        <Section id="ethics-filter">
            <SectionTitle>Interactive ζπθ Ethics Filter</SectionTitle>
            <SectionSubtitle>
                Test how our programmable ethics validator works in real-time. The filter automatically vets capital and participants based on community-defined rules.
            </SectionSubtitle>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Rules Display */}
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Current Rule Set (DAO Governed)</h3>
                    <pre className="bg-slate-100 dark:bg-gray-900 p-4 rounded-md border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-700 dark:text-slate-300 overflow-x-auto">
                        <code>
                            {`allowed_sources:\n  - ${rules.allowedSources.join('\n  - ')}\n\nblocked_entities:\n  - ${rules.blockedEntities.join('\n  - ')}\n\ngeo_filter:\n  EU: ${rules.geoFilter.EU}\n  US: ${rules.geoFilter.US}\n  CN: ${rules.geoFilter.CN}\n  RU: ${rules.geoFilter.RU}`}
                        </code>
                    </pre>
                </div>
                {/* Interactive part */}
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Test a Scenario</h3>
                     <div className="mb-4">
                        <label htmlFor="scenario" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Select a funding scenario:</label>
                        <select
                            id="scenario"
                            onChange={(e) => setSelectedScenario(scenarios.find(s => s.name === e.target.value) || scenarios[0])}
                            value={selectedScenario.name}
                            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md py-2 px-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#08F7FE] focus:outline-none transition"
                        >
                            {scenarios.map(s => <option key={s.name}>{s.name}</option>)}
                        </select>
                    </div>
                    <div className="font-mono text-sm bg-slate-100 dark:bg-gray-900 p-4 rounded-md border border-slate-200 dark:border-slate-700">
                        <p><span className="text-slate-500">Source:</span> <span className="text-slate-800 dark:text-slate-200">{selectedScenario.source}</span></p>
                        <p><span className="text-slate-500">Entity:</span> <span className="text-slate-800 dark:text-slate-200">{selectedScenario.entity}</span></p>
                        <p><span className="text-slate-500">Country:</span> <span className="text-slate-800 dark:text-slate-200">{selectedScenario.country}</span></p>
                    </div>
                    <div className={`mt-4 p-4 rounded-lg text-center border ${result.decision === 'allow' ? 'bg-green-500/10 dark:bg-green-900/50 border-green-500/30' : 'bg-red-500/10 dark:bg-red-900/50 border-red-500/30'}`}>
                        <h4 className={`text-2xl font-bold ${result.decision === 'allow' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {result.decision === 'allow' ? '✅ ALLOWED' : '❌ DENIED'}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{result.reason}</p>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default EthicsFilter;