"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Header, Footer, CTA } from '@/components/sections';
import {
	SectionContainer,
	ParticlesBackground,
	ScrollReveal,
	Badge,
	MagneticButton,
	ScrollProgress,
} from '@/components/ui';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getTranslations } from '@/lib/i18n';

export default function FAQClient() {
	const { lang } = useLanguage();
	const t = getTranslations(lang);
	const [searchTerm, setSearchTerm] = useState('');
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

	const filteredItems = t.faq.items.filter(
		(item) =>
			item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.answer.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<>
			<ScrollProgress />
			<Header />
			<main className="pt-24">
				<section className="relative overflow-hidden py-24 lg:py-44 bg-primary-900 text-white">
					<ParticlesBackground />
					<div className="absolute inset-0 bg-gradient-to-b from-primary-900/50 to-primary-900 z-0" />

					<SectionContainer background="transparent" padding="none">
						<div className="max-w-4xl mx-auto text-center relative z-10">
							<ScrollReveal>
								<Badge className="mb-8 bg-accent-500 text-white border-none px-6 py-2 text-sm uppercase tracking-widest">
									{lang === 'es' ? 'Centro de Ayuda' : 'Help Center'}
								</Badge>
								<h1 className="text-6xl md:text-9xl font-bold mb-8 tracking-tighter leading-none">{t.faq.title}</h1>
								<p className="text-xl md:text-2xl text-primary-100 max-w-2xl mx-auto leading-relaxed opacity-90">{t.faq.description}</p>
							</ScrollReveal>
						</div>
					</SectionContainer>
				</section>

				<SectionContainer background="white" padding="lg">
					<ScrollReveal className="mb-16 max-w-3xl mx-auto">
						<div className="relative">
							<input
								type="text"
								placeholder={lang === 'es' ? 'Buscar preguntas...' : 'Search questions...'}
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full px-8 py-6 pl-16 rounded-full border-2 border-gray-200 focus:border-accent-500 outline-none text-lg transition-colors shadow-lg"
							/>
							<svg
								className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
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
					</ScrollReveal>

					<div className="max-w-4xl mx-auto space-y-6">
						{filteredItems.length > 0 ? (
							filteredItems.map((item, index) => (
								<ScrollReveal key={item.question} delay={index * 0.05}>
									<div className="border border-gray-200 rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300">
										<button
											onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
											className="w-full p-8 flex items-start justify-between gap-6 text-left hover:bg-gray-50 transition-colors"
										>
											<div className="flex gap-6 flex-1">
												<div
													className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black transition-all duration-300 ${
														expandedIndex === index ? 'bg-accent-500 text-white' : 'bg-primary-50 text-primary-700'
													}`}
												>
													?
												</div>
												<h2 className="text-xl md:text-2xl font-bold text-primary-900 pt-2">{item.question}</h2>
											</div>
											<div
												className={`flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-transform duration-300 ${
													expandedIndex === index ? 'rotate-180' : ''
												}`}
											>
												<svg className="w-5 h-5 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
												</svg>
											</div>
										</button>
										<div
											className={`overflow-hidden transition-all duration-500 ${
												expandedIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
											}`}
										>
											<div className="px-8 pb-8 pl-[5.5rem]">
												<p className="text-lg text-gray-600 leading-relaxed">{item.answer}</p>
											</div>
										</div>
									</div>
								</ScrollReveal>
							))
						) : (
							<div className="text-center py-20">
								<p className="text-2xl font-bold text-gray-400">{lang === 'es' ? 'No se encontraron preguntas' : 'No questions found'}</p>
								<button onClick={() => setSearchTerm('')} className="mt-6 text-accent-600 font-bold hover:underline">
									{lang === 'es' ? 'Limpiar búsqueda' : 'Clear search'}
								</button>
							</div>
						)}
					</div>
				</SectionContainer>

				<section className="py-16 bg-gray-50">
					<SectionContainer background="transparent" padding="none">
						<div className="max-w-4xl mx-auto">
							<h3 className="text-3xl font-bold text-center text-primary-900 mb-10">{lang === 'es' ? 'Enlaces Rápidos' : 'Quick Links'}</h3>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								{[
									{ icon: '📚', label: lang === 'es' ? 'Recursos' : 'Resources', link: '/recursos' },
									{ icon: '💼', label: lang === 'es' ? 'Casos de Éxito' : 'Case Studies', link: '/casos-de-exito' },
									{ icon: '📝', label: 'Blog', link: '/blog' },
								].map((quickLink) => (
									<Link key={quickLink.link} href={quickLink.link}>
										<div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-accent-500 transition-all hover:shadow-lg text-center group">
											<div className="text-4xl mb-4">{quickLink.icon}</div>
											<p className="font-bold text-primary-900 group-hover:text-accent-600 transition-colors">{quickLink.label}</p>
										</div>
									</Link>
								))}
							</div>
						</div>
					</SectionContainer>
				</section>

				<section className="py-24 bg-gray-50">
					<SectionContainer background="transparent" padding="none">
						<div className="bg-white rounded-[3rem] p-12 md:p-24 shadow-xl border border-gray-100 text-center space-y-10">
							<h2 className="text-4xl md:text-6xl font-bold text-primary-900 tracking-tight">{lang === 'es' ? '¿Aún tienes dudas?' : 'Still have questions?'}</h2>
							<p className="text-xl text-gray-600 max-w-2xl mx-auto">
								{lang === 'es'
									? 'Nuestro equipo de expertos está listo para ayudarte a resolver cualquier inquietud técnica o estratégica.'
									: 'Our team of experts is ready to help you solve any technical or strategic concerns.'}
							</p>
							<div className="flex flex-col sm:flex-row items-center justify-center gap-6">
								<MagneticButton className="bg-primary-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-500 transition-colors">
									{lang === 'es' ? 'Contactar Soporte' : 'Contact Support'}
								</MagneticButton>
								<Link href="/#contact" className="text-primary-900 font-black text-lg uppercase tracking-widest hover:text-accent-600 transition-colors">
									{lang === 'es' ? 'Agendar una llamada' : 'Schedule a call'}
								</Link>
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

