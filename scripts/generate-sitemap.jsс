// scripts/generate-sitemap.js
const fs = require('fs');
const path = require('path');

const routes = ['/', '/about', '/portfolio', '/contact'];
const siteUrl = process.env.SITE_URL || 'https://your-domain.example';

const urls = routes
  .map((p) => `  <url>\n    <loc>${siteUrl.replace(/\/$/, '')}${p}\n    </loc>\n  </url>`)
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

const outDir = path.join(process.cwd(), 'dist');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);
console.log('sitemap.xml generated at', path.join(outDir, 'sitemap.xml'));
