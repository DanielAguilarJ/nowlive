'use client';

import { AnalyticsData } from '@/lib/admin-data';

interface AnalyticsChartProps {
  data: AnalyticsData[];
}

export default function AnalyticsChart({ data }: AnalyticsChartProps) {
  const maxVisits = Math.max(...data.map(d => d.pageViews));
  const totalVisits = data.reduce((sum, d) => sum + d.visits, 0);
  const totalPageViews = data.reduce((sum, d) => sum + d.pageViews, 0);
  const totalConversions = data.reduce((sum, d) => sum + d.conversions, 0);

  return (
    <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h3 className="text-lg font-semibold text-white">Resumen de analytics</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent-500" />
            <span className="text-primary-300">Visitas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success-500" />
            <span className="text-primary-300">Páginas vistas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-primary-300">Conversiones</span>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white/5 rounded-lg">
          <p className="text-2xl font-bold text-white">{totalVisits.toLocaleString()}</p>
          <p className="text-xs text-primary-400">Visitas (7 días)</p>
        </div>
        <div className="p-4 bg-white/5 rounded-lg">
          <p className="text-2xl font-bold text-white">{totalPageViews.toLocaleString()}</p>
          <p className="text-xs text-primary-400">Páginas vistas</p>
        </div>
        <div className="p-4 bg-white/5 rounded-lg">
          <p className="text-2xl font-bold text-white">{totalConversions}</p>
          <p className="text-xs text-primary-400">Conversiones</p>
        </div>
      </div>

      {/* Simple bar chart */}
      <div className="relative h-48">
        <div className="absolute inset-0 flex items-end justify-between gap-2">
          {data.map((day, index) => {
            const height = (day.pageViews / maxVisits) * 100;
            const visitsHeight = (day.visits / maxVisits) * 100;
            const date = new Date(day.date);
            const dayName = date.toLocaleDateString('es-ES', { weekday: 'short' });

            return (
              <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                <div className="relative w-full h-40 flex items-end justify-center gap-0.5">
                  {/* Page views bar */}
                  <div
                    className="w-1/3 bg-gradient-to-t from-success-600 to-success-400 rounded-t-sm transition-all duration-500 ease-out"
                    style={{
                      height: `${height}%`,
                      animationDelay: `${index * 100}ms`,
                    }}
                  />
                  {/* Visits bar */}
                  <div
                    className="w-1/3 bg-gradient-to-t from-accent-600 to-accent-400 rounded-t-sm transition-all duration-500 ease-out"
                    style={{
                      height: `${visitsHeight}%`,
                      animationDelay: `${index * 100}ms`,
                    }}
                  />
                </div>
                <span className="text-xs text-primary-400 capitalize">{dayName}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
