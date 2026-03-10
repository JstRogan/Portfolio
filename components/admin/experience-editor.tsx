'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2, Pencil, Loader2 } from 'lucide-react';
import type { Experience } from '@/lib/types';
import { createExperience, deleteExperience, updateExperience } from '@/lib/api/experience';
import { useAdminActions } from '@/hooks/admin/use-admin-actions';
import { experienceSchema, type ExperienceFormValues } from '@/lib/validation/experience';

const emptyDraft: ExperienceFormValues = { role: '', company: '', period: '', description: '' };

function draftFromExperience(e: Experience | null): ExperienceFormValues {
  if (!e) return emptyDraft;
  return { role: e.role, company: e.company, period: e.period, description: e.description };
}

export function ExperienceEditor({ experience }: { experience: Experience[] }) {
  const { refresh } = useAdminActions();
  const [editingId, setEditingId] = useState<number | null>(null);
  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: emptyDraft,
  });

  const startEdit = (e: Experience) => {
    setEditingId(e.id);
    form.reset(draftFromExperience(e));
  };

  const reset = () => {
    setEditingId(null);
    form.reset(emptyDraft);
  };

  useEffect(() => {
    if (!editingId) form.reset(emptyDraft);
  }, [editingId, form]);

  const onSubmit = async (values: ExperienceFormValues) => {
    if (editingId) await updateExperience(editingId, values);
    else await createExperience(values);
    reset();
    refresh();
  };

  const remove = async (id: number) => {
    if (!confirm('Delete this experience?')) return;
    await deleteExperience(id);
    refresh();
  };

  return (
    <div className="grid lg:grid-cols-[1fr_420px] gap-8">
      <div className="space-y-4">
        {experience.map((e) => (
          <div key={e.id} className="rounded-3xl bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 p-6 transition-colors duration-300">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{e.role}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  {e.company} · {e.period}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3">{e.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => startEdit(e)} className="w-10 h-10 rounded-full border border-zinc-200 dark:border-white/10 inline-flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => remove(e.id)} className="w-10 h-10 rounded-full border border-zinc-200 dark:border-white/10 inline-flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 dark:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-3xl bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 p-6 transition-colors duration-300 h-fit sticky top-24">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">{editingId ? 'Edit Experience' : 'New Experience'}</h2>
          <button type="button" onClick={reset} className="font-mono text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
            Reset
          </button>
        </div>
        <div className="mt-5 space-y-3">
          <input {...form.register('role')} placeholder="Role" className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-[#111] border border-zinc-200 dark:border-white/10 outline-none transition-colors duration-300" />
          <input {...form.register('company')} placeholder="Company" className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-[#111] border border-zinc-200 dark:border-white/10 outline-none transition-colors duration-300" />
          <input {...form.register('period')} placeholder="Period" className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-[#111] border border-zinc-200 dark:border-white/10 outline-none transition-colors duration-300" />
          <textarea {...form.register('description')} placeholder="Description" rows={5} className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-[#111] border border-zinc-200 dark:border-white/10 outline-none transition-colors duration-300 resize-none" />
        </div>
        <button type="submit" disabled={form.formState.isSubmitting} className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black font-medium hover:opacity-90 transition-opacity disabled:opacity-60">
          {form.formState.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          {editingId ? 'Save' : 'Create'}
        </button>
      </form>
    </div>
  );
}
