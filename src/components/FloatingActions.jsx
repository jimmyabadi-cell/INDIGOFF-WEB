import { Link } from "react-router-dom";
import css from "./FloatingActions.module.css";

// Reemplaza con el número real de WhatsApp de Indigoff (sin espacios ni guiones, incluye código de país)
const WA = "19084897323";

function IconEmail() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="1.5" y="3.5" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1.5 5.5L9 10.5L16.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 1C4.582 1 1 4.582 1 9c0 1.396.37 2.706 1.019 3.838L1 17l4.254-1.007A8.004 8.004 0 009 17c4.418 0 8-3.582 8-8S13.418 1 9 1zm-2.75 4.75c-.168 0-.44.063-.673.316-.232.252-.884.9-.884 2.195 0 1.295.906 2.547 1.033 2.724.126.177 1.746 2.822 4.306 3.846.602.233 1.071.372 1.437.476.608.167 1.162.144 1.6.087.489-.063 1.504-.615 1.717-1.21.213-.594.213-1.103.15-1.21-.063-.106-.22-.169-.47-.295-.25-.126-1.496-.737-1.728-.82-.22-.083-.388-.125-.551.126-.168.251-.62.82-.757 1-.138.168-.276.189-.525.063-.25-.126-1.054-.389-2.008-1.237-.744-.663-1.246-1.483-1.393-1.731-.146-.25-.015-.386.11-.512.111-.11.251-.277.376-.42.126-.143.168-.25.252-.42.082-.169.04-.316-.02-.441-.063-.126-.558-1.345-.762-1.84-.198-.484-.4-.42-.552-.427-.143-.007-.308-.01-.473-.01z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function FloatingActions() {
  return (
    <div className={css.wrap}>
      <Link to="/contact" className={css.btn} aria-label="Email us">
        <span className={css.label}>Email us</span>
        <span className={css.icon}>
          <IconEmail />
        </span>
      </Link>
      <a
        href={`https://wa.me/${WA}`}
        className={css.btn}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <span className={css.label}>WhatsApp</span>
        <span className={css.icon}>
          <IconWhatsApp />
        </span>
      </a>
    </div>
  );
}
