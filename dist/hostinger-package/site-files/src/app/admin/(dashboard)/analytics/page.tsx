import { prisma } from '@/lib/prisma';
import AnalyticsOverview from './AnalyticsOverview';

export default async function AnalyticsPage() {
  // Fetch analytics data
  const [
    analyticsData,
    totalAnalytics,
    publishedPosts,
    draftPosts,
    pendingTestimonials,
    newMessages,
  ] = await Promise.all([
    prisma.analytics.findMany({
      orderBy: { date: 'desc' },
      take: 7,
    }),
    prisma.analytics.findMany({
      orderBy: { date: 'desc' },
      take: 30,
    }),
    prisma.blogPost.count({ where: { status: 'published' } }),
    prisma.blogPost.count({ where: { status: 'draft' } }),
    prisma.testimonial.count({ where: { status: 'pending' } }),
    prisma.contactMessage.count({ where: { status: 'new' } }),
  ]);

  // Parse analytics data
  const parsedAnalyticsData = analyticsData.map(a => ({
    date: a.date.toISOString().split('T')[0],
    visits: a.visits,
    pageViews: a.pageViews,
    conversions: a.conversions,
  }));

  // Calculate stats
  const totalVisits = totalAnalytics.reduce((sum, day) => sum + day.visits, 0);
  const totalPageViews = totalAnalytics.reduce((sum, day) => sum + day.pageViews, 0);
  const totalConversions = totalAnalytics.reduce((sum, day) => sum + day.conversions, 0);
  const conversionRate = totalVisits > 0 ? ((totalConversions / totalVisits) * 100).toFixed(1) + '%' : '0%';

  const stats = {
    totalVisits,
    uniqueVisitors: Math.floor(totalVisits * 0.71),
    pageViews: totalPageViews,
    avgSessionDuration: '3:24',
    bounceRate: '42.5%',
    conversionRate,
    newContacts: newMessages,
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
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-primary-400 mt-1">Analiza el rendimiento de tu sitio web</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="px-4 py-2 bg-primary-800/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-500">
            <option>Últimos 7 días</option>
            <option>Últimos 30 días</option>
            <option>Últimos 90 días</option>
            <option>Este año</option>
          </select>
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm">
            Exportar
          </button>
        </div>
      </div>

      <AnalyticsOverview
        stats={stats}
        analyticsData={parsedAnalyticsData}
        trafficSources={mockTrafficSources}
        topPages={mockTopPages}
      />
    </div>
  );
}
