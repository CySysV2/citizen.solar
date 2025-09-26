import React, { useState, useEffect } from 'react';
import { CitizenSolarKernel } from '../../lib/knowledgeKernel';

type EthicsRules = typeof CitizenSolarKernel.ethics;

// Function to safely get rules from localStorage or default to kernel
const getInitialRules = (): EthicsRules => {
    try {
        const storedRules = localStorage.getItem('daoPlaygroundRules');
        if (storedRules) {
            const parsedRules = JSON.parse(storedRules);
            // Basic validation to ensure it's a valid rules object
            if (parsedRules && typeof parsedRules === 'object' && 'blockedEntities' in parsedRules) {
                 return parsedRules;
            }
        }
    } catch (error) {
        console.error("Failed to parse DAO rules from localStorage:", error);
    }
    // Return default if nothing is stored or parsing fails
    return CitizenSolarKernel.ethics;
};

const DaoPlayground: React.FC = () => {
    const [rules, setRules] = useState<EthicsRules>(getInitialRules);
    const [draftRules, setDraftRules] = useState<EthicsRules>(rules); // Draft starts the same as current rules
    const [isVoting, setIsVoting] = useState(false);
    const [log, setLog] = useState<string[]>([]);

    // Effect to persist rules to localStorage whenever they are updated
    useEffect(() => {
        try {
            localStorage.setItem('daoPlaygroundRules', JSON.stringify(rules));
        } catch (error) {
            console.error("Could not save DAO rules to localStorage:", error);
        }
    }, [rules]);

    useEffect(() => {
        setLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] Rules initialized.`]);
    }, []);

    const handleToggleBlocked = (entity: string) => {
        setDraftRules(prev => {
            const blocked = new Set(prev.blockedEntities);
            if (blocked.has(entity)) {
                blocked.delete(entity);
            } else {
                blocked.add(entity);
            }
            return { ...prev, blockedEntities: Array.from(blocked) };
        });
    };
    
    const handleToggleGeo = (country: keyof EthicsRules['geo']) => {
        setDraftRules(prev => ({
            ...prev,
            geo: {
                ...prev.geo,
                [country]: prev.geo[country] === 'allow' ? 'deny' : 'allow'
            }
        }));
    };
    
    const castVote = () => {
        setIsVoting(true);
        const logMessage = `Proposal to update rules submitted...`;
        setLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${logMessage}`]);
        setTimeout(() => {
            setIsVoting(false);
            setRules(draftRules);
            setLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ✅ Quorum (${CitizenSolarKernel.dao.quorum * 100}%) reached. Rules updated.`]);
        }, 2000);
    };

    const hasChanges = JSON.stringify(rules) !== JSON.stringify(draftRules);

    const geoFilterCountries = Object.keys(draftRules.geo) as (keyof EthicsRules['geo'])[];

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800 h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">DAO Ethics Playground</h3>
            
            {/* YAML Rules Display */}
            <div className="mb-4 bg-slate-100 dark:bg-gray-900 p-4 rounded-md border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-700 dark:text-slate-300">
                <pre><code>
{`# Live DAO-Governed Filter
minScore: ${rules.minScore}
allowed_sources:
  - ${rules.allowedSources.join('\n  - ')}
blocked_entities:
  - ${rules.blockedEntities.join('\n  - ')}
geo_filter:
  EU: ${rules.geo.EU}
  US: ${rules.geo.US}
  CN: ${rules.geo.CN}
  RU: ${rules.geo.RU}
`}
                </code></pre>
            </div>
            
            {/* Toggles */}
            <div className="space-y-3 mb-4">
                <div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Blocked Entities</p>
                    <div className="flex flex-wrap gap-2">
                         {['fossil_corp_X', 'surveillance_vendor_Z'].map(entity => (
                            <button key={entity} onClick={() => handleToggleBlocked(entity)} className={`text-xs px-3 py-1 rounded-full border transition-colors ${draftRules.blockedEntities.includes(entity) ? 'bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/50' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600'}`}>
                                {entity}
                            </button>
                         ))}
                    </div>
                </div>
                 <div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Geo Filters</p>
                    <div className="flex flex-wrap gap-2">
                        {geoFilterCountries.map(country => (
                             <button key={country} onClick={() => handleToggleGeo(country)} className={`text-xs px-3 py-1 rounded-full border transition-colors ${draftRules.geo[country] === 'deny' ? 'bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/50' : 'bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/50'}`}>
                                {country}: {draftRules.geo[country]}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <button onClick={castVote} disabled={isVoting || !hasChanges} className="w-full bg-[#F72585] text-white font-bold py-2 rounded-lg hover:bg-pink-600 transition-all duration-300 disabled:bg-slate-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed">
                {isVoting ? 'Voting...' : 'Cast Vote to Update Rules'}
            </button>
            
            {/* Log */}
            <div className="mt-4 flex-grow bg-slate-100 dark:bg-gray-900 p-4 rounded-md border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-600 dark:text-slate-400 overflow-y-auto">
                {log.slice().reverse().map((entry, i) => <p key={i}>{entry}</p>)}
            </div>
        </div>
    );
};

export default DaoPlayground;
