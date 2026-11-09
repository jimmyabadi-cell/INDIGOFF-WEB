// "Mi lista": productos e imágenes que el visitante guarda, persistidos en localStorage.

export const LIST_KEY = "indigoff_list";

export function listGet() {
  try {
    const v = JSON.parse(window.localStorage.getItem(LIST_KEY) || "null");
    if (Array.isArray(v)) return v;
  } catch (e) {}
  return (typeof window !== "undefined" && window.__indigoffList) || [];
}

export function listSet(a) {
  try {
    window.localStorage.setItem(LIST_KEY, JSON.stringify(a));
  } catch (e) {}
  try {
    window.__indigoffList = a;
  } catch (e) {}
}

export function listToggle(item) {
  const a = listGet();
  const i = a.findIndex((x) => x.id === item.id);
  if (i >= 0) a.splice(i, 1);
  else a.push(item);
  listSet(a);
}

/**
 * Campos del panel "Mi lista" para las plantillas (`v.listCount`, `v.listItems`, `v.openList`…).
 *
 * @param {ReturnType<import("../hooks/useSavedList.js").useSavedList>} list
 * @param {{ open: boolean, openList: () => void, closeList: () => void }} ui
 */
function itemHref(item) {
  const parts = (item.id || "").split(":");
  if (parts[0] === "lb" && parts[1]) return "/" + parts[1].toLowerCase();
  return "/";
}

export function listVals(list, ui) {
  const a = list.items;
  return {
    listCount: a.length,
    listOn: ui.open,
    listEmpty: a.length === 0,
    listHas: a.length > 0,
    openList: ui.openList,
    closeList: ui.closeList,
    clearList: list.clear,
    listItems: a.map((x) => ({
      name: x.name,
      kind: x.kind || "",
      img: x.img || "",
      href: itemHref(x),
      remove: () => list.toggle(x),
    })),
  };
}

/**
 * Campos de un botón "Guardar en mi lista" con prefijo `pre` (`pSaveOn`, `pSaveLbl`, `pSaveToggle`…).
 *
 * @param {ReturnType<import("../hooks/useSavedList.js").useSavedList>} list
 * @param {string} pre
 * @param {{ id: string } | null} item
 * @param {{ add?: string, saved?: string }} [labels]  Textos ya traducidos del botón.
 */
export function saveVals(list, pre, item, labels = {}) {
  const on = !!item && list.has(item.id);
  return {
    [pre + "On"]: on ? "true" : "false",
    [pre + "Lbl"]: on ? labels.saved || "Saved to my list" : labels.add || "Add to my list",
    [pre + "Is"]: on,
    [pre + "Not"]: !on,
    [pre + "Bg"]: on ? "#111111" : "transparent",
    [pre + "Fg"]: on ? "#FFFFFF" : "#111111",
    [pre + "Toggle"]: () => {
      if (item) list.toggle(item);
    },
  };
}
