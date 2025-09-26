import React from 'react';
import { mintSSRL } from '../../lib/scrollKernel';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';

// Mock data simulating fetched pledges that are verified and ready for minting
const mockVerifiedPledges = [
  { pledgeID: 'pl_abc123xyz', amount: 5000, ethicsScore: 0.95, daoApproval: true, zkProofCID: 'Qma...fG5' },
  { pledgeID: 'pl_def456uvw', amount: 10000, ethicsScore: 0.88, daoApproval: true, zkProofCID: 'Qmb...hT8' },
  { pledgeID: 'pl_ghi789rst', amount: 2500, ethicsScore: 1.0, daoApproval: true, zkProofCID: 'Qmc...jK2' },
  { pledgeID: 'pl_jkl012mno', amount: 50000, ethicsScore: 0.78, daoApproval: true, zkProofCID: 'Qmd...lP4' },
  { pledgeID: 'pl_pqr345stu', amount: 1200, ethicsScore: 0.92, daoApproval: true, zkProofCID: 'Qme...nM9' },
];

const SSRLLog: React.FC = () => {
    
    const handleExport = (format: 'csv' | 'json') => {
        alert(`Exporting data as ${format.toUpperCase()}... (This is a demo)`);
    };

    return (
        <div className="bg-white dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">SSRL Mint Log</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Record of all verified pledges and associated SSRL tokens.</p>
                </div>
                <div className="flex space-x-2 mt-4 sm:mt-0">
                    <button onClick={() => handleExport('csv')} className="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold py-1 px-3 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition">
                        Export CSV
                    </button>
                    <button onClick={() => handleExport('json')} className="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold py-1 px-3 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition">
                        Export JSON
                    </button>
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800">
                        <tr>
                            <th scope="col" className="px-6 py-3">Pledge ID</th>
                            <th scope="col" className="px-6 py-3">Pledge Amount</th>
                            <th scope="col" className="px-6 py-3">Ethics Score</th>
                            <th scope="col" className="px-6 py-3">SSRL Minted</th>
                            <th scope="col" className="px-6 py-3">DAO Approval</th>
                            <th scope="col" className="px-6 py-3">zkProof</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockVerifiedPledges.map(pledge => {
                            const mintingResult = mintSSRL(pledge.amount, pledge.ethicsScore, pledge.daoApproval);
                            return (
                                <tr key={pledge.pledgeID} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                    <td className="px-6 py-4 font-mono text-slate-700 dark:text-slate-300">{pledge.pledgeID}</td>
                                    <td className="px-6 py-4">€{pledge.amount.toLocaleString()}</td>
                                    <td className="px-6 py-4">{pledge.ethicsScore.toFixed(2)}</td>
                                    <td className="px-6 py-4 font-bold text-cyan-600 dark:text-cyan-400">
                                        {typeof mintingResult.result === 'number' ? mintingResult.result.toLocaleString() : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center text-green-600 dark:text-green-400">
                                            <CheckCircleIcon className="w-4 h-4 mr-1" /> Approved
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" onClick={e => e.preventDefault()} className="text-cyan-600 dark:text-cyan-400 hover:underline font-mono text-xs">
                                            {pledge.zkProofCID}
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SSRLLog;