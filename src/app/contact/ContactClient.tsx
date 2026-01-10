"use client";

import { useState } from 'react';
import { Header, Footer } from '@/components/sections';
import {
  SectionContainer,
  ScrollReveal,
  Badge,
  ScrollProgress,
  ParticlesBackground,
  TiltCard,
} from '@/components/ui';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function ContactClient() {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: 'Email',
      value: 'hello@nowlive.agency',
      link: 'mailto:hello@nowlive.agency',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: lang === 'es' ? 'Teléfono' : 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: lang === 'es' ? 'Ubicación' : 'Location',
      value: 'San Francisco, CA',
      link: null,
    },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: '💼', url: '#' },
    { name: 'Twitter', icon: '🐦', url: '#' },
    { name: 'Instagram', icon: '📸', url: '#' },
    { name: 'Facebook', icon: '👤', url: '#' },
  ];

  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 lg:py-40 bg-primary-900 text-white">
          <ParticlesBackground />
          <SectionContainer background="transparent" padding="sm">
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <ScrollReveal>
                <Badge className="mb-8 bg-accent-500 text-white border-none px-6 py-2 text-sm uppercase tracking-widest">
                  {lang === 'es' ? 'Hablemos' : "Let's Talk"}
                </Badge>
                <h1 className="text-6xl md:text-9xl font-bold mb-8 tracking-tighter leading-none">
                  {lang === 'es' ? 'Contáctanos' : 'Contact Us'}
                </h1>
                <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed opacity-90">
                  {lang === 'es'
                    ? 'Estamos listos para transformar tu presencia digital. Cuéntanos sobre tu proyecto y recibe una propuesta personalizada en 24 horas.'
                    : "We're ready to transform your digital presence. Tell us about your project and receive a personalized proposal within 24 hours."}
                </p>
              </ScrollReveal>
            </div>
          </SectionContainer>
        </section>

        {/* Contact Form & Info */}
        <SectionContainer background="white" padding="lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <ScrollReveal>
              <div className="bg-gray-50 rounded-[3rem] p-10 lg:p-14">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-8">
                  {lang === 'es' ? 'Cuéntanos tu proyecto' : 'Tell us about your project'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        {lang === 'es' ? 'Nombre' : 'Name'} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-accent-500 outline-none transition-colors bg-white"
                        placeholder={lang === 'es' ? 'Tu nombre' : 'Your name'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-accent-500 outline-none transition-colors bg-white"
                        placeholder={lang === 'es' ? 'tu@email.com' : 'your@email.com'}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        {lang === 'es' ? 'Empresa' : 'Company'}
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-accent-500 outline-none transition-colors bg-white"
                        placeholder={lang === 'es' ? 'Tu empresa' : 'Your company'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        {lang === 'es' ? 'Teléfono' : 'Phone'}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-accent-500 outline-none transition-colors bg-white"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {lang === 'es' ? 'Servicio de interés' : 'Service of interest'} *
                    </label>
                    <select
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-accent-500 outline-none transition-colors bg-white"
                    >
                      <option value="">{lang === 'es' ? 'Selecciona un servicio' : 'Select a service'}</option>
                      <option value="web-design">{lang === 'es' ? 'Diseño Web' : 'Web Design'}</option>
                      <option value="branding">Branding</option>
                      <option value="marketing">Marketing Digital</option>
                      <option value="seo">SEO & Analytics</option>
                      <option value="automation">{lang === 'es' ? 'Automatización' : 'Automation'}</option>
                      <option value="strategy">{lang === 'es' ? 'Estrategia Digital' : 'Digital Strategy'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {lang === 'es' ? 'Presupuesto' : 'Budget'}
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-accent-500 outline-none transition-colors bg-white"
                    >
                      <option value="">{lang === 'es' ? 'Selecciona un rango' : 'Select a range'}</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k+">$50,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {lang === 'es' ? 'Mensaje' : 'Message'} *
                    </label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-accent-500 outline-none transition-colors bg-white resize-none"
                      placeholder={lang === 'es' ? 'Cuéntanos sobre tu proyecto...' : 'Tell us about your project...'}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-500 transition-colors"
                  >
                    {lang === 'es' ? 'Enviar Mensaje' : 'Send Message'}
                  </button>
                </form>
              </div>
            </ScrollReveal>

            {/* Contact Info */}
            <div className="space-y-8">
              <ScrollReveal delay={0.1}>
                <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-8">
                  {lang === 'es' ? 'Información de contacto' : 'Contact information'}
                </h2>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <TiltCard key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-accent-500 text-white flex items-center justify-center">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-2">{info.title}</h3>
                          {info.link ? (
                            <a
                              href={info.link}
                              className="text-xl text-primary-900 hover:text-accent-600 transition-colors font-medium"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-xl text-primary-900 font-medium">{info.value}</p>
                          )}
                        </div>
                      </div>
                    </TiltCard>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="bg-primary-900 text-white rounded-3xl p-10">
                  <h3 className="text-2xl font-bold mb-6">{lang === 'es' ? 'Síguenos en redes' : 'Follow us'}</h3>
                  <div className="flex gap-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        className="w-14 h-14 rounded-xl bg-white/10 hover:bg-accent-500 flex items-center justify-center text-2xl transition-all hover:scale-110"
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="bg-accent-50 rounded-3xl p-10 border-2 border-accent-200">
                  <h3 className="text-2xl font-bold text-primary-900 mb-4">⚡ {lang === 'es' ? 'Respuesta rápida' : 'Quick response'}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {lang === 'es'
                      ? 'Respondemos todos los mensajes en menos de 24 horas. Para consultas urgentes, llámanos directamente.'
                      : 'We respond to all messages in less than 24 hours. For urgent inquiries, call us directly.'}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </SectionContainer>

        {/* Map Section (Optional) */}
        <section className="py-24 bg-gray-50">
          <SectionContainer background="transparent" padding="sm">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-bold text-primary-900 mb-6">
                {lang === 'es' ? '¿Prefieres visitarnos?' : 'Prefer to visit us?'}
              </h2>
              <p className="text-xl text-gray-600">
                {lang === 'es'
                  ? 'Nuestra oficina está abierta de lunes a viernes, 9AM - 6PM'
                  : 'Our office is open Monday to Friday, 9AM - 6PM'}
              </p>
            </div>
            <div className="bg-gray-300 rounded-[3rem] h-[500px] flex items-center justify-center overflow-hidden">
              {/* Replace with actual map integration */}
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-600 mb-4">🗺️</p>
                <p className="text-gray-600 font-bold">Map Integration Here</p>
              </div>
            </div>
          </SectionContainer>
        </section>
      </main>
      <Footer />
    </>
  );
}
