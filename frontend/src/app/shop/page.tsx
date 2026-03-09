// File: src/app/shop/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { api } from '@/lib/api'
import type { Category } from '@/types/category'
import type { Product } from '@/types'
import { Heart, ShoppingCart, Star, Filter, List, Grid, X, ChevronDown, Search } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'

const FALLBACK_IMAGE = '/placeholder.svg'

function ShopContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
  const [sortBy, setSortBy] = useState('popular')
  const [inStockOnly, setInStockOnly] = useState(false)

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    loadProducts()
    // eslint-disable-next-line
  }, [searchQuery, selectedCategory, sortBy])

  const loadCategories = async () => {
    try {
      const cats = await api.getCategories()
      setCategories([{ id: 'all', name: 'All Products' }, ...(cats || [])])
    } catch (error) {
      console.error('Failed to load categories:', error)
    }
  }

  const loadProducts = async () => {
    try {
      setLoading(true)
      const params: any = {}
      if (searchQuery) params.search = searchQuery
      if (selectedCategory && selectedCategory !== 'all') params.category = selectedCategory

      const response = await api.getProducts(params)
      setProducts(response.products || [])
    } catch (error) {
      toast.error('Failed to load products')
      console.error('Load products error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId)
    if (product) {
      if ((product.stock ?? 0) <= 0) {
        toast.error('Product is out of stock')
        return
      }
      addToCart(product)
      toast.success(`${product.name} added to cart!`)
    }
  }

  const handleToggleWishlist = (productId: string) => {
    const product = products.find(p => p.id === productId)
    if (!product) return

    if (isInWishlist(productId)) {
      removeFromWishlist(productId)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist(product)
      toast.success('Added to wishlist')
    }
  }

  const filteredProducts = products
    .filter(product => {
      if (inStockOnly && (product.stock ?? 0) <= 0) return false
      if (product.price < priceRange.min || product.price > priceRange.max) return false
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        default:
          return 0
      }
    })

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    loadProducts()
  }

  const handleImageError = (productId: string) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }))
  }

  const getImageUrl = (product: Product): string => {
    if (imageErrors[product.id]) {
      return FALLBACK_IMAGE
    }
    const imageUrl = product.images?.[0] || FALLBACK_IMAGE
    return imageUrl.replace(/^\{|\}$/g, '')
  }

  const clearFilters = () => {
    setSelectedCategory('all')
    setPriceRange({ min: 0, max: 10000 })
    setInStockOnly(false)
    setSearchQuery('')
    setSortBy('popular')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Shop Electronics
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Browse our extensive collection of electronic components and development boards
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 mb-4 md:mb-6">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
            {/* Category Filter */}
            <div className="lg:w-48">
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </form>

            {/* View Mode & Filters */}
            <div className="flex gap-2 items-center justify-between lg:justify-start">
              <div className="flex gap-2">
                <button
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <List className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              <button
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          {/* Sidebar Filters */}
          <aside className={`
            lg:w-64 
            ${showFilters ? 'block' : 'hidden lg:block'}
            ${showFilters ? 'fixed inset-0 z-50 lg:relative lg:z-auto' : ''}
          `}>
            {/* Mobile Overlay */}
            {showFilters && (
              <div 
                className="lg:hidden absolute inset-0 bg-black bg-opacity-50"
                onClick={() => setShowFilters(false)}
              />
            )}

            {/* Filter Panel */}
            <div className={`
              bg-white rounded-lg shadow-lg p-4 sm:p-6 
              ${showFilters ? 'fixed left-0 top-0 bottom-0 w-80 max-w-[90%] overflow-y-auto z-50 lg:relative lg:w-full' : 'lg:sticky lg:top-4'}
            `}>
              {/* Mobile Header */}
              <div className="lg:hidden flex items-center justify-between mb-4 pb-4 border-b">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block font-semibold text-gray-900 mb-3 text-sm">
                  Price Range
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="number"
                    min={0}
                    max={priceRange.max}
                    value={priceRange.min}
                    onChange={e => setPriceRange(r => ({ ...r, min: Number(e.target.value) }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    placeholder="Min"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    min={priceRange.min}
                    value={priceRange.max}
                    onChange={e => setPriceRange(r => ({ ...r, max: Number(e.target.value) }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    placeholder="Max"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>₹{priceRange.min}</span>
                  <span>₹{priceRange.max}</span>
                </div>
              </div>

              {/* Stock Filter */}
              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={e => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    In Stock Only
                  </span>
                </label>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <label className="block font-semibold text-gray-900 mb-3 text-sm">
                  Sort By
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Products Grid/List */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 mb-4 md:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="font-semibold text-gray-900 text-sm sm:text-base">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </span>
              <span className="text-xs sm:text-sm text-gray-500">
                {selectedCategory && selectedCategory !== 'all'
                  ? categories.find(c => c.id === selectedCategory)?.name
                  : 'All Categories'}
              </span>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                    <div className="aspect-square bg-gray-200"></div>
                    <div className="p-3 sm:p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {filteredProducts.map(product => (
                  <ProductCardGrid
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                    isInWishlist={isInWishlist(product.id)}
                    getImageUrl={getImageUrl}
                    onImageError={handleImageError}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <ProductCardList
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                    isInWishlist={isInWishlist(product.id)}
                    getImageUrl={getImageUrl}
                    onImageError={handleImageError}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

// Grid View Product Card
function ProductCardGrid({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  getImageUrl,
  onImageError
}: {
  product: Product
  onAddToCart: (id: string) => void
  onToggleWishlist: (id: string) => void
  isInWishlist: boolean
  getImageUrl: (product: Product) => string
  onImageError: (id: string) => void
}) {
  const router = useRouter()

  return (
    <div data-testid="product-card" className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={() => router.push(`/product/${product.id}`)}
        >
          <Image
            src={getImageUrl(product)}
            alt={product.name}
            fill
            className="object-contain p-2 sm:p-4 group-hover:scale-110 transition-transform duration-300"
            onError={() => onImageError(product.id)}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        {/* Stock Badge */}
        {(product.stock ?? 0) <= 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold z-10 shadow-lg">
            Out of Stock
          </div>
        )}

        {/* Discount Badge */}
        {product.discount && product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-[10px] sm:text-xs font-bold z-10 shadow-lg">
            -{product.discount}%
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist(product.id)}
          className={`absolute bottom-2 right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg transition-all z-10 opacity-0 group-hover:opacity-100 ${
            isInWishlist
              ? 'bg-red-500 text-white'
              : 'bg-white text-gray-600 hover:bg-red-50'
          }`}
        >
          <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        {/* Product Name */}
        <h3
          className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer text-sm sm:text-base mb-2 min-h-[2.5rem] sm:min-h-[3rem]"
          onClick={() => router.push(`/product/${product.id}`)}
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                  i < Math.floor(product.rating || 4.5)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] sm:text-xs text-gray-500">
            ({product.rating || 4.5})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg sm:text-xl font-bold text-blue-600">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs sm:text-sm text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="text-[10px] sm:text-xs mb-3">
          {(product.stock ?? 0) > 0 ? (
            <span className="text-green-600 font-medium">
              ✓ In Stock ({product.stock ?? 0} available)
            </span>
          ) : (
            <span className="text-red-600 font-medium">✗ Out of Stock</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product.id)}
          disabled={(product.stock ?? 0) <= 0}
          className="w-full bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-xs sm:text-sm mt-auto"
        >
          <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>{(product.stock ?? 0) > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
      </div>
    </div>
  )
}

// List View Product Card
function ProductCardList({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  getImageUrl,
  onImageError
}: {
  product: Product
  onAddToCart: (id: string) => void
  onToggleWishlist: (id: string) => void
  isInWishlist: boolean
  getImageUrl: (product: Product) => string
  onImageError: (id: string) => void
}) {
  const router = useRouter()

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col sm:flex-row gap-4 p-4">
      {/* Product Image */}
      <div className="relative w-full sm:w-48 aspect-square sm:aspect-auto sm:h-48 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={() => router.push(`/product/${product.id}`)}
        >
          <Image
            src={getImageUrl(product)}
            alt={product.name}
            fill
            className="object-contain p-4 hover:scale-105 transition-transform duration-300"
            onError={() => onImageError(product.id)}
            sizes="(max-width: 640px) 100vw, 192px"
          />
        </div>

        {/* Stock Badge */}
        {(product.stock ?? 0) <= 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3
            className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => router.push(`/product/${product.id}`)}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating || 4.5)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.rating || 4.5})</span>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Stock Status */}
          <div className="text-sm mb-3">
            {(product.stock ?? 0) > 0 ? (
              <span className="text-green-600 font-medium">
                ✓ In Stock ({product.stock ?? 0} available)
              </span>
            ) : (
              <span className="text-red-600 font-medium">✗ Out of Stock</span>
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={() => onToggleWishlist(product.id)}
              className={`w-10 h-10 border rounded-lg flex items-center justify-center transition-all ${
                isInWishlist
                  ? 'bg-red-50 border-red-300 text-red-500'
                  : 'border-gray-300 hover:bg-gray-50 text-gray-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => onAddToCart(product.id)}
              disabled={(product.stock ?? 0) <= 0}
              className="flex-1 sm:w-40 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{(product.stock ?? 0) > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  )
}
