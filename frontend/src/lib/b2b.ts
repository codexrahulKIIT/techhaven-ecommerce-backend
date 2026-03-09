import { getBackendUrlSync } from '../utils/getBackendUrl'

const API_URL = getBackendUrlSync();
const getAdminHeaders = () => {
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('adminToken') || localStorage.getItem('authToken')
    : null;

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export async function submitB2BRequest(data: any) {
  const res = await fetch(`${API_URL}/b2b`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getAllB2BRequests() {
  const res = await fetch(`${API_URL}/b2b`, { cache: "no-store", headers: getAdminHeaders() });
  return res.json();
}

export async function updateB2BRequestStatus(id: string, status: string) {
  const res = await fetch(`${API_URL}/b2b/${id}`, {
    method: "PUT",
    headers: getAdminHeaders(),
    body: JSON.stringify({ status }),
  });
  return res.json();
}
