"use client";

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
  labels?: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  onComplete?: () => void;
  className?: string;
}

export function CountdownTimer({ 
  targetDate, 
  labels = { days: 'Días', hours: 'Horas', minutes: 'Minutos', seconds: 'Segundos' },
  onComplete,
  className = ''
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (onComplete) onComplete();
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  return (
    <div className={`flex gap-4 md:gap-8 ${className}`}>
      {Object.entries(timeLeft).map(([key, value]) => (
        <div key={key} className="flex flex-col items-center">
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 min-w-[80px] md:min-w-[120px]">
            <div className="text-4xl md:text-6xl font-black text-primary-900">
              {value.toString().padStart(2, '0')}
            </div>
          </div>
          <div className="text-sm md:text-base font-bold text-gray-600 mt-3 uppercase tracking-wider">
            {labels[key as keyof typeof labels]}
          </div>
        </div>
      ))}
    </div>
  );
}
