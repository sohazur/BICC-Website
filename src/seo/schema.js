import { absoluteUrl, LAST_REVIEWED, site } from './site';

const address = {
  '@type': 'PostalAddress',
  streetAddress: 'K.D.A. Plot & Holding No. EX-2, Choto Boyra, Sonadanga',
  addressLocality: 'Khulna',
  postalCode: '9000',
  addressCountry: 'BD'
};

export const entityGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['MedicalClinic', 'LocalBusiness'],
      '@id': `${absoluteUrl('/')}#clinic`,
      name: site.name.en,
      alternateName: [site.name.bn, 'BICC', 'Biswas Clinic'],
      url: absoluteUrl('/'),
      telephone: site.phoneLink,
      foundingDate: site.founded,
      logo: absoluteUrl(site.logo),
      image: absoluteUrl(site.socialImage),
      address,
      geo: { '@type': 'GeoCoordinates', ...site.coordinates },
      hasMap: site.map,
      sameAs: [site.facebook, site.instagram],
      areaServed: { '@type': 'City', name: 'Khulna' }
    },
    {
      '@type': 'DiagnosticLab',
      '@id': `${absoluteUrl('/')}#diagnostic-lab`,
      name: 'Biswas Investigation Centre',
      alternateName: ['বিশ্বাস ইনভেস্টিগেশন সেন্টার', 'BICC Diagnostic Centre'],
      url: absoluteUrl('/services/diagnostic-centre-khulna'),
      telephone: site.phoneLink,
      address,
      geo: { '@type': 'GeoCoordinates', ...site.coordinates },
      parentOrganization: { '@id': `${absoluteUrl('/')}#clinic` }
    }
  ]
};

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: absoluteUrl(item.href)
  }))
});

export const serviceSchema = ({ title, description, path }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: title,
  description,
  url: absoluteUrl(path),
  areaServed: { '@type': 'City', name: 'Khulna' },
  provider: { '@id': `${absoluteUrl('/')}#clinic` }
});

export const articleSchema = ({ title, description, path, lang }) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  url: absoluteUrl(path),
  inLanguage: lang === 'bn' ? 'bn-BD' : 'en-BD',
  datePublished: LAST_REVIEWED,
  dateModified: LAST_REVIEWED,
  author: { '@id': `${absoluteUrl('/')}#clinic` },
  publisher: { '@id': `${absoluteUrl('/')}#clinic` },
  about: { '@type': 'City', name: 'Khulna' }
});

