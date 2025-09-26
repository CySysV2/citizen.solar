import React, { useState, useEffect } from 'react';
import { zkFlowProof } from '../../lib/scrollKernel';
import type { Pledge } from '../../lib/backend/firebase';

interface ZkLedgerAnchorProps {
    pledge: Pledge;
}

interface ProofResult {
    proof: string;
    ipfsCID: string;
    icpAnchor: string;
}

const ZkLedgerAnchor: React.FC<ZkLedgerAnchorProps> = ({ pledge }) => {
    const [status, setStatus] = useState('pending');
    const [result, setResult] = useState<ProofResult | null>(null);

    useEffect(() => {
        const anchorPledge = async () => {
            // 1. Start generating proof
            setStatus('generating');
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // 2. Generate mock proof and hashes
            const proofResult = zkFlowProof({
                pledgeID: pledge.pledgeID,
                donor: pledge.donorID || pledge.email,
                amount: pledge.amount,
            });
            setResult(proofResult);
            
            // 3. Finalize
            setStatus('anchored');
             await new Promise(resolve => setTimeout(resolve, 1000));
             setStatus('complete');
        };
        
        anchorPledge();

    }, [pledge]);
    
    const renderStatus = () => {
        switch (status) {
            case 'generating':
                return <p className="animate-pulse">Generating zkProof for Ledger...</p>;
            case 'anchored':
                return <p className="text-green-600 dark:text-green-400">✅ Proof Generated. Anchoring to IPFS...</p>;
            case 'complete':
                 return <p className="text-cyan-600 dark:text-cyan-400">✅ Pledge Anchored to zkLedger.</p>;
            default:
                return <p>Initializing anchor process...</p>;
        }
    }

    return (
        <div className="text-center py-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Pledge Submitted!</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">Your pledge of €{pledge.amount} has been received. We are now anchoring it to the zkLedger for verification.</p>
            
            <div className="bg-slate-100 dark:bg-gray-900 p-4 rounded-md border border-slate-200 dark:border-slate-700 font-mono text-xs text-left">
               <div className="mb-2">{renderStatus()}</div>
               {result && (
                   <div className="text-slate-600 dark:text-slate-400 space-y-1">
                       <p><span className="text-slate-500">PledgeID:</span> {pledge.pledgeID}</p>
                       <p><span className="text-slate-500">IPFS CID:</span> {result.ipfsCID}</p>
                   </div>
               )}
            </div>
             <p className="text-sm text-slate-500 mt-6">This will close automatically.</p>
        </div>
    );
};

export default ZkLedgerAnchor;