import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import CasesTable from './CasesTable';

export default async function CasesPage() {
  const cases = await prisma.caseStudy.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const parsedCases = cases.map(c => ({
    ...c,
    services: JSON.parse(c.services as string),
    results: JSON.parse(c.results as string),
    gallery: JSON.parse(c.gallery as string),
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
    status: c.status as 'published' | 'draft',
  }));

  const publishedCount = await prisma.caseStudy.count({ where: { status: 'published' } });
  const draftCount = await prisma.caseStudy.count({ where: { status: 'draft' } });
  const featuredCount = await prisma.caseStudy.count({ where: { featured: true } });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Casos de Éxito</h1>
          <p className="text-primary-400 mt-1">Gestiona los casos de estudio y portfolio</p>
        </div>
        <Link
          href="/admin/cases/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold rounded-lg shadow-lg shadow-accent-500/25 transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Caso
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{publishedCount}</p>
              <p className="text-sm text-primary-400">Publicados</p>
            </div>
          </div>
        </div>

        <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{draftCount}</p>
              <p className="text-sm text-primary-400">Borradores</p>
            </div>
          </div>
        </div>

        <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{featuredCount}</p>
              <p className="text-sm text-primary-400">Destacados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cases table */}
      <CasesTable cases={parsedCases} />
    </div>
  );
}
