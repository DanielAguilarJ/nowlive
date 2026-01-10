import type { Metadata } from 'next';

export const siteConfig = {
  name: 'NOWLIVE',
  url: 'https://nowlive.agency',
  defaultLocale: 'es',
  localeOpenGraph: 'es_ES',
  foundingDate: '2024',
  contactEmail: 'hola@nowlive.agency',
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
