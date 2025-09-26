import React from 'react';
import { KnowledgeNode } from '../../lib/knowledgeKernel';

interface KnowledgeCardProps {
    node: KnowledgeNode;
    isSelected?: boolean;
}

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({ node, isSelected = false }) => {
    
    const getTypeStyles = (type: string): { border: string, bg: string, text: string, selectedBorder: string } => {
        switch (type) {
            case 'concept': return { border: 'border-cyan-500/30', bg: 'bg-cyan-500/5 dark:bg-cyan-900/20', text: 'text-cyan-600 dark:text-cyan-400', selectedBorder: 'border-cyan-500' };
            case 'tech': return { border: 'border-pink-500/30', bg: 'bg-pink-500/5 dark:bg-pink-900/20', text: 'text-pink-600 dark:text-pink-400', selectedBorder: 'border-pink-500' };
            case 'entity': return { border: 'border-yellow-500/30', bg: 'bg-yellow-500/5 dark:bg-yellow-900/20', text: 'text-yellow-600 dark:text-yellow-400', selectedBorder: 'border-yellow-500' };
            case 'metric': return { border: 'border-green-500/30', bg: 'bg-green-500/5 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400', selectedBorder: 'border-green-500' };
            default: return { border: 'border-slate-200 dark:border-slate-700', bg: 'bg-slate-100/50 dark:bg-slate-800/50', text: 'text-slate-500 dark:text-slate-400', selectedBorder: 'border-slate-400 dark:border-slate-500' };
        }
    };

    const styles = getTypeStyles(node.type);

    return (
        <div className={`p-6 rounded-lg border bg-white dark:bg-transparent ${styles.bg} ${isSelected ? `${styles.selectedBorder} shadow-2xl shadow-cyan-500/10` : styles.border}`}>
            <div className="flex justify-between items-start mb-2">
                 <h4 className="text-xl font-bold text-slate-900 dark:text-white pr-4">{node.label}</h4>
                 <span className={`flex-shrink-0 text-xs font-mono px-2 py-1 rounded-full border ${styles.border} ${styles.text} bg-white/50 dark:bg-slate-900/50`}>{node.type}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">{node.description}</p>
        </div>
    );
};

export default KnowledgeCard;