'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/components/providers/LanguageProvider';

const WHATSAPP_NUMBER = '5214496355166';

function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function FloatingConversion() {
  const { lang } = useLanguage();
  const [showBubble, setShowBubble] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);

  useEffect(() => {
    const heroHeight = window.innerHeight * 0.6;
    const onScroll = () => {
      setShowStickyBar(window.scrollY > heroHeight);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (bubbleDismissed) return;
    const t = setTimeout(() => setShowBubble(true), 8000);
    return () => clearTimeout(t);
  }, [bubbleDismissed]);

  const whatsappMessage = lang === 'es'
    ? '¡Hola! Vi su web y quiero empezar a vender más. ¿Me cuentan más sobre los planes?'
    : 'Hi! I saw your site and want to start selling more. Can you tell me about your plans?';

  const whatsappHref = buildWhatsAppLink(whatsappMessage);

  const scrollToCTA = () => {
    const el = document.querySelector('#cta');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToOffer = () => {
    const el = document.querySelector('#offer');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        {/* Chat bubble preview */}
        {showBubble && !bubbleDismissed && (
          <div
            className="pointer-events-auto bg-white rounded-2xl rounded-br-sm shadow-2xl border border-gray-100 p-4 max-w-[260px] animate-bounce-in"
            style={{ animation: 'bounce-in 0.5s ease-out' }}
          >
            <button
              onClick={() => setBubbleDismissed(true)}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center text-xs shadow"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 mb-2">
              <div className="relative w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-white">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 ring-2 ring-white animate-pulse" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">CreamosTech</p>
                <p className="text-[10px] text-green-600">{lang === 'es' ? 'En línea ahora' : 'Online now'}</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-3 leading-snug">
              {lang === 'es'
                ? '👋 ¿Quieres vender 5x más este mes? Responde en menos de 60s.'
                : '👋 Want to sell 5x more this month? We reply in under 60s.'}
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-4 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-colors"
            >
              {lang === 'es' ? 'Escribir por WhatsApp' : 'Chat on WhatsApp'}
            </a>
          </div>
        )}

        {/* WhatsApp button */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto group relative w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-2xl flex items-center justify-center transition-all hover:scale-110"
          aria-label="WhatsApp"
        >
          <span className="absolute inset-0 rounded-full bg-green-400 opacity-75 animate-ping" />
          <svg className="relative w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>

      {/* Sticky bottom mobile bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-30 lg:hidden transition-transform duration-500 ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="bg-gradient-to-r from-primary-900 via-violet-900 to-primary-900 border-t-2 border-accent-400 shadow-2xl">
          <div className="flex items-stretch divide-x divide-white/10">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 text-white text-sm font-semibold hover:bg-white/5 active:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>WhatsApp</span>
            </a>
            <button
              onClick={scrollToOffer}
              className="flex-1 flex items-center justify-center gap-2 py-3 text-white text-sm font-semibold hover:bg-white/5 active:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{lang === 'es' ? 'Planes' : 'Plans'}</span>
            </button>
            <button
              onClick={scrollToCTA}
              className="flex-1 bg-gradient-to-r from-accent-500 to-violet-600 hover:from-accent-400 hover:to-violet-500 flex items-center justify-center gap-2 py-3 text-white text-sm font-bold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <span>{lang === 'es' ? 'Vender ya' : 'Sell now'}</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes bounce-in {
          0% { opacity: 0; transform: translateY(20px) scale(0.95); }
          60% { opacity: 1; transform: translateY(-4px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
