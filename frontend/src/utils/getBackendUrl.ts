export let cachedUrl: string | null = null;

const isProduction = process.env.NODE_ENV === 'production';
const DEFAULT_BACKEND_URL = isProduction ? '/api' : 'http://localhost:3001/api';
const PORT_STORAGE_KEY = 'backendPort';

function normalizeApiUrl(url: string): string {
  const trimmed = url.replace(/\/+$/, '');
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
}

function getPublicApiUrl(): string | null {
  return (
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    null
  );
}

function getInternalBackendBaseUrl(): string | null {
  return process.env.NEXT_INTERNAL_BACKEND_URL || null;
}

function getProductionBackendUrl() {
  const publicApiUrl = getPublicApiUrl();
  if (publicApiUrl) {
    return normalizeApiUrl(publicApiUrl);
  }

  const internalBaseUrl = getInternalBackendBaseUrl();
  if (internalBaseUrl) {
    return normalizeApiUrl(internalBaseUrl);
  }

  return null;
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

  if (!forceRefresh && !isProduction) {
    const storedBackendUrl = getStoredBackendUrl();
    if (storedBackendUrl) {
      cachedUrl = storedBackendUrl;
      return cachedUrl;
    }
  }

  if (!isProduction) {
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
    if (!isProduction) {
      const port = process.env.NEXT_PUBLIC_BACKEND_PORT || '3001';
      cachedUrl = buildLocalBackendUrl(port);
      return cachedUrl;
    }

    cachedUrl = DEFAULT_BACKEND_URL;
    return cachedUrl;
  }

  cachedUrl = getStoredBackendUrl() || DEFAULT_BACKEND_URL;
  return cachedUrl;
}
