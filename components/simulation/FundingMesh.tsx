import React, { useState, useEffect } from 'react';

const StatCard: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
    <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-lg text-center border border-slate-200 dark:border-slate-700">
        <p className="text-sm text-slate-600 dark:text-slate-400">{label}</p>
        <p className={`text-3xl font-bold font-mono ${color}`}>{value}</p>
    </div>
);

const FundingMesh: React.FC = () => {
    const [pledges, setPledges] = useState(2150000);
    const [ssrlMinted, setSsrlMinted] = useState(1827500);

    useEffect(() => {
        const interval = setInterval(() => {
            const newPledge = Math.floor(Math.random() * 5000);
            setPledges(p => p + newPledge);
            setSsrlMinted(s => s + Math.floor(newPledge * 0.85)); // Assume avg 0.85 ethics score
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const pledgeRatio = Math.min((pledges / 5000000) * 100, 100); // As a % of €5M goal

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800 h-full">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 text-center">Funding Mesh Dashboard (Preview)</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <StatCard label="Total Pledges" value={`€${pledges.toLocaleString()}`} color="text-cyan-600 dark:text-cyan-400" />
                <StatCard label="SSRL Minted" value={ssrlMinted.toLocaleString()} color="text-pink-600 dark:text-pink-400" />
                <StatCard label="Verified zkProofs" value="1,482" color="text-slate-800 dark:text-white" />
                <StatCard label="DAO Proposals" value="89" color="text-slate-800 dark:text-white" />
            </div>
            <div className="flex justify-center items-center">
                <div className="relative w-48 h-48">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                            className="text-slate-200 dark:text-slate-700"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                            className="text-cyan-500"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeDasharray={`${pledgeRatio}, 100`}
                            fill="none"
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <p className="text-3xl font-bold text-slate-800 dark:text-white">{pledgeRatio.toFixed(1)}%</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">of €5M Goal</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FundingMesh;