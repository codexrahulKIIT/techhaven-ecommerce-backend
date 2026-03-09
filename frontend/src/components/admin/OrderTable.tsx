"use client";

interface OrderTableProps {
  orders: Array<{
    id: string;
    user?: { email?: string | null };
    totalAmount?: number;
    total?: number;
    status: string;
  }>;
  onStatusChange: (id: string, status: string) => void;
}

export default function OrderTable({ orders, onStatusChange }: OrderTableProps) {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Order ID</th>
          <th className="p-2 border">User</th>
          <th className="p-2 border">Total</th>
          <th className="p-2 border">Status</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td className="p-2 border">{order.id}</td>
            <td className="p-2 border">{order.user?.email || "Unknown user"}</td>
            <td className="p-2 border">
              Rs. {Number(order.totalAmount ?? order.total ?? 0).toLocaleString("en-IN")}
            </td>
            <td className="p-2 border capitalize">{order.status}</td>
            <td className="p-2 border">
              <select
                value={order.status}
                onChange={(e) => onStatusChange(order.id, e.target.value)}
                className="border rounded p-1"
              >
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
