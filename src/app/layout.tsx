import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { LanguageProvider } from '@/components/providers/LanguageProvider';
import { CustomCursor, ParticlesBackground, ScrollProgress, BackToTop, LiveActivityFeed } from '@/components/ui';
import { createMetadata, siteConfig } from '@/lib/seo';

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
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/opengraph-image`,
  foundingDate: siteConfig.foundingDate,
  contactPoint: {
    '@type': 'ContactPoint',
    email: siteConfig.contactEmail,
    contactType: 'customer service',
    availableLanguage: ['es', 'en'],
  },
  sameAs: [
    siteConfig.socialLinks.twitter,
    siteConfig.socialLinks.linkedin,
    siteConfig.socialLinks.instagram,
  ],
  description: 'Agencia de marketing digital full-service especializada en diseño web, estrategia digital, automatización y SEO.',
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
          <ScrollProgress />
          <CustomCursor />
          <ParticlesBackground />
          <BackToTop />
          <LiveActivityFeed />
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
