"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
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

type Category = 'todos' | 'general' | 'servicios' | 'proceso' | 'pagos';

function getCategoryForIndex(index: number): Exclude<Category, 'todos'> {
	if (index <= 2) return 'general';
	if (index <= 5) return 'servicios';
	if (index <= 8) return 'proceso';
	return 'pagos';
}

const RELATED_TOPICS_ES: Record<string, { label: string; href: string }[]> = {
	general: [
		{ label: 'Nuestro Proceso', href: '/#process' },
		{ label: 'Sobre Nosotros', href: '/about' },
		{ label: 'Casos de Exito', href: '/casos-de-exito' },
	],
	servicios: [
		{ label: 'Todos los Servicios', href: '/services' },
		{ label: 'Diseno Web', href: '/services/web-design' },
		{ label: 'SEO & Analytics', href: '/services/seo-analytics' },
	],
	proceso: [
		{ label: 'Nuestro Proceso', href: '/#process' },
		{ label: 'Agendar Llamada', href: '/#contact' },
		{ label: 'Equipo', href: '/#team' },
	],
	pagos: [
		{ label: 'Contactar Soporte', href: '/#contact' },
		{ label: 'Servicios', href: '/services' },
		{ label: 'Terminos de Servicio', href: '/terms' },
	],
};

const RELATED_TOPICS_EN: Record<string, { label: string; href: string }[]> = {
	general: [
		{ label: 'Our Process', href: '/#process' },
		{ label: 'About Us', href: '/about' },
		{ label: 'Case Studies', href: '/casos-de-exito' },
	],
	servicios: [
		{ label: 'All Services', href: '/services' },
		{ label: 'Web Design', href: '/services/web-design' },
		{ label: 'SEO & Analytics', href: '/services/seo-analytics' },
	],
	proceso: [
		{ label: 'Our Process', href: '/#process' },
		{ label: 'Schedule a Call', href: '/#contact' },
		{ label: 'Team', href: '/#team' },
	],
	pagos: [
		{ label: 'Contact Support', href: '/#contact' },
		{ label: 'Services', href: '/services' },
		{ label: 'Terms of Service', href: '/terms' },
	],
};

/* ------------------------------------------------------------------ */
/*  Animated accordion content wrapper                                 */
/* ------------------------------------------------------------------ */
function AccordionContent({
	isOpen,
	children,
}: {
	isOpen: boolean;
	children: React.ReactNode;
}) {
	const contentRef = useRef<HTMLDivElement>(null);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		if (contentRef.current) {
			setHeight(contentRef.current.scrollHeight);
		}
	}, [isOpen, children]);

	return (
		<div
			className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
			style={{
				maxHeight: isOpen ? `${height}px` : '0px',
				opacity: isOpen ? 1 : 0,
				transform: isOpen ? 'translateY(0)' : 'translateY(-8px)',
			}}
		>
			<div ref={contentRef}>{children}</div>
		</div>
	);
}

/* ------------------------------------------------------------------ */
/*  Thumbs up / down rating component                                  */
/* ------------------------------------------------------------------ */
function HelpfulRating({
	lang,
}: {
	questionIndex: number;
	lang: 'es' | 'en';
}) {
	const [rating, setRating] = useState<'up' | 'down' | null>(null);

	return (
		<div className="flex items-center gap-4 mt-6 pt-5 border-t border-gray-100">
			<span className="text-sm text-gray-500 font-medium">
				{lang === 'es' ? 'Te fue util?' : 'Was this helpful?'}
			</span>
			<button
				onClick={(e) => {
					e.stopPropagation();
					setRating(rating === 'up' ? null : 'up');
				}}
				className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
					rating === 'up'
						? 'bg-green-100 text-green-700 scale-105'
						: 'bg-gray-100 text-gray-500 hover:bg-green-50 hover:text-green-600'
				}`}
				aria-label={lang === 'es' ? 'Si, fue util' : 'Yes, helpful'}
			>
				<svg
					className={`w-4 h-4 transition-transform duration-300 ${rating === 'up' ? 'scale-110' : 'group-hover:scale-110'}`}
					fill={rating === 'up' ? 'currentColor' : 'none'}
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z M3 15h2v6H3z"
					/>
				</svg>
				{lang === 'es' ? 'Si' : 'Yes'}
			</button>
			<button
				onClick={(e) => {
					e.stopPropagation();
					setRating(rating === 'down' ? null : 'down');
				}}
				className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
					rating === 'down'
						? 'bg-red-100 text-red-700 scale-105'
						: 'bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600'
				}`}
				aria-label={lang === 'es' ? 'No fue util' : 'Not helpful'}
			>
				<svg
					className={`w-4 h-4 transition-transform duration-300 ${rating === 'down' ? 'scale-110' : 'group-hover:scale-110'}`}
					fill={rating === 'down' ? 'currentColor' : 'none'}
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z M21 4h-2v6h2z"
					/>
				</svg>
				{lang === 'es' ? 'No' : 'No'}
			</button>
			{rating && (
				<span className="text-xs text-gray-400 ml-2 animate-fade-in">
					{lang === 'es' ? 'Gracias por tu opinion' : 'Thanks for your feedback'}
				</span>
			)}
		</div>
	);
}

/* ------------------------------------------------------------------ */
/*  Main FAQ page                                                      */
/* ------------------------------------------------------------------ */
export default function FAQClient() {
	const { lang } = useLanguage();
	const t = getTranslations(lang);
	const [searchTerm, setSearchTerm] = useState('');
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
	const [activeCategory, setActiveCategory] = useState<Category>('todos');
	const [exploredQuestions, setExploredQuestions] = useState<Set<number>>(new Set());

	const relatedTopics = lang === 'es' ? RELATED_TOPICS_ES : RELATED_TOPICS_EN;

	const categories: { key: Category; labelEs: string; labelEn: string }[] = [
		{ key: 'todos', labelEs: 'Todos', labelEn: 'All' },
		{ key: 'general', labelEs: 'General', labelEn: 'General' },
		{ key: 'servicios', labelEs: 'Servicios', labelEn: 'Services' },
		{ key: 'proceso', labelEs: 'Proceso', labelEn: 'Process' },
		{ key: 'pagos', labelEs: 'Pagos', labelEn: 'Pricing' },
	];

	// Filter items by search and category
	const filteredItems = useMemo(() => {
		return t.faq.items
			.map((item, originalIndex) => ({ ...item, originalIndex }))
			.filter((item) => {
				const matchesSearch =
					searchTerm === '' ||
					item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
					item.answer.toLowerCase().includes(searchTerm.toLowerCase());
				const matchesCategory =
					activeCategory === 'todos' ||
					getCategoryForIndex(item.originalIndex) === activeCategory;
				return matchesSearch && matchesCategory;
			});
	}, [t.faq.items, searchTerm, activeCategory]);

	const totalItems = t.faq.items.length;
	const exploredCount = exploredQuestions.size;
	const exploredPercent = totalItems > 0 ? Math.round((exploredCount / totalItems) * 100) : 0;

	const handleToggle = useCallback(
		(index: number, originalIndex: number) => {
			if (expandedIndex === index) {
				setExpandedIndex(null);
			} else {
				setExpandedIndex(index);
				setExploredQuestions((prev) => {
					const next = new Set(prev);
					next.add(originalIndex);
					return next;
				});
			}
		},
		[expandedIndex]
	);

	const clearSearch = useCallback(() => {
		setSearchTerm('');
	}, []);

	return (
		<>
			<ScrollProgress />
			<Header />
			<main className="pt-24">
				{/* ---- Hero ---- */}
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

				{/* ---- FAQ Content ---- */}
				<SectionContainer background="white" padding="lg">
					{/* Search bar with clear button and result count */}
					<ScrollReveal className="mb-10 max-w-3xl mx-auto">
						<div className="relative">
							<input
								type="text"
								placeholder={lang === 'es' ? 'Buscar preguntas...' : 'Search questions...'}
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full px-8 py-6 pl-16 pr-32 rounded-full border-2 border-gray-200 focus:border-accent-500 outline-none text-lg transition-colors shadow-lg"
							/>
							{/* Search icon */}
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

							{/* Result count + Clear button */}
							<div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
								{searchTerm && (
									<span className="text-sm text-gray-400 font-medium whitespace-nowrap">
										{filteredItems.length}{' '}
										{lang === 'es'
											? filteredItems.length === 1
												? 'resultado'
												: 'resultados'
											: filteredItems.length === 1
												? 'result'
												: 'results'}
									</span>
								)}
								{searchTerm && (
									<button
										onClick={clearSearch}
										className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
										aria-label={lang === 'es' ? 'Limpiar busqueda' : 'Clear search'}
									>
										<svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
										</svg>
									</button>
								)}
							</div>
						</div>
					</ScrollReveal>

					{/* Progress indicator */}
					<ScrollReveal className="mb-10 max-w-3xl mx-auto">
						<div className="flex items-center gap-4 px-2">
							<div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
								<div
									className="h-full bg-gradient-to-r from-accent-500 to-purple-500 rounded-full transition-all duration-700 ease-out"
									style={{ width: `${exploredPercent}%` }}
								/>
							</div>
							<span className="text-sm text-gray-500 font-medium whitespace-nowrap">
								{exploredCount}/{totalItems}{' '}
								{lang === 'es' ? 'exploradas' : 'explored'}
							</span>
						</div>
					</ScrollReveal>

					{/* Category filter tabs */}
					<ScrollReveal className="mb-12 max-w-4xl mx-auto">
						<div className="flex flex-wrap items-center justify-center gap-3">
							{categories.map((cat) => {
								const isActive = activeCategory === cat.key;
								return (
									<button
										key={cat.key}
										onClick={() => {
											setActiveCategory(cat.key);
											setExpandedIndex(null);
										}}
										className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
											isActive
												? 'bg-primary-900 text-white shadow-lg scale-105'
												: 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-primary-900'
										}`}
									>
										{lang === 'es' ? cat.labelEs : cat.labelEn}
									</button>
								);
							})}
						</div>
					</ScrollReveal>

					{/* FAQ items */}
					<div className="max-w-4xl mx-auto space-y-6">
						{filteredItems.length > 0 ? (
							filteredItems.map((item, index) => {
								const isExpanded = expandedIndex === index;
								const isPopular = item.originalIndex < 3;
								const category = getCategoryForIndex(item.originalIndex);

								return (
									<ScrollReveal key={item.question} delay={index * 0.05}>
										<div
											className={`border rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 ${
												isExpanded ? 'border-accent-300 shadow-xl' : 'border-gray-200'
											}`}
										>
											<button
												onClick={() => handleToggle(index, item.originalIndex)}
												className="w-full p-8 flex items-start justify-between gap-6 text-left hover:bg-gray-50 transition-colors"
											>
												<div className="flex gap-6 flex-1 items-start">
													<div
														className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black transition-all duration-300 ${
															isExpanded ? 'bg-accent-500 text-white rotate-[360deg]' : 'bg-primary-50 text-primary-700'
														}`}
													>
														?
													</div>
													<div className="flex flex-col gap-2 pt-1">
														<div className="flex items-center gap-3 flex-wrap">
															<h2 className="text-xl md:text-2xl font-bold text-primary-900">{item.question}</h2>
															{isPopular && (
																<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200">
																	<svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
																		<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
																	</svg>
																	Popular
																</span>
															)}
														</div>
													</div>
												</div>
												<div
													className={`flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-500 ${
														isExpanded ? 'rotate-180 bg-accent-100' : ''
													}`}
												>
													<svg className="w-5 h-5 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
													</svg>
												</div>
											</button>

											<AccordionContent isOpen={isExpanded}>
												<div className="px-8 pb-8 pl-[5.5rem]">
													<p className="text-lg text-gray-600 leading-relaxed">{item.answer}</p>

													{/* Helpful rating */}
													<HelpfulRating questionIndex={item.originalIndex} lang={lang} />

													{/* Related topics */}
													<div className="mt-6 pt-5 border-t border-gray-100">
														<p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
															{lang === 'es' ? 'Temas relacionados' : 'Related Topics'}
														</p>
														<div className="flex flex-wrap gap-2">
															{(relatedTopics[category] || []).map((topic) => (
																<Link
																	key={topic.href}
																	href={topic.href}
																	className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-gray-50 text-gray-600 hover:bg-accent-50 hover:text-accent-700 border border-gray-200 hover:border-accent-300 transition-all duration-300"
																>
																	<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
																	</svg>
																	{topic.label}
																</Link>
															))}
														</div>
													</div>
												</div>
											</AccordionContent>
										</div>
									</ScrollReveal>
								);
							})
						) : (
							<div className="text-center py-20">
								<p className="text-2xl font-bold text-gray-400">{lang === 'es' ? 'No se encontraron preguntas' : 'No questions found'}</p>
								<button onClick={() => { setSearchTerm(''); setActiveCategory('todos'); }} className="mt-6 text-accent-600 font-bold hover:underline">
									{lang === 'es' ? 'Limpiar busqueda' : 'Clear search'}
								</button>
							</div>
						)}
					</div>
				</SectionContainer>

				{/* ---- Quick Links ---- */}
				<section className="py-16 bg-gray-50">
					<SectionContainer background="transparent" padding="none">
						<div className="max-w-4xl mx-auto">
							<h3 className="text-3xl font-bold text-center text-primary-900 mb-10">{lang === 'es' ? 'Enlaces Rapidos' : 'Quick Links'}</h3>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								{[
									{ icon: '📚', label: lang === 'es' ? 'Recursos' : 'Resources', link: '/recursos' },
									{ icon: '💼', label: lang === 'es' ? 'Casos de Exito' : 'Case Studies', link: '/casos-de-exito' },
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

				{/* ---- Still have questions ---- */}
				<section className="py-24 bg-gray-50">
					<SectionContainer background="transparent" padding="none">
						<div className="bg-white rounded-[3rem] p-12 md:p-24 shadow-xl border border-gray-100 text-center space-y-10">
							<h2 className="text-4xl md:text-6xl font-bold text-primary-900 tracking-tight">{lang === 'es' ? 'Aun tienes dudas?' : 'Still have questions?'}</h2>
							<p className="text-xl text-gray-600 max-w-2xl mx-auto">
								{lang === 'es'
									? 'Nuestro equipo de expertos esta listo para ayudarte a resolver cualquier inquietud tecnica o estrategica.'
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
