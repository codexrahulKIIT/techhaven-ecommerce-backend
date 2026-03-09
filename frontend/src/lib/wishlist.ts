import type { WishlistItem, Product } from '@/types'

// API Base URL
import { getBackendUrlSync } from '../utils/getBackendUrl'

const API_BASE_URL = getBackendUrlSync()

// API Response Types
interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

interface WishlistResponse {
  id: string
  userId: string
  productId: string
  createdAt: string
  updatedAt: string
  product?: Product
}

// Wishlist API Class
export class WishlistAPI {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  private getHeaders(token: string) {
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  }

  /**
   * Get user's wishlist items
   */
  async getWishlist(token: string): Promise<WishlistItem[]> {
    try {
      const response = await fetch(`${this.baseUrl}/wishlist`, {
        headers: this.getHeaders(token),
      })

      if (response.status === 401) {
        throw new Error('Authentication failed. Please log in again.')
      }
      if (!response.ok) throw new Error(`Failed: ${response.status}`)

      const data = await response.json()
      if (!Array.isArray(data)) {
        console.warn('Wishlist API returned non-array data:', data)
        return []
      }
      return data.map(item => ({
        id: item.id,
        userId: item.userId,
        productId: item.productId,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        product: item.product,
      }))
    } catch (error) {
      console.error('Error fetching wishlist:', error)
      throw error instanceof Error ? error : new Error('Failed to fetch wishlist items')
    }
  }

  /**
   * Add product to wishlist
   */
  async addToWishlist(productId: string, token: string): Promise<WishlistItem> {
    try {
      const response = await fetch(`${this.baseUrl}/wishlist`, {
        method: 'POST',
        headers: this.getHeaders(token),
        body: JSON.stringify({ productId }),
      })

      if (response.status === 409) {
        throw new Error('Product is already in your wishlist')
      }
      if (!response.ok) throw new Error(`Failed: ${response.status}`)

      const data: WishlistResponse = await response.json()
      return {
        id: data.id,
        userId: data.userId,
        productId: data.productId,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        product: data.product,
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error)
      throw error instanceof Error ? error : new Error('Failed to add product to wishlist')
    }
  }

  /**
   * Remove product from wishlist
   */
  async removeFromWishlist(productId: string, token: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/wishlist/${productId}`, {
        method: 'DELETE',
        headers: this.getHeaders(token),
      })

      if (response.status === 404) {
        throw new Error('Product not found in wishlist')
      }
      if (!response.ok) throw new Error(`Failed: ${response.status}`)
    } catch (error) {
      console.error('Error removing from wishlist:', error)
      throw error instanceof Error ? error : new Error('Failed to remove product from wishlist')
    }
  }

  /**
   * Toggle wishlist item
   */
  async toggleWishlist(productId: string, token: string): Promise<{ action: 'added' | 'removed'; item?: WishlistItem }> {
    try {
      const response = await fetch(`${this.baseUrl}/wishlist/toggle`, {
        method: 'POST',
        headers: this.getHeaders(token),
        body: JSON.stringify({ productId }),
      })

      if (!response.ok) throw new Error(`Failed: ${response.status}`)

      const data = await response.json()
      if (data.action === 'added') {
        return {
          action: 'added',
          item: {
            id: data.item.id,
            userId: data.item.userId,
            productId: data.item.productId,
            createdAt: data.item.createdAt,
            updatedAt: data.item.updatedAt,
            product: data.item.product,
          },
        }
      }
      return { action: 'removed' }
    } catch (error) {
      console.error('Error toggling wishlist:', error)
      throw new Error('Failed to update wishlist')
    }
  }

  /**
   * Check if product is in wishlist
   */
  async isInWishlist(productId: string, token: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/wishlist/check/${productId}`, {
        headers: this.getHeaders(token),
      })

      if (response.status === 404) return false
      if (!response.ok) throw new Error(`Failed: ${response.status}`)

      const data = await response.json()
      return data.inWishlist
    } catch (error) {
      console.error('Error checking wishlist:', error)
      return false
    }
  }

  /**
   * Get wishlist count
   */
  async getWishlistCount(token: string): Promise<number> {
    try {
      const response = await fetch(`${this.baseUrl}/wishlist/count`, {
        headers: this.getHeaders(token),
      })

      if (!response.ok) throw new Error(`Failed: ${response.status}`)

      const data = await response.json()
      return data.count
    } catch (error) {
      console.error('Error getting wishlist count:', error)
      return 0
    }
  }

  /**
   * Clear entire wishlist
   */
  async clearWishlist(token: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/wishlist/clear`, {
        method: 'DELETE',
        headers: this.getHeaders(token),
      })

      if (!response.ok) throw new Error(`Failed: ${response.status}`)
    } catch (error) {
      console.error('Error clearing wishlist:', error)
      throw new Error('Failed to clear wishlist')
    }
  }

  /**
   * Move wishlist item to cart
   */
  async moveToCart(productId: string, quantity: number = 1, token: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/wishlist/move-to-cart`, {
        method: 'POST',
        headers: this.getHeaders(token),
        body: JSON.stringify({ productId, quantity }),
      })

      if (!response.ok) throw new Error(`Failed: ${response.status}`)
    } catch (error) {
      console.error('Error moving to cart:', error)
      throw new Error('Failed to move item to cart')
    }
  }

  /**
   * Get wishlist with filters
   */
  async getWishlistWithFilters(
    token: string,
    filters: {
      category?: string
      sortBy?: 'name' | 'price' | 'dateAdded'
      sortOrder?: 'asc' | 'desc'
      limit?: number
      offset?: number
    } = {}
  ): Promise<{ items: WishlistItem[]; total: number; hasMore: boolean }> {
    try {
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, val]) => {
        if (val !== undefined) params.append(key, val.toString())
      })

      const response = await fetch(`${this.baseUrl}/wishlist?${params}`, {
        headers: this.getHeaders(token),
      })

      if (!response.ok) throw new Error(`Failed: ${response.status}`)

      const data = await response.json()
      return {
        items: data.items.map((item: WishlistResponse) => ({
          id: item.id,
          userId: item.userId,
          productId: item.productId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          product: item.product,
        })),
        total: data.total,
        hasMore: data.hasMore,
      }
    } catch (error) {
      console.error('Error fetching filtered wishlist:', error)
      throw new Error('Failed to fetch wishlist items')
    }
  }
}

// Singleton instance
export const wishlistAPI = new WishlistAPI()

// Local storage utilities
export const wishlistUtils = {
  getLocalWishlist(): string[] {
    if (typeof window === 'undefined') return []
    try {
      return JSON.parse(localStorage.getItem('wishlist') || '[]')
    } catch {
      return []
    }
  },
  saveLocalWishlist(ids: string[]) {
    if (typeof window !== 'undefined') localStorage.setItem('wishlist', JSON.stringify(ids))
  },
  addToLocalWishlist(id: string) {
    const list = this.getLocalWishlist()
    if (!list.includes(id)) {
      list.push(id)
      this.saveLocalWishlist(list)
    }
  },
  removeFromLocalWishlist(id: string) {
    this.saveLocalWishlist(this.getLocalWishlist().filter(pid => pid !== id))
  },
  isInLocalWishlist(id: string) {
    return this.getLocalWishlist().includes(id)
  },
  clearLocalWishlist() {
    if (typeof window !== 'undefined') localStorage.removeItem('wishlist')
  },
  async syncWithServer(token: string) {
    if (!token) return
    try {
      const localIds = this.getLocalWishlist()
      const serverItems = await wishlistAPI.getWishlist(token)
      const serverIds = serverItems.map(i => i.productId)

      for (const id of localIds) {
        if (!serverIds.includes(id)) {
          try {
            await wishlistAPI.addToWishlist(id, token)
          } catch (err) {
            console.warn(`Failed to sync product ${id}`, err)
          }
        }
      }
      this.saveLocalWishlist(serverIds)
    } catch (err) {
      console.error('Error syncing wishlist:', err)
    }
  },
}

export type { WishlistItem, Product }
