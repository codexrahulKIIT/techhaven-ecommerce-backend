'use client'
import React from 'react'
import { FiX, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const money = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart()

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />}

      <div
        className={`fixed right-0 top-0 h-full w-96 max-w-[90vw] bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Shopping Cart ({totalItems})</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close cart">
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <FiShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-3">Your cart is empty</p>
                <Link href="/shop" className="text-blue-700 hover:underline" onClick={onClose}>
                  Continue Shopping
                </Link>
              </div>
            ) : (
              items.map(item => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="w-16 h-16 relative rounded overflow-hidden bg-gray-100">
                    <Image
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{item.name}</h3>
                    <p className="text-blue-700 font-semibold">{money(item.price)}</p>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-xs text-red-600 hover:underline mt-1"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                      aria-label="Decrease quantity"
                    >
                      <FiMinus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                      aria-label="Increase quantity"
                    >
                      <FiPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span>{money(totalPrice)}</span>
              </div>

              <div className="space-y-2">
                <Link
                  href="/checkout"
                  className="w-full bg-blue-700 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors block text-center"
                  onClick={onClose}
                >
                  Checkout
                </Link>
                <Link
                  href="/cart"
                  className="w-full border border-blue-700 text-blue-700 py-3 rounded-lg font-medium hover:bg-blue-700 hover:text-white transition-colors block text-center"
                  onClick={onClose}
                >
                  View Cart
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
