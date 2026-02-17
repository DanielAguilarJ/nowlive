"use client";

import { useLanguage } from '@/components/providers/LanguageProvider';

export function TrustBadges() {
  const { lang } = useLanguage();

  const badges = [
    { icon: '🏆', label: lang === 'es' ? 'Top Rated' : 'Top Rated' },
    { icon: '✓', label: lang === 'es' ? 'Verificado' : 'Verified' },
    { icon: '⚡', label: lang === 'es' ? 'Respuesta 24h' : '24h Response' }
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex items-center gap-2 bg-primary-50 px-4 py-2 rounded-full"
        >
          <span className="text-xl">{badge.icon}</span>
          <span className="text-sm font-bold text-primary-900">{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
