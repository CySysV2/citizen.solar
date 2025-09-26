import React, { useState, useMemo, useRef, useEffect } from 'react';
import Section, { SectionTitle, SectionSubtitle } from '../Section';
import { kernelData, KnowledgeNode, KnowledgeLink } from '../../lib/knowledgeKernel';
import KnowledgeCard from './KnowledgeCard';

interface Relationship {
    node: KnowledgeNode;
    label: string;
}

const KernelViz: React.FC = () => {
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(kernelData.nodes[0]?.id || null);
    const sectionRef = useRef<HTMLElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const selectedNode = useMemo(() => {
        return kernelData.nodes.find(n => n.id === selectedNodeId);
    }, [selectedNodeId]);

    const relationships = useMemo((): Relationship[] => {
        if (!selectedNodeId) return [];
        
        const rels: Relationship[] = [];
        kernelData.links.forEach((link: KnowledgeLink) => {
            if (link.source === selectedNodeId) {
                const targetNode = kernelData.nodes.find(n => n.id === link.target);
                if (targetNode) rels.push({ node: targetNode, label: link.label });
            }
            if (link.target === selectedNodeId) {
                const sourceNode = kernelData.nodes.find(n => n.id === link.source);
                if (sourceNode) rels.push({ node: sourceNode, label: link.label });
            }
        });
        return rels;
    }, [selectedNodeId]);

    const handleNodeClick = (node: KnowledgeNode) => {
        setSelectedNodeId(node.id);
    };

    return (
        <Section id="kernel-viz" ref={sectionRef}>
            <SectionTitle>CitizenSolar Knowledge Kernel</SectionTitle>
            <SectionSubtitle>
                An interactive visualization of the core concepts, technologies, and entities that form the CitizenSolar protocol. Click a node to explore its connections.
            </SectionSubtitle>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Node selection list */}
                <div className={`lg:col-span-4 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800 self-start transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Kernel Concepts</h3>
                    <div className="flex flex-col space-y-2">
                        {kernelData.nodes.map(node => (
                            <button
                                key={node.id}
                                onClick={() => handleNodeClick(node)}
                                className={`w-full text-left p-3 text-sm font-medium rounded-md border transition-all duration-200 ${
                                    selectedNode?.id === node.id 
                                        ? 'bg-cyan-500/10 dark:bg-cyan-900/50 border-cyan-500 text-slate-900 dark:text-white' 
                                        : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500'
                                }`}
                            >
                                {node.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Selected Node and Relationships */}
                <div className={`lg:col-span-8 transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
                    {selectedNode ? (
                        <div className="space-y-8">
                            <KnowledgeCard node={selectedNode} isSelected />
                            
                            {relationships.length > 0 && (
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Relationships</h3>
                                    <div className="space-y-6">
                                       {relationships.map(({ node, label }, index) => (
                                            <div key={node.id} className={`transition-all duration-500 ease-out ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{transitionDelay: `${600 + index * 100}ms`}}>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 font-mono">
                                                    ...is related via <span className="text-cyan-600 dark:text-cyan-400 font-semibold">"{label}"</span>
                                                </p>
                                                <KnowledgeCard node={node} />
                                            </div>
                                       ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full rounded-lg border border-dashed border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500 p-8">
                            <p>Select a concept from the list to explore its details and connections.</p>
                        </div>
                    )}
                </div>
            </div>
        </Section>
    );
};

export default KernelViz;