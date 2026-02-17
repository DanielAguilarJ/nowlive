'use client';

import Link from 'next/link';
import { BlogPost } from '@/lib/admin-data';

interface PostsTableProps {
  posts: BlogPost[];
}

const statusStyles = {
  published: {
    label: 'Publicado',
    className: 'bg-success-500/20 text-success-400',
  },
  draft: {
    label: 'Borrador',
    className: 'bg-yellow-500/20 text-yellow-400',
  },
  scheduled: {
    label: 'Programado',
    className: 'bg-blue-500/20 text-blue-400',
  },
};

export default function PostsTable({ posts }: PostsTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left px-6 py-4 text-xs font-semibold text-primary-400 uppercase tracking-wider">
                Post
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-primary-400 uppercase tracking-wider">
                Categoría
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-primary-400 uppercase tracking-wider">
                Estado
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-primary-400 uppercase tracking-wider">
                Fecha
              </th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-primary-400 uppercase tracking-wider">
                Vistas
              </th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-primary-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-700 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="text-sm font-medium text-white hover:text-accent-400 transition-colors line-clamp-1"
                      >
                        {post.title}
                      </Link>
                      <p className="text-xs text-primary-400 line-clamp-1">{post.excerpt}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-primary-300">{post.category}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${statusStyles[post.status].className}`}>
                    {statusStyles[post.status].label}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-primary-300">
                    {post.publishedAt
                      ? formatDate(post.publishedAt)
                      : post.scheduledAt
                      ? formatDate(post.scheduledAt)
                      : formatDate(post.createdAt)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm text-primary-300">{post.views.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/posts/${post.id}`}
                      className="p-2 text-primary-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="p-2 text-primary-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      title="Ver"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                    <button
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
        <p className="text-sm text-primary-400">
          Mostrando <span className="font-medium text-white">1</span> a{' '}
          <span className="font-medium text-white">{posts.length}</span> de{' '}
          <span className="font-medium text-white">{posts.length}</span> posts
        </p>
        <div className="flex items-center gap-2">
          <button
            disabled
            className="px-3 py-1.5 text-sm text-primary-500 bg-white/5 rounded-lg cursor-not-allowed"
          >
            Anterior
          </button>
          <button
            disabled
            className="px-3 py-1.5 text-sm text-primary-500 bg-white/5 rounded-lg cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
