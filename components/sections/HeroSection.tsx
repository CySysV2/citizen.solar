import React, { useState, useEffect } from 'react';

interface HeroSectionProps {
  onFundNode: () => void;
  onOpenContact: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onFundNode, onOpenContact }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center text-center px-4 pt-24">
      <div className="relative z-10">
        <div className={`inline-block bg-cyan-500/10 border border-cyan-500/30 text-[#08F7FE] text-sm px-4 py-1 rounded-full mb-4 font-mono transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          A Sovereign Community-Centric Virtual Power Plant
        </div>
        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-slate-900 dark:text-white mb-6 transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
          The Future of Energy is <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#08F7FE] to-[#F72585]">
            Decentralized & Ethical
          </span>
        </h1>
        <p className={`max-w-3xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
          CitizenSolar is a sovereign, vertically integrated Energy-as-a-Service framework designed for citizen-governed deployment. We are replacing fragile, centralized grids with a resilient, participatory, and programmable energy mesh.
        </p>
        <div className={`flex flex-col justify-center items-center gap-4 max-w-xs mx-auto transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '600ms' }}>
          <button onClick={onFundNode} className="w-full bg-[#08F7FE] text-black font-bold py-3 px-8 rounded-lg hover:bg-cyan-300 dark:hover:bg-white transition-all duration-300 transform hover:scale-105">
            Fund a Node
          </button>
          <button onClick={onOpenContact} className="w-full bg-[#F72585] text-white font-bold py-3 px-8 rounded-lg hover:bg-pink-600 transition-all duration-300 transform hover:scale-105">
            Request Investor Pack
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;