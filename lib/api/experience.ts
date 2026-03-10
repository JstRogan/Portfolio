import { apiJson } from '@/lib/api/http';
import type { Experience } from '@/lib/types';

export async function createExperience(input: Omit<Experience, 'id'>) {
  return apiJson<Experience>(`/api/experience`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
}

export async function updateExperience(id: number, patch: Partial<Experience>) {
  return apiJson<Experience>(`/api/experience/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  });
}

export async function deleteExperience(id: number) {
  return apiJson<{ success: true }>(`/api/experience/${id}`, { method: 'DELETE' });
}

