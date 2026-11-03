// Inline CSS string -> React style object (cached).
const cache = new Map();
export function S(css) {
  if (!css) return undefined;
  let o = cache.get(css);
  if (o) return o;
  o = {};
  css.split(";").forEach((decl) => {
    const i = decl.indexOf(":");
    if (i < 0) return;
    const prop = decl.slice(0, i).trim();
    const val = decl.slice(i + 1).trim();
    if (!prop) return;
    const key = prop.startsWith("--") ? prop : prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    o[key] = val;
  });
  if (cache.size > 5000) cache.clear();
  cache.set(css, o);
  return o;
}
