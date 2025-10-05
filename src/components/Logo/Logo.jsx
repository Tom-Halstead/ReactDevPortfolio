import React from "react";
import "./Logo.css";

/**
 * Reusable Logo component.
 * - Accepts { item } where item may include { key, file, label }
 * - Resolves an ordered list of candidate srcs:
 *   1) explicit /public/logos/<file>
 *   2) /public/logos/<key>-icon.*  (png, svg, gif, jpg, jpeg)
 *   3) /public/logos/<key>.*       (png, svg, gif, jpg, jpeg)
 * - Falls back through candidates on <img> error.
 */

const EXTS = ["png", "svg", "gif", "jpg", "jpeg"];

function buildCandidates(item) {
  if (!item) return [];
  const base = import.meta.env.BASE_URL ?? "/";
  const prefix = base.endsWith("/") ? `${base}logos` : `${base}/logos`;

  const tries = [];
  if (item.file) {
    const rel = item.file.startsWith("logos/") ? item.file.slice(6) : item.file;
    tries.push(`${prefix}/${rel}`);
  }
  if (item.key) {
    EXTS.forEach((ext) => tries.push(`${prefix}/${item.key}-icon.${ext}`));
    EXTS.forEach((ext) => tries.push(`${prefix}/${item.key}.${ext}`));
  }
  return tries;
}

export default function Logo({ item, size = 50, className = "logo-50" }) {
  const candidates = React.useMemo(() => buildCandidates(item), [item]);
  const [i, setI] = React.useState(0);

  if (!candidates.length) return null;

  return (
    <img
      className={className}
      src={candidates[i]}
      alt={`${item.label ?? item.key ?? "logo"}`}
      width={size}
      height={size}
      loading="lazy"
      onError={() => {
        if (i < candidates.length - 1) setI(i + 1);
      }}
    />
  );
}
