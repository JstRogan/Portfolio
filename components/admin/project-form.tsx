'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus } from 'lucide-react';
import type { Project } from '@/lib/types';
import { createProject, updateProject } from '@/lib/api/projects';
import { useAdminActions } from '@/hooks/admin/use-admin-actions';
import { setAdminUi } from '@/store/admin-ui';
import { projectSchema, type ProjectFormValues } from '@/lib/validation/project';

const emptyDraft: ProjectFormValues = {
  title: '',
  description: '',
  image: '',
  tech: '',
  github: '',
  external: '',
  featured: false,
};

function draftFromProject(p: Project | null): ProjectFormValues {
  if (!p) return emptyDraft;
  return {
    title: p.title,
    description: p.description,
    image: p.image,
    tech: (p.tech ?? []).join(', '),
    github: p.github ?? '',
    external: p.external ?? '',
    featured: Boolean(p.featured),
  };
}

export function ProjectForm({ projects, editingId }: { projects: Project[]; editingId: number | null }) {
  const { refresh } = useAdminActions();
  const initial = draftFromProject(editingId ? projects.find((p) => p.id === editingId) ?? null : null);
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: initial,
  });

  useEffect(() => {
    form.reset(initial);
  }, [initial, form]);

  const reset = () => {
    setAdminUi((s) => ({ ...s, editingProjectId: null }));
    form.reset(emptyDraft);
  };

  const onSubmit = async (values: ProjectFormValues) => {
    const fallbackImage =
      values.image?.trim() || `https://picsum.photos/seed/${(values.title || 'project').replace(/\s+/g, '')}/800/500`;
    const payload = {
      title: values.title,
      description: values.description,
      image: fallbackImage,
      tech: values.tech ? values.tech.split(',').map((t) => t.trim()).filter(Boolean) : [],
      github: values.github || '',
      external: values.external || '',
      featured: Boolean(values.featured),
    };
    if (editingId) await updateProject(editingId, payload);
    else await createProject(payload);
    reset();
    refresh();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-3xl bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 p-6 transition-colors duration-300 h-fit sticky top-24">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white">{editingId ? 'Edit Project' : 'New Project'}</h2>
        <button type="button" onClick={reset} className="font-mono text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
          Reset
        </button>
      </div>

      <div className="mt-5 space-y-3">
        <input {...form.register('title')} placeholder="Title" className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-[#111] border border-zinc-200 dark:border-white/10 outline-none transition-colors duration-300" />
        <textarea {...form.register('description')} placeholder="Description" rows={4} className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-[#111] border border-zinc-200 dark:border-white/10 outline-none transition-colors duration-300 resize-none" />
        <input {...form.register('image')} placeholder="Image URL (optional)" className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-[#111] border border-zinc-200 dark:border-white/10 outline-none transition-colors duration-300" />
        <input {...form.register('tech')} placeholder="Tech (comma separated)" className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-[#111] border border-zinc-200 dark:border-white/10 outline-none transition-colors duration-300" />
        <input {...form.register('github')} placeholder="GitHub URL (optional)" className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-[#111] border border-zinc-200 dark:border-white/10 outline-none transition-colors duration-300" />
        <input {...form.register('external')} placeholder="External URL (optional)" className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-[#111] border border-zinc-200 dark:border-white/10 outline-none transition-colors duration-300" />
        <label className="flex items-center gap-2 font-mono text-xs text-zinc-600 dark:text-zinc-300">
          <input type="checkbox" {...form.register('featured')} />
          Featured
        </label>
      </div>

      <button type="submit" disabled={form.formState.isSubmitting} className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black font-medium hover:opacity-90 transition-opacity disabled:opacity-60">
        {form.formState.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
        {editingId ? 'Save' : 'Create'}
      </button>
    </form>
  );
}
