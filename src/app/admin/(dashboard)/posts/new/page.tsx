import Link from 'next/link';
import PostEditor from './PostEditor';

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/posts"
          className="p-2 text-primary-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Nuevo Post</h1>
          <p className="text-primary-400 mt-1">Crea un nuevo artículo para el blog</p>
        </div>
      </div>

      {/* Editor */}
      <PostEditor />
    </div>
  );
}
