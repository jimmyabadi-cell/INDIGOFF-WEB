// Copia las fotos de productos y proyectos (originales, calidad completa) a exports/imagenes-indigoff/
// con carpetas y nombres legibles, más un indice.csv. No modifica el sitio.
//
//   productos/<Categoría>/<Producto>/<producto>-01.jpg
//   proyectos/<Proyecto>/<proyecto>-01.jpg
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const DATA = path.join(ROOT, "src/data");
const PUBLIC = path.join(ROOT, "public");
const OUT = path.join(ROOT, "exports/imagenes-indigoff");
const read = (f) => JSON.parse(fs.readFileSync(path.join(DATA, f), "utf8"));

const P = read("products.json");
const G = read("gallery.json");
const C = read("collections.json");
const PJ = read("projects.json");
const FEATURED = read("project-featured.json");
const LB = read("lightboxes.json");
const D = read("downloads.json");
const EN = JSON.parse(fs.readFileSync(path.join(ROOT, "src/i18n/locales/en.json"), "utf8"));

const slug = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const folder = (s) => s.replace(/[/\\:*?"<>|]/g, "-").trim();

// Producto → categoría (la primera categoría cuyas subcategorías lo incluyen).
const categoryOf = {};
for (const key of C.porder) {
  for (const sub of C.parents[key].subs) {
    for (const pk of C.cols[sub].products) categoryOf[pk] ??= EN.catalog.categories[key];
  }
}
// Respaldo por familia del producto (p. ej. "woolskin" y "fusetex" son paneles de muro fuera de las pestañas).
const FAMILY_EXTRA = { woolskin: "walls", fusetex: "walls" };
for (const [k, p] of Object.entries(P)) {
  if (categoryOf[k]) continue;
  const fam = p[1];
  const parent = C.parents[fam]
    ? fam
    : FAMILY_EXTRA[fam] || Object.keys(C.parents).find((key) => C.parents[key].subs.includes(fam));
  if (parent) categoryOf[k] = EN.catalog.categories[parent];
}
const productByName = {};
for (const [k, p] of Object.entries(P)) productByName[p[0].toLowerCase()] ??= k;

const items = new Map(); // ruta de imagen → { group, path de destino }
const counters = {};
function add(src, kind, group, sub, label) {
  if (!src || !/^\/img\/[0-9a-f]{32}\.(jpe?g|png)$/.test(src) || items.has(src)) return;
  const dir = kind === "productos" ? path.join(kind, folder(sub), folder(group)) : path.join(kind, folder(group));
  counters[dir] = (counters[dir] || 0) + 1;
  const ext = path.extname(src);
  const file = `${slug(group)}-${String(counters[dir]).padStart(2, "0")}${ext}`;
  items.set(src, { kind, category: sub || "", name: group, label: label || "", rel: path.join(dir, file) });
}

// Productos: foto principal, segunda vista y galería.
for (const [k, p] of Object.entries(P)) {
  const cat = categoryOf[k] || "Other";
  [p[2], p[4], p[5]].forEach((src) => add(src, "productos", p[0], cat, "principal"));
  (G[k] || []).forEach((g) => add(g.img, "productos", p[0], cat, "galería"));
}
// Fotos de producto que solo aparecen en la home o en Downloads.
for (const [id, lb] of Object.entries(LB)) {
  if (!id.startsWith("p_") || typeof lb.title !== "string") continue;
  const k = productByName[lb.title.toLowerCase()];
  // Sin ficha de producto: la categoría sale de la etiqueta del lightbox ("@catalog.subcategories.<categoría>.…").
  const ref = [].concat(lb.label).find((r) => /^@catalog\.(categories|subcategories)\./.test(r));
  const fromLabel = ref && EN.catalog.categories[ref.split(".")[2]];
  add(lb.img, "productos", k ? P[k][0] : lb.title, k ? categoryOf[k] : fromLabel || "Other", "home");
}
for (const d of D) {
  const k = productByName[d.n.toLowerCase()];
  add(d.img, "productos", k ? P[k][0] : d.n, k ? categoryOf[k] : EN.catalog.categories[d.c], "downloads");
}
// Proyectos.
for (const pj of [FEATURED, ...PJ]) pj.imgs.forEach((src) => add(src, "proyectos", pj.name));
for (const [id, lb] of Object.entries(LB)) {
  if (id.startsWith("j_") && typeof lb.title === "string") add(lb.img, "proyectos", lb.title);
}

// Copiar.
fs.rmSync(OUT, { recursive: true, force: true });
let bytes = 0;
const missing = [];
const rows = [["archivo", "tipo", "categoría", "nombre", "origen", "archivo original"]];
for (const [src, it] of items) {
  const from = path.join(PUBLIC, src);
  if (!fs.existsSync(from)) {
    missing.push(src);
    continue;
  }
  const to = path.join(OUT, it.rel);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  bytes += fs.statSync(from).size;
  rows.push([it.rel, it.kind, it.category, it.name, it.label, path.basename(src)]);
}
const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
fs.writeFileSync(path.join(OUT, "indice.csv"), "﻿" + csv + "\n");

const count = (kind) => rows.filter((r) => r[1] === kind).length;
const groups = (kind) => new Set(rows.filter((r) => r[1] === kind).map((r) => r[3])).size;
console.log(`productos: ${count("productos")} fotos de ${groups("productos")} productos`);
console.log(`proyectos: ${count("proyectos")} fotos de ${groups("proyectos")} proyectos`);
console.log(`total: ${rows.length - 1} fotos, ${(bytes / 1048576).toFixed(1)} MB → ${path.relative(ROOT, OUT)}`);
if (missing.length) console.log(`no encontradas en public/: ${missing.length}`, missing.slice(0, 5));
