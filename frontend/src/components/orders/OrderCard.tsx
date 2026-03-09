// frontend/components/orders/OrderCard.tsx
interface OrderCardProps {
  order: {
    id: string;
    status: string;
    total: number;
    createdAt: string;
  };
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <a
      href={`/orders/${order.id}`}
      className="block border rounded-lg shadow-sm hover:shadow-md transition p-4"
    >
      <h2 className="text-lg font-semibold">Order #{order.id}</h2>
      <p>Status: {order.status}</p>
      <p>Total: ₹{order.total}</p>
      <p className="text-sm text-gray-500">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
    </a>
  );
}
