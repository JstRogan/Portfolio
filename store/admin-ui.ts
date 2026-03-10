import { createStore } from '@/store/create-store';

export type AdminTab = 'projects' | 'messages' | 'experience';

type AdminUiState = {
  tab: AdminTab;
  projectEditorOpen: boolean;
  experienceEditorOpen: boolean;
  editingProjectId: number | null;
  editingExperienceId: number | null;
};

const store = createStore<AdminUiState>({
  tab: 'projects',
  projectEditorOpen: false,
  experienceEditorOpen: false,
  editingProjectId: null,
  editingExperienceId: null,
});

export const useAdminUi = store.useStore;
export const setAdminUi = store.setState;

