import { articles } from './articles';
import { services } from './services';
import { specialtyPages } from './doctors';

export const coreRoutes = ['/', '/services', '/specialists', '/blog', '/about'];

export const englishRoutes = [
  ...coreRoutes,
  ...services.map(({ slug }) => `/services/${slug}`),
  ...specialtyPages.map(({ slug }) => `/specialists/${slug}`),
  ...articles.map(({ slug }) => `/blog/${slug}`)
];

export const localizedRoutes = englishRoutes.flatMap((path) => [
  path,
  path === '/' ? '/bn' : `/bn${path}`
]);

