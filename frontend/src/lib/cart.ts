import { CartItem } from '@/context/CartContext'
import { getBackendUrlSync } from '../utils/getBackendUrl'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || getBackendUrlSync()

// Types for API responses
interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

interface CartResponse {
  id: string
  userId: string
  items: CartItem[]
  totalAmount: number
  totalItems: number
  createdAt: string
  updatedAt: string
}

interface AddToCartRequest {
  productId: string
  quantity: number
}

interface UpdateQuantityRequest {
  productId: string
  quantity: number
}

// API Helper Class
class CartAPI {
  private async fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem('authToken')
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`)
    }

    return response.json()
  }

  // Get current user's cart
  async getCart(): Promise<CartItem[]> {
    try {
      const response: ApiResponse<CartResponse> = await this.fetchWithAuth('/cart')
      return response.data.items || []
    } catch (error) {
      console.error('Error fetching cart:', error)
      // Return empty cart on error (graceful fallback)
      return []
    }
  }

  // Add item to cart
  async addItem(productId: string, quantity: number = 1): Promise<CartItem> {
    const requestData: AddToCartRequest = { productId, quantity }
    
    const response: ApiResponse<CartItem> = await this.fetchWithAuth('/cart/add', {
      method: 'POST',
      body: JSON.stringify(requestData),
    })

    if (!response.success) {
      throw new Error(response.error || 'Failed to add item to cart')
    }

    return response.data
  }

  // Update item quantity
  async updateQuantity(productId: string, quantity: number): Promise<CartItem> {
    const requestData: UpdateQuantityRequest = { productId, quantity }
    
    const response: ApiResponse<CartItem> = await this.fetchWithAuth('/cart/update', {
      method: 'PUT',
      body: JSON.stringify(requestData),
    })

    if (!response.success) {
      throw new Error(response.error || 'Failed to update quantity')
    }

    return response.data
  }

  // Remove item from cart
  async removeItem(productId: string): Promise<boolean> {
    const response: ApiResponse<boolean> = await this.fetchWithAuth(`/cart/remove/${productId}`, {
      method: 'DELETE',
    })

    if (!response.success) {
      throw new Error(response.error || 'Failed to remove item')
    }

    return response.data
  }

  // Clear entire cart
  async clearCart(): Promise<boolean> {
    const response: ApiResponse<boolean> = await this.fetchWithAuth('/cart/clear', {
      method: 'DELETE',
    })

    if (!response.success) {
      throw new Error(response.error || 'Failed to clear cart')
    }

    return response.data
  }

  // Get cart summary (totals, shipping, tax)
  async getCartSummary(): Promise<{
    totalItems: number
    totalAmount: number
    shipping: number
    tax: number
    finalAmount: number
  }> {
    const response = await this.fetchWithAuth('/cart/summary')
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to get cart summary')
    }

    return response.data
  }

  // Apply coupon/discount code
  async applyCoupon(couponCode: string): Promise<{
    discount: number
    couponCode: string
    isValid: boolean
  }> {
    const response = await this.fetchWithAuth('/cart/coupon', {
      method: 'POST',
      body: JSON.stringify({ couponCode }),
    })

    if (!response.success) {
      throw new Error(response.error || 'Invalid coupon code')
    }

    return response.data
  }

  // Remove applied coupon
  async removeCoupon(): Promise<boolean> {
    const response = await this.fetchWithAuth('/cart/coupon', {
      method: 'DELETE',
    })

    return response.success
  }

  // Sync guest cart with user cart (after login)
  async syncGuestCart(guestCartItems: CartItem[]): Promise<CartItem[]> {
    const response: ApiResponse<CartResponse> = await this.fetchWithAuth('/cart/sync', {
      method: 'POST',
      body: JSON.stringify({ items: guestCartItems }),
    })

    if (!response.success) {
      throw new Error(response.error || 'Failed to sync cart')
    }

    return response.data.items
  }

  // Check product availability and stock
  async checkAvailability(productIds: string[]): Promise<{
    [productId: string]: {
      isAvailable: boolean
      stock: number
      price: number
    }
  }> {
    const response = await this.fetchWithAuth('/cart/check-availability', {
      method: 'POST',
      body: JSON.stringify({ productIds }),
    })

    if (!response.success) {
      throw new Error(response.error || 'Failed to check availability')
    }

    return response.data
  }
}

// Export singleton instance
export const cartAPI = new CartAPI()

// Utility functions for cart calculations
export const cartUtils = {
  // Calculate shipping based on TechHaven Store rules
  calculateShipping: (totalAmount: number): number => {
    if (totalAmount >= 999) return 0  // Free shipping above ₹999
    if (totalAmount >= 199) return 50 // ₹50 shipping for orders above ₹199
    return 0 // No shipping for orders below minimum (₹199)
  },

  // Calculate GST (18%)
  calculateTax: (totalAmount: number): number => {
    return Math.round(totalAmount * 0.18)
  },

  // Check if order meets minimum requirement (₹199)
  isValidOrder: (totalAmount: number): boolean => {
    return totalAmount >= 199
  },

  // Format currency for display
  formatPrice: (amount: number): string => {
    return `₹${amount.toLocaleString('en-IN')}`
  },

  // Calculate total savings
  calculateSavings: (items: CartItem[]): number => {
    return items.reduce((savings, item) => {
      if (item.originalPrice && item.originalPrice > item.price) {
        return savings + ((item.originalPrice - item.price) * item.quantity)
      }
      return savings
    }, 0)
  },

  // Group items by category for organized display
  groupByCategory: (items: CartItem[]): { [category: string]: CartItem[] } => {
    return items.reduce((groups, item) => {
      const category = item.category || 'Uncategorized'
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(item)
      return groups
    }, {} as { [category: string]: CartItem[] })
  },

  // Validate cart before checkout
  validateCart: (items: CartItem[]): {
    isValid: boolean
    errors: string[]
    warnings: string[]
  } => {
    const errors: string[] = []
    const warnings: string[] = []

    // Check if cart is empty
    if (items.length === 0) {
      errors.push('Your cart is empty')
      return { isValid: false, errors, warnings }
    }

    // Check minimum order amount
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    if (totalAmount < 199) {
      errors.push('Minimum order amount is ₹199')
    }

    // Check stock availability
    items.forEach(item => {
      if (!item.isAvailable) {
        errors.push(`${item.name} is currently out of stock`)
      } else if (item.stock !== undefined && item.quantity > item.stock) {
        errors.push(`Only ${item.stock} units of ${item.name} are available`)
      } else if (item.stock !== undefined && item.stock <= 5 && item.quantity > item.stock - 2) {
        warnings.push(`${item.name} has limited stock remaining`)
      }
    })

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }
  }
}

// Error handling utilities
export class CartError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number
  ) {
    super(message)
    this.name = 'CartError'
  }
}

// Helper function to handle API errors consistently
export const handleCartError = (error: unknown): CartError => {
  if (error instanceof CartError) {
    return error
  }

  if (error instanceof Error) {
    return new CartError(error.message, 'UNKNOWN_ERROR')
  }

  return new CartError('An unknown error occurred', 'UNKNOWN_ERROR')
}

// Export default
export default cartAPI
