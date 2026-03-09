'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Category } from '@/types/category';
import { getCategories } from '@/lib/categories';

interface SidebarCategoriesProps {
  categories?: Category[];
  className?: string;
}

const SidebarCategories: React.FC<SidebarCategoriesProps> = ({ categories: propCategories, className = '' }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      if (propCategories && propCategories.length > 0) {
        setCategories(propCategories);
        setLoading(false);
        return;
      }

      try {
        const response = await getCategories();
        // Extract subcategories from root "All"
        const subCategories = response.length > 0 ? response[0]?.children || [] : [];
        setCategories(subCategories);
      } catch (error) {
        console.error('Failed to load categories:', error);
        // Fallback to hardcoded subcategories under "All"
        setCategories([
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
        ] as Category[]);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, [propCategories]);

  if (loading) {
    return (
      <aside className={`w-64 bg-white shadow-lg ${className}`}>
        <div className="p-4">
          <div className="animate-pulse bg-gray-200 h-6 rounded mb-4"></div>
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-3/4"></div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`w-64 bg-white shadow-lg border-r border-gray-200 ${className}`}>
      <nav className="h-full">
        <ul className="py-4">
          {categories.map((category) => {
            // Updated mapping for new category names
            let displayName = category.name;
            if (category.name === 'Battery Cells') displayName = 'Battery Cells';
            if (category.name === 'SMD') displayName = 'SMD';
            // No need for complex mapping as names now match directly

            const slug = category.slug || category.name.toLowerCase().replace(/\s+/g, '-');

            return (
              <li key={category.id} className="border-b border-gray-100 last:border-b-0">
                <Link
                  href={`/shop?category=${slug}&categoryId=${category.id}`}
                  className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 font-medium text-sm"
                >
                  {displayName}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarCategories;

