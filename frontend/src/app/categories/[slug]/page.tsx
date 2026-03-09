'use client'

import { notFound } from 'next/navigation'
import { useEffect, useState, use } from 'react'
import ProductsContent from '../../products/ProductsContent'
import { Category } from '@/types/index'
import { getBackendUrl } from '@/utils/getBackendUrl'
import { getProductsByCategory, getCategoryBySlug } from '@/data/categories/index'

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params // destructure slug once
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [localProducts, setLocalProducts] = useState<any[]>([])

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        // Check if we have local data for this category
        const localCategory = getCategoryBySlug(slug)
        if (localCategory) {
          const localProducts = getProductsByCategory(localCategory.id)
          // Use local data even if empty (category exists but no products yet)
          setCategory(localCategory)
          setLocalProducts(localProducts || [])
          setLoading(false)
          return
        }

        // Fallback to backend API only if no local category exists
        const backendUrl = await getBackendUrl()
        const res = await fetch(`${backendUrl}/categories/slug/${slug}`)
        if (!res.ok) {
          notFound()
          return
        }
        const data = await res.json()
        setCategory(data)
      } catch {
        notFound()
      } finally {
        setLoading(false)
      }
    }
    fetchCategory()
  }, [slug]) // use slug directly here

  const getCategoryName = (slug: string): string => {
    const nameMap: { [key: string]: string } = {
      'development-boards': 'Development Boards',
      'power': 'Power Supply & Solar',
      'battery-cells': 'Battery & Cells',
      'sensors': 'Sensors and Modules',
      'components': 'Components',
      'smd': 'SMD',
      'robotics': 'Robotics',
      'projects': 'Projects'
    }
    return nameMap[slug] || slug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!category) {
    notFound()
  }

  const subItems = slug === 'development-boards' ? [
    'Accessories',
    'Compatible with Arduino Boards',
    'Beagle Bone',
    'Development',
    'Programmer',
    'Raspberry Pi',
    'STM Board',
    'ESP Board'
  ] : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {subItems.length > 0 && (
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">TechHaven Technologies</h2>
              <ul className="space-y-2">
                {subItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={`/categories/development-boards?sub=${encodeURIComponent(item)}`}
                      className="block text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">{category.name}</h1>
          <p className="text-gray-600 mb-8">Explore products in this category.</p>
          {localProducts.length > 0 ? (
            <ProductsContent
              products={localProducts}
            />
          ) : (
            <ProductsContent
              initialCategory={category.id}
            />
          )}
        </div>
      </div>
    </div>
  )
}
