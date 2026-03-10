'use client';

import { ExternalLink, Github, Pencil, Trash2 } from 'lucide-react';
import type { Project } from '@/lib/types';
import { deleteProject } from '@/lib/api/projects';
import { useAdminActions } from '@/hooks/admin/use-admin-actions';
import { setAdminUi } from '@/store/admin-ui';

export function ProjectsList({ projects }: { projects: Project[] }) {
  const { refresh } = useAdminActions();

  const startEdit = (p: Project) => {
    setAdminUi((s) => ({ ...s, projectEditorOpen: true, editingProjectId: p.id }));
  };

  const remove = async (id: number) => {
    if (!confirm('Delete this project?')) return;
    await deleteProject(id);
    refresh();
  };

  return (
    <div className="space-y-4">
      {projects.map((p) => (
        <div key={p.id} className="rounded-3xl bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 p-6 transition-colors duration-300">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{p.title}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(p.tech ?? []).slice(0, 6).map((t) => (
                  <span key={t} className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {p.github ? (
                <a href={p.github} target="_blank" className="w-10 h-10 rounded-full border border-zinc-200 dark:border-white/10 inline-flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
                  <Github className="w-4 h-4" />
                </a>
              ) : null}
              {p.external ? (
                <a href={p.external} target="_blank" className="w-10 h-10 rounded-full border border-zinc-200 dark:border-white/10 inline-flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : null}
              <button onClick={() => startEdit(p)} className="w-10 h-10 rounded-full border border-zinc-200 dark:border-white/10 inline-flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => remove(p.id)} className="w-10 h-10 rounded-full border border-zinc-200 dark:border-white/10 inline-flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 dark:text-red-400 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

