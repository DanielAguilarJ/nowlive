import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/testimonials/:id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    return NextResponse.json({ error: 'Error fetching testimonial' }, { status: 500 });
  }
}

// PUT /api/testimonials/:id
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: body,
    });

    // Create activity log
    await prisma.activity.create({
      data: {
        type: 'testimonial',
        action: `Testimonio ${body.status === 'approved' ? 'aprobado' : 'actualizado'}`,
        description: `${testimonial.name} de ${testimonial.company}`,
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ error: 'Error updating testimonial' }, { status: 500 });
  }
}

// DELETE /api/testimonials/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const testimonial = await prisma.testimonial.delete({
      where: { id },
    });

    // Create activity log
    await prisma.activity.create({
      data: {
        type: 'testimonial',
        action: 'Testimonio eliminado',
        description: `${testimonial.name} de ${testimonial.company}`,
      },
    });

    return NextResponse.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ error: 'Error deleting testimonial' }, { status: 500 });
  }
}
