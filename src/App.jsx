import { Suspense, lazy } from "react";

const Main = lazy(() => import("./pages/Main/Main.jsx"));
const CollectionPage = lazy(() => import("./pages/Collection/CollectionPage.jsx"));
const Downloads = lazy(() => import("./pages/Downloads/Downloads.jsx"));
const OnoffStudio = lazy(() => import("./pages/OnoffStudio/OnoffStudio.jsx"));
const FindRep = lazy(() => import("./pages/FindRep/FindRep.jsx"));
const Contact = lazy(() => import("./pages/Contact/Contact.jsx"));

const COLLECTIONS = ["ceilings", "walls", "lights", "dividers", "podcaster"];
const TITLES = {
  "/": "Indigoff",
  "/downloads": "Downloads — Indigoff",
  "/find-a-rep": "Find a rep — Indigoff",
  "/onoff-studio": "onoff studio — Indigoff",
  "/contact": "Contact — Indigoff",
};

function route() {
  const path = (window.location.pathname.replace(/\/+$/, "") || "/").toLowerCase();
  const slug = path.slice(1);
  if (COLLECTIONS.includes(slug)) {
    document.title = slug.charAt(0).toUpperCase() + slug.slice(1) + " — Indigoff";
    return <CollectionPage col={slug} />;
  }
  document.title = TITLES[path] || "Indigoff";
  if (path === "/downloads") return <Downloads />;
  if (path === "/onoff-studio") return <OnoffStudio />;
  if (path === "/find-a-rep") return <FindRep />;
  if (path === "/contact") return <Contact />;
  return <Main />;
}

export default function App() {
  return <Suspense fallback={null}>{route()}</Suspense>;
}
