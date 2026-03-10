import { create } from 'zustand';
import type { Message } from '@/lib/types';
import { deleteMessage, listMessages, toggleMessageRead } from '@/lib/api/messages';

type State = {
  list: Message[];
  loading: boolean;
  error: string | null;
  unreadCount: number;
};

type Actions = {
  fetch: () => Promise<void>;
  toggleRead: (id: number, read: boolean) => Promise<boolean>;
  remove: (id: number) => Promise<boolean>;
};

const countUnread = (list: Message[]) => list.reduce((n, m) => n + (m.read ? 0 : 1), 0);

export const useMessagesStore = create<State & Actions>((set, get) => ({
  list: [],
  loading: false,
  error: null,
  unreadCount: 0,

  fetch: async () => {
    set({ loading: true, error: null });
    try {
      const list = await listMessages();
      set({ list, unreadCount: countUnread(list), loading: false, error: null });
    } catch (e) {
      set({ loading: false, error: e instanceof Error ? e.message : 'Failed to load messages' });
    }
  },

  toggleRead: async (id, read) => {
    const prev = get().list;
    const next = prev.map((m) => (m.id === id ? { ...m, read } : m));
    set({ list: next, unreadCount: countUnread(next) });
    try {
      await toggleMessageRead(id, read);
      return true;
    } catch (e) {
      set({ list: prev, unreadCount: countUnread(prev), error: e instanceof Error ? e.message : 'Update failed' });
      return false;
    }
  },

  remove: async (id) => {
    const prev = get().list;
    const next = prev.filter((m) => m.id !== id);
    set({ list: next, unreadCount: countUnread(next) });
    try {
      await deleteMessage(id);
      return true;
    } catch (e) {
      set({ list: prev, unreadCount: countUnread(prev), error: e instanceof Error ? e.message : 'Delete failed' });
      return false;
    }
  },
}));

