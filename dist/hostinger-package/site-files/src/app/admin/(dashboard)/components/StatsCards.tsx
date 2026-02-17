'use client';

import { DashboardStats } from '@/lib/admin-data';

interface StatsCardsProps {
  stats: DashboardStats;
}

const statItems = [
  {
    key: 'totalVisits',
    label: 'Visitas totales',
    icon: EyeIcon,
    color: 'accent',
    format: (val: number) => val.toLocaleString(),
    change: '+12.5%',
    changeType: 'positive' as const,
  },
  {
    key: 'uniqueVisitors',
    label: 'Visitantes únicos',
    icon: UsersIcon,
    color: 'success',
    format: (val: number) => val.toLocaleString(),
    change: '+8.2%',
    changeType: 'positive' as const,
  },
  {
    key: 'conversionRate',
    label: 'Tasa de conversión',
    icon: ChartIcon,
    color: 'purple',
    format: (val: string) => val,
    change: '+0.4%',
    changeType: 'positive' as const,
  },
  {
    key: 'newContacts',
    label: 'Nuevos contactos',
    icon: InboxIcon,
    color: 'orange',
    format: (val: number) => val.toString(),
    change: '+3',
    changeType: 'positive' as const,
  },
];

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item) => {
        const value = stats[item.key as keyof DashboardStats];
        const colorClasses = {
          accent: 'from-accent-500 to-accent-600 shadow-accent-500/25',
          success: 'from-success-500 to-success-600 shadow-success-500/25',
          purple: 'from-purple-500 to-purple-600 shadow-purple-500/25',
          orange: 'from-orange-500 to-orange-600 shadow-orange-500/25',
        };

        return (
          <div
            key={item.key}
            className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6 hover:border-white/10 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[item.color as keyof typeof colorClasses]} shadow-lg flex items-center justify-center`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                item.changeType === 'positive' ? 'text-success-400' : 'text-red-400'
              }`}>
                {item.changeType === 'positive' ? (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
                {item.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-white">
                {item.format(value as never)}
              </p>
              <p className="text-sm text-primary-400 mt-1">{item.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Icons
function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  );
}

function InboxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}
