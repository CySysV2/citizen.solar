import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PageHeader from '../components/PageHeader';
import AnimatedSection from '../components/AnimatedSection';
import Section from '../components/Section';

// Mock data simulating onchain data
const MOCK_ONCHAIN_DATA = {
    total_supply: 8754321.12,
    treasury_balance: 1250456.78, // in a stablecoin like USDC
    pledge_inflows: {
        eth: 15.45,
        usdc: 250000,
        hbar: 1200000
    },
    ssrl_growth: [
        { month: 'Jan', supply: 1200000 },
        { month: 'Feb', supply: 2500000 },
        { month: 'Mar', supply: 3800000 },
        { month: 'Apr', supply: 5100000 },
        { month: 'May', supply: 6900000 },
        { month: 'Jun', supply: 8754321 },
    ],
    mint_log: [
        { tx: '0xabc...', did: 'did:scroll:user:a1b2', amount: 5000.50 },
        { tx: '0xdef...', did: 'did:scroll:user:c3d4', amount: 12000.00 },
        { tx: '0xghi...', did: 'did:scroll:user:e5f6', amount: 750.25 },
        { tx: '0xjkl...', did: 'did:scroll:user:g7h8', amount: 25000.00 },
    ]
};


const StatCard: React.FC<{ label: string; value: string; sublabel?: string }> = ({ label, value, sublabel }) => (
    <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800 text-center">
        <p className="text-slate-500 dark:text-slate-400 mb-2">{label}</p>
        <p className="text-4xl font-bold text-slate-900 dark:text-white">{value}</p>
        {sublabel && <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">{sublabel}</p>}
    </div>
);


const SSRLPage: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);
    
    // Theme-aware chart colors
    const FONT_COLOR = isDarkMode ? '#94a3b8' : '#64748b';
    const GRID_COLOR = isDarkMode ? '#334155' : '#e2e8f0';
    const TOOLTIP_BG = isDarkMode ? '#1e293b' : '#ffffff';
    const TOOLTIP_BORDER = isDarkMode ? '#334155' : '#cbd5e1';
    const CYAN = '#08F7FE';

    return (
        <>
            <PageHeader
                title="SSRL Onchain Dashboard"
                subtitle="A simulated view of the SSRL token's core metrics, DAO treasury, and pledge inflows, as if reading directly from the blockchain."
            />

            <AnimatedSection>
                <Section id="ssrl-stats">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard label="Total SSRL Supply" value={MOCK_ONCHAIN_DATA.total_supply.toLocaleString(undefined, {maximumFractionDigits: 2})} />
                        <StatCard label="DAO Treasury Balance" value={`$${MOCK_ONCHAIN_DATA.treasury_balance.toLocaleString()}`} sublabel="in USDC" />
                        <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800 text-center">
                            <p className="text-slate-500 dark:text-slate-400 mb-2">Pledge Inflows</p>
                            <div className="text-lg font-mono text-slate-800 dark:text-slate-200 space-y-1">
                                <p>{MOCK_ONCHAIN_DATA.pledge_inflows.eth.toFixed(2)} ETH</p>
                                <p>{MOCK_ONCHAIN_DATA.pledge_inflows.usdc.toLocaleString()} USDC</p>
                                <p>{MOCK_ONCHAIN_DATA.pledge_inflows.hbar.toLocaleString()} HBAR</p>
                            </div>
                        </div>
                    </div>
                </Section>
            </AnimatedSection>
            
            <AnimatedSection>
                <Section id="ssrl-chart-log">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* SSRL Growth Chart */}
                        <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
                             <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">SSRL Supply Growth</h3>
                             <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={MOCK_ONCHAIN_DATA.ssrl_growth} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} />
                                    <XAxis dataKey="month" tick={{ fill: FONT_COLOR }} stroke={GRID_COLOR}/>
                                    <YAxis tick={{ fill: FONT_COLOR }} stroke={GRID_COLOR} tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: TOOLTIP_BG, borderColor: TOOLTIP_BORDER, borderRadius: '0.5rem' }} 
                                        labelStyle={{ color: FONT_COLOR }}
                                        formatter={(value: number) => [value.toLocaleString(), 'Total Supply']}
                                    />
                                    <Line type="monotone" dataKey="supply" stroke={CYAN} strokeWidth={2} activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        {/* Mint Log */}
                         <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
                             <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Mint Activity</h3>
                             <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800">
                                        <tr>
                                            <th scope="col" className="px-4 py-3">Donor DID</th>
                                            <th scope="col" className="px-4 py-3 text-right">SSRL Minted</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {MOCK_ONCHAIN_DATA.mint_log.map(log => (
                                            <tr key={log.tx} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                                <td className="px-4 py-3 font-mono text-slate-700 dark:text-slate-300 truncate" title={log.did}>{log.did}</td>
                                                <td className="px-4 py-3 font-bold text-cyan-600 dark:text-cyan-400 text-right">{log.amount.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Section>
            </AnimatedSection>
        </>
    );
};

export default SSRLPage;
