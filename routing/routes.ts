
import React from 'react';
import Homepage from '../pages/Homepage';
import TechnicalPage from '../pages/TechnicalPage';
import TokenomicsPage from '../pages/TokenomicsPage';
import WhitepaperPage from '../pages/WhitepaperPage';
import DashboardPage from '../pages/dashboard';
import SSRLPage from '../pages/ssrl';
import DocsPage from '../pages/docs';

export interface RouteConfig {
  path: string;
  label: string;
  component: React.ComponentType<any>;
  inNav: boolean;
  isProtected?: boolean;
}

export const routeConfig: RouteConfig[] = [
  { path: '/', label: 'Home', component: Homepage, inNav: true, isProtected: false },
  { path: '/technical', label: 'Technical', component: TechnicalPage, inNav: true, isProtected: false },
  { path: '/tokenomics', label: 'Tokenomics', component: TokenomicsPage, inNav: true, isProtected: false },
  { path: '/dashboard', label: 'Dashboard', component: DashboardPage, inNav: true, isProtected: true },
  { path: '/ssrl', label: 'SSRL', component: SSRLPage, inNav: true, isProtected: false },
  { path: '/docs', label: 'Docs', component: DocsPage, inNav: true, isProtected: false },
  { path: '/whitepaper', label: 'Whitepaper', component: WhitepaperPage, inNav: true, isProtected: false },
];
