import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/analytics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const limit = searchParams.get('limit');

    const where: {
      date?: {
        gte: Date;
        lte: Date;
      };
    } = {};
    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const analytics = await prisma.analytics.findMany({
      where,
      orderBy: { date: 'desc' },
      take: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Error fetching analytics' }, { status: 500 });
  }
}

// POST /api/analytics
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if analytics for this date already exists
    const existing = await prisma.analytics.findUnique({
      where: { date: new Date(body.date) },
    });

    let analytics;
    if (existing) {
      // Update existing
      analytics = await prisma.analytics.update({
        where: { date: new Date(body.date) },
        data: {
          visits: body.visits,
          pageViews: body.pageViews,
          conversions: body.conversions,
        },
      });
    } else {
      // Create new
      analytics = await prisma.analytics.create({
        data: {
          date: new Date(body.date),
          visits: body.visits,
          pageViews: body.pageViews,
          conversions: body.conversions,
        },
      });
    }

    return NextResponse.json(analytics, { status: existing ? 200 : 201 });
  } catch (error) {
    console.error('Error creating/updating analytics:', error);
    return NextResponse.json({ error: 'Error creating/updating analytics' }, { status: 500 });
  }
}
