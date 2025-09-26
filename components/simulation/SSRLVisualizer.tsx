import React, { useState, useMemo } from 'react';
// Fix: Corrected the import for `CitizenSolarKernel` to point to its source in `knowledgeKernel`, not `scrollKernel`.
import { CitizenSolarKernel } from '../../lib/knowledgeKernel';
import { mintSSRL } from '../../lib/scrollKernel';

const Arrow = () => (
    <div className="flex-1 flex items-center justify-center">
        <svg className="w-8 h-8 text-slate-400 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
    </div>
);

const SSRLVisualizer: React.FC = () => {
    const [pledgeAmount, setPledgeAmount] = useState(10000);
    const [ethicsScore, setEthicsScore] = useState(0.85);
    const [isDaoVerified, setIsDaoVerified] = useState(true);

    const mintingResult = useMemo(() => {
        return mintSSRL(pledgeAmount, ethicsScore, isDaoVerified);
    }, [pledgeAmount, ethicsScore, isDaoVerified]);
    
    const isSuccess = typeof mintingResult.result === 'number';
    const ethicsPassed = ethicsScore >= CitizenSolarKernel.ethics.minScore;
    const daoPassed = isDaoVerified;

    const getStepClass = (isPassed: boolean, isActive: boolean) => {
        if (!isActive) return 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-50';
        return isPassed ? 'bg-green-500/10 dark:bg-green-900/50 border-green-500/50' : 'bg-red-500/10 dark:bg-red-900/50 border-red-500/50';
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 text-center">SSRL Mint Lifecycle</h3>
            
            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <div>
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400 block mb-1">Pledge Amount: €{pledgeAmount.toLocaleString()}</label>
                    <input type="range" min="100" max="50000" step="100" value={pledgeAmount} onChange={(e) => setPledgeAmount(Number(e.target.value))} className="w-full" />
                </div>
                 <div>
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400 block mb-1">Ethics Score: {ethicsScore.toFixed(2)}</label>
                    <input type="range" min="0" max="1" step="0.01" value={ethicsScore} onChange={(e) => setEthicsScore(Number(e.target.value))} className="w-full" />
                </div>
                <div className="flex flex-col items-center justify-center">
                     <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">DAO Verified</label>
                    <button onClick={() => setIsDaoVerified(!isDaoVerified)} className={`px-4 py-1.5 font-bold rounded-full ${isDaoVerified ? 'bg-green-500/20 text-green-700 dark:text-green-300' : 'bg-red-500/20 text-red-700 dark:text-red-300'}`}>
                         {isDaoVerified ? 'Verified' : 'Rejected'}
                    </button>
                </div>
            </div>

            {/* Flowchart */}
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                {/* Step 1: Pledge */}
                <div className="p-3 text-center border rounded-lg bg-cyan-500/10 dark:bg-cyan-900/50 border-cyan-500/50 w-32">
                    <p className="font-bold text-slate-800 dark:text-white text-sm">Pledge</p>
                    <p className="text-xs text-slate-700 dark:text-slate-300">€{pledgeAmount.toLocaleString()}</p>
                </div>
                <Arrow />
                {/* Step 2: Ethics Filter */}
                 <div className={`p-3 text-center border rounded-lg w-32 transition-colors ${getStepClass(ethicsPassed, true)}`}>
                    <p className="font-bold text-slate-800 dark:text-white text-sm">Ethics Filter</p>
                    <p className={`text-xs ${ethicsPassed ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>{ethicsPassed ? 'Pass' : 'Fail'}</p>
                </div>
                <Arrow />
                 {/* Step 3: DAO Vote */}
                <div className={`p-3 text-center border rounded-lg w-32 transition-colors ${getStepClass(daoPassed, ethicsPassed)}`}>
                    <p className="font-bold text-slate-800 dark:text-white text-sm">DAO Vote</p>
                    <p className={`text-xs ${daoPassed ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>{daoPassed ? 'Pass' : 'Fail'}</p>
                </div>
                 <Arrow />
                {/* Step 4: Mint */}
                 <div className={`p-3 text-center border rounded-lg w-32 transition-colors ${getStepClass(isSuccess, ethicsPassed && daoPassed)}`}>
                    <p className="font-bold text-slate-800 dark:text-white text-sm">SSRL Minted</p>
                    <p className={`text-xs font-bold ${isSuccess ? 'text-cyan-600 dark:text-cyan-300' : 'text-red-700 dark:text-red-300'}`}>
                         {isSuccess ? mintingResult.result.toLocaleString() : 'DENIED'}
                    </p>
                </div>
            </div>
            <p className="text-center text-xs text-slate-500 mt-6">{mintingResult.reason}</p>
        </div>
    );
};

export default SSRLVisualizer;
