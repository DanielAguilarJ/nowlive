"use client";

import { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
  variant?: 'default' | 'bordered' | 'separated';
  className?: string;
}

export function Accordion({ 
  items, 
  allowMultiple = false, 
  defaultOpen = [],
  variant = 'default',
  className = '' 
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems(prev =>
        prev.includes(id)
          ? prev.filter(item => item !== id)
          : [...prev, id]
      );
    } else {
      setOpenItems(prev => (prev.includes(id) ? [] : [id]));
    }
  };

  const variantStyles = {
    default: {
      container: 'divide-y divide-gray-200',
      item: 'py-6',
    },
    bordered: {
      container: 'space-y-4',
      item: 'border-2 border-gray-200 rounded-2xl overflow-hidden',
    },
    separated: {
      container: 'space-y-6',
      item: 'bg-white rounded-2xl shadow-lg border border-gray-100',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className={`${styles.container} ${className}`}>
      {items.map((item, index) => {
        const isOpen = openItems.includes(item.id);
        
        return (
          <ScrollReveal key={item.id} delay={index * 0.05}>
            <div className={styles.item}>
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between gap-4 text-left p-6 hover:bg-gray-50 transition-colors rounded-2xl"
              >
                <div className="flex items-center gap-4 flex-1">
                  {item.icon && (
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      isOpen 
                        ? 'bg-accent-500 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {item.icon}
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-primary-900">
                    {item.title}
                  </h3>
                </div>
                
                <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-transform duration-300 ${
                  isOpen ? 'rotate-180 bg-accent-500' : ''
                }`}>
                  <svg 
                    className={`w-5 h-5 ${isOpen ? 'text-white' : 'text-gray-600'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 pt-2">
                  {item.content}
                </div>
              </div>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
