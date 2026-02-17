import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/blog-posts/:id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({ error: 'Error fetching blog post' }, { status: 500 });
  }
}

// PUT /api/blog-posts/:id
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Convert tags array to JSON string
    if (Array.isArray(body.tags)) {
      body.tags = JSON.stringify(body.tags);
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: body,
    });

    // Create activity log
    await prisma.activity.create({
      data: {
        type: 'post',
        action: 'Post actualizado',
        description: post.title,
        user: body.author,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ error: 'Error updating blog post' }, { status: 500 });
  }
}

// DELETE /api/blog-posts/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const post = await prisma.blogPost.delete({
      where: { id },
    });

    // Create activity log
    await prisma.activity.create({
      data: {
        type: 'post',
        action: 'Post eliminado',
        description: post.title,
      },
    });

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: 'Error deleting blog post' }, { status: 500 });
  }
}
