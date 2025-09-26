import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PageHeader from '../components/PageHeader';
import AnimatedSection from '../components/AnimatedSection';
import Section, { SectionTitle, SectionSubtitle } from '../components/Section';
import { getDashboardStats } from '../lib/backend/firebase';
import ErrorBoundary from '../components/ErrorBoundary';
import type { DashboardStats } from '../lib/backend/firebase';
import SSRLLog from '../components/integration/SSRLLog'; // Import the SSRL Log
import InvestorSection from '../components/sections/InvestorSection';

// Chart Data (static for now)
const ssrlGrowthData = [
  { name: 'Jan', 'SSRL Minted': 4000 },
  { name: 'Feb', 'SSRL Minted': 3000 },
  { name: 'Mar', 'SSRL Minted': 2000 },
  { name: 'Apr', 'SSRL Minted': 2780 },
  { name: 'May', 'SSRL Minted': 1890 },
  { name: 'Jun', 'SSRL Minted': 2390 },
];
const ethicsComplianceData = [
  { name: '>0.85', value: 400 },
  { name: '0.7-0.85', value: 300 },
  { name: '<0.7', value: 80 },
];
const donorTypeData = [
  { name: 'Pledges', Individual: 1200000, Institutional: 1800000 },
];
const pledgeScatterData = Array.from({ length: 50 }, () => ({
  amount: Math.floor(Math.random() * 10000) + 500,
  ethics: 0.7 + Math.random() * 0.3,
}));

const StatCard: React.FC<{ label: string; value: string | number; isLoading: boolean }> = ({ label, value, isLoading }) => (
    <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800 text-center">
        <p className="text-slate-500 dark:text-slate-400 mb-2">{label}</p>
        {isLoading ? (
             <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse"></div>
        ) : (
             <p className="text-4xl font-bold text-slate-900 dark:text-white">{value}</p>
        )}
    </div>
);

// A simple skeleton loader for the charts
const ChartLoader: React.FC = () => (
    <div className="w-full h-[300px] bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse"></div>
);

interface DashboardPageProps {
    onOpenContact: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onOpenContact }) => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

    useEffect(() => {
        const fetchStats = async () => {
            setIsLoading(true);
            try {
                const data = await getDashboardStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            } finally {
                // Add a small delay to make the loading animation visible
                setTimeout(() => setIsLoading(false), 500);
            }
        };
        fetchStats();

        // Observer to reactively update chart colors on theme toggle
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.attributeName === 'class') {
                    const targetNode = mutation.target as HTMLElement;
                    setIsDarkMode(targetNode.classList.contains('dark'));
                }
            }
        });
        observer.observe(document.documentElement, { attributes: true });
        return () => observer.disconnect();
    }, []);

    const formatNumber = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    // Define theme-aware colors for charts
    const FONT_COLOR = isDarkMode ? '#94a3b8' : '#64748b'; // slate-400 / slate-500
    const GRID_COLOR = isDarkMode ? '#334155' : '#e2e8f0'; // slate-700 / slate-200
    const TOOLTIP_BG = isDarkMode ? '#1e293b' : '#ffffff'; // slate-800 / white
    const TOOLTIP_BORDER = isDarkMode ? '#334155' : '#cbd5e1'; // slate-700 / slate-300
    
    const CYAN = '#08F7FE';
    const PINK = '#F72585';
    const GREEN = '#22c55e';
    const YELLOW = '#facc15';
    const PIE_COLORS = [GREEN, YELLOW, PINK];

    return (
        <>
            <PageHeader
                title="Live Network Dashboard"
                subtitle="A real-time overview of the CitizenSolar network's funding, governance, and operational metrics."
            />

            <AnimatedSection>
                <Section id="summary-stats">
                     <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard label="Total Pledges (€)" value={stats ? formatNumber(stats.totalPledges) : '...'} isLoading={isLoading} />
                        <StatCard label="SSRL Minted" value={stats ? formatNumber(stats.ssrlMinted) : '...'} isLoading={isLoading} />
                        <StatCard label="DAO Votes Executed" value={stats ? stats.daoVotes : '...'} isLoading={isLoading} />
                        <StatCard label="zkProofs Verified" value={stats ? stats.zkProofsVerified.toLocaleString() : '...'} isLoading={isLoading} />
                    </div>
                </Section>
            </AnimatedSection>

            <AnimatedSection>
                <InvestorSection onRequestPack={onOpenContact} />
            </AnimatedSection>
            
            <AnimatedSection>
                <Section id="charts">
                    <SectionTitle>Data Visualizations</SectionTitle>
                    <SectionSubtitle>
                        Visual analysis of key performance indicators and network health statistics.
                    </SectionSubtitle>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* SSRL Growth Chart */}
                        <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">SSRL Growth Over Time</h3>
                            <ErrorBoundary>
                                {isLoading ? <ChartLoader /> : (
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={ssrlGrowthData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} />
                                            <XAxis dataKey="name" tick={{ fill: FONT_COLOR }} stroke={GRID_COLOR}/>
                                            <YAxis tick={{ fill: FONT_COLOR }} stroke={GRID_COLOR}/>
                                            <Tooltip 
                                                contentStyle={{ backgroundColor: TOOLTIP_BG, borderColor: TOOLTIP_BORDER, borderRadius: '0.5rem' }} 
                                                labelStyle={{ color: FONT_COLOR, fontWeight: 'bold' }}
                                                itemStyle={{ color: FONT_COLOR }}
                                            />
                                            <Legend wrapperStyle={{ color: FONT_COLOR }} />
                                            <Line type="monotone" dataKey="SSRL Minted" stroke={CYAN} strokeWidth={2} activeDot={{ r: 8 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                )}
                            </ErrorBoundary>
                        </div>
                        {/* Ethics Compliance Chart */}
                         <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Ethics Compliance Distribution</h3>
                            <ErrorBoundary>
                                {isLoading ? <ChartLoader /> : (
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie 
                                                data={ethicsComplianceData} 
                                                dataKey="value" 
                                                nameKey="name" 
                                                cx="50%" 
                                                cy="50%" 
                                                outerRadius={100} 
                                                labelLine={{ stroke: FONT_COLOR }}
                                                label={{ fill: FONT_COLOR, fontSize: 14 }}
                                            >
                                                 {ethicsComplianceData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip 
                                                contentStyle={{ backgroundColor: TOOLTIP_BG, borderColor: TOOLTIP_BORDER, borderRadius: '0.5rem' }} 
                                                labelStyle={{ color: FONT_COLOR, fontWeight: 'bold' }}
                                                itemStyle={{ color: FONT_COLOR }}
                                            />
                                            <Legend wrapperStyle={{ color: FONT_COLOR }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                )}
                            </ErrorBoundary>
                        </div>
                        {/* Pledges by Donor Type Chart */}
                         <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Pledges by Donor Type</h3>
                            <ErrorBoundary>
                                {isLoading ? <ChartLoader /> : (
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={donorTypeData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} />
                                            <XAxis dataKey="name" tick={{ fill: FONT_COLOR }} stroke={GRID_COLOR}/>
                                            <YAxis tick={{ fill: FONT_COLOR }} stroke={GRID_COLOR}/>
                                            <Tooltip 
                                                contentStyle={{ backgroundColor: TOOLTIP_BG, borderColor: TOOLTIP_BORDER, borderRadius: '0.5rem' }} 
                                                formatter={(value) => `€${Number(value).toLocaleString()}`} 
                                                labelStyle={{ color: FONT_COLOR, fontWeight: 'bold' }}
                                                itemStyle={{ color: FONT_COLOR }}
                                            />
                                            <Legend wrapperStyle={{ color: FONT_COLOR }} />
                                            <Bar dataKey="Individual" fill={CYAN} />
                                            <Bar dataKey="Institutional" fill={PINK} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                )}
                            </ErrorBoundary>
                        </div>
                        {/* Pledge Amount vs. Ethics Score Chart */}
                        <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Pledge Amount vs. Ethics Score</h3>
                            <ErrorBoundary>
                                {isLoading ? <ChartLoader /> : (
                                    <ResponsiveContainer width="100%" height={300}>
                                        <ScatterChart margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} />
                                            <XAxis type="number" dataKey="amount" name="amount" unit="€" tick={{ fill: FONT_COLOR }} stroke={GRID_COLOR}/>
                                            <YAxis type="number" dataKey="ethics" name="ethics" domain={[0.7, 1]} tick={{ fill: FONT_COLOR }} stroke={GRID_COLOR}/>
                                            <Tooltip 
                                                cursor={{ strokeDasharray: '3 3' }} 
                                                contentStyle={{ backgroundColor: TOOLTIP_BG, borderColor: TOOLTIP_BORDER, borderRadius: '0.5rem' }}
                                                labelStyle={{ color: FONT_COLOR, fontWeight: 'bold' }}
                                                itemStyle={{ color: FONT_COLOR }}
                                                formatter={(value, name) => {
                                                    if (name === 'amount') return [`€${Number(value).toLocaleString()}`, 'Pledge Amount'];
                                                    if (name === 'ethics') return [Number(value).toFixed(2), 'Ethics Score'];
                                                    return [value, name];
                                                }}
                                            />
                                            <Scatter name="Pledges" data={pledgeScatterData} fill={CYAN} />
                                        </ScatterChart>
                                    </ResponsiveContainer>
                                )}
                            </ErrorBoundary>
                        </div>
                    </div>
                </Section>
            </AnimatedSection>

            <AnimatedSection>
                <Section id="ssrllog">
                     <div className="max-w-6xl mx-auto">
                        <ErrorBoundary>
                            <SSRLLog />
                        </ErrorBoundary>
                    </div>
                </Section>
            </AnimatedSection>
        </>
    );
};

export default DashboardPage;