export type Lang = 'es' | 'en';
export const langs: Lang[] = ['es', 'en'];

export const site = {
  name: 'CreamosTech',
  url: 'https://creamostech.com',
  email: 'hola@creamostech.com',
  phoneDisplay: '+52 1 449 635 5166',
  phoneE164: '+5214496355166',
  whatsapp: '5214496355166',
  address: {
    street: 'Av. Universidad 1001, Bosques del Prado Nte.',
    city: 'Aguascalientes',
    region: 'Ags.',
    postalCode: '20127',
    country: 'MX',
  },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Av.+Universidad+1001,+Bosques+del+Prado+Nte.,+20127+Aguascalientes',
  social: {
    instagram: 'https://instagram.com/creamostech',
    linkedin: 'https://linkedin.com/company/creamostech',
    twitter: 'https://twitter.com/creamostech',
  },
  foundingDate: '2024',
} as const;

export function waLink(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** Service stations, in the order the old site listed them. */
export const services = [
  { slug: 'web-design', code: 'EST-01', key: 'webDesign', icon: 'responsive' },
  { slug: 'digital-strategy', code: 'EST-02', key: 'digitalStrategy', icon: 'roadmap' },
  { slug: 'marketing-automation', code: 'EST-03', key: 'marketingAutomation', icon: 'workflows' },
  { slug: 'content-creation', code: 'EST-04', key: 'contentCreation', icon: 'copywriting' },
  { slug: 'seo-analytics', code: 'EST-05', key: 'seoAnalytics', icon: 'seo' },
  { slug: 'brand-identity', code: 'EST-06', key: 'brandIdentity', icon: 'visual' },
] as const;
export type ServiceSlug = (typeof services)[number]['slug'];

/** Builds a localized path. Spanish lives at the root, English under /en. */
export function href(lang: Lang, path = '/') {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === 'es') return clean;
  return clean === '/' ? '/en/' : `/en${clean}`;
}

/** Path of the same page in the other language. */
export function altPath(path: string, target: Lang) {
  const base = path.replace(/^\/en(?=\/|$)/, '') || '/';
  return href(target, base);
}
