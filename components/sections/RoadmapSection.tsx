import React, { useState } from 'react';
import Section, { SectionTitle, SectionSubtitle } from '../Section';
import { CitizenSolarKernel } from '../../lib/knowledgeKernel';
import RoadmapDetailModal from '../interactive/RoadmapDetailModal';

// Define a more specific type for a roadmap phase based on the kernel data
type RoadmapPhase = typeof CitizenSolarKernel.roadmap[0];

const getStatusStyles = (status: string) => {
    switch (status) {
        case 'done': return 'border-green-500/50 bg-green-500/10 dark:bg-green-900/50';
        case 'active': return 'border-cyan-500/50 bg-cyan-500/10 dark:bg-cyan-900/50';
        case 'pending': return 'border-yellow-500/50 bg-yellow-500/10 dark:bg-yellow-900/50';
        default: return 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 opacity-70';
    }
};

const RoadmapSection: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<RoadmapPhase | null>(null);

  return (
    <>
      <Section id="roadmap">
        <SectionTitle>Development Roadmap</SectionTitle>
        <SectionSubtitle>
          Our roadmap is divided into core phases, moving from the initial network genesis to a fully federated global energy mesh. This data is pulled live from our Knowledge Kernel. Click a phase to learn more.
        </SectionSubtitle>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {CitizenSolarKernel.roadmap.map(phase => (
            <button
              key={phase.title}
              onClick={() => setSelectedPhase(phase)}
              className={`p-6 rounded-lg border h-full text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10 ${getStatusStyles(phase.status)}`}
            >
              <p className="font-mono text-sm text-slate-500 dark:text-slate-400 mb-2">Phase {phase.phase}</p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{phase.title}</h3>
              <p className="text-sm font-semibold capitalize">Status: <span className="font-bold">{phase.status}</span></p>
            </button>
          ))}
        </div>
      </Section>

      {selectedPhase && (
        <RoadmapDetailModal 
          phase={selectedPhase} 
          onClose={() => setSelectedPhase(null)} 
        />
      )}
    </>
  );
};

export default RoadmapSection;