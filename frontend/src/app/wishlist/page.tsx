'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Heart,
  ShoppingCart,
  ArrowLeft,
  Trash2,
  Share2,
  Filter,
  SortAsc,
  Grid3X3,
  List,
  Search
} from 'lucide-react'
import WishlistItemComponent from '@/components/wishlist/WishlistItem'
import { useWishlist } from '@/context/WishlistContext'
import { useCart } from '@/context/CartContext'
import type { WishlistItem, Product } from '@/types'

export default function WishlistPage() {
  const { items: wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'dateAdded'>('dateAdded')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const handleRemoveItem = async (productId: string) => {
    removeFromWishlist(productId)
    setSelectedItems(prev => prev.filter(id => id !== productId))
  }

  const handleAddToCart = async (productId: string) => {
    const item = wishlistItems.find(item => item.productId === productId)
    if (item && item.product) {
      addToCart(item.product)
    }
  }

  const handleAddAllToCart = () => {
    const itemsToAdd = selectedItems.length > 0
      ? wishlistItems.filter(item => selectedItems.includes(item.productId))
      : wishlistItems

    for (const item of itemsToAdd) {
      if (item.product) {
        addToCart(item.product)
      }
    }
    setSelectedItems([])
  }

  const handleRemoveSelected = () => {
    if (selectedItems.length === 0) return

    for (const productId of selectedItems) {
      removeFromWishlist(productId)
    }
    setSelectedItems([])
  }

  const handleSelectItem = (productId: string, selected: boolean) => {
    if (selected) {
      setSelectedItems(prev => [...prev, productId])
    } else {
      setSelectedItems(prev => prev.filter(id => id !== productId))
    }
  }

  const handleSelectAll = (selectAll: boolean) => {
    if (selectAll) {
      setSelectedItems(filteredAndSortedItems.map(item => item.productId))
    } else {
      setSelectedItems([])
    }
  }

  const handleShareWishlist = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My TechHaven Wishlist',
          text: `Check out my wishlist with ${wishlistItems.length} amazing products!`,
          url: window.location.href
        })
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href)
        alert('Wishlist link copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing wishlist:', error)
    }
  }

  // Filter and sort items
  const filteredAndSortedItems = wishlistItems
    .filter(item => {
      const matchesSearch = item.product?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.product?.description?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = filterCategory === 'all' || item.product?.categoryId === filterCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.product?.name || '').localeCompare(b.product?.name || '')
        case 'price':
          return (a.product?.price || 0) - (b.product?.price || 0)
        case 'dateAdded':
        default:
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      }
    })

  // Get unique categories for filter
  const categories = Array.from(new Set(
    wishlistItems.map(item => item.product?.categoryId).filter(Boolean)
  ))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Shopping
              </Link>
              <div className="hidden md:block w-px h-6 bg-gray-300"></div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">My Wishlist</h1>
                <p className="text-gray-600">
                  {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
                </p>
              </div>
            </div>
            
            {wishlistItems.length > 0 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleShareWishlist}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden md:inline">Share</span>
                </button>
                
                {selectedItems.length > 0 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleAddAllToCart}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add Selected to Cart
                    </button>
                    <button
                      onClick={handleRemoveSelected}
                      className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove Selected
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        // Empty State
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">
              Save items you love by clicking the heart icon. We&apos;ll keep them safe here for you.
            </p>
            <Link 
              href="/shop"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              Start Shopping
              <ShoppingCart className="w-5 h-5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          {/* Filters and Controls */}
          <div className="bg-white rounded-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search your wishlist..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Category Filter */}
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map(categoryId => (
                    <option key={categoryId} value={categoryId}>
                      Category {categoryId}
                    </option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="dateAdded">Recently Added</option>
                  <option value="name">Name A-Z</option>
                  <option value="price">Price Low-High</option>
                </select>

                {/* View Mode */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bulk Actions */}
            {filteredAndSortedItems.length > 0 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredAndSortedItems.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">
                    Select All ({filteredAndSortedItems.length} items)
                  </span>
                </label>

                {selectedItems.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {selectedItems.length} selected
                    </span>
                    <button
                      onClick={handleAddAllToCart}
                      className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={handleRemoveSelected}
                      className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Wishlist Items */}
          {filteredAndSortedItems.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No items found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredAndSortedItems.map((item) => (
                <WishlistItemComponent
                  key={`${item.productId}-${item.id}`}
                  item={item}
                  viewMode={viewMode}
                  isSelected={selectedItems.includes(item.productId)}
                  onSelect={(selected) => handleSelectItem(item.productId, selected)}
                  onRemove={() => handleRemoveItem(item.productId)}
                  onAddToCart={() => handleAddToCart(item.productId)}
                />
              ))}
            </div>
          )}

          {/* Summary */}
          {filteredAndSortedItems.length > 0 && (
            <div className="bg-white rounded-lg p-6 mt-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Wishlist Summary</h3>
                  <p className="text-gray-600">
                    Total items: {filteredAndSortedItems.length} | 
                    Total value: ₹{filteredAndSortedItems.reduce((sum, item) => sum + (item.product?.price || 0), 0).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={handleAddAllToCart}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add All to Cart
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}