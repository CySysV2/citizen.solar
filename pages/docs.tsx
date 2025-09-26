import React from 'react';
import PageHeader from '../components/PageHeader';
import Section from '../components/Section';
import { CitizenSolarKernel } from "../lib/knowledgeKernel";

const CodeBlock: React.FC<{ children: React.ReactNode, language?: string }> = ({ children, language = 'json' }) => (
    <pre className="bg-slate-100 dark:bg-gray-900/50 p-4 rounded-md border border-slate-200 dark:border-slate-700 font-mono text-sm text-slate-700 dark:text-slate-300 overflow-x-auto relative">
        <code className={`language-${language}`}>{children}</code>
    </pre>
);


export default function DocsPage() {
  return (
    <>
      <PageHeader
        title="Live Kernel Documentation"
        subtitle="This documentation is generated automatically from the CitizenSolar Knowledge Kernel, our single source of truth."
      />
      <Section id="docs-content">
        <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">

          <section className="mb-6">
            <h2>Versioning</h2>
            <p>This data reflects the live state of the protocol's rule set.</p>
            <ul>
                <li><strong>Current Version:</strong> {CitizenSolarKernel.version}</li>
                <li><strong>IPFS CID:</strong> {CitizenSolarKernel.cid}</li>
                <li><strong>Last Updated:</strong> {CitizenSolarKernel.updated}</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2>Ethics Rules (ζπθ)</h2>
            <p>The ζπθ Ethics Filter programmatically enforces these rules on all pledges.</p>
            <CodeBlock>
              {JSON.stringify(CitizenSolarKernel.ethics, null, 2)}
            </CodeBlock>
          </section>

          <section className="mb-6">
            <h2>SSRL Tokenomics</h2>
             <p>Core parameters and minting rules for the SSRL token.</p>
            <ul>
              <li><strong>Name:</strong> {CitizenSolarKernel.ssrl.name}</li>
              <li><strong>Symbol:</strong> {CitizenSolarKernel.ssrl.symbol}</li>
              <li><strong>DAO Cap:</strong> {CitizenSolarKernel.ssrl.daoCap}</li>
            </ul>
            <h4>Minting Rules</h4>
            <CodeBlock>
              {JSON.stringify(CitizenSolarKernel.ssrl.rules, null, 2)}
            </CodeBlock>
          </section>

          <section className="mb-6">
            <h2>DAO Governance</h2>
            <p>Key parameters for DAO voting and treasury control.</p>
            <ul>
                <li><strong>Quorum:</strong> {CitizenSolarKernel.dao.quorum * 100}%</li>
                <li><strong>Emergency Quorum:</strong> {CitizenSolarKernel.dao.emergencyQuorum * 100}%</li>
                <li><strong>Multisig Threshold:</strong> {CitizenSolarKernel.dao.multisigThreshold}</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2>Roadmap</h2>
            <p>The development roadmap, as defined in the kernel.</p>
            <ul className="list-none p-0">
              {CitizenSolarKernel.roadmap.map((r) => (
                <li key={r.phase} className="border-b border-slate-200 dark:border-slate-800 py-2">
                  <strong>Phase {r.phase}:</strong> {r.title} — <span className="font-mono text-cyan-600 dark:text-cyan-400">{r.status}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Section>
    </>
  )
}
