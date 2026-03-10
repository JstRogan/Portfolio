import { create } from 'zustand';
import type { Experience } from '@/lib/types';
import { createExperience, deleteExperience, listExperience, updateExperience } from '@/lib/api/experience';

type State = { list: Experience[]; loading: boolean; error: string | null };
type Actions = {
  fetch: () => Promise<void>;
  create: (input: Omit<Experience, 'id'>) => Promise<Experience | null>;
  update: (id: number, patch: Partial<Experience>) => Promise<Experience | null>;
  remove: (id: number) => Promise<boolean>;
};

const tempId = () => -Date.now();

export const useExperienceStore = create<State & Actions>((set, get) => ({
  list: [],
  loading: false,
  error: null,

  fetch: async () => {
    set({ loading: true, error: null });
    try {
      const list = await listExperience();
      set({ list, loading: false, error: null });
    } catch (e) {
      set({ loading: false, error: e instanceof Error ? e.message : 'Failed to load experience' });
    }
  },

  create: async (input) => {
    const optimistic: Experience = { id: tempId(), ...input };
    set((s) => ({ ...s, list: [optimistic, ...s.list] }));
    try {
      const created = await createExperience(input);
      set((s) => ({ ...s, list: s.list.map((x) => (x.id === optimistic.id ? created : x)) }));
      return created;
    } catch (e) {
      set((s) => ({ ...s, list: s.list.filter((x) => x.id !== optimistic.id), error: e instanceof Error ? e.message : 'Create failed' }));
      return null;
    }
  },

  update: async (id, patch) => {
    const prev = get().list.find((x) => x.id === id) || null;
    if (!prev) return null;
    set((s) => ({ ...s, list: s.list.map((x) => (x.id === id ? { ...x, ...patch } : x)) }));
    try {
      const updated = await updateExperience(id, patch);
      set((s) => ({ ...s, list: s.list.map((x) => (x.id === id ? updated : x)) }));
      return updated;
    } catch (e) {
      set((s) => ({ ...s, list: s.list.map((x) => (x.id === id ? prev : x)), error: e instanceof Error ? e.message : 'Update failed' }));
      return null;
    }
  },

  remove: async (id) => {
    const prev = get().list;
    set((s) => ({ ...s, list: s.list.filter((x) => x.id !== id) }));
    try {
      await deleteExperience(id);
      return true;
    } catch (e) {
      set({ list: prev, error: e instanceof Error ? e.message : 'Delete failed' });
      return false;
    }
  },
}));

