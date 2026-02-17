import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import PostsTable from './PostsTable';

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>;
}) {
  const params = await searchParams;

  // Fetch posts from database
  const where = params.status ? { status: params.status } : {};
  const posts = await prisma.blogPost.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  // Parse JSON strings back to arrays
  const parsedPosts = posts.map(post => ({
    ...post,
    tags: JSON.parse(post.tags as string),
    publishedAt: post.publishedAt?.toISOString(),
    scheduledAt: post.scheduledAt?.toISOString(),
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    status: post.status as 'published' | 'draft' | 'scheduled',
  }));

  // Get counts for filters
  const totalCount = await prisma.blogPost.count();
  const publishedCount = await prisma.blogPost.count({ where: { status: 'published' } });
  const draftCount = await prisma.blogPost.count({ where: { status: 'draft' } });
  const scheduledCount = await prisma.blogPost.count({ where: { status: 'scheduled' } });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-primary-400 mt-1">Gestiona los artículos del blog</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold rounded-lg shadow-lg shadow-accent-500/25 transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 p-1 bg-primary-800/50 rounded-lg">
          <FilterButton href="/admin/posts" label="Todos" count={totalCount} />
          <FilterButton
            href="/admin/posts?status=published"
            label="Publicados"
            count={publishedCount}
          />
          <FilterButton
            href="/admin/posts?status=draft"
            label="Borradores"
            count={draftCount}
          />
          <FilterButton
            href="/admin/posts?status=scheduled"
            label="Programados"
            count={scheduledCount}
          />
        </div>

        <div className="flex-1" />

        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            placeholder="Buscar posts..."
            className="w-64 pl-10 pr-4 py-2 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Posts table */}
      <PostsTable posts={parsedPosts} />
    </div>
  );
}

function FilterButton({
  href,
  label,
  count,
}: {
  href: string;
  label: string;
  count: number;
}) {
  return (
    <Link
      href={href}
      className="px-3 py-1.5 text-sm text-primary-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
    >
      {label}
      <span className="ml-1.5 text-xs text-primary-500">({count})</span>
    </Link>
  );
}
