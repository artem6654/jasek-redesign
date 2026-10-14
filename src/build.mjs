// Static preview generator: node src/build.mjs  →  writes HTML into ./site
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import home from './pages/home.mjs';
import inner from './pages/inner.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
// Minify CSS (comments/whitespace) → main.min.css
const css = readFileSync(join(root, 'assets/css/main.css'), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{};,>])\s*/g, '$1').replace(/;}/g, '}').trim();
writeFileSync(join(root, 'assets/css/main.min.css'), css);

const pages = [{ path: '/', html: home }, ...inner];

// Split plain-text <h1> into word spans for the entrance animation (CSS-only, no JS needed).
// Words stay inline text, so screen readers and copy/paste read the heading normally.
const splitH1 = (html) => html.replace(/<h1([^>]*)>([^<]+)<\/h1>/g, (m, attrs, text) => {
  let i = 0;
  const words = text.trim().split(/\s+/).map((w) => `<span class="w"><span style="--wi:${i++}">${w}</span></span>`).join(' ');
  const cls = /class="/.test(attrs) ? attrs.replace(/class="/, 'class="split-words ') : `${attrs} class="split-words"`;
  return `<h1${cls}>${words}</h1>`;
});

for (const p of pages) {
  const dir = join(root, p.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), splitH1(p.html));
}

const urls = pages.map((p) => `  <url><loc>https://www.jasek.pl${p.path}</loc></url>`).join('\n');
writeFileSync(join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
writeFileSync(join(root, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: https://www.jasek.pl/sitemap.xml\n');

console.log(`Built ${pages.length} pages:`, pages.map((p) => p.path).join(' '));
