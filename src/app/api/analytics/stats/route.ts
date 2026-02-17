import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/analytics/stats
export async function GET() {
  try {
    // Get basic counts
    const [
      publishedPosts,
      draftPosts,
      pendingTestimonials,
      newMessages,
      totalAnalytics,
    ] = await Promise.all([
      prisma.blogPost.count({ where: { status: 'published' } }),
      prisma.blogPost.count({ where: { status: 'draft' } }),
      prisma.testimonial.count({ where: { status: 'pending' } }),
      prisma.contactMessage.count({ where: { status: 'new' } }),
      prisma.analytics.findMany({
        orderBy: { date: 'desc' },
        take: 30,
      }),
    ]);

    // Calculate aggregated stats from analytics
    const totalVisits = totalAnalytics.reduce((sum, day) => sum + day.visits, 0);
    const totalPageViews = totalAnalytics.reduce((sum, day) => sum + day.pageViews, 0);
    const totalConversions = totalAnalytics.reduce((sum, day) => sum + day.conversions, 0);

    // Calculate averages
    const avgSessionDuration = '3:24'; // This would come from actual tracking
    const bounceRate = '42.5%'; // This would come from actual tracking
    const conversionRate = totalVisits > 0 
      ? ((totalConversions / totalVisits) * 100).toFixed(1) + '%'
      : '0%';

    const stats = {
      totalVisits,
      uniqueVisitors: Math.floor(totalVisits * 0.71), // Estimate
      pageViews: totalPageViews,
      avgSessionDuration,
      bounceRate,
      conversionRate,
      newContacts: newMessages,
      pendingTestimonials,
      publishedPosts,
      draftPosts,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching analytics stats:', error);
    return NextResponse.json({ error: 'Error fetching analytics stats' }, { status: 500 });
  }
}
