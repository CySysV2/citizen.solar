
import { routeConfig } from '../routing/routes';

/**
 * Navigates to a new view by updating the URL hash.
 * This triggers a 'hashchange' event which the App component listens to.
 * @param hash The hash to navigate to (e.g., '#/technical' or '#solution').
 */
export const navigate = (hash: string) => {
  window.location.hash = hash;
};

// Generate navLinks from the single source of truth
export const navLinks = routeConfig
    .filter(route => route.inNav)
    .map(route => ({
        label: route.label,
        path: `#${route.path}`,
    }));
