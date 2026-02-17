'use client';

import { useState } from 'react';

interface PostData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'scheduled';
  featuredImage: string;
  scheduledAt?: string;
}

const categories = [
  'Marketing Digital',
  'SEO',
  'Diseño Web',
  'Email Marketing',
  'Redes Sociales',
  'Branding',
  'Analytics',
  'Automatización',
];

export default function PostEditor() {
  const [post, setPost] = useState<PostData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    status: 'draft',
    featuredImage: '',
  });

  const [tagInput, setTagInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    setPost({ ...post, title, slug });
  };

  const addTag = () => {
    if (tagInput.trim() && !post.tags.includes(tagInput.trim())) {
      setPost({ ...post, tags: [...post.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setPost({ ...post, tags: post.tags.filter((t) => t !== tag) });
  };

  const handleSubmit = async (status: PostData['status']) => {
    setIsSaving(true);
    setPost({ ...post, status });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In production, save to database
    console.log('Saving post:', { ...post, status });

    setIsSaving(false);
    alert(status === 'published' ? 'Post publicado!' : 'Borrador guardado!');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main editor */}
      <div className="lg:col-span-2 space-y-6">
        {/* Title */}
        <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <input
            type="text"
            value={post.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Título del post"
            className="w-full text-2xl font-bold bg-transparent text-white placeholder-primary-500 focus:outline-none"
          />
          <div className="mt-2 flex items-center gap-2 text-sm text-primary-400">
            <span>Slug:</span>
            <input
              type="text"
              value={post.slug}
              onChange={(e) => setPost({ ...post, slug: e.target.value })}
              className="flex-1 bg-transparent text-primary-300 focus:outline-none focus:text-white"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <label className="block text-sm font-medium text-primary-300 mb-2">
            Extracto
          </label>
          <textarea
            value={post.excerpt}
            onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
            placeholder="Breve descripción del artículo (aparecerá en listados y SEO)"
            rows={3}
            className="w-full bg-transparent text-white placeholder-primary-500 focus:outline-none resize-none"
          />
        </div>

        {/* Content */}
        <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <label className="block text-sm font-medium text-primary-300 mb-2">
            Contenido
          </label>
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-1 mb-4 pb-4 border-b border-white/10">
            <ToolbarButton icon="B" title="Negrita" />
            <ToolbarButton icon="I" title="Cursiva" />
            <ToolbarButton icon="U" title="Subrayado" />
            <div className="w-px h-6 bg-white/10 mx-2" />
            <ToolbarButton icon="H1" title="Encabezado 1" />
            <ToolbarButton icon="H2" title="Encabezado 2" />
            <ToolbarButton icon="H3" title="Encabezado 3" />
            <div className="w-px h-6 bg-white/10 mx-2" />
            <ToolbarButton icon="•" title="Lista" />
            <ToolbarButton icon="1." title="Lista numerada" />
            <ToolbarButton icon="❝" title="Cita" />
            <div className="w-px h-6 bg-white/10 mx-2" />
            <ToolbarButton icon="🔗" title="Enlace" />
            <ToolbarButton icon="🖼" title="Imagen" />
            <ToolbarButton icon="📹" title="Video" />
          </div>
          <textarea
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            placeholder="Escribe el contenido del artículo aquí..."
            rows={15}
            className="w-full bg-transparent text-white placeholder-primary-500 focus:outline-none resize-none font-mono text-sm leading-relaxed"
          />
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Publish box */}
        <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Publicación</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-primary-400 mb-1">Estado</label>
              <select
                value={post.status}
                onChange={(e) => setPost({ ...post, status: e.target.value as PostData['status'] })}
                className="w-full px-3 py-2 bg-primary-700/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
              >
                <option value="draft">Borrador</option>
                <option value="published">Publicado</option>
                <option value="scheduled">Programado</option>
              </select>
            </div>

            {post.status === 'scheduled' && (
              <div>
                <label className="block text-xs text-primary-400 mb-1">Fecha de publicación</label>
                <input
                  type="datetime-local"
                  value={post.scheduledAt || ''}
                  onChange={(e) => setPost({ ...post, scheduledAt: e.target.value })}
                  className="w-full px-3 py-2 bg-primary-700/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-6">
            <button
              onClick={() => handleSubmit('draft')}
              disabled={isSaving}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
            >
              Guardar borrador
            </button>
            <button
              onClick={() => handleSubmit('published')}
              disabled={isSaving}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 rounded-lg shadow-lg shadow-accent-500/25 transition-all disabled:opacity-50"
            >
              {isSaving ? 'Guardando...' : 'Publicar'}
            </button>
          </div>
        </div>

        {/* Category */}
        <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Categoría</h3>
          <select
            value={post.category}
            onChange={(e) => setPost({ ...post, category: e.target.value })}
            className="w-full px-3 py-2 bg-primary-700/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
          >
            <option value="">Seleccionar categoría</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Etiquetas</h3>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              placeholder="Añadir etiqueta"
              className="flex-1 px-3 py-2 bg-primary-700/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
            <button
              onClick={addTag}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-accent-500/20 text-accent-400 text-xs font-medium rounded-full"
              >
                {tag}
                <button onClick={() => removeTag(tag)} className="hover:text-white">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Featured image */}
        <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Imagen destacada</h3>
          {post.featuredImage ? (
            <div className="relative">
              <img
                src={post.featuredImage}
                alt="Featured"
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => setPost({ ...post, featuredImage: '' })}
                className="absolute top-2 right-2 p-1 bg-red-500/80 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <button className="w-full h-32 border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center gap-2 text-primary-400 hover:text-white hover:border-white/30 transition-colors">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">Subir imagen</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ToolbarButton({ icon, title }: { icon: string; title: string }) {
  return (
    <button
      type="button"
      title={title}
      className="w-8 h-8 flex items-center justify-center text-primary-400 hover:text-white hover:bg-white/10 rounded transition-colors text-sm font-medium"
    >
      {icon}
    </button>
  );
}
