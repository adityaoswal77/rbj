/**
 * Runs after `next build` (see package.json). Preloads the two fonts for the
 * visitor's language instead of always preloading the English pair.
 *
 * Next writes its font preloads as static tags at the very top of <head>, and
 * our language script lands far below the stylesheet, so nothing in the React
 * tree can choose between them before the downloads start. This inserts a tiny
 * inline script straight after <meta charset>, which reads the saved language
 * and adds the matching <link rel="preload"> tags before the stylesheet is even
 * requested. All four fonts are `preload: false` in layout.tsx for this reason.
 *
 * Font URLs are content-hashed, so they are read from the built CSS rather than
 * hard-coded. If Next ever changes its output so that a font or the insertion
 * point cannot be found, this throws and the build fails, rather than shipping
 * a page with no preloads at all.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = "out";

/** Must match LANG_STORAGE_KEY in src/lib/lang-store.ts. */
const STORAGE_KEY = "rbj-lang";

/**
 * Per language: the display and body families, and a character each must
 * cover. Only the face carrying that script is preloaded — the Latin extras in
 * the Devanagari fonts (for "BIS", "@rajbhijewellers") load on demand.
 */
const WANTED = {
  en: { chars: "A", families: ["Cormorant Garamond", "Inter"] },
  mr: { chars: "क", families: ["Tiro Devanagari Marathi", "Noto Sans Devanagari"] },
};

const MARKER = "data-font-preload";

async function filesUnder(dir, ext) {
  const entries = await readdir(dir, { recursive: true, withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(ext))
    .map((e) => path.join(e.parentPath, e.name));
}

/** Whether a CSS unicode-range such as `U+0-FF,U+131,U+4??` covers a code point. */
function covers(range, codePoint) {
  return range.split(",").some((token) => {
    const [lo, hi = lo] = token.trim().replace(/^U\+/i, "").split("-");
    const low = parseInt(lo.replaceAll("?", "0"), 16);
    const high = parseInt(hi.replaceAll("?", "F"), 16);
    return codePoint >= low && codePoint <= high;
  });
}

/** Every @font-face in the built CSS, with its URL made absolute. */
async function readFontFaces() {
  const faces = [];
  for (const file of await filesUnder(path.join(OUT, "_next"), ".css")) {
    const css = await readFile(file, "utf8");
    const cssDir = "/" + path.relative(OUT, path.dirname(file)).split(path.sep).join("/");
    for (const [, body] of css.matchAll(/@font-face\s*\{([^}]*)\}/g)) {
      const family = body.match(/font-family:\s*["']?([^;"']+)/)?.[1].trim();
      const src = body.match(/src:\s*url\(["']?([^)"']+\.woff2)/)?.[1];
      const range = body.match(/unicode-range:\s*([^;]+)/)?.[1] ?? "U+0-10FFFF";
      if (!family || !src) continue;
      faces.push({ family, range, url: path.posix.resolve(cssDir, src) });
    }
  }
  return faces;
}

function pick(faces) {
  const chosen = {};
  for (const [lang, { chars, families }] of Object.entries(WANTED)) {
    const codePoint = chars.codePointAt(0);
    chosen[lang] = families.map((family) => {
      const face = faces.find((f) => f.family === family && covers(f.range, codePoint));
      if (!face) throw new Error(`preload-fonts: no ${family} face covering "${chars}" in the built CSS`);
      return face.url;
    });
  }
  return chosen;
}

function inlineScript(urls) {
  return (
    `<script ${MARKER}="">(function(){var u=${JSON.stringify(urls)},l="en";` +
    `try{if(localStorage.getItem(${JSON.stringify(STORAGE_KEY)})==="mr")l="mr"}catch(e){}` +
    `u[l].forEach(function(h){var k=document.createElement("link");k.rel="preload";` +
    `k.as="font";k.type="font/woff2";k.crossOrigin="";k.href=h;document.head.appendChild(k)})})();</script>`
  );
}

const urls = pick(await readFontFaces());
const script = inlineScript(urls);
const pages = await filesUnder(OUT, ".html");

for (const file of pages) {
  const html = await readFile(file, "utf8");
  if (html.includes(MARKER)) continue;
  if (/<link[^>]+as="font"/.test(html)) {
    throw new Error(`preload-fonts: ${file} still has a static font preload — is a font missing preload: false?`);
  }
  const anchor = html.match(/<meta charSet="utf-8"\s*\/?>/i);
  if (!anchor) throw new Error(`preload-fonts: no <meta charset> in ${file}`);
  const at = anchor.index + anchor[0].length;
  await writeFile(file, html.slice(0, at) + script + html.slice(at));
}

console.log(`preload-fonts: ${pages.length} pages — en ${urls.en.length} fonts, mr ${urls.mr.length} fonts`);
