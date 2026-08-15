import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
const root = new URL('../dist/', import.meta.url).pathname;
const sitemap = await readFile(join(root, 'sitemap.xml'), 'utf8');
const localizedRoutes = [...sitemap.matchAll(/<loc>https:\/\/biswasclinic\.com(.*?)<\/loc>/g)].map(([, path]) => path || '/');
const errors = [];
const titles = new Map();
const descriptions = new Map();

const fileForRoute = (route) => route === '/'
  ? join(root, 'index.html')
  : join(root, `${route.slice(1)}.html`);

const capture = (html, expression) => html.match(expression)?.[1]?.trim();
const unescapeHtml = (value = '') => value
  .replaceAll('&amp;', '&')
  .replaceAll('&quot;', '"')
  .replaceAll('&#39;', "'")
  .replaceAll('&lt;', '<')
  .replaceAll('&gt;', '>');

for (const route of localizedRoutes) {
  let html;
  try {
    html = await readFile(fileForRoute(route), 'utf8');
  } catch {
    errors.push(`${route}: generated file is missing`);
    continue;
  }

  const title = unescapeHtml(capture(html, /<title>(.*?)<\/title>/s));
  const description = unescapeHtml(capture(html, /<meta name="description" content="(.*?)">/s));
  const canonical = capture(html, /<link rel="canonical" href="(.*?)">/s);
  const expectedCanonical = new URL(route, 'https://biswasclinic.com').toString();
  const h1Count = (html.match(/<h1(?:\s|>)/g) || []).length;
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];

  if (!title || title.length < 20) errors.push(`${route}: missing or weak title`);
  if (!description || description.length < 70 || description.length > 180) errors.push(`${route}: description length is ${description?.length || 0}`);
  if (titles.has(title)) errors.push(`${route}: duplicate title also used by ${titles.get(title)}`);
  if (descriptions.has(description)) errors.push(`${route}: duplicate description also used by ${descriptions.get(description)}`);
  titles.set(title, route);
  descriptions.set(description, route);
  if (canonical !== expectedCanonical) errors.push(`${route}: canonical is ${canonical}, expected ${expectedCanonical}`);
  if (!html.includes('hreflang="en-BD"') || !html.includes('hreflang="bn-BD"') || !html.includes('hreflang="x-default"')) errors.push(`${route}: incomplete hreflang set`);
  if (h1Count !== 1) errors.push(`${route}: expected one h1, found ${h1Count}`);
  if (!jsonLd.length) errors.push(`${route}: no JSON-LD`);
  for (const [, data] of jsonLd) {
    try { JSON.parse(unescapeHtml(data)); } catch { errors.push(`${route}: invalid JSON-LD`); }
  }
  if (/meta name="keywords"/i.test(html)) errors.push(`${route}: obsolete meta keywords present`);
  if (/noindex/i.test(capture(html, /<meta name="robots" content="(.*?)">/s))) errors.push(`${route}: indexable route is marked noindex`);
}

for (const homeFile of ['index.html', 'bn.html']) {
  const html = await readFile(join(root, homeFile), 'utf8');
  const doctorCards = (html.match(/class="doctor-card"/g) || []).length;
  if (doctorCards !== 60) errors.push(`${homeFile}: expected 60 server-rendered doctors, found ${doctorCards}`);
  const tests = JSON.parse(await readFile(new URL('../src/data/tests.json', import.meta.url), 'utf8'));
  const missingTests = Object.values(tests).flat().filter((name) => !unescapeHtml(html).includes(name));
  if (missingTests.length) errors.push(`${homeFile}: ${missingTests.length} diagnostic test names missing from initial HTML`);
}

const sitemapUrls = (sitemap.match(/<url>/g) || []).length;
if (sitemapUrls !== localizedRoutes.length) errors.push(`sitemap: expected ${localizedRoutes.length} URLs, found ${sitemapUrls}`);

if (errors.length) {
  console.error(`Generated HTML audit failed with ${errors.length} issue(s):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

console.log(`Generated HTML audit passed: ${localizedRoutes.length} indexable bilingual routes, unique metadata, valid canonical/hreflang/JSON-LD, 156 tests and 60 doctors in both home documents.`);
