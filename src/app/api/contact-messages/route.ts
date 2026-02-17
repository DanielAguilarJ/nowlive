import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/contact-messages
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const where = status ? { status } : {};

    const messages = await prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json({ error: 'Error fetching contact messages' }, { status: 500 });
  }
}

// POST /api/contact-messages
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const message = await prisma.contactMessage.create({
      data: body,
    });

    // Create activity log
    await prisma.activity.create({
      data: {
        type: 'contact',
        action: 'Nuevo mensaje',
        description: `${body.name} - ${body.subject}`,
      },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error('Error creating contact message:', error);
    return NextResponse.json({ error: 'Error creating contact message' }, { status: 500 });
  }
}
