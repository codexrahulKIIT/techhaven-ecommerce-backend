'use client'

import Link from 'next/link'
import { Category } from '@/lib/api'

interface HorizontalCategoriesProps {
  categories: Category[]
  selectedCategory?: string
  onCategorySelect?: (categoryId: string) => void
}

export default function HorizontalCategories({ categories, selectedCategory, onCategorySelect }: HorizontalCategoriesProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 bg-white">
      <div className="flex overflow-x-auto space-x-1 pb-2 scrollbar-hide">
        <button
          onClick={() => onCategorySelect?.('')}
          className={`category-tab whitespace-nowrap ${
            !selectedCategory ? 'category-tab-active' : 'category-tab-inactive'
          }`}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect?.(category.id)}
            className={`category-tab whitespace-nowrap ${
              selectedCategory === category.id ? 'category-tab-active' : 'category-tab-inactive'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}
