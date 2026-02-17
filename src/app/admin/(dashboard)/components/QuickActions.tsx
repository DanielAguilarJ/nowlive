import Link from 'next/link';

interface QuickActionsProps {
  pendingMessages: number;
  pendingTestimonials: number;
  draftPosts: number;
}

export default function QuickActions({
  pendingMessages,
  pendingTestimonials,
  draftPosts,
}: QuickActionsProps) {
  const actions = [
    {
      href: '/admin/posts/new',
      label: 'Nuevo post',
      icon: '✍️',
      color: 'from-accent-500 to-accent-600',
    },
    {
      href: '/admin/messages',
      label: 'Ver mensajes',
      icon: '📬',
      color: 'from-blue-500 to-blue-600',
      badge: pendingMessages > 0 ? pendingMessages : undefined,
    },
    {
      href: '/admin/testimonials',
      label: 'Testimonios pendientes',
      icon: '💬',
      color: 'from-purple-500 to-purple-600',
      badge: pendingTestimonials > 0 ? pendingTestimonials : undefined,
    },
    {
      href: '/admin/posts?status=draft',
      label: 'Borradores',
      icon: '📝',
      color: 'from-orange-500 to-orange-600',
      badge: draftPosts > 0 ? draftPosts : undefined,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {actions.map((action) => (
        <Link
          key={action.href}
          href={action.href}
          className="relative group flex items-center gap-3 p-4 bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 hover:border-white/10 transition-all"
        >
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg`}>
            <span className="text-lg">{action.icon}</span>
          </div>
          <span className="text-sm font-medium text-white group-hover:text-accent-300 transition-colors">
            {action.label}
          </span>
          {action.badge && (
            <span className="absolute top-2 right-2 inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-accent-500 text-xs font-semibold text-white">
              {action.badge}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
