// frontend/components/checkout/CheckoutSummary.tsx
interface CheckoutSummaryProps {
  cart: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
}

export default function CheckoutSummary({ cart, total }: CheckoutSummaryProps) {
  return (
    <div className="border rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <ul className="space-y-3">
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>
              {item.name} (x{item.quantity})
            </span>
            <span>₹{item.price * item.quantity}</span>
          </li>
        ))}
      </ul>
      <hr className="my-4" />
      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>₹{total}</span>
      </div>
    </div>
  );
}
