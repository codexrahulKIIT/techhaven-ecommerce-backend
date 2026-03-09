import { getBackendUrlSync } from '../utils/getBackendUrl'
import { allProducts, categories, getProductsByCategory, getProductById as getProductByIdFromData, searchProducts } from '../data/categories'

const API_BASE_URL = getBackendUrlSync()

interface ApiResponse {
  success: boolean
  data?: any
  message?: string
}

interface GetProductsParams {
  page?: number
  limit?: number
  search?: string
  categoryId?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: string
  inStock?: boolean
  admin?: boolean
}

const getAuthHeaders = () => {
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('adminToken') || localStorage.getItem('authToken')
    : null
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }
}

/* Mock Products for fallback when backend is unavailable - Based on TechHaven Electronics */
const mockProducts = allProducts.map(product => ({
  id: product.id,
  name: product.name,
  description: product.description,
  price: product.price,
  images: product.images,
  category: {
    id: product.categoryId,
    name: categories.find(cat => cat.id === product.categoryId)?.name || product.categoryId
  },
  stock: product.stock,
  rating: product.rating,
  reviewCount: Math.floor(Math.random() * 200) + 10,
  specifications: product.specifications || {}
}));

/* ----------------- Get All Products ----------------- */
export const getAllProducts = async (
  params: GetProductsParams = {}
): Promise<ApiResponse> => {
  try {
    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, value.toString())
      }
    })

    const endpoint = '/products'
    const headers = params.admin
      ? getAuthHeaders()
      : { 'Content-Type': 'application/json' }

    const response = await fetch(
      `${API_BASE_URL}${endpoint}?${queryParams}`,
      { headers }
    )

    const data = await response.json()
    if (response.ok) {
      if (params.admin && data?.products) {
        return {
          success: true,
          data: {
            products: data.products.map((product: any) => ({
              ...product,
              status: product.status || 'active',
              sku: product.sku || '',
            })),
            total: data.total,
            totalPages: data.totalPages || data.pages || 1,
          }
        }
      }
      return { success: true, data }
    } else {
      console.warn('API returned error, using mock data:', data.message || 'HTTP error');
      // Return mock data with basic filtering support
      let filteredProducts = mockProducts;
      if (params.search) {
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(params.search!.toLowerCase())
        );
      }
      if (params.categoryId) {
        filteredProducts = filteredProducts.filter(p => p.category?.id === params.categoryId);
      }
      if (params.inStock !== undefined) {
        filteredProducts = filteredProducts.filter(p => (params.inStock ? (p.stock !== undefined && p.stock > 0) : true));
      }
      if (params.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price >= params.minPrice!);
      }
      if (params.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price <= params.maxPrice!);
      }
      // Simple sort
      if (params.sortBy) {
        filteredProducts.sort((a, b) => {
          switch (params.sortBy) {
            case 'price_asc':
              return a.price - b.price;
            case 'price_desc':
              return b.price - a.price;
            case 'rating':
              return (b.rating || 0) - (a.rating || 0);
            default:
              return a.name.localeCompare(b.name);
          }
        });
      }
      // Simple pagination
      const page = params.page || 1;
      const limit = params.limit || 8;
      const start = (page - 1) * limit;
      const paginated = filteredProducts.slice(start, start + limit);
      return {
        success: true,
        data: {
          products: paginated,
          total: filteredProducts.length,
          page: page,
          limit: limit
        }
      };
    }
  } catch (error) {
    console.warn('API unavailable, using mock data:', error);
    // Return mock data with basic filtering support
    let filteredProducts = mockProducts;
    if (params.search) {
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(params.search!.toLowerCase())
      );
    }
    if (params.categoryId) {
      filteredProducts = filteredProducts.filter(p => p.category?.id === params.categoryId);
    }
    if (params.inStock !== undefined) {
      filteredProducts = filteredProducts.filter(p => (params.inStock ? (p.stock !== undefined && p.stock > 0) : true));
    }
    if (params.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price >= params.minPrice!);
    }
    if (params.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price <= params.maxPrice!);
    }
    // Simple sort
    if (params.sortBy) {
      filteredProducts.sort((a, b) => {
        switch (params.sortBy) {
          case 'price_asc':
            return a.price - b.price;
          case 'price_desc':
            return b.price - a.price;
          case 'rating':
            return (b.rating || 0) - (a.rating || 0);
          default:
            return a.name.localeCompare(b.name);
        }
      });
    }
    // Simple pagination
    const page = params.page || 1;
    const limit = params.limit || 8;
    const start = (page - 1) * limit;
    const paginated = filteredProducts.slice(start, start + limit);
    return {
      success: true,
      data: {
        products: paginated,
        total: filteredProducts.length,
        page: page,
        limit: limit
      }
    };
  }
}

/* ----------------- Get Product By ID ----------------- */
export const getProductById = async (
  productId: string
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`)
    const data = await response.json()

    return response.ok
      ? { success: true, data }
      : { success: false, message: data.message || 'Product not found' }
  } catch {
    return { success: false, message: 'Network error occurred' }
  }
}

/* ----------------- Create Product (Admin) ----------------- */
export const createProduct = async (
  productData: any
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData)
    })

    const data = await response.json()
    return response.ok
      ? {
          success: true,
          data,
          message: 'Product created successfully'
        }
      : {
          success: false,
          message: data.message || 'Failed to create product'
        }
  } catch {
    return { success: false, message: 'Network error occurred' }
  }
}

/* ----------------- Update Product (Admin) ----------------- */
export const updateProduct = async (
  productId: string,
  productData: any
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData)
    })

    const data = await response.json()
    return response.ok
      ? {
          success: true,
          data,
          message: 'Product updated successfully'
        }
      : {
          success: false,
          message: data.message || 'Failed to update product'
        }
  } catch {
    return { success: false, message: 'Network error occurred' }
  }
}

/* ----------------- Delete Product (Admin) ----------------- */
export const deleteProduct = async (
  productId: string
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })

    const data = await response.json()
    return response.ok
      ? {
          success: true,
          data,
          message: 'Product deleted successfully'
        }
      : {
          success: false,
          message: data.message || 'Failed to delete product'
        }
  } catch {
    return { success: false, message: 'Network error occurred' }
  }
}
