'use client';

import { Trash2, Circle, CheckCircle2 } from 'lucide-react';
import type { Message } from '@/lib/types';
import { deleteMessage, toggleMessageRead } from '@/lib/api/messages';
import { useAdminActions } from '@/hooks/admin/use-admin-actions';

export function MessagesEditor({ messages }: { messages: Message[] }) {
  const { refresh, isPending } = useAdminActions();

  const toggle = async (m: Message) => {
    await toggleMessageRead(m.id, !m.read);
    refresh();
  };

  const remove = async (id: number) => {
    if (!confirm('Delete this message?')) return;
    await deleteMessage(id);
    refresh();
  };

  return (
    <div className="space-y-4">
      {messages.map((m) => (
        <div key={m.id} className="rounded-3xl bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 p-6 transition-colors duration-300">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <button onClick={() => toggle(m)} disabled={isPending} className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  {m.read ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                </button>
                <h3 className="font-bold text-zinc-900 dark:text-white truncate">{m.subject || 'Message'}</h3>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">{m.message}</p>
              <p className="font-mono text-xs text-zinc-400 mt-3">{m.date ? new Date(m.date).toLocaleString() : ''}</p>
            </div>
            <button onClick={() => remove(m.id)} className="w-10 h-10 rounded-full border border-zinc-200 dark:border-white/10 inline-flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 dark:text-red-400 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

