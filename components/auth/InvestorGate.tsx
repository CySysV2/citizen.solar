import React, { useState, useEffect } from 'react';

interface InvestorGateProps {
    children: React.ReactNode;
}

// A mock whitelist of approved investor DIDs for the simulation
const MOCK_WHITELIST = [
    'did:scroll:investor:1a2b3c4d',
    'did:scroll:fund:5e6f7g8h',
];

type AuthState = 'verifying' | 'authenticated';

const InvestorGate: React.FC<InvestorGateProps> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>('verifying');
    const [isContentVisible, setContentVisible] = useState(false);

    // Effect for handling the authentication logic
    useEffect(() => {
        const verifyInvestor = async () => {
            // Check session storage to bypass verification if already authenticated
            if (sessionStorage.getItem('investor_did')) {
                setAuthState('authenticated');
                return;
            }

            // Simulate an async verification process
            await new Promise(resolve => setTimeout(resolve, 1500));

            // In a real app, perform an actual identity check here.
            sessionStorage.setItem('investor_did', MOCK_WHITELIST[0]);
            setAuthState('authenticated');
        };

        verifyInvestor();
    }, []); // Empty dependency array ensures this runs only once on mount

    // Effect for handling the fade-in animation after authentication
    useEffect(() => {
        if (authState === 'authenticated') {
            // A short delay allows the component to render before adding the opacity,
            // which ensures the CSS transition is applied correctly.
            const timer = setTimeout(() => {
                setContentVisible(true);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [authState]);

    if (authState === 'authenticated') {
        // Render the protected content with a smooth fade-in effect.
        return (
            <div className={`transition-opacity duration-500 ease-in ${isContentVisible ? 'opacity-100' : 'opacity-0'}`}>
                {children}
            </div>
        );
    }

    // While verifying, display a clear loading state.
    return (
        <div className="flex items-center justify-center py-40">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="w-10 h-10 border-4 border-t-cyan-500 border-slate-200 dark:border-slate-700 rounded-full animate-spin"></div>
                <p className="text-lg text-slate-600 dark:text-slate-400 mt-4">Verifying credentials...</p>
            </div>
        </div>
    );
};

export default InvestorGate;