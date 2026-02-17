"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Header, Footer, CTA } from '@/components/sections';
import {
	SectionContainer,
	TiltCard,
	ParticlesBackground,
	ScrollReveal,
	Badge,
	Typewriter,
	Marquee,
	MagneticButton,
	ScrollProgress,
} from '@/components/ui';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getTranslations } from '@/lib/i18n';

export default function ResourcesClient() {
	const { lang } = useLanguage();
	const t = getTranslations(lang);
	const [selectedType, setSelectedType] = useState('all');

	const resourceTypes = [
		{ id: 'all', label: lang === 'es' ? 'Todos' : 'All', icon: '📚' },
		{ id: 'ebook', label: 'E-book', icon: '📖' },
		{ id: 'guide', label: lang === 'es' ? 'Guía' : 'Guide', icon: '📝' },
		{ id: 'template', label: 'Template', icon: '📄' },
		{ id: 'checklist', label: 'Checklist', icon: '✅' },
		{ id: 'webinar', label: 'Webinar', icon: '🎥' },
	];

	const filteredResources =
		selectedType === 'all' ? t.resources.items : t.resources.items.filter((item) => item.type.toLowerCase() === selectedType);

	const categories =
		lang === 'es'
			? ['Estrategia', 'Diseño', 'Marketing', 'Automatización', 'SEO', 'Analytics']
			: ['Strategy', 'Design', 'Marketing', 'Automation', 'SEO', 'Analytics'];

	return (
		<>
			<ScrollProgress />
			<Header />
			<main className="pt-24">
				<section className="relative overflow-hidden py-24 lg:py-40 bg-primary-900 text-white">
					<ParticlesBackground />
					<div className="absolute inset-0 bg-gradient-to-b from-primary-900/50 to-primary-900 z-0" />

					<SectionContainer background="transparent" padding="sm">
						<div className="max-w-5xl mx-auto text-center relative z-10">
							<ScrollReveal>
								<Badge className="mb-8 bg-accent-500 text-white border-none px-6 py-2 text-sm uppercase tracking-widest">
									{lang === 'es' ? 'Centro de Conocimiento' : 'Knowledge Hub'}
								</Badge>
								<h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter">
									{t.resources.title}
									<span className="block text-accent-400 mt-2">
										<Typewriter words={lang === 'es' ? ['para escalar.', 'para innovar.', 'para ganar.'] : ['to scale.', 'to innovate.', 'to win.']} />
									</span>
								</h1>
								<p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed opacity-90">{t.resources.description}</p>
							</ScrollReveal>
						</div>
					</SectionContainer>
				</section>

				<div className="py-12 bg-primary-50/50 border-y border-primary-100">
					<Marquee
						speed={40}
						pauseOnHover
						items={categories.map((cat) => (
							<div key={cat} className="mx-12 flex items-center gap-3">
								<span className="w-2 h-2 rounded-full bg-accent-500" />
								<span className="text-lg font-bold text-primary-900 uppercase tracking-widest">{cat}</span>
							</div>
						))}
					/>
				</div>

				<SectionContainer background="white" padding="lg">
					<ScrollReveal className="mb-16">
						<div className="flex flex-wrap justify-center gap-4 mb-12">
							{resourceTypes.map((type) => (
								<button
									key={type.id}
									onClick={() => setSelectedType(type.id)}
									className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all shadow-sm ${
										selectedType === type.id
											? 'bg-primary-900 text-white scale-105 shadow-lg'
											: 'bg-white text-gray-600 hover:bg-primary-50 border-2 border-gray-200'
									}`}
								>
									<span className="text-xl">{type.icon}</span>
									<span>{type.label}</span>
								</button>
							))}
						</div>

						<div className="text-center mb-8">
							<p className="text-lg text-gray-600">
								<span className="font-bold text-primary-900 text-2xl">{filteredResources.length}</span>{' '}
								{lang === 'es' ? 'recursos disponibles' : 'resources available'}
							</p>
						</div>
					</ScrollReveal>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
						{filteredResources.map((item, index) => (
							<ScrollReveal key={item.title} delay={index * 0.1}>
								<Link href={item.link}>
									<TiltCard className="h-full flex flex-col justify-between p-10 border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 bg-white group">
										<div className="space-y-6">
											<div className="flex items-center justify-between">
												<span className="bg-primary-50 text-primary-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">{item.type}</span>
												<span className="text-accent-600 font-bold text-xs uppercase tracking-widest">{item.level}</span>
											</div>
											<h2 className="text-3xl font-bold text-primary-900 group-hover:text-accent-600 transition-colors leading-tight">{item.title}</h2>
											<p className="text-gray-600 leading-relaxed text-lg">{item.description}</p>
										</div>
										<div className="mt-10 pt-6 border-t border-gray-50 flex items-center justify-between">
											<span className="text-primary-900 font-black text-sm uppercase tracking-widest group-hover:text-accent-600 transition-colors">
												{lang === 'es' ? 'Descargar ahora' : 'Download now'}
											</span>
											<div className="w-12 h-12 rounded-full bg-primary-900 text-white flex items-center justify-center group-hover:bg-accent-500 transition-all duration-500 group-hover:translate-x-2">
												<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
												</svg>
											</div>
										</div>
									</TiltCard>
								</Link>
							</ScrollReveal>
						))}
					</div>
				</SectionContainer>

				<section className="py-24 bg-gray-50 overflow-hidden">
					<SectionContainer background="transparent" padding="sm">
						<div className="bg-primary-900 rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
							<div className="absolute top-0 right-0 w-1/2 h-full bg-accent-500/10 blur-[120px] rounded-full" />
							<div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
								<div className="max-w-2xl">
									<h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
										{lang === 'es' ? '¿No encuentras lo que buscas?' : "Can't find what you're looking for?"}
									</h2>
									<p className="text-xl text-primary-100 opacity-80">
										{lang === 'es'
											? 'Nuestro equipo crea recursos personalizados para clientes. Hablemos sobre tus necesidades específicas.'
											: "Our team creates custom resources for clients. Let's talk about your specific needs."}
									</p>
								</div>
								<MagneticButton className="bg-accent-500 hover:bg-accent-600 text-white px-10 py-6 rounded-full font-bold text-xl transition-colors whitespace-nowrap">
									{lang === 'es' ? 'Solicitar Recurso' : 'Request Resource'}
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

