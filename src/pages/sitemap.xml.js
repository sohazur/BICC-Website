import { localizedRoutes } from '../seo/routes';
import { SITE_URL, LAST_REVIEWED } from '../seo/site';

const escapeXml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');

export function GET() {
  const entries = localizedRoutes.map((path) => `  <url>\n    <loc>${escapeXml(new URL(path, SITE_URL).toString())}</loc>\n    <lastmod>${LAST_REVIEWED}</lastmod>\n  </url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}

