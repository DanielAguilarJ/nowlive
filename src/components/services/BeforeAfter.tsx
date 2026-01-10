"use client";

import { useState } from 'react';
import { ScrollReveal, Badge } from '@/components/ui';

interface ComparisonItem {
  label: string;
  before: string;
  after: string;
}

interface BeforeAfterProps {
  title?: string;
  subtitle?: string;
  items: ComparisonItem[];
  lang?: string;
}

export function BeforeAfter({ title, subtitle, items, lang = 'es' }: BeforeAfterProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {title && (
          <ScrollReveal className="text-center mb-16">
            <Badge className="mb-6 bg-accent-500 text-white">
              {lang === 'es' ? 'Transformación' : 'Transformation'}
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-primary-900 mb-6">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </ScrollReveal>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Before */}
          <ScrollReveal delay={0.1}>
            <div className="bg-white rounded-3xl p-8 border-2 border-red-100 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {lang === 'es' ? 'Antes' : 'Before'}
                </h3>
              </div>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      activeIndex === index
                        ? 'bg-red-50 border-2 border-red-200'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <p className="font-bold text-gray-900 mb-2">{item.label}</p>
                    <p className="text-gray-600 text-sm">{item.before}</p>
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* After */}
          <ScrollReveal delay={0.2}>
            <div className="bg-white rounded-3xl p-8 border-2 border-green-100 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {lang === 'es' ? 'Después' : 'After'}
                </h3>
              </div>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl transition-all ${
                      activeIndex === index
                        ? 'bg-green-50 border-2 border-green-200'
                        : 'bg-gray-50'
                    }`}
                  >
                    <p className="font-bold text-gray-900 mb-2">{item.label}</p>
                    <p className="text-gray-600 text-sm">{item.after}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
