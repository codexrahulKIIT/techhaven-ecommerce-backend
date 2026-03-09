'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getBackendUrl } from '@/utils/getBackendUrl';

export default function OrderSuccessPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [fallbackShipping, setFallbackShipping] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const baseUrl = await getBackendUrl();
        const response = await fetch(`${baseUrl}/orders/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const orderData = await response.json();
          setOrder(orderData);

          const savedShipping = localStorage.getItem(`order_shipping_${params.id}`);
          if (savedShipping) {
            setFallbackShipping(JSON.parse(savedShipping));
          }
        } else {
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
        router.push('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      void fetchOrder();
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <Link href="/dashboard" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const shippingAddress = order.shippingAddress || fallbackShipping;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600">Thank you for your purchase. Your order has been confirmed.</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Order Information</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Order ID:</span> #{order.id}</p>
                <p><span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><span className="font-medium">Status:</span>
                  <span className="ml-2 rounded-full bg-yellow-100 px-2 py-1 text-sm text-yellow-800">
                    {order.status}
                  </span>
                </p>
                <p><span className="font-medium">Payment:</span>
                  <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-sm text-green-800">
                    {order.paymentStatus}
                  </span>
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
              <div className="text-gray-700">
                <p>{shippingAddress?.firstName} {shippingAddress?.lastName}</p>
                <p>{shippingAddress?.address}</p>
                <p>{shippingAddress?.city}, {shippingAddress?.state} {shippingAddress?.pincode}</p>
                <p>{shippingAddress?.email}</p>
                <p>{shippingAddress?.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items?.map((item: any) => (
              <div key={item.id} className="flex items-center space-x-4 rounded-lg border p-4">
                <Image
                  src={item.product?.images?.[0] || '/placeholder.svg'}
                  alt={item.product?.name || 'Product image'}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.product?.name || 'Product'}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Rs. {Number(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  <p className="text-sm text-gray-600">Rs. {Number(item.price).toLocaleString('en-IN')} each</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t mt-6 pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Amount:</span>
              <span>Rs. {Number(order.totalAmount).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Timeline</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Order Confirmed</p>
                <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Processing Order</p>
                <p className="text-sm text-gray-600">We&apos;re preparing your items</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <Truck className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium">Shipped</p>
                <p className="text-sm text-gray-600">Expected delivery: 3-5 business days</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Home className="w-5 h-5 mr-2" />
            Go to Dashboard
          </Link>
          <Link href="/shop" className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
