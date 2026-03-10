import { apiJson } from '@/lib/api/http';
import type { Message } from '@/lib/types';

export async function toggleMessageRead(id: number, read: boolean) {
  return apiJson<{ success: true }>(`/api/messages/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ read }),
  });
}

export async function deleteMessage(id: number) {
  return apiJson<{ success: true }>(`/api/messages/${id}`, { method: 'DELETE' });
}

