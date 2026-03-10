import { create } from 'zustand';

export type ActiveModal = 'project' | 'experience' | null;
export type UiTheme = 'light' | 'dark' | 'system';

type State = {
  sidebarOpen: boolean;
  activeModal: ActiveModal;
  theme: UiTheme;
};

type Actions = {
  setSidebarOpen: (open: boolean) => void;
  setActiveModal: (modal: ActiveModal) => void;
  setTheme: (theme: UiTheme) => void;
};

export const useUIStore = create<State & Actions>((set) => ({
  sidebarOpen: false,
  activeModal: null,
  theme: 'system',
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setActiveModal: (activeModal) => set({ activeModal }),
  setTheme: (theme) => set({ theme }),
}));

