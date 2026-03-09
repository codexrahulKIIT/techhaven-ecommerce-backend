import { Category } from '@/types'
import { getBackendUrlSync } from '../utils/getBackendUrl'

const API_BASE_URL = getBackendUrlSync()
const getAdminToken = () =>
  typeof window !== 'undefined'
    ? localStorage.getItem('adminToken') || localStorage.getItem('authToken')
    : null

export interface CreateCategoryData {
  name: string
  description?: string
  image?: string
  parentId?: string
  isActive: boolean
}

export interface UpdateCategoryData extends Partial<CreateCategoryData> {}

/* Mock Categories for fallback when backend is unavailable - Hierarchical structure under "All" */
const mockCategories: Category[] = [
  {
    id: 'all',
    name: 'All',
    parentId: undefined,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    children: [
      { id: 'development-boards', name: 'Development Boards', parentId: 'all', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), children: [] },
      { id: 'power', name: 'Power', parentId: 'all', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), children: [] },
      { id: 'solar', name: 'Solar', parentId: 'all', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), children: [] },
      { id: 'battery-cells', name: 'Battery Cells', parentId: 'all', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), children: [] },
      { id: 'sensors', name: 'Sensors', parentId: 'all', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), children: [] },
      { id: 'modules', name: 'Modules', parentId: 'all', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), children: [] },
      { id: 'components', name: 'Components', parentId: 'all', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), children: [] },
      { id: 'smd', name: 'SMD', parentId: 'all', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), children: [] },
      { id: 'robotics', name: 'Robotics', parentId: 'all', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), children: [] },
      { id: 'projects', name: 'Projects', parentId: 'all', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), children: [] }
    ]
  }
];

// Get all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`)
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    const flatCategories: Category[] = await response.json();
    // Build tree from flat list with children already populated from relations
    return buildTree(flatCategories);
  } catch (error) {
    console.warn('Categories API unavailable, using mock data:', error);
    return mockCategories;
  }
}

// Build hierarchical tree from flat categories (assuming children are pre-loaded)
function buildTree(flatCategories: Category[]): Category[] {
  const categoryMap = new Map<string, Category>();
  flatCategories.forEach(cat => {
    cat.children = cat.children || [];
    categoryMap.set(cat.id, cat);
  });

  const roots: Category[] = [];
  flatCategories.forEach(cat => {
    if (cat.parentId) {
      const parent = categoryMap.get(cat.parentId);
      if (parent) {
        parent.children!.push(cat);
      }
    } else {
      roots.push(cat);
    }
  });

  // Sort children by name
  roots.forEach(root => {
    root.children?.sort((a, b) => a.name.localeCompare(b.name));
  });

  return roots;
}

// Get category by ID
export async function getCategory(id: string): Promise<Category> {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch category')
  }
  return response.json()
}

// Create new category
export async function createCategory(data: CreateCategoryData): Promise<Category> {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(getAdminToken() ? { Authorization: `Bearer ${getAdminToken()}` } : {})
    },
    body: JSON.stringify(data)
  })
  
  if (!response.ok) {
    throw new Error('Failed to create category')
  }
  return response.json()
}

// Update category
export async function updateCategory(id: string, data: UpdateCategoryData): Promise<Category> {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(getAdminToken() ? { Authorization: `Bearer ${getAdminToken()}` } : {})
    },
    body: JSON.stringify(data)
  })
  
  if (!response.ok) {
    throw new Error('Failed to update category')
  }
  return response.json()
}

// Delete category
export async function deleteCategory(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: 'DELETE',
    headers: {
      ...(getAdminToken() ? { Authorization: `Bearer ${getAdminToken()}` } : {})
    }
  })
  
  if (!response.ok) {
    throw new Error('Failed to delete category')
  }
}

// Get categories with products count
export async function getCategoriesWithCount(): Promise<Category[]> {
  const response = await fetch(`${API_BASE_URL}/categories?includeCount=true`)
  if (!response.ok) {
    throw new Error('Failed to fetch categories with count')
  }
  return response.json()
}
