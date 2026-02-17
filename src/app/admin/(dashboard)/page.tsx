import { prisma } from '@/lib/prisma';
import StatsCards from './components/StatsCards';
import ActivityFeed from './components/ActivityFeed';
import AnalyticsChart from './components/AnalyticsChart';
import QuickActions from './components/QuickActions';

export default async function AdminDashboard() {
  // Fetch all data in parallel
  const [
    activities,
    analyticsData,
    pendingMessages,
    pendingTestimonials,
    draftPosts,
    totalAnalytics,
    publishedPosts,
  ] = await Promise.all([
    prisma.activity.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
    prisma.analytics.findMany({
      orderBy: { date: 'desc' },
      take: 7,
    }),
    prisma.contactMessage.count({ where: { status: 'new' } }),
    prisma.testimonial.count({ where: { status: 'pending' } }),
    prisma.blogPost.count({ where: { status: 'draft' } }),
    prisma.analytics.findMany({
      orderBy: { date: 'desc' },
      take: 30,
    }),
    prisma.blogPost.count({ where: { status: 'published' } }),
  ]);

  // Parse activities
  const parsedActivities = activities.map(a => ({
    ...a,
    timestamp: a.createdAt.toISOString(),
    user: a.user ?? 'Unknown User',
    type: a.type as 'user' | 'testimonial' | 'contact' | 'post' | 'case_study',
  }));

  // Parse analytics data
  const parsedAnalyticsData = analyticsData.map(a => ({
    date: a.date.toISOString().split('T')[0],
    visits: a.visits,
    pageViews: a.pageViews,
    conversions: a.conversions,
  }));

  // Calculate dashboard stats
  const totalVisits = totalAnalytics.reduce((sum, day) => sum + day.visits, 0);
  const totalPageViews = totalAnalytics.reduce((sum, day) => sum + day.pageViews, 0);
  const totalConversions = totalAnalytics.reduce((sum, day) => sum + day.conversions, 0);
  const conversionRate = totalVisits > 0 ? ((totalConversions / totalVisits) * 100).toFixed(1) + '%' : '0%';

  const dashboardStats = {
    totalVisits,
    uniqueVisitors: Math.floor(totalVisits * 0.71),
    pageViews: totalPageViews,
    avgSessionDuration: '3:24',
    bounceRate: '42.5%',
    conversionRate,
    newContacts: pendingMessages,
    pendingTestimonials,
    publishedPosts,
    draftPosts,
  };

  // Mock data for traffic sources and top pages (would come from actual tracking)
  const mockTrafficSources = [
    { source: 'Google Organic', visits: Math.floor(totalVisits * 0.399), percentage: 39.9, trend: 'up' as const },
    { source: 'Direct', visits: Math.floor(totalVisits * 0.273), percentage: 27.3, trend: 'stable' as const },
    { source: 'Social Media', visits: Math.floor(totalVisits * 0.180), percentage: 18.0, trend: 'up' as const },
    { source: 'Referral', visits: Math.floor(totalVisits * 0.100), percentage: 10.0, trend: 'down' as const },
    { source: 'Email', visits: Math.floor(totalVisits * 0.048), percentage: 4.8, trend: 'up' as const },
  ];

  const mockTopPages = [
    { page: '/', views: Math.floor(totalPageViews * 0.25), avgTime: '2:45', bounceRate: '38%' },
    { page: '/services/web-design', views: Math.floor(totalPageViews * 0.13), avgTime: '3:12', bounceRate: '42%' },
    { page: '/contact', views: Math.floor(totalPageViews * 0.11), avgTime: '4:30', bounceRate: '25%' },
    { page: '/blog', views: Math.floor(totalPageViews * 0.09), avgTime: '5:15', bounceRate: '35%' },
    { page: '/casos-de-exito', views: Math.floor(totalPageViews * 0.07), avgTime: '3:45', bounceRate: '40%' },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-primary-400 mt-1">Bienvenido de vuelta. Aquí está el resumen de tu sitio.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-primary-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Última actualización: {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats cards */}
      <StatsCards stats={dashboardStats} />

      {/* Quick actions */}
      <QuickActions
        pendingMessages={pendingMessages}
        pendingTestimonials={pendingTestimonials}
        draftPosts={draftPosts}
      />

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics chart - takes 2 columns */}
        <div className="lg:col-span-2">
          <AnalyticsChart data={parsedAnalyticsData} />
        </div>

        {/* Activity feed */}
        <div className="lg:col-span-1">
          <ActivityFeed activities={parsedActivities} />
        </div>
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic sources */}
        <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Fuentes de tráfico</h3>
          <div className="space-y-4">
            {mockTrafficSources.map((source) => (
              <div key={source.source} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent-500" />
                  <span className="text-sm text-primary-300">{source.source}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-white font-medium">{source.visits.toLocaleString()}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-primary-400">{source.percentage}%</span>
                    {source.trend === 'up' && (
                      <svg className="h-4 w-4 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    )}
                    {source.trend === 'down' && (
                      <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top pages */}
        <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Páginas más visitadas</h3>
          <div className="space-y-4">
            {mockTopPages.map((page, index) => (
              <div key={page.page} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent-500/20 text-accent-400 text-xs font-medium flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-sm text-primary-300 truncate max-w-[200px]">{page.page}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-white font-medium">{page.views.toLocaleString()}</span>
                  <span className="text-xs text-primary-400 hidden sm:block">{page.avgTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
