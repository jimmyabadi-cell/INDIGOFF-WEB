// Genera versiones WebP de cada foto de public/img en varios anchos, para usar con srcset.
//
// - Salida: public/img/opt/<nombre>-<ancho>.webp (no se versiona; se genera en predev/prebuild).
// - Manifiesto: src/data/image-manifest.json ({ "<nombre>": [anchos] }), sí se versiona.
// - Solo procesa lo que falta: correrlo de nuevo es casi instantáneo.
// - Los PNG con transparencia (logos) se dejan como están.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SRC = path.join(ROOT, "public/img");
const OUT = path.join(SRC, "opt");
const MANIFEST = path.join(ROOT, "src/data/image-manifest.json");
const WIDTHS = [480, 960, 1600];
const QUALITY = 78;

fs.mkdirSync(OUT, { recursive: true });
const files = fs.readdirSync(SRC).filter((f) => /\.jpe?g$/i.test(f));
const manifest = {};
let made = 0;
let skipped = 0;
const start = Date.now();

async function processFile(file) {
  const name = file.replace(/\.jpe?g$/i, "");
  const input = path.join(SRC, file);
  const { width } = await sharp(input).metadata();
  // Anchos menores al original, más el original (sin agrandar nunca).
  const widths = [...new Set([...WIDTHS.filter((w) => w < width), Math.min(width, WIDTHS.at(-1))])];
  for (const w of widths) {
    const out = path.join(OUT, `${name}-${w}.webp`);
    if (fs.existsSync(out)) {
      skipped++;
      continue;
    }
    await sharp(input).resize({ width: w, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(out);
    made++;
  }
  manifest[name] = widths;
}

// Procesar en paralelo, un lote por núcleo.
const queue = [...files];
const workers = Array.from({ length: Math.max(2, os.cpus().length) }, async () => {
  while (queue.length) await processFile(queue.shift());
});
await Promise.all(workers);

const sorted = Object.fromEntries(
  Object.keys(manifest)
    .sort()
    .map((k) => [k, manifest[k]]),
);
fs.writeFileSync(MANIFEST, JSON.stringify(sorted) + "\n");
console.log(
  `[images] ${files.length} fotos · ${made} versiones nuevas · ${skipped} ya existían · ${((Date.now() - start) / 1000).toFixed(1)}s`,
);
