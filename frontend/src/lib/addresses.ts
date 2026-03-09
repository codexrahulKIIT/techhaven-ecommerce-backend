import { getBackendUrlSync } from '../utils/getBackendUrl'

const API_URL = getBackendUrlSync()

const getHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export async function getAddresses() {
  const response = await fetch(`${API_URL}/addresses`, {
    cache: 'no-store',
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch addresses')
  }

  return response.json()
}
