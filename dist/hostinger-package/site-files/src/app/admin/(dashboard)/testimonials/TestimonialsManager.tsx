'use client';

import { useState } from 'react';
import { Testimonial } from '@/lib/admin-data';

interface TestimonialsManagerProps {
  testimonials: Testimonial[];
}

const statusStyles = {
  pending: { label: 'Pendiente', className: 'bg-yellow-500/20 text-yellow-400' },
  approved: { label: 'Aprobado', className: 'bg-success-500/20 text-success-400' },
  rejected: { label: 'Rechazado', className: 'bg-red-500/20 text-red-400' },
};

export default function TestimonialsManager({ testimonials }: TestimonialsManagerProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const filteredTestimonials = testimonials.filter(
    (t) => filter === 'all' || t.status === filter
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-2 p-1 bg-primary-800/50 rounded-lg w-fit">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === status
                ? 'bg-accent-500 text-white'
                : 'text-primary-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {status === 'all' ? 'Todos' : statusStyles[status].label}
          </button>
        ))}
      </div>

      {/* Testimonials grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredTestimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6 hover:border-white/10 transition-colors"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-white">{testimonial.name}</h4>
                  <p className="text-sm text-primary-400">
                    {testimonial.role} en {testimonial.company}
                  </p>
                </div>
              </div>
              <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${statusStyles[testimonial.status].className}`}>
                {statusStyles[testimonial.status].label}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-primary-600'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-sm text-primary-400">{testimonial.rating}/5</span>
            </div>

            {/* Content */}
            <p className="text-primary-300 text-sm leading-relaxed mb-4">
              &ldquo;{testimonial.content}&rdquo;
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <span className="text-xs text-primary-500">{formatDate(testimonial.createdAt)}</span>
                {testimonial.featured && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent-500/20 text-accent-400 text-xs font-medium rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Destacado
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {testimonial.status === 'pending' && (
                  <>
                    <button className="p-2 text-success-400 hover:text-success-300 hover:bg-success-500/10 rounded-lg transition-colors" title="Aprobar">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors" title="Rechazar">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </>
                )}
                <button className="p-2 text-primary-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Editar">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button className="p-2 text-primary-400 hover:text-accent-400 hover:bg-accent-500/10 rounded-lg transition-colors" title="Destacar">
                  <svg className="w-4 h-4" fill={testimonial.featured ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTestimonials.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-12 h-12 mx-auto text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
          </svg>
          <p className="mt-4 text-primary-400">No hay testimonios en esta categoría</p>
        </div>
      )}
    </div>
  );
}
