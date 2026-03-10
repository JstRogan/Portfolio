import { create } from 'zustand';
import type { Project } from '@/lib/types';
import { listProjects } from '@/lib/api/projects';

type ProjectsState = {
  items: Project[];
  status: 'idle' | 'loading' | 'ready' | 'error';
  error: string | null;
};

type ProjectsActions = {
  load: () => Promise<void>;
  set: (items: Project[]) => void;
};

export const useProjectsStore = create<ProjectsState & ProjectsActions>((set, get) => ({
  items: [],
  status: 'idle',
  error: null,
  set: (items) => set({ items, status: 'ready', error: null }),
  load: async () => {
    const { status } = get();
    if (status === 'loading') return;
    set({ status: 'loading', error: null });
    try {
      const items = await listProjects();
      set({ items, status: 'ready', error: null });
    } catch (e) {
      set({ status: 'error', error: e instanceof Error ? e.message : 'Failed to load projects' });
    }
  },
}));

