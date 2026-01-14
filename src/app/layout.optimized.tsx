import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { LanguageProvider } from '@/components/providers/LanguageProvider';
import { CustomCursor, ScrollProgress, BackToTop, LiveActivityFeed } from '@/components/ui';
import { createMetadata, siteConfig } from '@/lib/seo';
// OPTIMIZATION: Import optimized particles
import { OptimizedLayoutParticles } from '@/components/OptimizedLayoutParticles';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  ...createMetadata({
    title: 'Agencia de Marketing Digital',
    description:
      'NOWLIVE es una agencia de marketing digital full-service: diseño web, estrategia digital, automatización, contenido y SEO & analytics. Creamos experiencias que convierten.',
    path: '/',
    keywords: [
      'agencia de marketing digital',
      'diseño web',
      'estrategia digital',
      'marketing automation',
      'creación de contenido',
      'SEO',
      'analytics',
      'branding',
    ],
  }),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteConfig.url}#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: {
    '@type': 'ImageObject',
    url: `${siteConfig.url}/opengraph-image`,
    width: 1200,
    height: 630,
  },
  foundingDate: siteConfig.foundingDate,
  description: 'Agencia de marketing digital full-service especializada en diseño web, estrategia digital, automatización y SEO.',
  email: siteConfig.contactEmail,
  telephone: siteConfig.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.streetAddress,
    addressLocality: siteConfig.address.addressLocality,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.addressCountry,
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone,
      email: siteConfig.contactEmail,
      contactType: 'customer service',
      availableLanguage: ['Spanish', 'English'],
      areaServed: ['ES', 'LATAM', 'US'],
    },
    {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone,
      email: siteConfig.contactEmail,
      contactType: 'sales',
      availableLanguage: ['Spanish', 'English'],
      areaServed: ['ES', 'LATAM', 'US'],
    },
  ],
  sameAs: [
    siteConfig.socialLinks.twitter,
    siteConfig.socialLinks.linkedin,
    siteConfig.socialLinks.instagram,
    'https://www.wikidata.org/wiki/Q1323477',
    'https://www.wikidata.org/wiki/Q156849',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Digital Marketing Services',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Diseño y Desarrollo Web',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Diseño Web Profesional',
              description: 'Sitios web optimizados para conversión',
            },
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'SEO & Analytics',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Optimización SEO',
              description: 'Posicionamiento orgánico en buscadores',
            },
          },
        ],
      },
    ],
  },
  knowsAbout: [
    'Web Design',
    'Digital Marketing',
    'SEO',
    'Marketing Automation',
    'Content Creation',
    'Brand Identity',
    'Digital Strategy',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-gray-800">
        <LanguageProvider>
          {/* Critical UI elements that should load immediately */}
          <ScrollProgress />
          <CustomCursor />
          
          {/* OPTIMIZED: Particles load after 1s or when browser is idle */}
          <OptimizedLayoutParticles delay={1000} useIdleCallback={true} />
          
          {/* Non-blocking UI elements */}
          <BackToTop />
          <LiveActivityFeed />
          
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
