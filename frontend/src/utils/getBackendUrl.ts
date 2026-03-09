export let cachedUrl: string | null = null;

const DEFAULT_BACKEND_URL = 'http://localhost:3001/api';
const PORT_STORAGE_KEY = 'backendPort';

function getProductionBackendUrl() {
  return process.env.NEXT_PUBLIC_BACKEND_URL || null;
}

function buildLocalBackendUrl(port: string | number) {
  return `http://localhost:${port}/api`;
}

function getStoredBackendUrl() {
  if (typeof window === 'undefined') {
    return null;
  }

  const storedPort = window.localStorage.getItem(PORT_STORAGE_KEY);
  return storedPort ? buildLocalBackendUrl(storedPort) : null;
}

function storeBackendPort(port: string | number) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(PORT_STORAGE_KEY, String(port));
}

export async function getBackendUrl(forceRefresh = false): Promise<string> {
  if (!forceRefresh && cachedUrl) {
    return cachedUrl;
  }

  const productionBackendUrl = getProductionBackendUrl();
  if (productionBackendUrl) {
    cachedUrl = productionBackendUrl;
    return cachedUrl;
  }

  if (!forceRefresh) {
    const storedBackendUrl = getStoredBackendUrl();
    if (storedBackendUrl) {
      cachedUrl = storedBackendUrl;
      return cachedUrl;
    }
  }

  try {
    const response = await fetch('/backend-port.json', { cache: 'no-store' });
    if (response.ok) {
      const data = await response.json();
      const resolvedUrl = buildLocalBackendUrl(data.port);
      cachedUrl = resolvedUrl;
      storeBackendPort(data.port);
      return resolvedUrl;
    }
  } catch (error) {
    console.error('Cannot read backend port, falling back to default backend URL.', error);
  }

  cachedUrl = getStoredBackendUrl() || DEFAULT_BACKEND_URL;
  return cachedUrl;
}

export function clearBackendUrlCache(): void {
  cachedUrl = null;
}

export function getBackendUrlSync(): string {
  if (cachedUrl) {
    return cachedUrl;
  }

  const productionBackendUrl = getProductionBackendUrl();
  if (productionBackendUrl) {
    cachedUrl = productionBackendUrl;
    return cachedUrl;
  }

  if (typeof window === 'undefined') {
    const port = process.env.NEXT_PUBLIC_BACKEND_PORT || '3001';
    cachedUrl = buildLocalBackendUrl(port);
    return cachedUrl;
  }

  cachedUrl = getStoredBackendUrl() || DEFAULT_BACKEND_URL;
  return cachedUrl;
}
