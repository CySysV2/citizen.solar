import React, { useState, useEffect } from 'react';
import { addPledge } from '../../lib/backend/firebase';
import type { Pledge } from '../../lib/backend/firebase';
import ZkLedgerAnchor from '../integration/ZkLedgerAnchor';

interface DonateModalProps {
    onClose: () => void;
}

const DonateModal: React.FC<DonateModalProps> = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        amount: 100,
        message: '',
        type: 'individual'
    });
    const [view, setView] = useState<'form' | 'submitting' | 'anchoring'>('form');
    const [submittedPledge, setSubmittedPledge] = useState<Pledge | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [scrollId, setScrollId] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleConnect = () => {
        // Simulate async connection
        setTimeout(() => {
            const randomId = Math.random().toString(36).substring(2, 10);
            const mockId = `did:scroll:user:${randomId}`;
            setScrollId(mockId);
            setIsConnected(true);
            setFormData(prev => ({ ...prev, email: `user-${randomId.substring(0, 6)}@scroll.id`, name: 'Anonymous ScrollID User' }));
        }, 500);
    };

    const handleDisconnect = () => {
        setIsConnected(false);
        setScrollId(null);
        setFormData(prev => ({ ...prev, email: '', name: '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setView('submitting');
        
        const newPledgeData = {
            name: formData.name,
            email: formData.email,
            amount: Number(formData.amount),
            donorID: scrollId,
            // These would be calculated on the backend based on donor history, source of funds, etc.
            ethicsScore: 0.85, 
            daoApproval: true,
        };

        try {
            const pledgeResult = await addPledge(newPledgeData);
            setSubmittedPledge(pledgeResult);
            setView('anchoring');

            // Close modal after the anchoring animation is complete
            setTimeout(() => {
                onClose();
            }, 5000);

        } catch (error) {
            console.error("Failed to submit pledge:", error);
            alert("There was an error submitting your pledge. Please try again.");
            setView('form');
        }
    };
    
    const renderContent = () => {
        switch (view) {
            case 'anchoring':
                return submittedPledge ? <ZkLedgerAnchor pledge={submittedPledge} /> : null;
            
            case 'form':
            case 'submitting':
                 return (
                    <>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Fund a Node</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">Your pledge supports the sovereign energy mesh. Thank you.</p>

                        {/* Pledge with zk-Anonymity Section */}
                        <div className="mb-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                            <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Pledge with zk-Anonymity</h4>
                            {!isConnected ? (
                                <>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">For privacy-preserving pledges, connect your sovereign identity.</p>
                                    <button type="button" onClick={handleConnect} className="w-full bg-slate-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-slate-700 transition">
                                        Connect ScrollID Wallet
                                    </button>
                                </>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-sm font-bold text-green-600 dark:text-green-400">Connected</span>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono break-all">{scrollId}</p>
                                    </div>
                                    <button type="button" onClick={handleDisconnect} className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">Disconnect</button>
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Name</label>
                                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} readOnly={isConnected} required className={`w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md py-2 px-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#08F7FE] focus:outline-none transition ${isConnected ? 'cursor-not-allowed opacity-70' : ''}`} />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Email</label>
                                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} readOnly={isConnected} required className={`w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md py-2 px-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#08F7FE] focus:outline-none transition ${isConnected ? 'cursor-not-allowed opacity-70' : ''}`} />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Amount (€)</label>
                                <input type="number" name="amount" id="amount" value={formData.amount} onChange={handleChange} required className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md py-2 px-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#08F7FE] focus:outline-none transition" />
                            </div>
                             <div>
                                <label htmlFor="type" className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Donor Type</label>
                                <select name="type" id="type" value={formData.type} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md py-2 px-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#08F7FE] focus:outline-none transition">
                                    <option value="individual">Individual</option>
                                    <option value="institution">Institutional</option>
                                </select>
                            </div>
                            <button type="submit" disabled={view === 'submitting'} className="w-full bg-[#08F7FE] text-black font-bold py-3 px-8 rounded-lg hover:bg-cyan-300 dark:hover:bg-white transition-all duration-300 transform hover:scale-105 disabled:bg-slate-300 dark:disabled:bg-slate-600 disabled:cursor-wait">
                                {view === 'submitting' ? 'Submitting...' : 'Submit Pledge'}
                            </button>
                        </form>
                    </>
                 );
        }
    }


    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 max-w-lg w-full text-left relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">&times;</button>
                {renderContent()}
            </div>
        </div>
    );
};

export default DonateModal;