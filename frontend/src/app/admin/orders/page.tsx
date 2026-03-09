// frontend/app/admin/orders/page.tsx
"use client";

import { useEffect, useState } from "react";
import OrderTable from "@/components/admin/OrderTable";
import { getAllOrders, updateOrderStatus } from "@/lib/orders";
import { Order } from "@/types";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    const data = await getAllOrders();
    setOrders(data);
  }

  async function handleStatusChange(id: string, status: string) {
    await updateOrderStatus(id, status);
    loadOrders();
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      <OrderTable orders={orders} onStatusChange={handleStatusChange} />
    </div>
  );
}
