"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header, Footer, CTA } from '@/components/sections';
import {
  SectionContainer,
  TiltCard,
  ParticlesBackground,
  ScrollReveal,
  Badge,
  ScrollProgress,
  Marquee,
  MagneticButton,
} from '@/components/ui';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getTranslations } from '@/lib/i18n';

export default function BlogClient() {
  const { lang } = useLanguage();
  const t = getTranslations(lang);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const featuredPost = t.blog.posts[0];
  const otherPosts = t.blog.posts.slice(1);

  const categories = [
    { id: 'all', label: lang === 'es' ? 'Todos' : 'All' },
    { id: 'strategy', label: lang === 'es' ? 'Estrategia' : 'Strategy' },
    { id: 'design', label: lang === 'es' ? 'Diseño' : 'Design' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'tech', label: lang === 'es' ? 'Tecnología' : 'Technology' },
  ];

  const filteredPosts = otherPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category.toLowerCase().includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const trendingTopics =
    lang === 'es'
      ? ['#MarketingIA', '#GrowthHacking', '#UXDesign', '#Automation', '#SEO2026', '#DataDriven']
      : ['#AIMarketing', '#GrowthHacking', '#UXDesign', '#Automation', '#SEO2026', '#DataDriven'];

  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="pt-24">
        <section className="relative overflow-hidden py-24 lg:py-40 bg-white">
          <ParticlesBackground />
          <SectionContainer background="transparent" padding="none">
            <div className="text-center relative z-10">
              <ScrollReveal>
                <Badge className="mb-8 bg-primary-900 text-white border-none px-6 py-2 text-sm uppercase tracking-widest">
                  {lang === 'es' ? 'Insights & Estrategia' : 'Insights & Strategy'}
                </Badge>
                <h1 className="text-6xl md:text-9xl font-bold text-primary-900 mb-8 tracking-tighter">{t.blog.title}</h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{t.blog.description}</p>
              </ScrollReveal>
            </div>
          </SectionContainer>
        </section>

        <div className="py-8 bg-primary-900 text-white overflow-hidden">
          <Marquee speed={30}>
            {trendingTopics.map((topic) => (
              <span
                key={topic}
                className="mx-12 text-lg font-bold opacity-50 hover:opacity-100 transition-opacity cursor-default"
              >
                {topic}
              </span>
            ))}
          </Marquee>
        </div>

        <SectionContainer background="white" padding="lg">
          <ScrollReveal className="mb-16">
            <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={lang === 'es' ? 'Buscar artículos...' : 'Search articles...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-4 pl-14 rounded-full border-2 border-gray-200 focus:border-accent-500 outline-none text-lg transition-colors bg-white"
                  />
                  <svg
                    className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all ${
                        selectedCategory === category.id
                          ? 'bg-primary-900 text-white'
                          : 'bg-white text-gray-600 hover:bg-primary-100'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="mb-24">
            <Link href={`/blog/${featuredPost.slug}`}>
              <div className="group relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gray-50 rounded-[3rem] overflow-hidden p-8 lg:p-12 hover:shadow-2xl transition-all duration-500">
                <div className="relative h-[400px] lg:h-[500px] w-full rounded-[2rem] overflow-hidden">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-accent-500 text-white border-none">{lang === 'es' ? 'Destacado' : 'Featured'}</Badge>
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="flex items-center gap-4 text-sm font-bold text-accent-600 uppercase tracking-widest">
                    <span>{featuredPost.category}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                    <span className="text-gray-500">{featuredPost.date}</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold text-primary-900 leading-tight group-hover:text-accent-600 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed line-clamp-3">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-200 flex items-center justify-center font-bold text-primary-700">
                      {featuredPost.author[0]}
                    </div>
                    <span className="font-bold text-primary-900">{featuredPost.author}</span>
                  </div>
                  <MagneticButton className="bg-primary-900 text-white px-8 py-4 rounded-full font-bold group-hover:bg-accent-500 transition-colors">
                    {lang === 'es' ? 'Leer artículo completo' : 'Read full article'}
                  </MagneticButton>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <ScrollReveal key={post.slug} delay={index * 0.1}>
                  <Link href={`/blog/${post.slug}`}>
                    <TiltCard className="h-full overflow-hidden group border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 bg-white">
                      <div className="relative h-72 w-full overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-6 left-6">
                          <span className="bg-white/90 backdrop-blur-sm text-primary-900 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-10">
                        <div className="flex items-center text-xs font-bold text-gray-400 mb-6 uppercase tracking-widest">
                          <span>{post.date}</span>
                          <span className="mx-3">•</span>
                          <span>{post.author}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-primary-900 mb-6 group-hover:text-accent-600 transition-colors line-clamp-2 leading-tight">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 line-clamp-3 leading-relaxed mb-8">{post.excerpt}</p>
                        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                          <span className="text-primary-900 font-black text-xs uppercase tracking-widest group-hover:text-accent-600 transition-colors">
                            {lang === 'es' ? 'Leer más' : 'Read more'}
                          </span>
                          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-accent-500 group-hover:text-white transition-all duration-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </Link>
                </ScrollReveal>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-2xl font-bold text-gray-400">{lang === 'es' ? 'No se encontraron artículos' : 'No articles found'}</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="mt-6 text-accent-600 font-bold hover:underline"
                >
                  {lang === 'es' ? 'Limpiar filtros' : 'Clear filters'}
                </button>
              </div>
            )}
          </div>
        </SectionContainer>

        <section className="py-24 bg-primary-50">
          <SectionContainer background="transparent" padding="none">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold text-primary-900 tracking-tight">
                {lang === 'es' ? 'Suscríbete a nuestra newsletter' : 'Subscribe to our newsletter'}
              </h2>
              <p className="text-xl text-gray-600">
                {lang === 'es'
                  ? 'Recibe las últimas tendencias y estrategias directamente en tu bandeja de entrada.'
                  : 'Get the latest trends and strategies delivered straight to your inbox.'}
              </p>
              <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto pt-8">
                <input
                  type="email"
                  placeholder={lang === 'es' ? 'Tu email profesional' : 'Your professional email'}
                  className="flex-1 px-8 py-5 rounded-full border-2 border-primary-100 focus:border-accent-500 outline-none text-lg transition-colors"
                />
                <MagneticButton className="bg-primary-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-500 transition-colors">
                  {lang === 'es' ? 'Suscribirme' : 'Subscribe'}
                </MagneticButton>
              </form>
            </div>
          </SectionContainer>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}

