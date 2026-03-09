import Link from 'next/link'
import { Category } from '../../types/category'

interface CategoryCardProps {
  category: Category
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link href={`/shop?category=${category.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl hover:bg-gray-50 hover:scale-105 transition-all duration-300 p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
        {category.description && (
          <p className="text-gray-600 mb-4">{category.description}</p>
        )}
        {category.productCount !== undefined && (
          <p className="text-sm text-blue-600 font-medium">{category.productCount} products</p>
        )}
      </div>
    </Link>
  )
}

export default CategoryCard

