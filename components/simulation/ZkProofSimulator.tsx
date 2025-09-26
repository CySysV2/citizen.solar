import React, { useState } from 'react';
import { zkFlowProof } from '../../lib/scrollKernel';

interface ProofResult {
    proof: string;
    ipfsCID: string;
    icpAnchor: string;
}

const ZkProofSimulator: React.FC = () => {
    const [pledgeAmount, setPledgeAmount] = useState(5000);
    const [ethicsScore, setEthicsScore] = useState(0.8);
    const [daoApproval, setDaoApproval] = useState(true);
    const [result, setResult] = useState<ProofResult | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);

    const handleVerify = () => {
        setIsVerifying(true);
        setResult(null);

        const pledge = {
            donorID: `did:scroll:${Math.random().toString(36).substring(2, 12)}`,
            amount: pledgeAmount,
            ethics: ethicsScore,
            daoVote: daoApproval,
            timestamp: new Date().toISOString()
        };

        // Simulate async verification process
        setTimeout(() => {
            const proofResult = zkFlowProof(pledge);
            setResult(proofResult);
            setIsVerifying(false);
        }, 1500);
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800 h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">zkProof Playground</h3>
            
            {/* Inputs */}
            <div className="space-y-4 mb-4">
                 <div>
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400 block mb-1">Pledge Amount: €{pledgeAmount.toLocaleString()}</label>
                    <input type="range" min="100" max="50000" step="100" value={pledgeAmount} onChange={(e) => setPledgeAmount(Number(e.target.value))} className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer" />
                </div>
                 <div>
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400 block mb-1">Ethics Score: {ethicsScore.toFixed(2)}</label>
                    <input type="range" min="0" max="1" step="0.01" value={ethicsScore} onChange={(e) => setEthicsScore(Number(e.target.value))} className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer" />
                </div>
                 <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">DAO Approval</label>
                    <button onClick={() => setDaoApproval(!daoApproval)} className={`px-3 py-1 text-xs font-bold rounded-full ${daoApproval ? 'bg-green-500/20 text-green-600 dark:text-green-400' : 'bg-red-500/20 text-red-600 dark:text-red-400'}`}>
                        {daoApproval ? 'Approved' : 'Rejected'}
                    </button>
                </div>
            </div>

            <button onClick={handleVerify} disabled={isVerifying} className="w-full bg-[#08F7FE] text-black font-bold py-2 rounded-lg hover:bg-cyan-300 dark:hover:bg-white transition-all duration-300 disabled:bg-slate-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed">
                {isVerifying ? 'Verifying...' : 'Verify Pledge'}
            </button>
            
            {/* Output Console */}
            <div className="mt-4 flex-grow bg-slate-100 dark:bg-gray-900 p-4 rounded-md border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-700 dark:text-slate-300 overflow-y-auto">
                <p className="text-yellow-600 dark:text-yellow-400">&gt; Initializing verification circuit...</p>
                {isVerifying && <p className="animate-pulse">&gt; Generating proof...</p>}
                {result && (
                    <>
                        <p className="text-green-600 dark:text-green-400">&gt; ✅ zkSNARK(P) Verified</p>
                        <p>&gt; <span className="text-slate-500">Proof Hash:</span> {result.proof}</p>
                        <p>&gt; <span className="text-slate-500">IPFS Anchor:</span> {result.ipfsCID}</p>
                        <p>&gt; <span className="text-slate-500">ICP Anchor:</span> {result.icpAnchor}</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default ZkProofSimulator;