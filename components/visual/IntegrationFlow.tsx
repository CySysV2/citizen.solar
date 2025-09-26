import React from 'react';
import { CitizenSolarKernel } from "../../lib/knowledgeKernel";

export default function IntegrationFlow() {
  const flow = ["Pledge", "zkProof", "SSRL Mint", "DAO Vote", "IPFS Anchor"];
  return (
    <div className="p-6 bg-slate-900/50 dark:bg-black text-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-800">
      <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Integration Flow</h2>
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        {flow.map((step, i) => (
          <React.Fragment key={i}>
            <div className="text-center">
              <div className="px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-semibold">
                {step}
              </div>
            </div>
            {i < flow.length - 1 && (
              <span className="mx-2 text-cyan-400 animate-pulse hidden md:inline">→</span>
            )}
          </React.Fragment>
        ))}
      </div>
      <p className="mt-4 text-sm text-slate-500 dark:text-gray-400 text-center">
        Ethics threshold: {CitizenSolarKernel.ethics.minScore}, DAO quorum:{" "}
        {CitizenSolarKernel.dao.quorum * 100}%
      </p>
    </div>
  );
}
