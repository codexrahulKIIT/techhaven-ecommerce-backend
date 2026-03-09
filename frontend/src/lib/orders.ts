// frontend/lib/orders.ts
import { getBackendUrlSync } from '../utils/getBackendUrl'

const API_URL = getBackendUrlSync();
const getAuthHeaders = () => {
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('adminToken') || localStorage.getItem('authToken')
    : null;

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export async function getUserOrders() {
  const res = await fetch(`${API_URL}/orders/me`, { cache: "no-store", headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}

export async function getOrderById(id: string) {
  const res = await fetch(`${API_URL}/orders/${id}`, { cache: "no-store", headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Failed to fetch order');
  return res.json();
}

export async function getAllOrders() {
  const res = await fetch(`${API_URL}/orders`, { cache: "no-store", headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}

export async function updateOrderStatus(id: string, status: string) {
  const res = await fetch(`${API_URL}/orders/${id}/status`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update order status');
  return res.json();
}
