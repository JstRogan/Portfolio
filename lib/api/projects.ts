import { apiJson } from '@/lib/api/http';
import type { Project } from '@/lib/types';

export async function createProject(input: Omit<Project, 'id'>) {
  return apiJson<Project>(`/api/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
}

export async function updateProject(id: number, patch: Partial<Project>) {
  return apiJson<Project>(`/api/projects/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  });
}

export async function deleteProject(id: number) {
  return apiJson<{ success: true }>(`/api/projects/${id}`, { method: 'DELETE' });
}

