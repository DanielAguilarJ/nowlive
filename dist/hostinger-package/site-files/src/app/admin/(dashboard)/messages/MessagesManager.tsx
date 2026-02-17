'use client';

import { useState } from 'react';
import { ContactMessage } from '@/lib/admin-data';

interface MessagesManagerProps {
  messages: ContactMessage[];
}

const statusConfig = {
  new: { label: 'Nuevo', className: 'bg-accent-500/20 text-accent-400' },
  read: { label: 'Leído', className: 'bg-blue-500/20 text-blue-400' },
  replied: { label: 'Respondido', className: 'bg-success-500/20 text-success-400' },
  archived: { label: 'Archivado', className: 'bg-primary-600/20 text-primary-400' },
};

export default function MessagesManager({ messages }: MessagesManagerProps) {
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied' | 'archived'>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const filteredMessages = messages.filter(
    (m) => filter === 'all' || m.status === filter
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Hace unos minutos';
    if (diffInHours < 24) return `Hace ${diffInHours}h`;
    if (diffInHours < 48) return 'Ayer';
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="flex gap-6">
      {/* Messages list */}
      <div className="flex-1 space-y-4">
        {/* Filters */}
        <div className="flex items-center gap-2 p-1 bg-primary-800/50 rounded-lg w-fit">
          {(['all', 'new', 'read', 'replied', 'archived'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === status
                  ? 'bg-accent-500 text-white'
                  : 'text-primary-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {status === 'all' ? 'Todos' : statusConfig[status].label}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="space-y-2">
          {filteredMessages.map((message) => (
            <button
              key={message.id}
              onClick={() => setSelectedMessage(message)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedMessage?.id === message.id
                  ? 'bg-accent-500/10 border-accent-500/30'
                  : 'bg-primary-800/50 border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    message.status === 'new' ? 'bg-accent-500' : 'bg-primary-700'
                  }`}>
                    <span className="text-sm font-semibold text-white">
                      {message.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${message.status === 'new' ? 'text-white' : 'text-primary-200'}`}>
                        {message.name}
                      </span>
                      {message.status === 'new' && (
                        <span className="w-2 h-2 rounded-full bg-accent-500" />
                      )}
                    </div>
                    <p className="text-sm text-primary-400 truncate">{message.subject}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-xs text-primary-500">{formatDate(message.createdAt)}</span>
                  <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${statusConfig[message.status].className}`}>
                    {statusConfig[message.status].label}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm text-primary-400 line-clamp-2">{message.message}</p>
              {message.service && (
                <span className="inline-block mt-2 px-2 py-0.5 bg-white/5 text-primary-300 text-xs rounded">
                  {message.service}
                </span>
              )}
            </button>
          ))}
        </div>

        {filteredMessages.length === 0 && (
          <div className="text-center py-12 bg-primary-800/50 rounded-xl border border-white/5">
            <svg className="w-12 h-12 mx-auto text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="mt-4 text-primary-400">No hay mensajes en esta categoría</p>
          </div>
        )}
      </div>

      {/* Message detail panel */}
      {selectedMessage && (
        <div className="hidden lg:block w-[400px] shrink-0">
          <MessageDetail message={selectedMessage} onClose={() => setSelectedMessage(null)} />
        </div>
      )}
    </div>
  );
}

function MessageDetail({ message, onClose }: { message: ContactMessage; onClose: () => void }) {
  const formatFullDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="sticky top-24 bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <h3 className="font-semibold text-white">Detalle del mensaje</h3>
        <button
          onClick={onClose}
          className="p-1 text-primary-400 hover:text-white rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        {/* Contact info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center">
            <span className="text-lg font-semibold text-white">
              {message.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h4 className="font-medium text-white">{message.name}</h4>
            {message.company && (
              <p className="text-sm text-primary-400">{message.company}</p>
            )}
          </div>
        </div>

        {/* Contact details */}
        <div className="space-y-2 p-3 bg-white/5 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href={`mailto:${message.email}`} className="text-accent-400 hover:underline">
              {message.email}
            </a>
          </div>
          {message.phone && (
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href={`tel:${message.phone}`} className="text-primary-300">
                {message.phone}
              </a>
            </div>
          )}
        </div>

        {/* Subject & Message */}
        <div>
          <h5 className="text-xs font-medium text-primary-500 uppercase tracking-wider mb-2">Asunto</h5>
          <p className="text-white">{message.subject}</p>
        </div>

        <div>
          <h5 className="text-xs font-medium text-primary-500 uppercase tracking-wider mb-2">Mensaje</h5>
          <p className="text-primary-300 text-sm leading-relaxed whitespace-pre-wrap">{message.message}</p>
        </div>

        {/* Extra info */}
        {(message.service || message.budget) && (
          <div className="grid grid-cols-2 gap-3">
            {message.service && (
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-primary-500 mb-1">Servicio</p>
                <p className="text-sm text-white">{message.service}</p>
              </div>
            )}
            {message.budget && (
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-primary-500 mb-1">Presupuesto</p>
                <p className="text-sm text-white">€{message.budget}</p>
              </div>
            )}
          </div>
        )}

        {/* Timestamp */}
        <p className="text-xs text-primary-500">
          Recibido el {formatFullDate(message.createdAt)}
        </p>

        {message.repliedAt && (
          <p className="text-xs text-success-400">
            Respondido el {formatFullDate(message.repliedAt)}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-white/10 flex gap-2">
        <button className="flex-1 px-4 py-2 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-medium rounded-lg transition-all text-sm">
          Responder
        </button>
        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm">
          Archivar
        </button>
      </div>
    </div>
  );
}
