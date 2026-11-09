import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import FloatingActions from "./components/FloatingActions.jsx";

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

function titleFor(pathname) {
  const path = (pathname.replace(/\/+$/, "") || "/").toLowerCase();
  const slug = path.slice(1);
  if (COLLECTIONS.includes(slug)) return slug.charAt(0).toUpperCase() + slug.slice(1) + " — Indigoff";
  return TITLES[path] || "Indigoff";
}

/** Título de la pestaña según la ruta. */
function PageTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = titleFor(pathname);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <PageTitle />
      <FloatingActions />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/onoff-studio" element={<OnoffStudio />} />
          <Route path="/find-a-rep" element={<FindRep />} />
          <Route path="/contact" element={<Contact />} />
          {COLLECTIONS.map((col) => (
            <Route key={col} path={`/${col}`} element={<CollectionPage col={col} />} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
