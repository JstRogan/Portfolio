import { apiJson } from '@/lib/api/http';

export async function adminLogin(password: string) {
  return apiJson<{ ok: boolean }>(`/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
}

export async function adminLogout() {
  return apiJson<{ ok: boolean }>(`/api/admin/logout`, { method: 'POST' });
}

