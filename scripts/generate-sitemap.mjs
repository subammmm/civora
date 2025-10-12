import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const base = 'https://civora.me';

// All public routes - update this list when adding new pages
const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about/', priority: '0.9', changefreq: 'monthly' },
  { path: '/scholarships/', priority: '1.0', changefreq: 'weekly' },
  { path: '/citizenship/', priority: '0.9', changefreq: 'monthly' },
  { path: '/student-stories/', priority: '0.8', changefreq: 'weekly' },
  { path: '/ielts-prep/', priority: '0.8', changefreq: 'monthly' },
  { path: '/pathway-builder/', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog/', priority: '0.7', changefreq: 'weekly' },
  { path: '/roadmap/', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact/', priority: '0.8', changefreq: 'monthly' },
  { path: '/privacy/', priority: '0.5', changefreq: 'yearly' },
  { path: '/students-supported/', priority: '0.7', changefreq: 'monthly' },
  { path: '/thank-you/', priority: '0.5', changefreq: 'yearly' },
  { path: '/legal/privacy/', priority: '0.5', changefreq: 'yearly' },
  { path: '/legal/terms/', priority: '0.5', changefreq: 'yearly' },
];

const today = new Date().toISOString().split('T')[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) =>
      `  <url>
    <loc>${base}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outputPath = join(__dirname, '../public/sitemap.xml');
writeFileSync(outputPath, xml);
console.log(`✓ Sitemap generated at public/sitemap.xml with ${routes.length} URLs`);
