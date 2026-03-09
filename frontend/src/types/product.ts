export interface Product {
  id: string;
  name: string;
  // Optional descriptive fields - many components provide partial product objects
  description?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  stock?: number;
  inStock?: boolean;
  images?: string[];
  // Some components use a singular 'image' property
  image?: string;
  categoryId?: string;
  // Some components use 'category' as a string or object
  category?: string | { id: string; name: string };
  rating?: number;
  reviewCount?: number;
  createdAt?: string;
  updatedAt?: string;
  // Additional properties from data files
  isBestSeller?: boolean;
  isNew?: boolean;
  sku?: string;
  tags?: string[];
  specifications?: Record<string, any>;
  // For cart and wishlist compatibility
  quantity?: number;
  // Additional properties from products.ts
  reviews?: any[];
  features?: string[];
  warranty?: string;
  returnPolicy?: string;
}
