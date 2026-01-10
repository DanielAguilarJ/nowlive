"use client";

import { useState } from 'react';
import { Header, Footer, CTA } from '@/components/sections';
import {
  SectionContainer,
  TiltCard,
  ParticlesBackground,
  ScrollReveal,
  Badge,
  Marquee,
  TrustBadges,
  MagneticButton,
  ScrollProgress,
} from '@/components/ui';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getTranslations } from '@/lib/i18n';

export default function TestimonialsClient() {
  const { lang } = useLanguage();
  const t = getTranslations(lang);
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  const industries = [
    { id: 'all', label: lang === 'es' ? 'Todas' : 'All Industries' },
    { id: 'tech', label: lang === 'es' ? 'Tecnología' : 'Technology' },
    { id: 'retail', label: lang === 'es' ? 'Retail' : 'Retail' },
    { id: 'finance', label: lang === 'es' ? 'Finanzas' : 'Finance' },
    { id: 'health', label: lang === 'es' ? 'Salud' : 'Healthcare' },
  ];

  const filteredTestimonials = t.testimonialsPage.testimonials;

  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="pt-24">
        <section className="relative overflow-hidden py-24 lg:py-44 bg-white">
          <ParticlesBackground />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(var(--accent-500-rgb),0.05),transparent_70%)]" />

          <SectionContainer background="transparent" padding="none">
            <div className="max-w-5xl mx-auto text-center relative z-10">
              <ScrollReveal>
                <Badge className="mb-8 bg-primary-900 text-white border-none px-6 py-2 text-sm uppercase tracking-widest">
                  {lang === 'es' ? 'Nuestra Reputación' : 'Our Reputation'}
                </Badge>
                <h1 className="text-6xl md:text-9xl font-bold text-primary-900 mb-8 tracking-tighter leading-none">{t.testimonialsPage.title}</h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{t.testimonialsPage.description}</p>
              </ScrollReveal>
            </div>
          </SectionContainer>
        </section>

        <div className="py-12 border-y border-gray-100 bg-gray-50/50">
          <SectionContainer background="transparent" padding="none">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="text-center md:text-left">
                <p className="text-4xl font-black text-primary-900 mb-2">4.9/5</p>
                <div className="flex gap-1 justify-center md:justify-start text-accent-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{lang === 'es' ? 'Calificación promedio' : 'Average rating'}</p>
              </div>
              <TrustBadges />
              <div className="hidden lg:block h-12 w-px bg-gray-200" />
              <div className="text-center md:text-right">
                <p className="text-4xl font-black text-primary-900 mb-2">150+</p>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{lang === 'es' ? 'Clientes satisfechos' : 'Happy clients'}</p>
              </div>
            </div>
          </SectionContainer>
        </div>

        <SectionContainer background="white" padding="lg">
          <ScrollReveal className="mb-16">
            <div className="flex flex-wrap justify-center gap-4">
              {industries.map((industry) => (
                <button
                  key={industry.id}
                  onClick={() => setSelectedIndustry(industry.id)}
                  className={`px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all ${
                    selectedIndustry === industry.id
                      ? 'bg-primary-900 text-white scale-105 shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-primary-50 border-2 border-gray-200'
                  }`}
                >
                  {industry.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredTestimonials.map((testimonial, index) => (
              <ScrollReveal key={testimonial.name} delay={index * 0.1}>
                <TiltCard className="h-full flex flex-col gap-8 p-12 border border-gray-100 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 bg-white group">
                  <div className="flex justify-between items-start">
                    <div className="text-accent-500">
                      <svg className="w-12 h-12 fill-current opacity-20 group-hover:opacity-100 transition-opacity duration-500" viewBox="0 0 32 32">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                    </div>
                    <div className="flex gap-0.5 text-accent-500">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  <p className="text-2xl text-primary-900 font-medium leading-relaxed italic">“{testimonial.quote}”</p>

                  <div className="mt-auto pt-8 border-t border-gray-50 flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center text-2xl font-black text-primary-700 overflow-hidden">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <p className="font-black text-primary-900 text-xl">{testimonial.name}</p>
                      <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">
                        {testimonial.role} · {testimonial.company}
                      </p>
                    </div>
                  </div>

                  <div className="bg-accent-500/5 p-4 rounded-2xl border border-accent-500/10">
                    <p className="text-accent-700 font-black text-xs uppercase tracking-[0.2em] mb-1">{lang === 'es' ? 'Resultado clave' : 'Key result'}</p>
                    <p className="text-primary-900 font-bold">{testimonial.result}</p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </SectionContainer>

        <div className="py-24 bg-primary-900 text-white overflow-hidden">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{lang === 'es' ? 'Lo que dicen en redes' : 'What they say on social'}</h2>
          </div>
          <Marquee speed={25} pauseOnHover>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="mx-6 w-[350px] bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-accent-500" />
                  <div>
                    <p className="font-bold text-sm">@user_{i}00</p>
                    <p className="text-xs opacity-50">Twitter / X</p>
                  </div>
                </div>
                <p className="text-lg opacity-80 leading-relaxed">
                  {lang === 'es'
                    ? 'Increíble el trabajo de @NOWLIVE. Han transformado nuestra presencia digital en tiempo récord.'
                    : 'Amazing work by @NOWLIVE. They transformed our digital presence in record time.'}
                </p>
              </div>
            ))}
          </Marquee>
        </div>

        <section className="py-24">
          <SectionContainer background="transparent" padding="none">
            <div className="bg-accent-500 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none">
                  {lang === 'es' ? '¿Listo para ser nuestro próximo caso de éxito?' : 'Ready to be our next success story?'}
                </h2>
                <MagneticButton className="bg-primary-900 text-white px-12 py-6 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-2xl">
                  {lang === 'es' ? 'Empezar ahora' : 'Get started now'}
                </MagneticButton>
              </div>
            </div>
          </SectionContainer>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
