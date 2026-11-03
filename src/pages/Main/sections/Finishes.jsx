import css from "./Finishes.module.css";

/** Acabados: colores, texturas, impresión, grabado y relieve. */
export default function Finishes({ v }) {
  return (
    <section className={css.finishes} id="finishes">
      <div className={"sec-hd " + css.box}>
        <h2 className={css.heading}>{v.t("home.finishes.title")}</h2>
      </div>
      <div className={"fin-grid " + css.box2}>
        <button
          type="button"
          className={"fin-tile fin-a " + css.button}
          onClick={v.open.f_colors}
          aria-label={v.t("collection.viewItem", { name: v.t("home.finishes.colors") })}
        >
          <img
            loading="lazy"
            decoding="async"
            className={css.image}
            src="/img/33bf52d337f0b5866c401b1f22274d1e.jpg"
            alt="Colors finish samples"
          />
          <span className={"scrim " + css.label}></span>
          <span className={css.label2}>
            <span className={css.label3}>{v.t("home.finishes.colors")}</span>
            <span className={css.label4}>{v.t("home.finishes.colorsSub")}</span>
          </span>
        </button>
        <button
          type="button"
          className={"fin-tile fin-b " + css.button}
          onClick={v.open.f_textures}
          aria-label={v.t("collection.viewItem", { name: v.t("home.finishes.textures") })}
        >
          <img
            loading="lazy"
            decoding="async"
            className={css.image}
            src="/img/59823a479ed6e68e4e9d0a9c53e86ad2.jpg"
            alt="Textures finish samples"
          />
          <span className={"scrim " + css.label}></span>
          <span className={css.label5}>
            <span className={css.label6}>{v.t("home.finishes.textures")}</span>
            <span className={css.label4}>{v.t("home.finishes.texturesSub")}</span>
          </span>
        </button>
        <button
          type="button"
          className={"fin-tile fin-c " + css.button}
          onClick={v.open.f_print}
          aria-label={v.t("collection.viewItem", { name: v.t("home.finishes.print") })}
        >
          <img
            loading="lazy"
            decoding="async"
            className={css.image}
            src="/img/01fd0ca4887bbb6af9330fa52b1fb80d.jpg"
            alt="Print finish samples"
          />
          <span className={"scrim " + css.label}></span>
          <span className={css.label5}>
            <span className={css.label6}>{v.t("home.finishes.print")}</span>
            <span className={css.label4}>{v.t("home.finishes.printSub")}</span>
          </span>
        </button>
        <button
          type="button"
          className={"fin-tile fin-d " + css.button}
          onClick={v.open.f_engraving}
          aria-label={v.t("collection.viewItem", { name: v.t("home.finishes.engraving") })}
        >
          <img
            loading="lazy"
            decoding="async"
            className={css.image}
            src="/img/1cd84dadeac695b570a54542496638c0.jpg"
            alt="Engraving finish samples"
          />
          <span className={"scrim " + css.label}></span>
          <span className={css.label5}>
            <span className={css.label6}>{v.t("home.finishes.engraving")}</span>
            <span className={css.label4}>{v.t("home.finishes.engravingSub")}</span>
          </span>
        </button>
        <button
          type="button"
          className={"fin-tile fin-e " + css.button}
          onClick={v.open.f_embossed}
          aria-label={v.t("collection.viewItem", { name: v.t("home.finishes.embossed") })}
        >
          <img
            loading="lazy"
            decoding="async"
            className={css.image}
            src="/img/83997bc339591c8c1d305c3b756d6962.jpg"
            alt="Embossed finish samples"
          />
          <span className={"scrim " + css.label}></span>
          <span className={css.label5}>
            <span className={css.label6}>{v.t("home.finishes.embossed")}</span>
            <span className={css.label4}>{v.t("home.finishes.embossedSub")}</span>
          </span>
        </button>
      </div>
      <div className="cta-row">
        <a href="/find-a-rep" className="cta-p">
          {v.t("common.requestSamples")}
        </a>
        <a href="/downloads" className="cta-o">
          {v.t("common.downloads")}
        </a>
      </div>
    </section>
  );
}
