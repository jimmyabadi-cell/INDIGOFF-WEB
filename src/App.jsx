import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Main = lazy(() => import("./pages/Main/Main.jsx"));
const CollectionPage = lazy(() => import("./pages/Collection/CollectionPage.jsx"));
const Downloads = lazy(() => import("./pages/Downloads/Downloads.jsx"));
const OnoffStudio = lazy(() => import("./pages/OnoffStudio/OnoffStudio.jsx"));
const FindRep = lazy(() => import("./pages/FindRep/FindRep.jsx"));
const Contact = lazy(() => import("./pages/Contact/Contact.jsx"));

const COLLECTIONS = ["ceilings", "walls", "lights", "dividers", "podcaster"];

export default function App() {
  return (
    <BrowserRouter>
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
