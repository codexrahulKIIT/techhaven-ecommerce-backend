import { Product } from '@/types/product';
import { Category } from '@/types/category';
import { getBackendUrlSync } from '@/utils/getBackendUrl';

export type { Product, Category };

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const baseUrl = getBackendUrlSync();
      const response = await fetch(`${baseUrl}${endpoint}`, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
      });

      if (!response.ok) {
        console.warn(`API request failed: ${endpoint}`);
        // Return empty data instead of throwing
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      console.warn(`API request failed: ${endpoint}`, error);
      // Return empty data for graceful degradation
      return {} as T;
    }
  }

  async getProducts(params: { limit?: number; page?: number; category?: string; featured?: boolean } = {}) {
    const searchParams = new URLSearchParams();
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.category) searchParams.append('category', params.category);
    if (params.featured !== undefined) searchParams.append('featured', params.featured.toString());

    return this.request<{ products: Product[]; total: number; page: number; pages: number }>(
      `/products?${searchParams.toString()}`
    );
  }

  async getCategories() {
    return this.request<Category[]>('/categories');
  }

  async getProduct(id: string) {
    return this.request<Product>(`/products/${id}`);
  }
}

export const api = new ApiService();
