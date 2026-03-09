'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { getBackendUrlSync } from '@/utils/getBackendUrl'

function PaymentSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const orderId = searchParams.get('orderId')
    const sessionId = searchParams.get('session_id')
    const token = localStorage.getItem('authToken')

    if (!orderId || !sessionId || !token) {
      toast.error('Invalid payment confirmation')
      router.replace('/orders')
      return
    }

    void fetch(`${getBackendUrlSync()}/payments/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        orderId,
        provider: 'stripe',
        providerPaymentId: sessionId,
        payload: { source: 'stripe-success-page' },
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Failed to confirm payment')
        }
        const data = await response.json()
        localStorage.removeItem('cart')
        toast.success('Payment confirmed')
        router.replace(data.successUrl || `/order-success/${orderId}`)
      })
      .catch((error) => {
        console.error(error)
        toast.error('Failed to confirm payment')
        router.replace('/orders')
      })
  }, [router, searchParams])

  return <div className="p-8 text-center">Confirming your payment...</div>
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Confirming your payment...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  )
}
