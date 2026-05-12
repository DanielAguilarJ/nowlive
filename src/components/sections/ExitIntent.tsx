'use client';

import { useEffect, useState, useCallback, FormEvent } from 'react';
import { useLanguage } from '@/components/providers/LanguageProvider';

const STORAGE_KEY = 'creamostech_exit_intent_seen';

export function ExitIntent() {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const trigger = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    sessionStorage.setItem(STORAGE_KEY, '1');
    setOpen(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    let scrollTimeout: number | null = null;
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      if (delta < -30 && window.scrollY > window.innerHeight) {
        if (scrollTimeout) window.clearTimeout(scrollTimeout);
        scrollTimeout = window.setTimeout(trigger, 200);
      }
    };

    if (isMobile) {
      window.addEventListener('scroll', onScroll, { passive: true });
    } else {
      document.addEventListener('mouseleave', onMouseLeave);
    }

    const fallbackTimer = window.setTimeout(trigger, 45000);

    return () => {
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(fallbackTimer);
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
    };
  }, [trigger]);

  const close = () => setOpen(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(close, 2500);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={close}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top gradient bar */}
        <div
          className="h-2 w-full"
          style={{ background: 'linear-gradient(90deg, #ef4444, #f59e0b, #ec4899, #8b5cf6)' }}
        />

        <button
          onClick={close}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 sm:p-10">
          {!submitted ? (
            <>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
                  {lang === 'es' ? 'Espera' : 'Wait'}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
                  {lang === 'es' ? 'Solo hoy' : 'Today only'}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-3">
                {lang === 'es'
                  ? '¿Te vas sin tu auditoría gratis de $4,900 MXN?'
                  : 'Leaving without your free $290 USD audit?'}
              </h3>

              <p className="text-gray-600 mb-6">
                {lang === 'es'
                  ? 'Te enviamos un análisis de tu web + plan accionable de 7 días para multiplicar tus ventas. Solo te toma 20 segundos.'
                  : 'We send you a website analysis + 7-day action plan to multiply your sales. Takes 20 seconds.'}
              </p>

              <ul className="space-y-2 mb-6">
                {[
                  lang === 'es' ? '3 mejoras de conversión inmediata' : '3 instant conversion fixes',
                  lang === 'es' ? 'Plan de 7 días para acelerar ventas' : '7-day sales acceleration plan',
                  lang === 'es' ? 'Comparativa con tus competidores' : 'Competitor benchmark',
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {t}
                  </li>
                ))}
              </ul>

              <form onSubmit={onSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={lang === 'es' ? 'tu@email.com' : 'your@email.com'}
                  className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-accent-500 transition-colors text-gray-900"
                />
                <button
                  type="submit"
                  className="px-6 py-4 rounded-xl bg-gradient-to-r from-red-500 via-pink-500 to-violet-500 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  {lang === 'es' ? 'Quiero mi auditoría gratis' : 'Send me my free audit'}
                </button>
              </form>

              <p className="text-xs text-gray-400 text-center mt-3">
                {lang === 'es'
                  ? 'Sin spam. Cancela cuando quieras. 100% confidencial.'
                  : 'No spam. Unsubscribe anytime. 100% confidential.'}
              </p>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                {lang === 'es' ? '¡Listo! Revisa tu email.' : 'Done! Check your inbox.'}
              </h3>
              <p className="text-gray-600">
                {lang === 'es'
                  ? 'En menos de 24h te llega tu auditoría personalizada.'
                  : 'Your custom audit arrives in under 24h.'}
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
