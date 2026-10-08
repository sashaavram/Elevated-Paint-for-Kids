// Cleans up an SVG that came back from the model before it reaches the browser.
// The page only ever draws it through an <img>, where scripts can't run, but we
// still strip anything that isn't plain vector art.

const MAX_SVG_BYTES = 200_000;

export function extractSvg(text) {
  const match = /<svg[\s\S]*?<\/svg>/i.exec(text ?? "");
  return match ? match[0] : null;
}

export function sanitizeSvg(svg) {
  if (typeof svg !== "string" || svg.length > MAX_SVG_BYTES) return null;
  let out = svg
    // drop whole elements that can run code or pull in outside content
    .replace(/<(script|foreignObject|iframe|object|embed|style|image|use|a)\b[\s\S]*?<\/\1\s*>/gi, "")
    .replace(/<(script|foreignObject|iframe|object|embed|style|image|use|a)\b[^>]*\/?>/gi, "")
    // event handlers like onload="..."
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    // any href / xlink:href that is not an in-document #reference
    .replace(/\s(?:xlink:)?href\s*=\s*("(?!#)[^"]*"|'(?!#)[^']*')/gi, "")
    // url(...) pointing anywhere but #id
    .replace(/url\(\s*(['"]?)(?!#)[^)]*\1\s*\)/gi, "none");

  if (!/^<svg\b/i.test(out.trim())) return null;
  if (!/\sxmlns\s*=/.test(out)) out = out.replace(/^<svg\b/i, '<svg xmlns="http://www.w3.org/2000/svg"');
  return out;
}
