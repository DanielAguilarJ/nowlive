'use client';

import Link from 'next/link';
import { CaseStudy } from '@/lib/admin-data';

interface CasesTableProps {
  cases: CaseStudy[];
}

export default function CasesTable({ cases }: CasesTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-4">
      {cases.map((caseStudy) => (
        <div
          key={caseStudy.id}
          className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6 hover:border-white/10 transition-colors"
        >
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            {/* Image placeholder */}
            <div className="w-full lg:w-48 h-32 rounded-lg bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center shrink-0">
              <svg className="w-12 h-12 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Link
                      href={`/admin/cases/${caseStudy.id}`}
                      className="text-lg font-semibold text-white hover:text-accent-400 transition-colors"
                    >
                      {caseStudy.title}
                    </Link>
                    {caseStudy.featured && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent-500/20 text-accent-400 text-xs font-medium rounded-full">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Destacado
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-primary-400 mb-3">
                    <span className="text-primary-300">{caseStudy.client}</span> • {caseStudy.industry}
                  </p>
                </div>

                <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full shrink-0 ${
                  caseStudy.status === 'published'
                    ? 'bg-success-500/20 text-success-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {caseStudy.status === 'published' ? 'Publicado' : 'Borrador'}
                </span>
              </div>

              {/* Services */}
              <div className="flex flex-wrap gap-2 mb-4">
                {caseStudy.services.map((service) => (
                  <span
                    key={service}
                    className="px-2.5 py-1 bg-white/5 text-primary-300 text-xs rounded-lg"
                  >
                    {service}
                  </span>
                ))}
              </div>

              {/* Results preview */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                {caseStudy.results.slice(0, 3).map((result) => (
                  <div key={result.metric} className="p-3 bg-white/5 rounded-lg">
                    <p className="text-lg font-bold text-accent-400">{result.value}</p>
                    <p className="text-xs text-primary-400">{result.metric}</p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xs text-primary-500">
                  Actualizado el {formatDate(caseStudy.updatedAt)}
                </span>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/cases/${caseStudy.id}`}
                    className="p-2 text-primary-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </Link>
                  <Link
                    href={`/casos-de-exito/${caseStudy.slug}`}
                    target="_blank"
                    className="p-2 text-primary-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    title="Ver"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                  <button
                    className="p-2 text-primary-400 hover:text-accent-400 hover:bg-accent-500/10 rounded-lg transition-colors"
                    title="Destacar"
                  >
                    <svg className="w-4 h-4" fill={caseStudy.featured ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                  <button
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {cases.length === 0 && (
        <div className="text-center py-12 bg-primary-800/50 rounded-xl border border-white/5">
          <svg className="w-12 h-12 mx-auto text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m3.044 0a6.726 6.726 0 002.749-1.35m0 0a6.772 6.772 0 01-3.044-2.106M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m-3.792-.172a6.77 6.77 0 01-3.044-2.106" />
          </svg>
          <p className="mt-4 text-primary-400">No hay casos de éxito todavía</p>
          <Link
            href="/admin/cases/new"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-lg transition-colors"
          >
            Crear primer caso
          </Link>
        </div>
      )}
    </div>
  );
}
