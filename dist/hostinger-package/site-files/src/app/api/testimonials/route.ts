import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/testimonials
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const featured = searchParams.get('featured');

    const where: {
      status?: string;
      featured?: boolean;
    } = {};
    if (status) where.status = status;
    if (featured !== null) where.featured = featured === 'true';

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Error fetching testimonials' }, { status: 500 });
  }
}

// POST /api/testimonials
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const testimonial = await prisma.testimonial.create({
      data: body,
    });

    // Create activity log
    await prisma.activity.create({
      data: {
        type: 'testimonial',
        action: 'Testimonio creado',
        description: `${body.name} de ${body.company}`,
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Error creating testimonial' }, { status: 500 });
  }
}
