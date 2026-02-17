"use client";

import { ScrollReveal } from '@/components/ui';

interface Stat {
  value: string;
  label: string;
  icon?: string;
}

interface MetricsShowcaseProps {
  title?: string;
  subtitle?: string;
  stats: Stat[];
  variant?: 'default' | 'dark' | 'gradient';
}

export function MetricsShowcase({ 
  title, 
  subtitle, 
  stats, 
  variant = 'default' 
}: MetricsShowcaseProps) {
  const bgClass = {
    default: 'bg-white',
    dark: 'bg-primary-900 text-white',
    gradient: 'bg-gradient-to-br from-accent-500 to-primary-900 text-white'
  }[variant];

  const cardBgClass = {
    default: 'bg-gray-50 hover:bg-primary-50',
    dark: 'bg-white/10 hover:bg-white/20',
    gradient: 'bg-white/10 hover:bg-white/20'
  }[variant];

  return (
    <section className={`py-24 ${bgClass}`}>
      <div className="container mx-auto px-4 max-w-7xl">
        {title && (
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              {title}
            </h2>
            {subtitle && (
              <p className={`text-xl max-w-3xl mx-auto ${variant === 'default' ? 'text-gray-600' : 'opacity-90'}`}>
                {subtitle}
              </p>
            )}
          </ScrollReveal>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className={`${cardBgClass} rounded-2xl p-8 text-center transition-all duration-300 transform hover:scale-105`}>
                {stat.icon && (
                  <div className="text-4xl mb-4">{stat.icon}</div>
                )}
                <div className={`text-4xl md:text-5xl font-black mb-3 ${
                  variant === 'default' ? 'text-primary-900' : ''
                }`}>
                  {stat.value}
                </div>
                <div className={`text-sm font-bold uppercase tracking-wider ${
                  variant === 'default' ? 'text-gray-600' : 'opacity-80'
                }`}>
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
