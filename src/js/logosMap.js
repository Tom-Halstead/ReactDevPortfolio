/** Icon map (matches your /public/logos) */
export const STACK_ICON = {
  spring: "springboot-icon.png",
  postgresql: "sql-icon.png",
  nodejs: "node-icon.png",
  java: "java-icon.png",
  jwt: "jwt-icon.png",
  react: "react-icon.png",
  vite: "vite-icon.png",
  css3: "css3-icon.png",
  javascript: "javascript-icon.png",
  docker: "docker-icon.png",
  npm: "npm-icon.png",
  git: "git-icon.png",
  postman: "postman-icon.png",
  curl: "curl-icon.png",
};

const exts = ["png", "svg", "gif", "jpg", "jpeg"];

/** Respect Vite base (e.g., GitHub Pages subpath) */
const publicUrl = (p) => {
  const base = import.meta.env.BASE_URL ?? "/";
  const b = base.endsWith("/") ? base : base + "/";
  const rel = p.startsWith("/") ? p.slice(1) : p;
  return b + rel;
};

export const iconPathCandidates = (key) => {
  if (!key) return [];
  const base = "logos";
  const tries = [];
  if (STACK_ICON[key]) tries.push(publicUrl(`${base}/${STACK_ICON[key]}`));
  exts.forEach((ext) => tries.push(publicUrl(`${base}/${key}-icon.${ext}`)));
  exts.forEach((ext) => tries.push(publicUrl(`${base}/${key}.${ext}`)));
  return tries;
};
