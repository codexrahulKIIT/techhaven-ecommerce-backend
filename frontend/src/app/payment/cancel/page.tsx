'use client'

import Link from 'next/link'

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md rounded-lg bg-white p-8 text-center shadow">
        <h1 className="text-2xl font-bold text-gray-900">Payment Cancelled</h1>
        <p className="mt-3 text-sm text-gray-600">
          Your order was not completed. You can review your cart and try again.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/cart" className="rounded-md bg-blue-600 px-4 py-2 text-white">
            Back to Cart
          </Link>
          <Link href="/orders" className="rounded-md border px-4 py-2 text-gray-700">
            View Orders
          </Link>
        </div>
      </div>
    </div>
  )
}
