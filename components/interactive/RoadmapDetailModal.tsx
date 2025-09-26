import React from 'react';
import { CitizenSolarKernel } from '../../lib/knowledgeKernel';

type RoadmapPhase = typeof CitizenSolarKernel.roadmap[0];

interface RoadmapDetailModalProps {
  phase: RoadmapPhase;
  onClose: () => void;
}

const getStatusBadgeStyles = (status: string) => {
    switch (status) {
        case 'done': return 'bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/50';
        case 'active': return 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 border-cyan-500/50';
        case 'pending': return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/50';
        default: return 'bg-slate-500/20 text-slate-700 dark:text-slate-300 border-slate-500/50';
    }
};

const RoadmapDetailModal: React.FC<RoadmapDetailModalProps> = ({ phase, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300" 
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/30 rounded-2xl p-6 md:p-8 max-w-2xl w-full text-left relative shadow-2xl shadow-cyan-500/20" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
          aria-label="Close modal"
        >
          &times;
        </button>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-0">
                Phase {phase.phase}: {phase.title}
            </h3>
            <span className={`text-sm font-bold capitalize px-3 py-1 rounded-full border ${getStatusBadgeStyles(phase.status)}`}>
                {phase.status}
            </span>
        </div>

        <p className="text-slate-600 dark:text-slate-300 mb-6">{phase.description}</p>
        
        <div>
            <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">Key Deliverables</h4>
            <ul className="space-y-3">
                {phase.key_deliverables.map((item) => (
                    <li key={item} className="flex items-start text-slate-600 dark:text-slate-300">
                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default RoadmapDetailModal;