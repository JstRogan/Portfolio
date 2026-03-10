'use client';

import { useEffect } from 'react';
import { useProjectsStore } from '@/store/useProjectsStore';

export function useProjects() {
  const projects = useProjectsStore((s) => s.list);
  const loading = useProjectsStore((s) => s.loading);
  const error = useProjectsStore((s) => s.error);
  const fetch = useProjectsStore((s) => s.fetch);

  useEffect(() => {
    if (!loading && projects.length === 0) void fetch();
  }, [loading, projects.length, fetch]);

  return {
    projects,
    loading,
    error,
    refresh: fetch,
  };
}
