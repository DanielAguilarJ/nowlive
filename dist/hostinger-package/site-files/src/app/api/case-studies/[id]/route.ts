import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/case-studies/:id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id },
    });

    if (!caseStudy) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
    }

    return NextResponse.json(caseStudy);
  } catch (error) {
    console.error('Error fetching case study:', error);
    return NextResponse.json({ error: 'Error fetching case study' }, { status: 500 });
  }
}

// PUT /api/case-studies/:id
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

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

    const caseStudy = await prisma.caseStudy.update({
      where: { id },
      data: body,
    });

    // Create activity log
    await prisma.activity.create({
      data: {
        type: 'case_study',
        action: 'Caso actualizado',
        description: caseStudy.title,
      },
    });

    return NextResponse.json(caseStudy);
  } catch (error) {
    console.error('Error updating case study:', error);
    return NextResponse.json({ error: 'Error updating case study' }, { status: 500 });
  }
}

// DELETE /api/case-studies/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const caseStudy = await prisma.caseStudy.delete({
      where: { id },
    });

    // Create activity log
    await prisma.activity.create({
      data: {
        type: 'case_study',
        action: 'Caso eliminado',
        description: caseStudy.title,
      },
    });

    return NextResponse.json({ message: 'Case study deleted successfully' });
  } catch (error) {
    console.error('Error deleting case study:', error);
    return NextResponse.json({ error: 'Error deleting case study' }, { status: 500 });
  }
}
