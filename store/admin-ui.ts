import { create } from 'zustand';

export type AdminTab = 'projects' | 'messages' | 'experience';

type AdminUiState = {
  tab: AdminTab;
  projectEditorOpen: boolean;
  experienceEditorOpen: boolean;
  editingProjectId: number | null;
  editingExperienceId: number | null;
};

export const useAdminUi = create<AdminUiState>(() => ({
  tab: 'projects',
  projectEditorOpen: false,
  experienceEditorOpen: false,
  editingProjectId: null,
  editingExperienceId: null,
}));

export function setAdminUi(updater: (prev: AdminUiState) => AdminUiState) {
  useAdminUi.setState(updater);
}
