import { useSyncExternalStore } from 'react';

export function createStore<T>(initial: T) {
  let state = initial;
  const listeners = new Set<() => void>();

  const getState = () => state;
  const setState = (updater: (prev: T) => T) => {
    state = updater(state);
    listeners.forEach((l) => l());
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const useStore = <S,>(selector: (s: T) => S) =>
    useSyncExternalStore(subscribe, () => selector(getState()), () => selector(getState()));

  return { getState, setState, useStore };
}

