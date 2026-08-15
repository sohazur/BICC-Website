import tests from '../data/tests.json';
import { articles } from './articles';
import { getDoctors, specialtyPages } from './doctors';
import { localizedRoutes } from './routes';
import { services } from './services';

const assertUnique = (values) => expect(new Set(values).size).toBe(values.length);

test('publishes complete bilingual service, specialist and article collections', () => {
  expect(services).toHaveLength(9);
  expect(specialtyPages).toHaveLength(6);
  expect(articles).toHaveLength(8);
  expect(localizedRoutes).toHaveLength(56);
  assertUnique(localizedRoutes);
});

test('keeps every SEO title and description distinct within each language', () => {
  const documents = [...services, ...specialtyPages, ...articles];
  for (const lang of ['en', 'bn']) {
    assertUnique(documents.map((item) => item.title[lang]));
    assertUnique(documents.map((item) => item.meta[lang]));
    for (const item of documents) {
      expect(item.title[lang].trim().length).toBeGreaterThan(12);
      expect(item.meta[lang].trim().length).toBeGreaterThan(70);
    }
  }
});

test('preserves the owner-provided diagnostic and doctor directories', () => {
  expect(Object.values(tests).flat()).toHaveLength(156);
  expect(getDoctors('en')).toHaveLength(60);
  expect(getDoctors('bn')).toHaveLength(60);
});

test('uses neutral comparison content rather than an unsupported best claim', () => {
  const comparison = articles.find(({ slug }) => slug === 'best-clinic-khulna-comparison-checklist');
  expect(comparison.items.en).toHaveLength(10);
  expect(comparison.items.bn).toHaveLength(10);
  expect(comparison.title.en.toLowerCase()).toContain('best');
  expect(comparison.answer.en.toLowerCase()).toContain('verify each fact');
});
