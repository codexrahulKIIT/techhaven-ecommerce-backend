'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, Heart, ExternalLink, AlertCircle } from 'lucide-react'
import { CartItem as CartItemType, useCart } from '@/context/CartContext'

interface CartItemProps {
  item: CartItemType
  showRemoveButton?: boolean
  showWishlistButton?: boolean
  isEditable?: boolean
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  showRemoveButton = true,
  showWishlistButton = true,
  isEditable = true
}) => {
  const { updateQuantity, removeFromCart } = useCart()
  const [isUpdating, setIsUpdating] = useState(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  // Calculate discount percentage
  const discountPercentage = item.originalPrice
    ? Math.round((1 - item.price / item.originalPrice) * 100)
    : 0

  // Handle quantity change
  const handleQuantityChange = async (newQuantity: number) => {
    if (!isEditable || isUpdating) return

    if (newQuantity < 1 || newQuantity > (item.stock ?? 0)) return

    setIsUpdating(true)
    try {
      await updateQuantity(item.productId, newQuantity)
    } catch (error) {
      console.error('Failed to update quantity:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  // Handle remove item
  const handleRemove = async () => {
    if (!showRemoveButton) return

    try {
      await removeFromCart(item.productId)
      setShowConfirmDelete(false)
    } catch (error) {
      console.error('Failed to remove item:', error)
    }
  }

  // Add to wishlist (placeholder)
  const handleAddToWishlist = () => {
    // Implement wishlist functionality
    console.log('Added to wishlist:', item.productId)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-lg overflow-hidden">
            {/* Placeholder image - replace with actual product image */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl opacity-50">📱</span>
            </div>

            {/* Stock status indicator */}
            {!item.isAvailable && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white text-xs font-medium px-2 py-1 bg-red-500 rounded">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-grow min-w-0">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {/* Product Info */}
            <div className="flex-grow">
              <div className="flex items-start justify-between mb-2">
                <Link
                  href={`/product/${item.productId}`}
                  className="font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2 group"
                >
                  {item.name}
                  <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity inline" />
                </Link>

                {/* Quick Actions */}
                <div className="flex items-center gap-1 ml-4">
                  {showWishlistButton && (
                    <button
                      onClick={handleAddToWishlist}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="Add to Wishlist"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  )}

                  {showRemoveButton && (
                    <button
                      onClick={() => setShowConfirmDelete(true)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-2">{item.category}</p>

              {/* Availability Status */}
              <div className="flex items-center gap-2 mb-3">
                {item.isAvailable ? (
                  <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    In Stock ({item.stock} available)
                  </span>
                ) : (
                  <span className="text-xs text-red-600 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-lg font-bold text-gray-800">
                  ₹{item.price.toLocaleString()}
                </span>

                {item.originalPrice && item.originalPrice > item.price && (
                  <>
                    <span className="text-sm text-gray-500 line-through">
                      ₹{item.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Quantity and Total */}
            <div className="flex flex-col items-end gap-3 sm:min-w-[120px]">
              {/* Item Total */}
              <div className="text-right">
                <div className="text-lg font-bold text-gray-800">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">
                  ₹{item.price.toLocaleString()} × {item.quantity}
                </div>
              </div>

              {/* Quantity Controls */}
              {isEditable && item.isAvailable && (
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(item.quantity - 1)}
                    disabled={item.quantity <= 1 || isUpdating}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <div className="px-3 py-2 text-center min-w-[50px] bg-gray-50 border-x border-gray-300">
                    <span className="font-medium">{item.quantity}</span>
                  </div>

                  <button
                    onClick={() => handleQuantityChange(item.quantity + 1)}
                    disabled={item.quantity >= (item.stock ?? 0) || isUpdating}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Stock Warning */}
              {item.quantity > (item.stock ?? 0) && (
                <div className="text-xs text-orange-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Limited stock
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Remove Item</h3>
            <p className="text-gray-600 mb-6">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Are you sure you want to remove "{item.name}" from your cart?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRemove}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartItem
