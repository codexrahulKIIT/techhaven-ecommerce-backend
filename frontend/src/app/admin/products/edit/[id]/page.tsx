'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ProductForm from '@/components/admin/ProductForm'
import { getProductById } from '@/lib/products'

export default function AdminEditProductPage() {
  const params = useParams<{ id: string }>()
  const [product, setProduct] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const loadProduct = async () => {
      try {
        const response = await getProductById(params.id)
        if (!active) return

        if (response.success) {
          setProduct(response.data)
        } else {
          setError(response.message || 'Failed to load product')
        }
      } catch {
        if (active) {
          setError('Failed to load product')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    if (params.id) {
      loadProduct()
    }

    return () => {
      active = false
    }
  }, [params.id])

  if (loading) {
    return <div className="p-6">Loading product...</div>
  }

  if (error || !product) {
    return <div className="p-6 text-red-600">{error || 'Product not found'}</div>
  }

  return <ProductForm product={product} isEdit />
}
