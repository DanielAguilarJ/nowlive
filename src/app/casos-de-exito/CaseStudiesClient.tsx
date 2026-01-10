"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Header, Footer, CTA } from '@/components/sections';
import {
	SectionContainer,
	ParticlesBackground,
	ScrollReveal,
	Badge,
	AnimatedNumber,
	LogoMarquee,
	MagneticButton,
	ScrollProgress,
} from '@/components/ui';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getTranslations } from '@/lib/i18n';

export default function CaseStudiesClient() {
	const { lang } = useLanguage();
	const t = getTranslations(lang);

	const logos = [
		{ name: 'Brand 1', logo: <div className="text-2xl font-black text-primary-900">BRAND 1</div> },
		{ name: 'Brand 2', logo: <div className="text-2xl font-black text-primary-900">BRAND 2</div> },
		{ name: 'Brand 3', logo: <div className="text-2xl font-black text-primary-900">BRAND 3</div> },
		{ name: 'Brand 4', logo: <div className="text-2xl font-black text-primary-900">BRAND 4</div> },
		{ name: 'Brand 5', logo: <div className="text-2xl font-black text-primary-900">BRAND 5</div> },
		{ name: 'Brand 6', logo: <div className="text-2xl font-black text-primary-900">BRAND 6</div> },
	];

	return (
		<>
			<ScrollProgress />
			<Header />
			<main className="pt-24">
				<section className="relative overflow-hidden py-24 lg:py-44 bg-primary-900 text-white">
					<ParticlesBackground />
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent-500/20 via-transparent to-transparent opacity-50" />

					<SectionContainer background="transparent" padding="sm">
						<div className="max-w-5xl mx-auto text-center relative z-10">
							<ScrollReveal>
								<Badge className="mb-8 bg-accent-500 text-white border-none px-6 py-2 text-sm uppercase tracking-widest">
									{lang === 'es' ? 'Impacto Medible' : 'Measurable Impact'}
								</Badge>
								<h1 className="text-6xl md:text-9xl font-bold mb-8 tracking-tighter leading-none">{t.caseStudies.title}</h1>
								<p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed opacity-90">{t.caseStudies.description}</p>
							</ScrollReveal>
						</div>
					</SectionContainer>
				</section>

				<div className="relative z-20 -mt-20">
					<SectionContainer background="transparent" padding="sm">
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
							{t.caseStudies.highlights.map((highlight, index) => (
								<ScrollReveal key={highlight.label} delay={index * 0.1}>
									<div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 text-center group hover:-translate-y-2 transition-transform duration-500">
										<p className="text-xs uppercase tracking-[0.3em] text-gray-400 font-black mb-6">{highlight.label}</p>
										<div className="text-6xl md:text-7xl font-black text-primary-900 tracking-tighter flex items-center justify-center gap-1">
											<AnimatedNumber value={parseFloat(highlight.value)} />
											<span className="text-accent-500">{highlight.value.replace(/[0-9.]/g, '')}</span>
										</div>
									</div>
								</ScrollReveal>
							))}
						</div>
					</SectionContainer>
				</div>

				<div className="py-24 overflow-hidden">
					<div className="text-center mb-16">
						<p className="text-sm font-black text-primary-900 uppercase tracking-[0.4em] opacity-30">
							{lang === 'es' ? 'Marcas que confían' : 'Brands that trust us'}
						</p>
					</div>
					<LogoMarquee logos={logos} />
				</div>

				<SectionContainer background="white" padding="lg">
					<div className="space-y-32">
						{t.caseStudies.studies.map((study, index) => (
							<ScrollReveal key={study.title}>
								<div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
									<div className={`space-y-10 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
										<div className="space-y-4">
											<div className="flex items-center gap-4">
												<span className="h-px w-12 bg-accent-500" />
												<span className="font-black text-accent-600 uppercase tracking-widest text-sm">{study.industry}</span>
											</div>
											<h2 className="text-4xl md:text-6xl font-bold text-primary-900 tracking-tight leading-tight">{study.title}</h2>
										</div>

										<p className="text-xl text-gray-600 leading-relaxed">{study.summary}</p>

										<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
											{study.metrics.map((metric) => (
												<div
													key={metric}
													className="flex items-center gap-4 bg-primary-50 p-6 rounded-2xl border border-primary-100/50 group hover:bg-primary-900 hover:text-white transition-all duration-500"
												>
													<div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center text-white flex-shrink-0">
														<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
														</svg>
													</div>
													<span className="font-bold text-lg">{metric}</span>
												</div>
											))}
										</div>

										<div className="pt-6">
											<Link href={study.link}>
												<MagneticButton className="bg-primary-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-500 transition-colors flex items-center gap-3">
													<span>{lang === 'es' ? 'Ver detalles del proyecto' : 'View project details'}</span>
													<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
													</svg>
												</MagneticButton>
											</Link>
										</div>
									</div>

									<div className={`relative aspect-square lg:aspect-video rounded-[3rem] overflow-hidden shadow-2xl group ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
										<div className="absolute inset-0 bg-primary-900/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
									<Image
										src={`https://images.unsplash.com/photo-${1500000000000 + index}?w=1200&h=800&fit=crop`}
										alt={study.title}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
										className="object-cover transition-transform duration-1000 group-hover:scale-110"
										/>
										<div className="absolute bottom-10 left-10 z-20">
											<div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl">
												<p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{lang === 'es' ? 'Servicio' : 'Service'}</p>
												<p className="text-primary-900 font-bold">{study.service}</p>
											</div>
										</div>
									</div>
								</div>
							</ScrollReveal>
						))}
					</div>
				</SectionContainer>

				<CTA />
			</main>
			<Footer />
		</>
	);
}

