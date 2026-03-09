import { getBackendUrlSync } from '../utils/getBackendUrl'

const API_URL = getBackendUrlSync();

export async function initiateCheckout(cart: any[], userId: string, provider: string = 'razorpay') {
  const res = await fetch(`${API_URL}/payments/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart, userId, provider }),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to initiate checkout");
  }

  return res.json(); // expects { url: "payment-gateway-url", orderId } or { orderId, amount, currency, key } for Razorpay
}
