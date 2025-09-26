import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// The App component is stateful and manages its own re-rendering based on URL changes.
// We only need to render it once at the root. The listeners inside App will handle page changes.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
