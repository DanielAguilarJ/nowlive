'use client';

import { SectionContainer, StatsCard } from '@/components/ui';
import { ScrollReveal } from '@/components/ui';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getTranslations } from '@/lib/i18n';

export function Stats() {
  const { lang } = useLanguage();
  const t = getTranslations(lang);

  return (
    <SectionContainer id="stats" padding="lg" background="white">
      <div className="text-center mb-16">
        <ScrollReveal direction="up">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-accent-600 bg-accent-100 rounded-full">
            {t.stats.badge}
          </span>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
          <h2 className="text-fluid-4xl font-bold text-primary-700 mb-4">
            {t.stats.title}
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.stats.description}
          </p>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {t.stats.items.map((stat, index) => (
          <ScrollReveal key={index} direction="up" delay={index * 0.1}>
            <StatsCard {...stat} />
          </ScrollReveal>
        ))}
      </div>
    </SectionContainer>
  );
}
