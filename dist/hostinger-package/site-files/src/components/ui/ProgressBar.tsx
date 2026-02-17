"use client";

import { useState, useEffect } from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  color = 'primary',
  size = 'md',
  animated = true,
  className = ''
}: ProgressBarProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const percentage = Math.min((value / max) * 100, 100);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayValue(percentage);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayValue(percentage);
    }
  }, [percentage, animated]);

  const colorClasses = {
    primary: 'bg-primary-900',
    accent: 'bg-accent-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  };

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6'
  };

  return (
    <div className={className}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-bold text-gray-700">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm font-bold text-gray-900">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${displayValue}%` }}
        >
          {size === 'lg' && (
            <div className="h-full w-full bg-gradient-to-r from-transparent to-white/20" />
          )}
        </div>
      </div>
    </div>
  );
}

interface SkillBarProps {
  skills: Array<{
    name: string;
    level: number;
    color?: 'primary' | 'accent' | 'success' | 'warning' | 'error';
  }>;
  className?: string;
}

export function SkillBars({ skills, className = '' }: SkillBarProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {skills.map((skill, index) => (
        <ProgressBar
          key={index}
          label={skill.name}
          value={skill.level}
          color={skill.color || 'primary'}
          size="md"
          animated
        />
      ))}
    </div>
  );
}
