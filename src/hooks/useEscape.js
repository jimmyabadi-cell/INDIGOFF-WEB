import { useEffect, useRef } from "react";

/**
 * Llama a `onEscape` cuando se presiona Escape, solo mientras `active` sea true.
 *
 * @param {boolean} active
 * @param {() => void} onEscape
 */
export function useEscape(active, onEscape) {
  const handler = useRef(onEscape);
  handler.current = onEscape;

  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") handler.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);
}
