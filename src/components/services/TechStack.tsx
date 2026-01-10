"use client";

import { useState } from 'react';
import { ScrollReveal, Badge } from '@/components/ui';

interface TechItem {
  name: string;
  icon?: string;
  description?: string;
  category: string;
}

interface TechStackProps {
  title?: string;
  subtitle?: string;
  technologies: TechItem[];
  lang?: string;
}

export function TechStack({ title, subtitle, technologies, lang = 'es' }: TechStackProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(technologies.map(t => t.category)))];
  
  const filteredTech = selectedCategory === 'all' 
    ? technologies 
    : technologies.filter(t => t.category === selectedCategory);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {title && (
          <ScrollReveal className="text-center mb-16">
            <Badge className="mb-6 bg-primary-900 text-white">
              {lang === 'es' ? 'Tecnología' : 'Technology'}
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

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all ${
                selectedCategory === category
                  ? 'bg-primary-900 text-white'
                  : 'bg-white text-gray-600 hover:bg-primary-100'
              }`}
            >
              {category === 'all' ? (lang === 'es' ? 'Todas' : 'All') : category}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTech.map((tech, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <div className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group">
                {tech.icon && (
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                    {tech.icon}
                  </div>
                )}
                <h3 className="font-bold text-primary-900 mb-2">{tech.name}</h3>
                {tech.description && (
                  <p className="text-sm text-gray-600">{tech.description}</p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
