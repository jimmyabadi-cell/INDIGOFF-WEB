import { useEffect, useState } from "react";
import css from "./Hero.module.css";
import HERO from "../../../data/hero.json";
import { imgProps, SIZES } from "../../../lib/images.js";

const SLIDES = [
  {
    cls: "hs-2",
    src: "/img/95478a5658304ca607006b326c317835.jpg",
    alt: "Rainbow acoustic arches and ceiling ribbons over an open office",
  },
  {
    cls: "hs-3",
    src: "/img/262de0d004e1e631ef993783a62dc338.jpg",
    alt: "Colorful acoustic podcast studio with wall shapes and ceiling clouds",
  },
];

/**
 * Las diapositivas 2 y 3 aparecen hasta los 5.5 s del carrusel: se piden un momento después de que la página
 * termina de cargar, para no quitarle ancho de banda a la primera foto (LCP).
 */
function useLoadedLater(delay = 1000) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let timer;
    const go = () => (timer = setTimeout(() => setReady(true), delay));
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", go);
    };
  }, [delay]);
  return ready;
}

/** Hero con imágenes rotativas y llamados principales. */
export default function Hero({ v }) {
  const later = useLoadedLater();
  return (
    <section className={css.top} id="top">
      <div className="hs" aria-hidden="false">
        <img
          className="hs-i hs-1"
          // React 18 aún no conoce fetchPriority: en minúsculas pasa tal cual al HTML.
          // eslint-disable-next-line react/no-unknown-property
          fetchpriority="high"
          {...imgProps(HERO.src, SIZES.full)}
          alt="Indigoff space with suspended baffles, arched walls and sculptural forms"
        />
        {SLIDES.map((sl) => (
          // El <img> existe desde el inicio (su animación va sincronizada con la primera foto);
          // sin src ni alt hasta `later`, así no se pide ni muestra nada.
          <img
            key={sl.cls}
            decoding="async"
            className={"hs-i " + sl.cls}
            {...(later ? imgProps(sl.src, SIZES.full) : {})}
            alt={later ? sl.alt : ""}
          />
        ))}
      </div>
      <div className={"scrim " + css.box} aria-hidden="true"></div>
      <div className="hs-copy">
        <h1 className="hs-h">
          {v.t("home.hero.line1")}
          <br />
          {v.t("home.hero.line2")}
          <br />
          {v.t("home.hero.line3")}
        </h1>
        <p className="hs-p">{v.t("home.hero.text")}</p>
        <div className="cta-row cta-dk">
          <a href="/contact" className="cta-p">
            {v.t("home.hero.quote")}
          </a>
          <a href="#categories" className="cta-o">
            {v.t("home.hero.explore")}
          </a>
        </div>
      </div>
    </section>
  );
}
