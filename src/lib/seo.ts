import type { Metadata } from 'next';

export const siteConfig = {
  name: 'NOWLIVE',
  url: 'https://nowlive.agency',
  defaultLocale: 'es',
  localeOpenGraph: 'es_ES',
  foundingDate: '2024',
  contactEmail: 'hola@nowlive.agency',
  phone: '+34 900 000 000', // Actualiza con tu teléfono real
  address: {
    streetAddress: 'Calle Principal 123',
    addressLocality: 'Madrid',
    postalCode: '28001',
    addressCountry: 'ES',
  },
  socialLinks: {
    twitter: 'https://twitter.com/nowlive',
    linkedin: 'https://linkedin.com/company/nowlive',
    instagram: 'https://instagram.com/nowlive',
  },
} as const;

export type PageSeo = {
  title: string;
  description: string;
  /** Path starting with '/', e.g. '/contact' */
  path: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function absoluteUrl(path: string) {
  if (!path) return new URL(siteConfig.url);
  if (path.startsWith('http://') || path.startsWith('https://')) return new URL(path);
  return new URL(path.startsWith('/') ? path : `/${path}`, siteConfig.url);
}

export function createMetadata(seo: PageSeo): Metadata {
  const url = absoluteUrl(seo.path);
  const title = seo.title.includes(siteConfig.name) ? seo.title : `${seo.title} | ${siteConfig.name}`;
  const ogImage = absoluteUrl('/opengraph-image');
  const twitterImage = absoluteUrl('/twitter-image');

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      telephone: false,
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.localeOpenGraph,
      url,
      siteName: siteConfig.name,
      title,
      description: seo.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: seo.description,
      images: [twitterImage],
    },
    robots: seo.noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}

// ============================================
// SCHEMA.ORG - ADVANCED STRUCTURED DATA
// ============================================

/**
 * Servicios con vinculación semántica a Wikidata
 * Esto ayuda a Google a entender las entidades y relaciones
 */
export const servicesDatabase = {
  'web-design': {
    name: 'Diseño y Desarrollo Web',
    nameEn: 'Web Design & Development',
    description: 'Creamos sitios web profesionales que convierten visitantes en clientes. Diseño responsivo, optimizado para SEO y con tecnología de vanguardia.',
    descriptionEn: 'We create professional websites that convert visitors into customers. Responsive design, SEO optimized with cutting-edge technology.',
    url: '/services/web-design',
    image: '/images/services/web-design.jpg',
    price: {
      min: 2500,
      max: 15000,
      currency: 'EUR',
    },
    // Vinculación semántica a Wikidata
    sameAs: [
      'https://www.wikidata.org/wiki/Q386724', // Web design
      'https://en.wikipedia.org/wiki/Web_design',
      'https://www.wikidata.org/wiki/Q80993', // Software Engineering
    ],
    areaServed: ['ES', 'LATAM', 'US'],
    serviceType: 'ProfessionalService',
  },
  'digital-strategy': {
    name: 'Estrategia Digital',
    nameEn: 'Digital Strategy',
    description: 'Estrategia digital integral: análisis de mercado, buyer personas, funnel de conversión y roadmap de crecimiento.',
    descriptionEn: 'Comprehensive digital strategy: market analysis, buyer personas, conversion funnel and growth roadmap.',
    url: '/services/digital-strategy',
    image: '/images/services/digital-strategy.jpg',
    price: {
      min: 3000,
      max: 20000,
      currency: 'EUR',
    },
    sameAs: [
      'https://www.wikidata.org/wiki/Q1323477', // Digital marketing
      'https://en.wikipedia.org/wiki/Digital_marketing',
      'https://www.wikidata.org/wiki/Q39809', // Marketing strategy
    ],
    areaServed: ['ES', 'LATAM', 'US'],
    serviceType: 'ProfessionalService',
  },
  'marketing-automation': {
    name: 'Automatización de Marketing',
    nameEn: 'Marketing Automation',
    description: 'Automatiza tus procesos de marketing: email marketing, lead nurturing, CRM integration y workflows inteligentes.',
    descriptionEn: 'Automate your marketing processes: email marketing, lead nurturing, CRM integration and smart workflows.',
    url: '/services/marketing-automation',
    image: '/images/services/marketing-automation.jpg',
    price: {
      min: 2000,
      max: 12000,
      currency: 'EUR',
    },
    sameAs: [
      'https://www.wikidata.org/wiki/Q4118400', // Marketing automation
      'https://en.wikipedia.org/wiki/Marketing_automation',
      'https://www.wikidata.org/wiki/Q80993', // Software
    ],
    areaServed: ['ES', 'LATAM', 'US'],
    serviceType: 'ProfessionalService',
  },
  'content-creation': {
    name: 'Creación de Contenido',
    nameEn: 'Content Creation',
    description: 'Contenido estratégico para tu marca: copywriting, diseño gráfico, video, fotografía y gestión de redes sociales.',
    descriptionEn: 'Strategic content for your brand: copywriting, graphic design, video, photography and social media management.',
    url: '/services/content-creation',
    image: '/images/services/content-creation.jpg',
    price: {
      min: 1500,
      max: 8000,
      currency: 'EUR',
    },
    sameAs: [
      'https://www.wikidata.org/wiki/Q1193407', // Content marketing
      'https://en.wikipedia.org/wiki/Content_marketing',
      'https://www.wikidata.org/wiki/Q863566', // Copywriting
    ],
    areaServed: ['ES', 'LATAM', 'US'],
    serviceType: 'ProfessionalService',
  },
  'seo-analytics': {
    name: 'SEO & Analytics',
    nameEn: 'SEO & Analytics',
    description: 'Optimización SEO técnica y de contenido, análisis de datos y reporting avanzado para decisiones basadas en datos.',
    descriptionEn: 'Technical and content SEO optimization, data analysis and advanced reporting for data-driven decisions.',
    url: '/services/seo-analytics',
    image: '/images/services/seo-analytics.jpg',
    price: {
      min: 1800,
      max: 10000,
      currency: 'EUR',
    },
    sameAs: [
      'https://www.wikidata.org/wiki/Q180711', // SEO
      'https://en.wikipedia.org/wiki/Search_engine_optimization',
      'https://www.wikidata.org/wiki/Q217602', // Web analytics
    ],
    areaServed: ['ES', 'LATAM', 'US'],
    serviceType: 'ProfessionalService',
  },
  'brand-identity': {
    name: 'Identidad de Marca',
    nameEn: 'Brand Identity',
    description: 'Creamos identidades de marca memorables: naming, logo, paleta de colores, tipografía y brand guidelines.',
    descriptionEn: 'We create memorable brand identities: naming, logo, color palette, typography and brand guidelines.',
    url: '/services/brand-identity',
    image: '/images/services/brand-identity.jpg',
    price: {
      min: 3500,
      max: 18000,
      currency: 'EUR',
    },
    sameAs: [
      'https://www.wikidata.org/wiki/Q167270', // Brand
      'https://en.wikipedia.org/wiki/Brand',
      'https://www.wikidata.org/wiki/Q184458', // Branding
    ],
    areaServed: ['ES', 'LATAM', 'US'],
    serviceType: 'ProfessionalService',
  },
} as const;

export type ServiceKey = keyof typeof servicesDatabase;

/**
 * Genera Schema.org ProfessionalService para páginas de servicio
 * Con vinculación semántica a Wikidata para entidades
 */
export function generateServiceSchema(
  serviceKey: ServiceKey,
  options?: {
    lang?: 'es' | 'en';
    includeOffers?: boolean;
    includeReviews?: boolean;
  }
) {
  const service = servicesDatabase[serviceKey];
  const lang = options?.lang || 'es';
  const name = lang === 'en' ? service.nameEn : service.name;
  const description = lang === 'en' ? service.descriptionEn : service.description;

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteConfig.url}${service.url}#service`,
    name,
    description,
    url: `${siteConfig.url}${service.url}`,
    image: service.image ? `${siteConfig.url}${service.image}` : `${siteConfig.url}/opengraph-image`,
    provider: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/opengraph-image`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: siteConfig.phone,
        email: siteConfig.contactEmail,
        contactType: 'customer service',
        availableLanguage: ['es', 'en'],
        areaServed: service.areaServed,
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.address.streetAddress,
        addressLocality: siteConfig.address.addressLocality,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.addressCountry,
      },
      sameAs: [
        ...Object.values(siteConfig.socialLinks),
        'https://www.wikidata.org/wiki/Q1323477', // Digital marketing agency
      ],
    },
    serviceType: service.serviceType,
    areaServed: service.areaServed.map((area) => ({
      '@type': 'Country',
      name: area,
    })),
    // Vinculación semántica - CRÍTICO para Google Knowledge Graph
    sameAs: service.sameAs,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${name} Services`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name,
            description,
          },
        },
      ],
    },
  };

  // Incluir oferta con precio si se especifica
  if (options?.includeOffers && service.price) {
    schema.offers = {
      '@type': 'AggregateOffer',
      priceCurrency: service.price.currency,
      lowPrice: service.price.min,
      highPrice: service.price.max,
      availability: 'https://schema.org/InStock',
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split('T')[0],
      url: `${siteConfig.url}${service.url}`,
    };
  }

  // Incluir reviews/ratings si se especifica
  if (options?.includeReviews) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    };
  }

  return schema;
}

/**
 * Genera Schema.org FAQPage para secciones de FAQ
 */
export type FAQItem = {
  question: string;
  answer: string;
};

export function generateFaqSchema(
  faqItems: FAQItem[],
  options?: {
    pageName?: string;
    pageUrl?: string;
  }
) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${siteConfig.url}${options?.pageUrl || '/faq'}#faqpage`,
    mainEntity: faqItems.map((item, index) => ({
      '@type': 'Question',
      '@id': `${siteConfig.url}${options?.pageUrl || '/faq'}#question-${index + 1}`,
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return schema;
}

/**
 * Genera Schema.org ItemList para listados de servicios
 * Perfecto para la página principal o página de servicios
 */
export function generateServicesListSchema(
  serviceKeys?: ServiceKey[],
  options?: {
    lang?: 'es' | 'en';
  }
) {
  const lang = options?.lang || 'es';
  const keys = serviceKeys || (Object.keys(servicesDatabase) as ServiceKey[]);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${siteConfig.url}#services-list`,
    name: lang === 'en' ? 'Our Services' : 'Nuestros Servicios',
    description:
      lang === 'en'
        ? 'Complete digital marketing services: web design, strategy, automation, content, SEO and branding.'
        : 'Servicios completos de marketing digital: diseño web, estrategia, automatización, contenido, SEO y branding.',
    itemListElement: keys.map((key, index) => {
      const service = servicesDatabase[key];
      const name = lang === 'en' ? service.nameEn : service.name;
      const description = lang === 'en' ? service.descriptionEn : service.description;

      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          '@id': `${siteConfig.url}${service.url}#service`,
          name,
          description,
          url: `${siteConfig.url}${service.url}`,
          provider: {
            '@type': 'Organization',
            name: siteConfig.name,
          },
          sameAs: service.sameAs,
        },
      };
    }),
  };

  return schema;
}

/**
 * Genera BreadcrumbList Schema
 */
export type BreadcrumbItem = {
  name: string;
  url: string;
};

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };

  return schema;
}

/**
 * Genera WebSite Schema con SearchAction
 */
export function generateWebsiteSchema(lang: 'es' | 'en' = 'es') {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description:
      lang === 'en'
        ? 'Full-service digital marketing agency: web design, digital strategy, automation, content and SEO.'
        : 'Agencia de marketing digital full-service: diseño web, estrategia digital, automatización, contenido y SEO.',
    publisher: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}#organization`,
      name: siteConfig.name,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: [lang === 'en' ? 'en-US' : 'es-ES'],
  };

  return schema;
}

/**
 * Helper para combinar múltiples schemas en un array
 */
export function combineSchemas(...schemas: Record<string, any>[]) {
  return schemas;
}
