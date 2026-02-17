'use client';

import { DashboardStats, AnalyticsData, TrafficSource, TopPage } from '@/lib/admin-data';

interface AnalyticsOverviewProps {
  stats: DashboardStats;
  analyticsData: AnalyticsData[];
  trafficSources: TrafficSource[];
  topPages: TopPage[];
}

export default function AnalyticsOverview({
  stats,
  analyticsData,
  trafficSources,
  topPages,
}: AnalyticsOverviewProps) {
  const maxPageViews = Math.max(...analyticsData.map((d) => d.pageViews));

  return (
    <div className="space-y-6">
      {/* Key metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Visitas totales"
          value={stats.totalVisits.toLocaleString()}
          change="+12.5%"
          trend="up"
          icon={<EyeIcon />}
        />
        <MetricCard
          label="Visitantes únicos"
          value={stats.uniqueVisitors.toLocaleString()}
          change="+8.2%"
          trend="up"
          icon={<UsersIcon />}
        />
        <MetricCard
          label="Páginas vistas"
          value={stats.pageViews.toLocaleString()}
          change="+15.3%"
          trend="up"
          icon={<PagesIcon />}
        />
        <MetricCard
          label="Tasa de rebote"
          value={stats.bounceRate}
          change="-2.1%"
          trend="down"
          icon={<BounceIcon />}
        />
      </div>

      {/* Additional metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <h3 className="text-sm font-medium text-primary-400 mb-2">Duración media de sesión</h3>
          <p className="text-3xl font-bold text-white">{stats.avgSessionDuration}</p>
          <p className="text-sm text-success-400 mt-2">+0:45 vs período anterior</p>
        </div>
        <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <h3 className="text-sm font-medium text-primary-400 mb-2">Tasa de conversión</h3>
          <p className="text-3xl font-bold text-white">{stats.conversionRate}</p>
          <p className="text-sm text-success-400 mt-2">+0.4% vs período anterior</p>
        </div>
        <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <h3 className="text-sm font-medium text-primary-400 mb-2">Páginas por sesión</h3>
          <p className="text-3xl font-bold text-white">3.87</p>
          <p className="text-sm text-success-400 mt-2">+0.32 vs período anterior</p>
        </div>
      </div>

      {/* Traffic chart */}
      <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Tráfico del sitio</h3>
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

        {/* Chart */}
        <div className="h-64 relative">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-primary-500">
            <span>{maxPageViews.toLocaleString()}</span>
            <span>{Math.round(maxPageViews * 0.75).toLocaleString()}</span>
            <span>{Math.round(maxPageViews * 0.5).toLocaleString()}</span>
            <span>{Math.round(maxPageViews * 0.25).toLocaleString()}</span>
            <span>0</span>
          </div>

          {/* Grid lines */}
          <div className="absolute left-14 right-0 top-0 bottom-8 flex flex-col justify-between">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="border-t border-white/5" />
            ))}
          </div>

          {/* Bars */}
          <div className="absolute left-14 right-0 top-0 bottom-8 flex items-end justify-between gap-2 px-2">
            {analyticsData.map((day) => {
              const pageViewsHeight = (day.pageViews / maxPageViews) * 100;
              const visitsHeight = (day.visits / maxPageViews) * 100;
              const conversionsHeight = (day.conversions / maxPageViews) * 200; // Scale up for visibility
              const date = new Date(day.date);
              const dayName = date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' });

              return (
                <div key={day.date} className="flex-1 flex flex-col items-center">
                  <div className="w-full h-full flex items-end justify-center gap-1 mb-2">
                    <div
                      className="w-1/4 bg-gradient-to-t from-success-600 to-success-400 rounded-t-sm"
                      style={{ height: `${pageViewsHeight}%` }}
                      title={`Páginas vistas: ${day.pageViews}`}
                    />
                    <div
                      className="w-1/4 bg-gradient-to-t from-accent-600 to-accent-400 rounded-t-sm"
                      style={{ height: `${visitsHeight}%` }}
                      title={`Visitas: ${day.visits}`}
                    />
                    <div
                      className="w-1/4 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-sm"
                      style={{ height: `${Math.min(conversionsHeight, 100)}%` }}
                      title={`Conversiones: ${day.conversions}`}
                    />
                  </div>
                  <span className="text-xs text-primary-400 capitalize whitespace-nowrap">{dayName}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic sources */}
        <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Fuentes de tráfico</h3>
          <div className="space-y-4">
            {trafficSources.map((source, index) => {
              const colors = ['bg-accent-500', 'bg-success-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500'];
              return (
                <div key={source.source}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-primary-300">{source.source}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white font-medium">
                        {source.visits.toLocaleString()}
                      </span>
                      <span className="text-xs text-primary-400">({source.percentage}%)</span>
                      {source.trend === 'up' && (
                        <svg className="w-4 h-4 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                      )}
                      {source.trend === 'down' && (
                        <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colors[index]} rounded-full transition-all duration-500`}
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top pages */}
        <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Páginas más visitadas</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left pb-3 text-xs font-semibold text-primary-400 uppercase">Página</th>
                  <th className="text-right pb-3 text-xs font-semibold text-primary-400 uppercase">Vistas</th>
                  <th className="text-right pb-3 text-xs font-semibold text-primary-400 uppercase">Tiempo</th>
                  <th className="text-right pb-3 text-xs font-semibold text-primary-400 uppercase">Rebote</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {topPages.map((page) => (
                  <tr key={page.page}>
                    <td className="py-3">
                      <span className="text-sm text-primary-300 truncate block max-w-[200px]">
                        {page.page}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <span className="text-sm text-white font-medium">{page.views.toLocaleString()}</span>
                    </td>
                    <td className="py-3 text-right">
                      <span className="text-sm text-primary-300">{page.avgTime}</span>
                    </td>
                    <td className="py-3 text-right">
                      <span className="text-sm text-primary-300">{page.bounceRate}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  change,
  trend,
  icon,
}: {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-accent-500/20 flex items-center justify-center">
          {icon}
        </div>
        <span className={`text-xs font-medium ${trend === 'up' ? 'text-success-400' : 'text-red-400'}`}>
          {change}
        </span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-primary-400 mt-1">{label}</p>
    </div>
  );
}

// Icons
function EyeIcon() {
  return (
    <svg className="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg className="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function PagesIcon() {
  return (
    <svg className="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function BounceIcon() {
  return (
    <svg className="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
    </svg>
  );
}
