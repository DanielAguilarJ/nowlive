// Extracts the real copy (ES/EN) from the old Next.js project into JSON files,
// so the Astro site reuses every confirmed text instead of retyping it.
// Usage: node scripts/extract-content.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { transformSync } from 'rolldown/experimental';

const here = dirname(fileURLToPath(import.meta.url));
const oldSrc = join(here, '..', '..', 'src');
const outDir = join(here, '..', 'src', 'data', 'raw');
mkdirSync(outDir, { recursive: true });

const sources = {
  i18n: 'lib/i18n.ts',
  seo: 'lib/seo.ts',
  articles: 'app/blog/articles.ts',
  offer: 'components/sections/Offer.tsx',
  portfolio: 'components/sections/Portfolio.tsx',
  testimonials: 'components/sections/Testimonials.tsx',
  clientLogos: 'components/sections/ClientLogos.tsx',
  process: 'components/sections/Process.tsx',
  team: 'components/sections/Team.tsx',
  ctaSection: 'components/sections/CTA.tsx',
  floating: 'components/sections/FloatingConversion.tsx',
  header: 'components/sections/Header.tsx',
  footer: 'components/sections/Footer.tsx',
  servicesIndex: 'app/services/ServicesClient.tsx',
  webDesign: 'app/services/web-design/WebDesignClient.tsx',
  digitalStrategy: 'app/services/digital-strategy/DigitalStrategyClient.tsx',
  marketingAutomation: 'app/services/marketing-automation/MarketingAutomationClient.tsx',
  contentCreation: 'app/services/content-creation/ContentCreationClient.tsx',
  seoAnalytics: 'app/services/seo-analytics/SEOAnalyticsClient.tsx',
  brandIdentity: 'app/services/brand-identity/BrandIdentityClient.tsx',
  about: 'app/about/AboutClient.tsx',
  contact: 'app/contact/ContactClient.tsx',
  careers: 'app/careers/CareersClient.tsx',
  faq: 'app/faq/FAQClient.tsx',
  caseStudies: 'app/casos-de-exito/CaseStudiesClient.tsx',
  testimonialsPage: 'app/testimonios/TestimonialsClient.tsx',
  resources: 'app/recursos/ResourcesClient.tsx',
  privacy: 'app/privacy/PrivacyClient.tsx',
  terms: 'app/terms/TermsClient.tsx',
};

const JSX = Symbol('jsx');
function h(tag) {
  return { [JSX]: true, tag: typeof tag === 'string' ? tag : 'component' };
}

function toPlain(value, seen = new WeakSet()) {
  if (value === null || typeof value !== 'object') {
    return typeof value === 'function' ? undefined : value;
  }
  if (value[JSX]) return null;
  if (seen.has(value)) return undefined;
  seen.add(value);
  if (Array.isArray(value)) return value.map((v) => toPlain(v, seen));
  const out = {};
  for (const [k, v] of Object.entries(value)) {
    const plain = toPlain(v, seen);
    if (plain !== undefined) out[k] = plain;
  }
  return out;
}

function extract(file) {
  let code = readFileSync(file, 'utf8');
  // Icon references inside data become their key, e.g. icons.speed -> "speed".
  code = code.replace(/\b[a-zA-Z]*[iI]cons\.(\w+)\b/g, '"$1"');
  const lang = file.endsWith('.tsx') ? 'tsx' : 'ts';
  const result = transformSync(basename(file), code, {
    lang,
    jsx: { runtime: 'classic', pragma: 'h', pragmaFrag: 'h' },
  });
  if (result.errors?.length) throw new Error(result.errors.map((e) => e.message).join('\n'));
  let js = result.code
    .replace(/^import[\s\S]*?;$/gm, '')
    .replace(/^export default /gm, '')
    .replace(/^export (const|let|function|class|async function) /gm, '$1 ')
    .replace(/^export \{[^}]*\};?$/gm, '')
    .replace(/^["']use client["'];?$/gm, '');
  const names = [...js.matchAll(/^(?:const|let) (\w+)\s*=/gm)].map((m) => m[1]);
  const scope = new Proxy(
    {},
    {
      has: (_t, key) => !(key in globalThis) && key !== 'h' && key !== 'Symbol',
      get: () => {
        const stub = () => stub;
        return new Proxy(stub, { get: () => stub });
      },
    },
  );
  // eslint-disable-next-line no-new-func
  const run = new Function('h', 'scope', `with (scope) { ${js}\n; return { ${names.map((n) => `${n}: typeof ${n} === 'undefined' ? undefined : ${n}`).join(', ')} }; }`);
  return toPlain(run(h, scope));
}

for (const [name, rel] of Object.entries(sources)) {
  try {
    const data = extract(join(oldSrc, rel));
    writeFileSync(join(outDir, `${name}.json`), JSON.stringify(data, null, 1));
    console.log(`ok   ${name}: ${Object.keys(data).join(', ')}`);
  } catch (err) {
    console.log(`FAIL ${name}: ${err.message.split('\n')[0]}`);
  }
}
