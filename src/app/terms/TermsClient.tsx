"use client";

import { Header, Footer } from '@/components/sections';
import { SectionContainer, ScrollReveal, ParticlesBackground, Badge, ScrollProgress } from '@/components/ui';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getTranslations } from '@/lib/i18n';

export default function TermsClient() {
  const { lang } = useLanguage();
  const t = getTranslations(lang);

  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="pt-24">
        <section className="relative overflow-hidden py-32 lg:py-48 bg-primary-900 text-white">
          <ParticlesBackground />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/50 to-primary-900 z-0" />

          <SectionContainer background="transparent" padding="none">
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <ScrollReveal>
                <Badge className="mb-8 bg-accent-500 text-white border-none px-6 py-2 text-sm uppercase tracking-widest">Legal</Badge>
                <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter leading-none">{t.terms.title}</h1>
                <p className="text-xl text-primary-100 opacity-70">
                  {lang === 'es' ? 'Condiciones de uso y marco legal de nuestros servicios.' : 'Terms of use and legal framework for our services.'}
                </p>
              </ScrollReveal>
            </div>
          </SectionContainer>
        </section>

        <SectionContainer background="white" padding="lg">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="prose prose-xl prose-primary max-w-none text-gray-600 space-y-20">
                <div className="relative p-10 md:p-16 bg-gray-50 rounded-[3rem] border border-gray-100 overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-accent-500" />
                  <p className="text-2xl leading-relaxed text-primary-900 font-medium italic">{t.terms.intro}</p>
                </div>

                {t.terms.sections.map((section, index) => (
                  <section key={section.title} className="space-y-8">
                    <div className="flex items-center gap-6">
                      <span className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary-900 text-white flex items-center justify-center text-2xl font-black shadow-xl">
                        {index + 1}
                      </span>
                      <h2 className="text-4xl md:text-5xl font-bold text-primary-900 tracking-tight m-0">{section.title}</h2>
                    </div>
                    <p className="text-xl leading-relaxed pl-22">{section.body}</p>
                  </section>
                ))}

                <div className="pt-20 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
                  <p className="text-lg text-gray-400 font-medium italic">{t.terms.lastUpdate}</p>
                  <div className="flex gap-6">
                    <a
                      href="mailto:legal@nowlive.com"
                      className="text-primary-900 font-black uppercase tracking-widest hover:text-accent-600 transition-colors"
                    >
                      legal@nowlive.com
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
