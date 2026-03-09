"use client"

import Image from "next/image"
import { useState } from "react"
import type { WishlistItem } from "@/types"
import { wishlistAPI, wishlistUtils } from "@/lib/wishlist"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trash2, ShoppingCart } from "lucide-react"

interface WishlistItemProps {
  item: WishlistItem
  viewMode: "grid" | "list"
  isSelected: boolean
  onSelect: (selected: boolean) => void
  onRemove: () => Promise<void>
  onAddToCart: () => Promise<void>
}

export default function WishlistItem({
  item,
  viewMode,
  isSelected,
  onSelect,
  onRemove,
  onAddToCart,
}: WishlistItemProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleRemove = async () => {
    setLoading(true)
    try {
      await onRemove()
    } catch (err) {
      console.error("Failed to remove item:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleMoveToCart = async () => {
    setLoading(true)
    try {
      await onAddToCart()
      router.push("/cart")
    } catch (err) {
      console.error("Failed to move item to cart:", err)
    } finally {
      setLoading(false)
    }
  }

  let imageSrc = 'https://via.placeholder.com/80x80?text=No+Image'
  if (item.product?.images) {
    let imageArray: string[]
    if (typeof item.product.images === 'string') {
      try {
        imageArray = JSON.parse(item.product.images)
      } catch {
        imageArray = [item.product.images]
      }
    } else {
      imageArray = item.product.images
    }
    let image = imageArray[0]
    if (image) {
      // Handle if image is an array
      if (Array.isArray(image)) {
        image = image[0]
      }
      // Handle nested JSON strings like '["speaker.jpg"]'
      if (typeof image === 'string' && image.startsWith('[')) {
        try {
          const parsed = JSON.parse(image)
          if (Array.isArray(parsed)) {
            image = parsed[0]
          }
        } catch {}
      }
      if (image.startsWith('http')) {
        imageSrc = image
      } else if (image.startsWith('/')) {
        imageSrc = image
      } else {
        imageSrc = '/' + image
      }
    }
  }

  return (
    <div className="flex items-center gap-4 p-4 border rounded-2xl shadow-sm bg-white">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={(e) => onSelect(e.target.checked)}
        className="w-4 h-4"
      />

      {/* Product Image */}
      <Image
        src={imageSrc}
        alt={item.product?.name || "Product"}
        width={80}
        height={80}
        className="w-20 h-20 rounded-xl object-cover"
      />

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">
          {item.product?.name || "Unknown Product"}
        </h3>
        <p className="text-sm text-gray-500">{typeof item.product?.category === 'object' && item.product.category?.name ? item.product.category.name : ''}</p>
        <p className="mt-1 font-medium text-gray-900">
          ₹{item.product?.price?.toFixed(2) || "0.00"}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={handleMoveToCart}
          disabled={loading}
        >
          <ShoppingCart className="w-4 h-4 mr-1" />
          Move to Cart
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={handleRemove}
          disabled={loading}
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Remove
        </Button>
      </div>
    </div>
  )
}
