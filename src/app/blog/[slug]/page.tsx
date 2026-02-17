import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createMetadata } from '@/lib/seo';
import { buildJsonLd, getArticleBySlug } from '../articles';

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

function slugifyHeading(heading: string) {
  return heading
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return createMetadata({
      title: 'Artículo no encontrado',
      description: 'El artículo solicitado no está disponible.',
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return createMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.slug}`,
    keywords: article.keywords,
  });
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return notFound();
  }

  const jsonLd = buildJsonLd(article);

  return (
    <main className="bg-white text-primary-900">
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <Link href="/blog" className="font-semibold text-primary-700 hover:text-accent-600 transition-colors">
              ← Volver al blog
            </Link>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
            <span>{article.category}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
            <span>{formatDate(article.publishedAt)}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
            <span>{article.readTime} de lectura</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6">{article.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mb-6">{article.description}</p>
          <div className="flex flex-wrap gap-2 text-sm text-gray-500">
            {article.keywords.map((keyword) => (
              <span key={keyword} className="px-3 py-1 rounded-full bg-primary-50 text-primary-800 font-semibold">
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="relative h-[280px] md:h-[420px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={article.heroImage}
              alt={article.title}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-sm uppercase tracking-widest font-bold">{article.category}</p>
              <p className="text-lg font-semibold">{article.author}</p>
            </div>
          </div>
        </div>
      </section>

      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] gap-12">
          <div className="space-y-10 text-gray-700 leading-relaxed">
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
              <p className="text-lg text-primary-900 font-semibold mb-3">Resumen ejecutivo</p>
              <p className="text-base md:text-lg text-gray-700">{article.summary}</p>
              {article.painPoints && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">Problemas que resuelve</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {article.painPoints.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Contenido</p>
              <ol className="space-y-3 text-primary-800 font-semibold">
                {article.sections.map((section) => (
                  <li key={section.title} className="hover:text-accent-600 transition-colors">
                    <a href={`#${slugifyHeading(section.title)}`}>{section.title}</a>
                  </li>
                ))}
              </ol>
            </div>

            {article.sections.map((section) => (
              <section key={section.title} id={slugifyHeading(section.title)} className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-primary-900">{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-lg text-gray-700">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <div className="p-6 rounded-2xl bg-primary-50 border border-primary-100 shadow-sm">
              <p className="text-sm font-semibold text-primary-700 uppercase tracking-widest mb-3">Puntos clave</p>
              <ul className="list-disc list-inside space-y-2 text-primary-900 font-semibold">
                {article.takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {article.checklist && (
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">Checklist accionable</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {article.checklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 h-fit">
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">CTA</p>
              <p className="text-xl font-bold text-primary-900 mb-2">{article.serviceCTA.label}</p>
              <p className="text-gray-700 mb-4">{article.serviceCTA.helper}</p>
              <Link
                href={article.serviceCTA.href}
                className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-primary-900 text-white font-semibold hover:bg-accent-600 transition-colors"
              >
                Hablemos
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">Autor</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-800 font-bold flex items-center justify-center">
                  {article.author.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-primary-900">{article.author}</p>
                  <p className="text-sm text-gray-600">Actualizado {formatDate(article.updatedAt ?? article.publishedAt)}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </main>
  );
}
