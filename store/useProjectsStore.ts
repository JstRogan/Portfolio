import { create } from 'zustand';
import type { Project } from '@/lib/types';
import { createProject, deleteProject, listProjects, updateProject } from '@/lib/api/projects';

type State = {
  list: Project[];
  loading: boolean;
  error: string | null;
};

type Actions = {
  fetch: () => Promise<void>;
  create: (input: Omit<Project, 'id'>) => Promise<Project | null>;
  update: (id: number, patch: Partial<Project>) => Promise<Project | null>;
  remove: (id: number) => Promise<boolean>;
};

const tempId = () => -Date.now();

export const useProjectsStore = create<State & Actions>((set, get) => ({
  list: [],
  loading: false,
  error: null,

  fetch: async () => {
    set({ loading: true, error: null });
    try {
      const list = await listProjects();
      set({ list, loading: false, error: null });
    } catch (e) {
      set({ loading: false, error: e instanceof Error ? e.message : 'Failed to load projects' });
    }
  },

  create: async (input) => {
    const optimistic: Project = { id: tempId(), ...input };
    set((s) => ({ ...s, list: [optimistic, ...s.list] }));
    try {
      const created = await createProject(input);
      set((s) => ({ ...s, list: s.list.map((p) => (p.id === optimistic.id ? created : p)) }));
      return created;
    } catch (e) {
      set((s) => ({ ...s, list: s.list.filter((p) => p.id !== optimistic.id), error: e instanceof Error ? e.message : 'Create failed' }));
      return null;
    }
  },

  update: async (id, patch) => {
    const prev = get().list.find((p) => p.id === id) || null;
    if (!prev) return null;
    set((s) => ({ ...s, list: s.list.map((p) => (p.id === id ? { ...p, ...patch } : p)) }));
    try {
      const updated = await updateProject(id, patch);
      set((s) => ({ ...s, list: s.list.map((p) => (p.id === id ? updated : p)) }));
      return updated;
    } catch (e) {
      set((s) => ({ ...s, list: s.list.map((p) => (p.id === id ? prev : p)), error: e instanceof Error ? e.message : 'Update failed' }));
      return null;
    }
  },

  remove: async (id) => {
    const prev = get().list;
    set((s) => ({ ...s, list: s.list.filter((p) => p.id !== id) }));
    try {
      await deleteProject(id);
      return true;
    } catch (e) {
      set({ list: prev, error: e instanceof Error ? e.message : 'Delete failed' });
      return false;
    }
  },
}));

