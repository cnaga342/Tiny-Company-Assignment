const BASE = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

export async function listLinks() {
  const res = await fetch(`${BASE}/api/links`);
  if (!res.ok) throw new Error('Failed to load links');
  return res.json();
}

export async function createLink(payload) {
  const res = await fetch(`${BASE}/api/links`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data?.error || 'Create failed');
    err.status = res.status;
    throw err;
  }
  return data;
}

export async function getLink(code) {
  const res = await fetch(`${BASE}/api/links/${encodeURIComponent(code)}`);
  if (!res.ok) throw new Error('Not found');
  return res.json();
}

export async function deleteLink(code) {
  const res = await fetch(`${BASE}/api/links/${encodeURIComponent(code)}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Delete failed');
  return res.json();
}
