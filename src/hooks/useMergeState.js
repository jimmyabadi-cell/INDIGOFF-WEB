import { useCallback, useState } from "react";

/**
 * Estado de objeto con `setState` que mezcla campos, como en los componentes de clase.
 * Permite que la lógica de página siga usando `self.state` / `self.setState` sin clases.
 *
 * @template T
 * @param {T | (() => T)} initial
 * @param {(s: T) => T} [normalize]  Se aplica tras cada cambio (p. ej. para mantener invariantes).
 * @returns {[T, (patch: Partial<T> | ((s: T) => Partial<T>)) => void]}
 */
export function useMergeState(initial, normalize) {
  const [state, setState] = useState(initial);
  const merge = useCallback(
    (patch) =>
      setState((s) => {
        const next = { ...s, ...(typeof patch === "function" ? patch(s) : patch) };
        return normalize ? normalize(next) : next;
      }),
    // `normalize` debe ser una función estable (definida fuera del componente).
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return [state, merge];
}
