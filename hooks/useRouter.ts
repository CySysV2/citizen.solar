import React, { useState, useEffect } from 'react';

export const useRouter = (routes: { [key: string]: React.ComponentType<any> }) => {
  const [route, setRoute] = useState<{
    PageComponent: React.ComponentType<any> | null;
    path: string;
    elementId: string | null;
  }>({
    PageComponent: null,
    path: '/',
    elementId: null,
  });

  useEffect(() => {
    const handleHashChange = () => {
      const fullHash = window.location.hash.replace(/^#/, '');
      
      const hashParts = fullHash.split('#');
      let pathPart = hashParts[0];
      const elementId = hashParts.length > 1 ? hashParts[1] : null;

      // Normalize path to always have a leading slash and no trailing slash
      let path = pathPart || '/';
      if (!path.startsWith('/')) {
        path = '/' + path;
      }
      if (path.length > 1 && path.endsWith('/')) {
        path = path.slice(0, -1);
      }
      
      const PageComponent = routes[path] || routes['/'];
      
      setRoute({
          PageComponent,
          path,
          elementId,
      });
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial load

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [routes]);

  useEffect(() => {
    // This effect handles scrolling when the route changes
    if (route.elementId) {
      setTimeout(() => {
        const element = document.getElementById(route.elementId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // Only scroll to top if we are not trying to scroll to a specific element
      window.scrollTo(0, 0);
    }
  }, [route.PageComponent, route.elementId]); // Rerun when page or elementId changes

  return { PageComponent: route.PageComponent, path: route.path };
};
