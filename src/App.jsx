import React, { Suspense, lazy } from 'react';

const Main = lazy(() => import('./pages/Main.jsx'));
const CollectionPage = lazy(() => import('./pages/CollectionPage.jsx'));
const Downloads = lazy(() => import('./pages/Downloads.jsx'));
const OnoffStudio = lazy(() => import('./pages/OnoffStudio.jsx'));
const FindRep = lazy(() => import('./pages/FindRep.jsx'));

const COLLECTIONS = ['ceilings', 'walls', 'lights', 'dividers', 'podcaster'];
const TITLES = { '/': 'Indigoff', '/downloads': 'Downloads — Indigoff', '/find-a-rep': 'Find a rep — Indigoff', '/onoff-studio': 'onoff studio — Indigoff' };

function route() {
  const path = (window.location.pathname.replace(/\/+$/, '') || '/').toLowerCase();
  const slug = path.slice(1);
  if (COLLECTIONS.includes(slug)) {
    document.title = slug.charAt(0).toUpperCase() + slug.slice(1) + ' — Indigoff';
    return <CollectionPage col={slug} />;
  }
  document.title = TITLES[path] || 'Indigoff';
  if (path === '/downloads') return <Downloads />;
  if (path === '/onoff-studio') return <OnoffStudio />;
  if (path === '/find-a-rep') return <FindRep />;
  return <Main />;
}

export default function App() {
  return <Suspense fallback={null}>{route()}</Suspense>;
}
