'use client';

import { Activity } from '@/lib/admin-data';

interface ActivityFeedProps {
  activities: Activity[];
}

const activityIcons: Record<Activity['type'], { icon: string; bg: string }> = {
  contact: { icon: '📬', bg: 'bg-blue-500/20' },
  testimonial: { icon: '💬', bg: 'bg-purple-500/20' },
  post: { icon: '📝', bg: 'bg-success-500/20' },
  case_study: { icon: '🏆', bg: 'bg-orange-500/20' },
  user: { icon: '👤', bg: 'bg-accent-500/20' },
};

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Hace unos minutos';
    if (diffInHours < 24) return `Hace ${diffInHours}h`;
    if (diffInHours < 48) return 'Ayer';
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Actividad reciente</h3>
        <a href="/admin/activity" className="text-sm text-accent-400 hover:text-accent-300 transition-colors">
          Ver todo
        </a>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const { icon, bg } = activityIcons[activity.type];
          return (
            <div key={activity.id} className="flex gap-3">
              <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                <span className="text-lg">{icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{activity.action}</p>
                <p className="text-xs text-primary-400 truncate">{activity.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-primary-500">{formatDate(activity.timestamp)}</span>
                  {activity.user && (
                    <>
                      <span className="text-primary-600">•</span>
                      <span className="text-xs text-primary-500">{activity.user}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
