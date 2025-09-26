import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  // FIX: Reverted to using a constructor to initialize state. The class property
  // initializer was causing an error where `this.props` was not recognized.
  // The constructor ensures the component is initialized correctly.
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="bg-red-500/10 dark:bg-red-900/50 p-6 rounded-lg border border-red-500/30 text-center text-red-700 dark:text-red-300">
          <h3 className="text-xl font-bold mb-2">Something went wrong.</h3>
          <p className="mb-4">An error occurred in this component. Please try refreshing the page.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-red-600 transition"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
