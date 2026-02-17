import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/contact-messages/:id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const message = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    // Update status to 'read' if it's 'new'
    if (message.status === 'new') {
      await prisma.contactMessage.update({
        where: { id },
        data: { status: 'read' },
      });
    }

    return NextResponse.json(message);
  } catch (error) {
    console.error('Error fetching contact message:', error);
    return NextResponse.json({ error: 'Error fetching contact message' }, { status: 500 });
  }
}

// PUT /api/contact-messages/:id
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const message = await prisma.contactMessage.update({
      where: { id },
      data: body,
    });

    // Create activity log
    await prisma.activity.create({
      data: {
        type: 'contact',
        action: body.status === 'replied' ? 'Mensaje respondido' : 'Mensaje actualizado',
        description: `${message.name} - ${message.subject}`,
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error('Error updating contact message:', error);
    return NextResponse.json({ error: 'Error updating contact message' }, { status: 500 });
  }
}

// DELETE /api/contact-messages/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.contactMessage.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact message:', error);
    return NextResponse.json({ error: 'Error deleting contact message' }, { status: 500 });
  }
}
