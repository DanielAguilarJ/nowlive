"use client";

import { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  variant?: 'default' | 'pills' | 'underline';
  className?: string;
}

export function Tabs({ tabs, defaultTab, variant = 'default', className = '' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const variantStyles = {
    default: {
      container: 'border-b border-gray-200',
      button: (isActive: boolean) =>
        `px-6 py-3 font-bold text-sm uppercase tracking-wider transition-all ${
          isActive
            ? 'text-primary-900 border-b-2 border-primary-900'
            : 'text-gray-600 hover:text-primary-900'
        }`,
    },
    pills: {
      container: 'bg-gray-100 rounded-full p-1',
      button: (isActive: boolean) =>
        `px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all ${
          isActive
            ? 'bg-primary-900 text-white shadow-lg'
            : 'text-gray-600 hover:bg-gray-200'
        }`,
    },
    underline: {
      container: 'space-x-8 border-b-2 border-gray-100',
      button: (isActive: boolean) =>
        `px-4 py-4 font-bold relative transition-all ${
          isActive
            ? 'text-primary-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-accent-500'
            : 'text-gray-600 hover:text-primary-900'
        }`,
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className={className}>
      {/* Tab Headers */}
      <div className={`flex flex-wrap gap-2 mb-8 ${styles.container}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={styles.button(activeTab === tab.id)}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${activeTab === tab.id ? 'block' : 'hidden'}`}
          >
            <ScrollReveal>{tab.content}</ScrollReveal>
          </div>
        ))}
      </div>
    </div>
  );
}
