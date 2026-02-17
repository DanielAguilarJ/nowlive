import type { Metadata } from 'next';
import BlogClient from './BlogClient';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Blog',
  description: 'Insights, estrategia y tendencias de marketing digital, diseño, automatización y SEO.',
  path: '/blog',
  keywords: ['blog marketing', 'estrategia digital', 'SEO', 'growth', 'UX', 'automatización'],
});

export default function BlogPage() {
  return <BlogClient />;
}
