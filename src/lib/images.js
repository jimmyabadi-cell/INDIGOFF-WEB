// Imágenes responsivas: agrega srcset WebP (generado por scripts/optimize-images.mjs) a las fotos de /img.
import MANIFEST from "../data/image-manifest.json";

/**
 * Valores de `sizes` por uso: cuánto ancho ocupa la imagen en pantalla.
 * El navegador lo combina con la densidad del dispositivo para elegir la versión (360 a 1600 px).
 */
export const SIZES = {
  full: "100vw",
  half: "(max-width: 767px) 100vw, 50vw",
  card: "(max-width: 767px) 50vw, (max-width: 1100px) 33vw, 25vw",
  third: "(max-width: 767px) 100vw, 33vw",
  thumb: "120px",
};

const RE = /^\/img\/([0-9a-f]{32})\.jpe?g$/;

/**
 * Props para `<img>`: `src` original (respaldo) y, si existen versiones optimizadas, `srcSet` + `sizes`.
 *
 * @param {string} src     Ruta original, p. ej. "/img/<hash>.jpg".
 * @param {string} [sizes] Uno de `SIZES` o un `sizes` propio.
 */
export function imgProps(src, sizes = SIZES.full) {
  const m = RE.exec(src || "");
  const widths = m && MANIFEST[m[1]];
  if (!widths) return { src };
  return {
    src,
    srcSet: widths.map((w) => `/img/opt/${m[1]}-${w}.webp ${w}w`).join(", "),
    sizes,
  };
}
