import fs from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const read = (f) => JSON.parse(fs.readFileSync(new URL(f, import.meta.url), "utf8"));

/** Chunk de `entry`, sus imports estáticos y su CSS (sin el entry principal, que ya carga index.html). */
function chunkFiles(bundle, entry) {
  const chunks = Object.values(bundle).filter((c) => c.type === "chunk");
  const start = chunks.find((c) => c.facadeModuleId?.endsWith(entry));
  const files = new Set();
  const visit = (c) => {
    if (!c || c.isEntry || files.has(c.fileName)) return;
    files.add(c.fileName);
    c.viteMetadata?.importedCss.forEach((f) => files.add(f));
    c.imports.forEach((f) => visit(bundle[f]));
  };
  visit(start);
  return [...files];
}

/**
 * Precarga lo que la home necesita para pintar el hero, solo en "/":
 * - la foto principal (el elemento más grande de la pantalla, LCP), que sin esto el navegador no descubre
 *   hasta que React renderiza la página. Usa el mismo srcset/sizes que <Hero> (ver src/lib/images.js);
 * - en build, el código de la home (se carga con lazy() en App.jsx), para no esperar a que index.js lo pida.
 */
function preloadHome() {
  return {
    name: "preload-home",
    transformIndexHtml(html, ctx) {
      const { src } = read("./src/data/hero.json");
      const hash = /([0-9a-f]{32})/.exec(src)[1];
      const widths = read("./src/data/image-manifest.json")[hash] || [];
      const srcset = widths.map((w) => `/img/opt/${hash}-${w}.webp ${w}w`).join(", ");
      const modules = ctx.bundle ? chunkFiles(ctx.bundle, "/src/pages/Main/Main.jsx").map((f) => "/" + f) : [];
      const code =
        `if (location.pathname === "/") {` +
        `var l = document.createElement("link");` +
        `l.rel = "preload"; l.as = "image"; l.setAttribute("fetchpriority", "high");` +
        (srcset
          ? `l.setAttribute("imagesrcset", ${JSON.stringify(srcset)}); l.setAttribute("imagesizes", "100vw");`
          : "") +
        `l.href = ${JSON.stringify(src)}; document.head.appendChild(l);` +
        `${JSON.stringify(modules)}.forEach(function (h) {` +
        `var m = document.createElement("link"); m.href = h;` +
        `if (h.slice(-4) === ".css") { m.rel = "preload"; m.as = "style"; } else m.rel = "modulepreload";` +
        `document.head.appendChild(m); }); }`;
      return [{ tag: "script", children: code, injectTo: "head" }];
    },
  };
}

export default defineConfig({
  plugins: [react(), preloadHome()],
});
