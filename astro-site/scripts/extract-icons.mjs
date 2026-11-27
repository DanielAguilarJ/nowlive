// Collects the outline icon paths (Heroicons, MIT) that the old service pages
// already used, so the new site keeps one consistent 24px / 1.5 stroke icon set.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const oldSrc = join(here, '..', '..', 'src');
const files = [
  'app/services/web-design/WebDesignClient.tsx',
  'app/services/digital-strategy/DigitalStrategyClient.tsx',
  'app/services/marketing-automation/MarketingAutomationClient.tsx',
  'app/services/content-creation/ContentCreationClient.tsx',
  'app/services/seo-analytics/SEOAnalyticsClient.tsx',
  'app/services/brand-identity/BrandIdentityClient.tsx',
];

const icons = {};
for (const rel of files) {
  const code = readFileSync(join(oldSrc, rel), 'utf8');
  const start = code.indexOf('const icons = {');
  const end = code.indexOf('\n};', start);
  const block = code.slice(start, end);
  const entries = block.split(/\n {2}(\w+): \(/).slice(1);
  for (let i = 0; i < entries.length; i += 2) {
    const name = entries[i];
    const body = entries[i + 1] || '';
    const paths = [...body.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]);
    if (paths.length && !icons[name]) icons[name] = paths;
  }
}
writeFileSync(join(here, '..', 'src', 'data', 'raw', 'icons.json'), JSON.stringify(icons, null, 1));
console.log(Object.keys(icons).length, Object.keys(icons).join(' '));
