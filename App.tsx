

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DonateModal from './components/interactive/DonateModal';
import ContactForm from './components/interactive/ContactForm';
import InvestorGate from './components/auth/InvestorGate';
import Tour from './components/interactive/Tour';
import { useRouter } from './hooks/useRouter';
import ErrorBoundary from './components/ErrorBoundary';
import { routeConfig } from './routing/routes';

// Build routes dynamically from the centralized config
const routes = routeConfig.reduce((acc, route) => {
    const PageComponent = route.isProtected
        ? (props: any) => (
            <InvestorGate>
                <route.component {...props} />
            </InvestorGate>
          )
        : route.component;

    acc[route.path] = PageComponent;
    return acc;
}, {} as { [key: string]: React.ComponentType<any> });


const App: React.FC = () => {
  const [isDonateModalOpen, setDonateModalOpen] = useState(false);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isTourOpen, setTourOpen] = useState(false);

  const { PageComponent, path } = useRouter(routes);

  useEffect(() => {
    // Check if the tour has been completed
    const tourCompleted = localStorage.getItem('citizenSolarTourCompleted');
    if (tourCompleted !== 'true') {
      // Small delay to let the page render before showing the tour
      setTimeout(() => setTourOpen(true), 500);
    }

    // Theme initialization
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    // Theme application
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const openDonateModal = () => setDonateModalOpen(true);
  const closeDonateModal = () => setDonateModalOpen(false);
  const openContactModal = () => setContactModalOpen(true);
  const closeContactModal = () => setContactModalOpen(false);

  const handleTourComplete = () => {
    localStorage.setItem('citizenSolarTourCompleted', 'true');
    setTourOpen(false);
  };

  const pageProps = {
    onFundNode: openDonateModal,
    onOpenContact: openContactModal,
  };

  const CurrentPageComponent = PageComponent;

  return (
    <div className="bg-white dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 min-h-screen font-sans">
      {isTourOpen && <Tour onClose={handleTourComplete} />}
      <Header theme={theme} toggleTheme={toggleTheme} currentPath={path} />
      <main>
        <ErrorBoundary>
          {CurrentPageComponent && <CurrentPageComponent {...pageProps} />}
        </ErrorBoundary>
      </main>
      {isDonateModalOpen && <DonateModal onClose={closeDonateModal} />}
      {isContactModalOpen && <ContactForm onClose={closeContactModal} />}
      <Footer />
    </div>
  );
};

export default App;