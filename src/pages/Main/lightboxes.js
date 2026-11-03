import { makeT } from "../../i18n/index.js";

const PROJECT_DESC = {
  "Acoustic solution designed and installed by Indigoff.": "@home.lightbox.desc.projectInstalled",
  "Acoustic solution designed, manufactured and installed by Indigoff.": "@home.lightbox.desc.projectManufactured",
};
export function projLb(pj) {
  return {
    label: "@home.lightbox.label.project",
    title: pj.name,
    desc: PROJECT_DESC[pj.desc] || pj.desc,
    img: pj.imgs[0],
    alt: pj.name,
    cta: "@home.lightbox.cta.likeThis",
    galleryRatio: "4 / 3",
    galleryMin: "320px",
    galleryNames: false,
    gallery: pj.imgs.map(function (u, i) {
      return { name: pj.name + " — " + (i + 1), img: u };
    }),
  };
}

/** Lightbox de un concepto (desde el carrusel o la búsqueda). */
export function conceptLb(c) {
  return {
    concept: true,
    gallery: c.gallery || null,
    img: c.img,
    alt: { k: "home.concepts.alt", vars: { code: c.code, name: "@home.conceptNames." + c.code } },
    label: "@home.lightbox.label.concept",
    title: c.code,
    desc: { k: "home.lightbox.conceptDesc", vars: { name: "@home.conceptNames." + c.code } },
    cta: "",
  };
}

// Los ids de "Mi lista" se arman con el texto en inglés: no cambian al cambiar de idioma.
export const tEn = makeT("en");
