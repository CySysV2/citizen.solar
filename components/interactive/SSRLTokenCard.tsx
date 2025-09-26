import React, { useState, useMemo } from 'react';
import { CitizenSolarKernel } from '../../lib/knowledgeKernel';
import { mintSSRL } from '../../lib/scrollKernel';

const SSRLTokenCard: React.FC = () => {
    const [pledgeAmount, setPledgeAmount] = useState(1000);
    const [ethicsScore, setEthicsScore] = useState(0.85);
    const [isDaoVerified, setIsDaoVerified] = useState(true);

    const mintingResult = useMemo(() => {
        return mintSSRL(pledgeAmount, ethicsScore, isDaoVerified);
    }, [pledgeAmount, ethicsScore, isDaoVerified]);
    
    const isDenied = typeof mintingResult.result === 'string';

    const getBarColor = (score: number) => {
        if (score < CitizenSolarKernel.ethics.minScore) return 'bg-red-500';
        if (score < 0.8) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-cyan-500/30 dark:border-[#08F7FE] shadow-2xl shadow-cyan-500/10">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white text-center mb-4">Interactive Minting Simulator</h4>

            {/* Pledge Amount Slider */}
            <div className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                    <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Pledge Amount</label>
                    <span className="font-mono text-slate-800 dark:text-white">€{pledgeAmount.toLocaleString()}</span>
                </div>
                <input
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={pledgeAmount}
                    onChange={(e) => setPledgeAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
            </div>
            
            {/* Ethics Score Slider */}
            <div className="mb-6">
                 <div className="flex justify-between items-baseline mb-1">
                    <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Ethics Score</label>
                    <span className="font-mono text-slate-800 dark:text-white">{ethicsScore.toFixed(2)}</span>
                </div>
                <div className="relative w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg">
                     <div 
                        className={`absolute top-0 left-0 h-2 rounded-lg ${getBarColor(ethicsScore)}`} 
                        style={{ width: `${ethicsScore * 100}%` }}
                    />
                    <div 
                        className="absolute top-0 h-full border-l-2 border-dashed border-slate-400/50 dark:border-white/50"
                        style={{ left: `${CitizenSolarKernel.ethics.minScore * 100}%` }}
                    />
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={ethicsScore}
                        onChange={(e) => setEthicsScore(Number(e.target.value))}
                        className="w-full h-2 appearance-none cursor-pointer bg-transparent relative z-10"
                    />
                </div>
                 <p className="text-xs text-slate-500 mt-1 text-right">Threshold: {CitizenSolarKernel.ethics.minScore}</p>
            </div>

            {/* DAO Verification Toggle */}
            <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-3 rounded-lg mb-6">
                <label htmlFor="dao-verified" className="text-sm font-medium text-slate-700 dark:text-slate-300">DAO Verified Pledge?</label>
                <button
                    onClick={() => setIsDaoVerified(!isDaoVerified)}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${isDaoVerified ? 'bg-cyan-500' : 'bg-slate-400 dark:bg-slate-600'}`}
                >
                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isDaoVerified ? 'translate-x-6' : 'translate-x-1'}`}/>
                </button>
            </div>

            {/* Result Display */}
            <div className={`p-4 rounded-lg text-center border transition-all ${isDenied ? 'bg-red-500/10 dark:bg-red-900/50 border-red-500/50' : 'bg-cyan-500/10 dark:bg-cyan-900/50 border-cyan-500/50'}`}>
                <p className="text-sm text-slate-600 dark:text-slate-400">{isDenied ? 'Status' : 'SSRL to be Minted'}</p>
                 <div className={`text-3xl font-bold my-2 ${isDenied ? 'text-red-600 dark:text-red-400' : 'bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-400'}`}>
                    {typeof mintingResult.result === 'number' ? mintingResult.result.toLocaleString() : mintingResult.result}
                </div>
                <p className="text-xs text-slate-500">{mintingResult.reason}</p>
            </div>
        </div>
    );
};

export default SSRLTokenCard;
