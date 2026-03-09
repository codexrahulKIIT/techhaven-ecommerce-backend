// frontend/lib/analytics.ts
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

export async function getSalesData() {
  const res = await fetch(`${API_URL}/analytics/sales`, { cache: "no-store", headers: getAdminHeaders() });
  return res.json();
}

export async function getTopProducts() {
  const res = await fetch(`${API_URL}/analytics/top-products`, { cache: "no-store", headers: getAdminHeaders() });
  return res.json();
}

export async function getLowStock() {
  const res = await fetch(`${API_URL}/analytics/low-stock`, { cache: "no-store", headers: getAdminHeaders() });
  return res.json();
}
