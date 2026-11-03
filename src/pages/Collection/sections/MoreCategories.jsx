import React from "react";
import css from "./MoreCategories.module.css";

/** Enlaces a las demás categorías. */
export default function MoreCategories({ v }) {
  return (
    <section className={css.section}>
      <h2 className={css.heading}>{v.t("collection.moreCategories")}</h2>
      <nav className={css.nav} aria-label={v.t("collection.moreCategories")}>
        {(v.others || []).map((o, o__i) => (
          <React.Fragment key={o__i}>
            <a className={css.link} href={o.href}>
              {o.name}
            </a>
          </React.Fragment>
        ))}
      </nav>
    </section>
  );
}
