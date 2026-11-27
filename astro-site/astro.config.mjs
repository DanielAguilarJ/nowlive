import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://creamostech.com';

// Blog posts tell search engines when they last changed; other pages carry no date
// rather than a fake "today" that would change on every build.
const articles = JSON.parse(readFileSync(new URL('./src/data/raw/articles.json', import.meta.url), 'utf8')).blogArticles;
const postDates = new Map(articles.map((a) => [`${SITE}/blog/${a.slug}/`, a.updatedAt ?? a.publishedAt]));

// Static build: the output in dist/ uploads as-is to the Hostinger shared plan of creamostech.com.
export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  integrations: [
    sitemap({
      // same hreflang codes as the <link rel="alternate"> tags in the page head
      i18n: { defaultLocale: 'es', locales: { es: 'es-MX', en: 'en' } },
      serialize(item) {
        const d = postDates.get(item.url);
        if (d) item.lastmod = `${d}T12:00:00.000Z`;
        return item;
      },
    }),
  ],
  vite: {
    build: { cssMinify: true },
  },
});
