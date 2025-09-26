import { CitizenSolarKernel } from './knowledgeKernel';

export const calculateUtility = (energyYield: number, ethicsScore: number, reputation: number, volatility: number) => {
    if (volatility === 0) return Infinity;
    return (energyYield * ethicsScore * reputation) / volatility;
};

export const mintSSRL = (pledgeAmount: number, ethicsScore: number, isDaoVerified: boolean): { result: string | number; reason: string } => {
    const { minScore } = CitizenSolarKernel.ethics;

    if (!isDaoVerified) {
        return { result: "Mint Denied", reason: "Pledge not verified by DAO." };
    }
    if (ethicsScore < minScore) {
        return { result: "Mint Denied", reason: `Ethics Score (${ethicsScore.toFixed(2)}) is below the required threshold of ${minScore}.` };
    }
    
    const ssrlAmount = pledgeAmount * ethicsScore;
    return { result: parseFloat(ssrlAmount.toFixed(2)), reason: `Minting successful.` };
};

export const validateEthics = (source: string, country: string): boolean => {
    const { allowedSources, geo } = CitizenSolarKernel.ethics;
    if (geo[country] === 'deny') {
        return false;
    }
    return allowedSources.includes(source);
};

// Updated to return a structured object for the simulator
export const zkFlowProof = (pledge: object): { proof: string; ipfsCID: string; icpAnchor: string } => {
    const pledgeString = JSON.stringify(pledge);
    const hash = pledgeString.split('').reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) | 0, 0);
    const proof = `zkp_0x${hash.toString(16)}`;

    // Generate mock hashes for IPFS and ICP
    const ipfsHash = 'Qm' + Array.from({ length: 44 }, () => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(Math.floor(Math.random() * 62))).join('');
    const icpAnchor = Array.from({ length: 27 }, () => 'abcdefghijklmnopqrstuvwxyz234567'.charAt(Math.floor(Math.random() * 32))).join('') + '-cai';

    return {
        proof,
        ipfsCID: ipfsHash,
        icpAnchor
    };
};
