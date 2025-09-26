// This is a mock implementation. In a real application, this would interact with a Firebase backend.

export interface Pledge {
    pledgeID: string;
    name: string;
    email: string;
    amount: number;
    donorID: string | null;
    ethicsScore: number;
    daoApproval: boolean;
    timestamp: number;
}

interface NewPledgeData {
    name: string;
    email: string;
    amount: number;
    donorID: string | null;
    ethicsScore: number;
    daoApproval: boolean;
}

export interface DashboardStats {
    totalPledges: number;
    ssrlMinted: number;
    daoVotes: number;
    zkProofsVerified: number;
}

/**
 * Simulates adding a new pledge to the backend.
 * In a real app, this would be an async call to Firestore.
 * @param pledgeData - The data for the new pledge.
 * @returns A promise that resolves with the full Pledge object, including a new ID.
 */
export const addPledge = async (pledgeData: NewPledgeData): Promise<Pledge> => {
    console.log("Simulating adding pledge to Firebase:", pledgeData);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newPledge: Pledge = {
        ...pledgeData,
        pledgeID: `pl_${Math.random().toString(36).substring(2, 10)}`,
        timestamp: Date.now(),
    };

    console.log("Pledge created with ID:", newPledge.pledgeID);
    return newPledge;
};

/**
 * Simulates fetching aggregated stats for the dashboard.
 */
export const getDashboardStats = async (): Promise<DashboardStats> => {
    console.log("Simulating fetching dashboard stats from Firebase...");
    await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate network delay

    const stats: DashboardStats = {
        totalPledges: 2345678,
        ssrlMinted: 1987654,
        daoVotes: 112,
        zkProofsVerified: 1548,
    };
    
    return stats;
};
