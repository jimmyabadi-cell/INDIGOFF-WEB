import { S } from "../../../lib/dc.js";

/** Acabados: colores, texturas, impresión, grabado y relieve. */
export default function Finishes({ v }) {
  return (
    <section id="finishes" style={S("max-width: 1440px; margin: 0 auto; padding: calc(160px * var(--vs)) 0 0")}>
      <div className="sec-hd" style={S("text-align: center; margin-bottom: 56px; padding: 0 24px")}>
        <h2
          style={S(
            "margin: 0; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(34px, 3.6vw, 54px); line-height: 1.05; letter-spacing: -0.04em",
          )}
        >
          {v.t("home.finishes.title")}
        </h2>
      </div>
      <div className="fin-grid" style={S("padding: 0 var(--gutter)")}>
        <button
          type="button"
          className="fin-tile fin-a"
          onClick={v.open.f_colors}
          aria-label={v.t("collection.viewItem", { name: v.t("home.finishes.colors") })}
          style={S(
            "position: relative; overflow: hidden; padding: 0; border: 0; background: #EEEBE6; cursor: pointer; font-family: inherit; color: #FFFFFF; text-align: left",
          )}
        >
          <img
            src="/img/33bf52d337f0b5866c401b1f22274d1e.jpg"
            alt="Colors finish samples"
            style={S("position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover")}
          />
          <span className="scrim" style={S("position: absolute; top: 0; left: 0; right: 0; bottom: 0")}></span>
          <span
            style={S(
              "position: absolute; left: 32px; right: 20px; bottom: 28px; display: flex; flex-direction: column; gap: 4px",
            )}
          >
            <span
              style={S(
                "font-family: Urbanist, sans-serif; font-weight: 300; font-size: 44px; line-height: 1.05; letter-spacing: -0.03em",
              )}
            >
              {v.t("home.finishes.colors")}
            </span>
            <span
              style={S(
                "font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; opacity: 0.85",
              )}
            >
              {v.t("home.finishes.colorsSub")}
            </span>
          </span>
        </button>
        <button
          type="button"
          className="fin-tile fin-b"
          onClick={v.open.f_textures}
          aria-label={v.t("collection.viewItem", { name: v.t("home.finishes.textures") })}
          style={S(
            "position: relative; overflow: hidden; padding: 0; border: 0; background: #EEEBE6; cursor: pointer; font-family: inherit; color: #FFFFFF; text-align: left",
          )}
        >
          <img
            src="/img/59823a479ed6e68e4e9d0a9c53e86ad2.jpg"
            alt="Textures finish samples"
            style={S("position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover")}
          />
          <span className="scrim" style={S("position: absolute; top: 0; left: 0; right: 0; bottom: 0")}></span>
          <span
            style={S(
              "position: absolute; left: 20px; right: 20px; bottom: 18px; display: flex; flex-direction: column; gap: 4px",
            )}
          >
            <span
              style={S(
                "font-family: Urbanist, sans-serif; font-weight: 300; font-size: 24px; line-height: 1.05; letter-spacing: -0.03em",
              )}
            >
              {v.t("home.finishes.textures")}
            </span>
            <span
              style={S(
                "font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; opacity: 0.85",
              )}
            >
              {v.t("home.finishes.texturesSub")}
            </span>
          </span>
        </button>
        <button
          type="button"
          className="fin-tile fin-c"
          onClick={v.open.f_print}
          aria-label={v.t("collection.viewItem", { name: v.t("home.finishes.print") })}
          style={S(
            "position: relative; overflow: hidden; padding: 0; border: 0; background: #EEEBE6; cursor: pointer; font-family: inherit; color: #FFFFFF; text-align: left",
          )}
        >
          <img
            src="/img/01fd0ca4887bbb6af9330fa52b1fb80d.jpg"
            alt="Print finish samples"
            style={S("position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover")}
          />
          <span className="scrim" style={S("position: absolute; top: 0; left: 0; right: 0; bottom: 0")}></span>
          <span
            style={S(
              "position: absolute; left: 20px; right: 20px; bottom: 18px; display: flex; flex-direction: column; gap: 4px",
            )}
          >
            <span
              style={S(
                "font-family: Urbanist, sans-serif; font-weight: 300; font-size: 24px; line-height: 1.05; letter-spacing: -0.03em",
              )}
            >
              {v.t("home.finishes.print")}
            </span>
            <span
              style={S(
                "font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; opacity: 0.85",
              )}
            >
              {v.t("home.finishes.printSub")}
            </span>
          </span>
        </button>
        <button
          type="button"
          className="fin-tile fin-d"
          onClick={v.open.f_engraving}
          aria-label={v.t("collection.viewItem", { name: v.t("home.finishes.engraving") })}
          style={S(
            "position: relative; overflow: hidden; padding: 0; border: 0; background: #EEEBE6; cursor: pointer; font-family: inherit; color: #FFFFFF; text-align: left",
          )}
        >
          <img
            src="/img/1cd84dadeac695b570a54542496638c0.jpg"
            alt="Engraving finish samples"
            style={S("position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover")}
          />
          <span className="scrim" style={S("position: absolute; top: 0; left: 0; right: 0; bottom: 0")}></span>
          <span
            style={S(
              "position: absolute; left: 20px; right: 20px; bottom: 18px; display: flex; flex-direction: column; gap: 4px",
            )}
          >
            <span
              style={S(
                "font-family: Urbanist, sans-serif; font-weight: 300; font-size: 24px; line-height: 1.05; letter-spacing: -0.03em",
              )}
            >
              {v.t("home.finishes.engraving")}
            </span>
            <span
              style={S(
                "font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; opacity: 0.85",
              )}
            >
              {v.t("home.finishes.engravingSub")}
            </span>
          </span>
        </button>
        <button
          type="button"
          className="fin-tile fin-e"
          onClick={v.open.f_embossed}
          aria-label={v.t("collection.viewItem", { name: v.t("home.finishes.embossed") })}
          style={S(
            "position: relative; overflow: hidden; padding: 0; border: 0; background: #EEEBE6; cursor: pointer; font-family: inherit; color: #FFFFFF; text-align: left",
          )}
        >
          <img
            src="/img/83997bc339591c8c1d305c3b756d6962.jpg"
            alt="Embossed finish samples"
            style={S("position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover")}
          />
          <span className="scrim" style={S("position: absolute; top: 0; left: 0; right: 0; bottom: 0")}></span>
          <span
            style={S(
              "position: absolute; left: 20px; right: 20px; bottom: 18px; display: flex; flex-direction: column; gap: 4px",
            )}
          >
            <span
              style={S(
                "font-family: Urbanist, sans-serif; font-weight: 300; font-size: 24px; line-height: 1.05; letter-spacing: -0.03em",
              )}
            >
              {v.t("home.finishes.embossed")}
            </span>
            <span
              style={S(
                "font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; opacity: 0.85",
              )}
            >
              {v.t("home.finishes.embossedSub")}
            </span>
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
