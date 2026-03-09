// frontend/types/category.ts (Create this file if it doesn't exist)
export interface Category {
  id: string
  name: string
  slug?: string
  description?: string
  image?: string
  icon?: string
  parentId?: string
  isActive?: boolean
  productCount?: number
  createdAt?: string
  updatedAt?: string
  children?: Category[]
}
