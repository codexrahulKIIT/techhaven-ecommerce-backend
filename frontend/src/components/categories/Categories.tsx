'use client'

import Link from 'next/link'
import type { Category } from '@/types'

interface CategoriesProps {
  categories: Category[]
  loading: boolean
}

const fallback = [
  { id: 'development-boards', name: 'Development Boards', icon: '🔧' },
  { id: 'sensors-modules', name: 'Sensors & Modules', icon: '📡' },
  { id: 'components', name: 'Components', icon: '⚡' },
  { id: 'robotics', name: 'Robotics', icon: '🤖' },
]

export default function Categories({ categories, loading }: CategoriesProps) {
  const display = categories.length > 0 ? categories : fallback

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-pulse">
                <div className="w-12 h-12 bg-slate-200 rounded-full mb-4" />
                <div className="h-4 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-700 font-semibold">Catalog</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Shop by Category</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {display.map((category: any) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug || category.id}`}
              className="group rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 text-2xl flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                {category.icon || '📦'}
              </div>
              <h3 className="font-semibold text-slate-900 text-sm sm:text-base">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
