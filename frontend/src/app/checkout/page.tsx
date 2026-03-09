'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { toast } from 'react-toastify';
import { getBackendUrl } from '@/utils/getBackendUrl';

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, isHydrated } = useCart();
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompletingCheckout, setIsCompletingCheckout] = useState(false);

  const loadRazorpayScript = async () => {
    if (window.Razorpay) {
      return true;
    }

    return await new Promise<boolean>((resolve) => {
      const existingScript = document.querySelector('script[data-razorpay-sdk="true"]');
      if (existingScript) {
        existingScript.addEventListener('load', () => resolve(true), { once: true });
        existingScript.addEventListener('error', () => resolve(false), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.dataset.razorpaySdk = 'true';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    if (isHydrated && !isLoading && !isAuthenticated) {
      toast.error('Please login to checkout');
      router.push('/login?redirect=/checkout');
    }
  }, [isAuthenticated, isHydrated, isLoading, router]);

  useEffect(() => {
    if (isHydrated && items.length === 0 && !isLoading && !isCompletingCheckout) {
      toast.info('Your cart is empty');
      router.push('/cart');
    }
  }, [isHydrated, items, isLoading, isCompletingCheckout, router]);

  const handleCheckout = async (provider: string, checkoutData: any) => {
    setIsProcessing(true);

    try {
      const token = localStorage.getItem('authToken');
      const baseUrl = await getBackendUrl();
      const { paymentMethod, ...shippingAddress } = checkoutData;

      const checkoutResponse = await fetch(`${baseUrl}/payments/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cart: items.map(item => ({
            id: item.productId,
            quantity: item.quantity,
            price: item.price,
            name: item.name,
          })),
          currency: 'inr',
          provider,
          shippingAddress,
          paymentMethod,
        }),
      });

      if (!checkoutResponse.ok) {
        const errorData = await checkoutResponse.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to initialize checkout');
      }

      const checkout = await checkoutResponse.json();
      localStorage.setItem(`order_shipping_${checkout.orderId}`, JSON.stringify(shippingAddress));

      if (checkout?.provider === 'razorpay' && checkout?.providerOrderId) {
        const sdkLoaded = await loadRazorpayScript();
        if (!sdkLoaded || !window.Razorpay) {
          throw new Error('Failed to load Razorpay checkout');
        }

        const razorpay = new window.Razorpay({
          key: checkout.key,
          amount: checkout.amount,
          currency: checkout.currency,
          name: 'TechHaven Store',
          description: `Order ${checkout.orderId}`,
          order_id: checkout.providerOrderId,
          prefill: {
            name: `${shippingAddress.firstName} ${shippingAddress.lastName}`.trim(),
            email: shippingAddress.email,
            contact: shippingAddress.phone,
          },
          notes: {
            orderId: checkout.orderId,
          },
          handler: async (response: {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          }) => {
            const confirmResponse = await fetch(`${baseUrl}/payments/confirm`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                orderId: checkout.orderId,
                provider: 'razorpay',
                providerPaymentId: response.razorpay_payment_id,
                payload: response,
              }),
            });

            if (!confirmResponse.ok) {
              throw new Error('Failed to confirm Razorpay payment');
            }

            const confirmed = await confirmResponse.json();
            setIsCompletingCheckout(true);
            clearCart();
            toast.success('Payment confirmed successfully!');
            router.push(confirmed.successUrl || `/order-success/${checkout.orderId}`);
          },
          modal: {
            ondismiss: () => {
              setIsProcessing(false);
              toast.info('Payment window closed before completion.');
            },
          },
          theme: {
            color: '#2563eb',
          },
        });

        razorpay.open();
        return;
      }

      if (checkout?.successUrl) {
        setIsCompletingCheckout(true);
        clearCart();
        toast.success('Order placed successfully!');
        router.push(checkout.successUrl);
        return;
      }

      if (checkout?.url) {
        window.location.href = checkout.url;
        return;
      }

      if (checkout?.orderId) {
        setIsCompletingCheckout(true);
        clearCart();
        toast.success('Order placed successfully!');
        router.push(`/order-success/${checkout.orderId}`);
        return;
      }

      throw new Error('Unsupported payment response');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error instanceof Error ? error.message : 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading || !isHydrated || (items.length === 0 && !isCompletingCheckout)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <CheckoutForm
          cartItems={items}
          total={totalPrice}
          onCheckout={handleCheckout}
          loading={isProcessing}
          initialValues={{
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            phone: user?.phone || '',
            address: user?.address || '',
          }}
        />
      </div>
    </div>
  );
}
