// =====================================
// /lib/knowledgeKernel.ts
// CitizenSolar “Brain” — Single Source of Truth
// =====================================
export const CitizenSolarKernel = {
  version: "v1.1",
  cid: "Qm...CID_placeholder", // replace with IPFS CID
  updated: "2025-09-25",
  ethics: {
    minScore: 0.7,
    allowedSources: ["EU_Horizon", "Hedera_Grant", "Community_DAO"],
    blockedEntities: ["fossil_corp_X", "surveillance_vendor_Z"],
    geo: { EU: "allow", US: "allow", CN: "deny", RU: "deny" } as Record<string, 'allow' | 'deny'>
  },
  ssrl: {
    name: "SolarScroll",
    symbol: "SSRL",
    decimals: 18,
    daoCap: "DAO-voted annual cap",
    rules: [
      "must_be_pledge_verified",
      "zkProof_of_flow_required",
      "ethicsScore >= 0.7"
    ],
    utilityFn: (yield_: number, ethics: number, rep: number, vol: number) =>
      (yield_ * ethics * rep) / (vol === 0 ? 1 : vol)
  },
  dao: {
    quorum: 0.6,
    voteTypes: ["1p1v", "quadratic", "zk-anon"],
    emergencyQuorum: 0.8,
    multisigThreshold: 3
  },
  MAS: {
    agents: [
        { name: "GridBalancer", role: "Grid Stability Agent", contribution: "Monitors and balances energy loads across GridCommons nodes to ensure network stability and prevent outages." },
        { name: "EthicsOracle", role: "Ethics Validation Agent", contribution: "Verifies incoming pledges against the DAO-governed ζπθ rules, assigning an ethics score to each transaction." },
        { name: "MarketMaker", role: "Local Energy Market Agent", contribution: "Facilitates peer-to-peer energy trading within a GridCommons, optimizing for local consumption and fair pricing." },
        { name: "PledgeValidator", role: "Pledge Verification Agent", contribution: "Generates and anchors zkProofs for verified pledges to the zkLedger, ensuring privacy and auditability." }
    ],
    optimizationGoals: [
        "Grid Stability",
        "Maximize Renewable Use",
        "Minimize Energy Cost",
        "Uphold ζπθ Ethics"
    ]
  },
  roadmap: [
    { 
      phase: 1, 
      title: "MVP Prototyping", 
      status: "done",
      description: "Successfully designed and validated the core protocol architecture, including the SSRL tokenomics, zkLedger concept, and the ζπθ ethics filter. Completed initial simulations and established foundational partnerships.",
      key_deliverables: [
        "Whitepaper v1 Published",
        "Economic Model Simulation Complete",
        "Initial Partner MOUs Signed"
      ]
    },
    { 
      phase: 2, 
      title: "Pledge Gateway + zkLedger", 
      status: "active",
      description: "Development and deployment of the ScrollPledge system, allowing for the first live, privacy-preserving pledges. The zkLedger smart contracts are being audited and deployed to testnet.",
      key_deliverables: [
        "ScrollPledge Smart Contract Audit",
        "Testnet Deployment of zkLedger",
        "Launch of the Donor Portal MVP"
      ]
    },
    { 
      phase: 3, 
      title: "GridCommons DAO", 
      status: "pending",
      description: "Establishment of the legal and technical frameworks for the first pilot GridCommons DAOs. This phase focuses on governance tooling and onboarding the first community node operators.",
      key_deliverables: [
        "DAO Governance Framework Finalized",
        "On-chain Voting Module Deployed",
        "First 3 Pilot Sites Onboarded"
      ]
    },
    { 
      phase: 4, 
      title: "SSRL Testnet Launch", 
      status: "pending",
      description: "The full SSRL token will be deployed on a public testnet, integrating the pledge gateway, zkLedger, and DAO governance. This phase is critical for public testing and security validation before mainnet.",
      key_deliverables: [
        "Public Testnet Launch",
        "Security Audits (Phase II)",
        "Ecosystem Grant Program Initiated"
      ]
    },
    { 
      phase: 5, 
      title: "ScrollCity Integration", 
      status: "future",
      description: "Scaling the protocol by integrating with larger urban infrastructure projects (ScrollCities) and federating multiple GridCommons DAOs into a resilient, global energy mesh.",
      key_deliverables: [
        "Mainnet Launch",
        "First ScrollCity Partnership",
        "Cross-DAO Governance Protocol"
      ]
    }
  ]
};

export interface KnowledgeNode {
    id: string;
    label: string;
    description: string;
    type: 'concept' | 'tech' | 'entity' | 'metric';
}

export interface KnowledgeLink {
    source: string;
    target: string;
    label:string;
}

export const kernelData: { nodes: KnowledgeNode[], links: KnowledgeLink[] } = {
    nodes: [
        { id: 'citizensolar', label: 'CitizenSolar Protocol', description: 'A sovereign, vertically integrated Energy-as-a-Service framework for citizen-governed energy deployment.', type: 'concept' },
        { id: 'ssrl', label: 'SSRL Token', description: 'The Sovereign Regenerative Ledger (SSRL) token is the core utility and governance asset of the ecosystem.', type: 'tech' },
        { id: 'zkledger', label: 'zkLedger', description: 'A privacy-preserving ledger that uses zkSNARKs to verify pledges and network activity without revealing sensitive data.', type: 'tech' },
        { id: 'dao', label: 'DAO Governance', description: 'A system of DAOs for decentralized control over network rules, treasury, and local GridCommons.', type: 'concept' },
        { id: 'gridcommons', label: 'GridCommons', description: 'Community-owned and governed microgrids that form the physical layer of the CitizenSolar network.', type: 'entity' },
        { id: 'ethics', label: 'Ethics Filter (ζπθ)', description: 'A programmable filter that validates all capital and participants based on community-defined ethical rules.', type: 'tech' },
        { id: 'mas', label: 'Multi-Agent System (MAS)', description: 'A collection of autonomous software agents that manage and optimize the network for stability and efficiency.', type: 'tech' },
        { id: 'minscore', label: 'Ethics Min Score', description: `A key parameter from the kernel (${CitizenSolarKernel.ethics.minScore}) that determines the minimum ethics score for a pledge to be valid for SSRL minting.`, type: 'metric' },
    ],
    links: [
        { source: 'citizensolar', target: 'ssrl', label: 'utilizes' },
        { source: 'citizensolar', target: 'dao', label: 'governed by' },
        { source: 'citizensolar', target: 'gridcommons', label: 'deploys' },
        { source: 'ssrl', target: 'dao', label: 'enables voting in' },
        { source: 'ssrl', target: 'zkledger', label: 'minted on' },
        { source: 'zkledger', target: 'ethics', label: 'validates via' },
        { source: 'dao', target: 'ethics', label: 'sets rules for' },
        { source: 'gridcommons', target: 'mas', label: 'managed by' },
        { source: 'ethics', target: 'minscore', label: 'uses' },
        { source: 'ssrl', target: 'ethics', label: 'minting depends on' },
    ]
};