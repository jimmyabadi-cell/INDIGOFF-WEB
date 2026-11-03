import { useEffect, useReducer } from "react";
import { LIST_KEY, listGet, listSet, listToggle } from "../lib/savedList.js";

/**
 * "Mi lista" del visitante. Vuelve a renderizar al cambiarla, también desde otra pestaña.
 */
export function useSavedList() {
  const [, bump] = useReducer((n) => n + 1, 0);

  useEffect(() => {
    const onStorage = (e) => {
      if (!e.key || e.key === LIST_KEY) bump();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const items = listGet();
  return {
    items,
    has: (id) => items.some((x) => x.id === id),
    toggle: (item) => {
      listToggle(item);
      bump();
    },
    clear: () => {
      listSet([]);
      bump();
    },
  };
}
