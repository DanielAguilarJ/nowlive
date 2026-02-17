import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/case-studies
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

    const caseStudies = await prisma.caseStudy.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(caseStudies);
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return NextResponse.json({ error: 'Error fetching case studies' }, { status: 500 });
  }
}

// POST /api/case-studies
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Generate slug from title if not provided
    if (!body.slug) {
      body.slug = body.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    // Convert arrays to JSON strings
    if (Array.isArray(body.services)) {
      body.services = JSON.stringify(body.services);
    }
    if (Array.isArray(body.results)) {
      body.results = JSON.stringify(body.results);
    }
    if (Array.isArray(body.gallery)) {
      body.gallery = JSON.stringify(body.gallery);
    }

    const caseStudy = await prisma.caseStudy.create({
      data: body,
    });

    // Create activity log
    await prisma.activity.create({
      data: {
        type: 'case_study',
        action: body.status === 'published' ? 'Caso publicado' : 'Caso creado',
        description: body.title,
      },
    });

    return NextResponse.json(caseStudy, { status: 201 });
  } catch (error) {
    console.error('Error creating case study:', error);
    return NextResponse.json({ error: 'Error creating case study' }, { status: 500 });
  }
}
