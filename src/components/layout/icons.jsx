import { S } from "../../lib/dc.js";

const LINE = {
  "aria-hidden": "true",
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: "1.4",
};

export function MenuIcon() {
  return (
    <svg {...LINE} stroke="currentColor" strokeLinecap="round" style={S("display: block")}>
      <path d="M3 7h18M3 12h18M3 17h18"></path>
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg {...LINE} stroke="currentColor" strokeLinecap="round" style={S("display: block")}>
      <path d="M5 5l14 14M19 5L5 19"></path>
    </svg>
  );
}

export function DownloadIcon() {
  return (
    <svg className="hd-ico" {...LINE} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19.5h14"></path>
    </svg>
  );
}

export function ListIcon() {
  return (
    <svg className="hd-ico" {...LINE} stroke="currentColor" strokeLinejoin="round">
      <path d="M6 3.5h12v17l-6-4.2-6 4.2z"></path>
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg {...LINE} stroke="#111111">
      <circle cx="11" cy="11" r="7"></circle>
      <path d="M20 20l-4-4"></path>
    </svg>
  );
}

export function BackIcon() {
  return (
    <svg
      {...LINE}
      width="16"
      height="16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={S("display: block; flex: none")}
    >
      <path d="M15 5l-7 7 7 7"></path>
    </svg>
  );
}
