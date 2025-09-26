import React, { useState } from 'react';

interface TourProps {
  onClose: () => void;
}

const tourSteps = [
  {
    title: "Welcome to CitizenSolar",
    content: "This is a brief tour of our investor-ready pitch deck. We're building a sovereign, ethics-based global virtual power plant protocol.",
  },
  {
    title: "Core Investor Sections",
    content: "In the header, you'll find the key sections: 'Technical', 'Tokenomics', and 'Whitepaper'. These provide a deep-dive into our protocol's architecture and value proposition.",
  },
  {
    title: "Live Network Dashboard",
    content: "The 'Dashboard' link leads to our live network metrics. It's a transparent, real-time view of our growth and operational health, gated for verified investors.",
  },
  {
    title: "In-Depth Documentation",
    content: "The 'Docs' section contains our full technical documentation, generated live from our Knowledge Kernel. This showcases our commitment to transparency and engineering excellence.",
  },
  {
    title: "Take the Next Step",
    content: "You're all set! Explore the site, and when you're ready, use the 'Request Investor Pack' button to get in touch.",
  },
];

const Tour: React.FC<TourProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const step = tourSteps[currentStep];

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose(); // Finish on the last step
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSkip = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/30 rounded-2xl p-6 max-w-md w-full text-left relative shadow-2xl shadow-cyan-500/20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{step.title}</h3>
          <span className="text-sm font-mono text-slate-500 dark:text-slate-400">
            {currentStep + 1} / {tourSteps.length}
          </span>
        </div>

        <p className="text-slate-600 dark:text-slate-300 mb-6">{step.content}</p>

        <div className="flex justify-between items-center">
          <button onClick={handleSkip} className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
            Skip Tour
          </button>
          <div className="flex items-center space-x-2">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-semibold py-2 px-4 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition"
              >
                Previous
              </button>
            )}
            <button
              onClick={handleNext}
              className="bg-[#08F7FE] text-black font-bold py-2 px-6 rounded-lg hover:bg-cyan-300 dark:hover:bg-white transition-all duration-300"
            >
              {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tour;
