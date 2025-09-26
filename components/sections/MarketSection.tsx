
import React from 'react';
import Section, { SectionTitle, SectionSubtitle } from '../Section';

interface MarketStatProps {
  label: string;
  value: string;
  color: string;
  textColor: string;
  darkTextColor: string;
}

// A new, responsive component to display a market stat as a card.
const MarketStat: React.FC<MarketStatProps> = ({ label, value, color, textColor, darkTextColor }) => (
    <div className={`text-center p-8 border rounded-lg ${color} bg-white dark:bg-slate-900/50`}>
        <div className={`text-4xl sm:text-5xl font-bold ${textColor} ${darkTextColor}`}>{value}</div>
        <div className="text-base text-slate-600 dark:text-slate-300 mt-2">{label}</div>
    </div>
);

const MarketSection: React.FC = () => {
  return (
    <Section id="market">
      <SectionTitle>A New Market Category</SectionTitle>
      <SectionSubtitle>
        CitizenSolar operates at the intersection of three rapidly growing global markets, creating a new, category-defining infrastructure layer.
      </SectionSubtitle>
      
      {/* 
        This container is now a flexbox that stacks vertically by default
        and becomes a row on medium screens and up, ensuring readability and proper layout on all devices.
        'items-stretch' makes the cards equal height in the row view.
      */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-stretch gap-8">
          <MarketStat 
            value="$15B+" 
            label="Virtual Power Plants (VPP)" 
            color="border-slate-200 dark:border-white/50" 
            textColor="text-slate-900" 
            darkTextColor="dark:text-white"
          />
          <MarketStat 
            value="$1T+" 
            label="Distributed Energy (DER)" 
            color="border-cyan-500/30 dark:border-cyan-500/80" 
            textColor="text-cyan-600"
            darkTextColor="dark:text-cyan-400"
          />
           <MarketStat 
            value="$20T+" 
            label="Regenerative Infrastructure" 
            color="border-pink-500/30 dark:border-pink-500/80" 
            textColor="text-pink-600"
            darkTextColor="dark:text-pink-400"
          />
      </div>

      <p className="text-center text-slate-400 dark:text-slate-500 mt-12 font-mono text-sm">*Illustrative Total Addressable Market (TAM) by 2035</p>
    </Section>
  );
};

export default MarketSection;