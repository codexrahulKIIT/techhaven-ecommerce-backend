// frontend/lib/fetcher.ts
"use client";

import { getBackendUrlSync } from '../utils/getBackendUrl'

export type FetcherOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  token?: string;
};

const API_BASE_URL = getBackendUrlSync();

export async function fetcher<T>(
  endpoint: string,
  options: FetcherOptions = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (typeof window !== "undefined") {
    const token = options.token || localStorage.getItem("accessToken");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    let errorMsg = `Request failed with status ${res.status}`;
    try {
      const errorData = await res.json();
      errorMsg = errorData.message || JSON.stringify(errorData);
    } catch {
      // ignore JSON parse error
    }
    throw new Error(errorMsg);
  }

  return res.json() as Promise<T>;
}
