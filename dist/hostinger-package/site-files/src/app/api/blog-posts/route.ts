import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/blog-posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');
    const orderBy = searchParams.get('orderBy') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    const where = status ? { status } : {};

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { [orderBy]: order },
      take: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Error fetching blog posts' }, { status: 500 });
  }
}

// POST /api/blog-posts
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

    // Convert tags array to JSON string
    if (Array.isArray(body.tags)) {
      body.tags = JSON.stringify(body.tags);
    }

    const post = await prisma.blogPost.create({
      data: body,
    });

    // Create activity log
    await prisma.activity.create({
      data: {
        type: 'post',
        action: body.status === 'published' ? 'Post publicado' : 'Post creado',
        description: body.title,
        user: body.author,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Error creating blog post' }, { status: 500 });
  }
}
