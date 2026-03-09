'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getOrderById } from "@/lib/orders";

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(`/login?redirect=/orders/${params.id}`);
      return;
    }

    if (!isLoading && isAuthenticated) {
      void loadOrder();
    }
  }, [isAuthenticated, isLoading, params.id, router]);

  async function loadOrder() {
    try {
      const data = await getOrderById(params.id);
      setOrder(data);
    } catch (error) {
      console.error('Failed to load order:', error);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }

  if (isLoading || loading) {
    return <div className="container mx-auto p-6">Loading order...</div>;
  }

  if (!order) {
    return <div className="p-6">Order not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Order #{order.id}</h1>
        <Link href="/orders" className="text-blue-600 hover:text-blue-700">
          Back to orders
        </Link>
      </div>
      <p className="mb-2">Status: <span className="font-semibold capitalize">{order.status}</span></p>
      <p className="mb-2">Payment: <span className="font-semibold capitalize">{order.paymentStatus}</span></p>
      <p className="mb-6">Total: Rs. {Number(order.totalAmount).toLocaleString('en-IN')}</p>
      <div className="space-y-3">
        {order.items.map((item: any) => (
          <div key={item.id} className="rounded border p-3">
            <p className="font-semibold">{item.product?.name || item.name || 'Product'}</p>
            <p>Qty: {item.quantity}</p>
            <p>Price: Rs. {Number(item.price).toLocaleString('en-IN')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
