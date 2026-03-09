import { Product } from './product'
export type { Category } from './category'
export type { Product } from './product'

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// B2B Types
export type B2BStatus = "pending" | "approved" | "rejected";

export interface B2BRequest {
  id: string;
  userId?: string;
  company: string;
  email: string;
  phone?: string;
  details: string;
  status: B2BStatus;
  user?: any;
  createdAt: string;
  updatedAt: string;
}

// Analytics Types
export interface ChartSales {
  date: string;
  total: number;
}

export interface ChartTopProduct {
  name: string;
  sales: number;
}

export interface ChartLowStock {
  name: string;
  stock: number;
}

// Wishlist Types
export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  product?: Product;
}

// Order Types
export type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";
export type PaymentStatus = "pending" | "success" | "failed";

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product?: Product;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentProvider?: string;
  paymentId?: string;
  createdAt: string;
  updatedAt: string;
}

// Cart Types
export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product?: Product;
  // Additional properties from cart usage
  originalPrice?: number;
  stock?: number;
  isAvailable?: boolean;
  category?: string;
}
