import { prisma } from '@/lib/prisma';
import MessagesManager from './MessagesManager';

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const parsedMessages = messages.map(m => ({
    ...m,
    createdAt: m.createdAt.toISOString(),
    updatedAt: m.updatedAt.toISOString(),
    repliedAt: m.repliedAt?.toISOString(),
    phone: m.phone ?? undefined,
    company: m.company ?? undefined,
    service: m.service ?? undefined,
    budget: m.budget ?? undefined,
    status: m.status as 'new' | 'read' | 'replied' | 'archived',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any));

  const newCount = await prisma.contactMessage.count({ where: { status: 'new' } });
  const readCount = await prisma.contactMessage.count({ where: { status: 'read' } });
  const repliedCount = await prisma.contactMessage.count({ where: { status: 'replied' } });
  const archivedCount = await prisma.contactMessage.count({ where: { status: 'archived' } });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Mensajes de Contacto</h1>
          <p className="text-primary-400 mt-1">Gestiona las consultas recibidas</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<NewIcon />}
          label="Nuevos"
          count={newCount}
          bgColor="bg-accent-500/20"
          textColor="text-accent-400"
        />
        <StatCard
          icon={<ReadIcon />}
          label="Leídos"
          count={readCount}
          bgColor="bg-blue-500/20"
          textColor="text-blue-400"
        />
        <StatCard
          icon={<RepliedIcon />}
          label="Respondidos"
          count={repliedCount}
          bgColor="bg-success-500/20"
          textColor="text-success-400"
        />
        <StatCard
          icon={<ArchivedIcon />}
          label="Archivados"
          count={archivedCount}
          bgColor="bg-primary-600/20"
          textColor="text-primary-400"
        />
      </div>

      {/* Messages */}
      <MessagesManager messages={parsedMessages} />
    </div>
  );
}

function StatCard({
  icon,
  label,
  count,
  bgColor,
  textColor,
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
  bgColor: string;
  textColor: string;
}) {
  return (
    <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{count}</p>
          <p className={`text-sm ${textColor}`}>{label}</p>
        </div>
      </div>
    </div>
  );
}

function NewIcon() {
  return (
    <svg className="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function ReadIcon() {
  return (
    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
    </svg>
  );
}

function RepliedIcon() {
  return (
    <svg className="w-5 h-5 text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
    </svg>
  );
}

function ArchivedIcon() {
  return (
    <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
    </svg>
  );
}
