'use client'
import React, { useState } from 'react';
import { FiCreditCard, FiTruck, FiMapPin, FiUser } from 'react-icons/fi';

interface CheckoutFormProps {
  cartItems: any[];
  total: number;
  onCheckout: (provider: string, shippingData: any) => Promise<void>;
  loading: boolean;
  initialValues?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
  };
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ cartItems, total, onCheckout, loading, initialValues }) => {
  const inrFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [stepError, setStepError] = useState('');
  const [formData, setFormData] = useState({
    firstName: initialValues?.firstName || '',
    lastName: initialValues?.lastName || '',
    email: initialValues?.email || '',
    phone: initialValues?.phone || '',
    address: initialValues?.address || '',
    city: '',
    state: '',
    pincode: '',
    paymentProvider: 'mock',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const availableMethods =
    formData.paymentProvider === 'stripe'
      ? ['card']
      : formData.paymentProvider === 'razorpay'
        ? ['card', 'upi']
        : ['card', 'upi', 'cod'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStepError('');
    setFormData((current) => {
      const next = {
        ...current,
        [name]: value
      };

      if (name === 'paymentProvider') {
        if (value === 'stripe') {
          next.paymentMethod = 'card';
        } else if (value === 'razorpay' && next.paymentMethod === 'cod') {
          next.paymentMethod = 'upi';
        }
      }

      return next;
    });
  };

  const validateShippingStep = () => {
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.pincode.trim()
    ) {
      setStepError('Please complete all shipping details before continuing.');
      return false;
    }

    return true;
  };

  const validatePaymentStep = () => {
    if (!formData.paymentProvider || !formData.paymentMethod) {
      setStepError('Please choose a payment provider and payment method.');
      return false;
    }

    if (
      formData.paymentMethod === 'card' &&
      (!formData.cardNumber.trim() || !formData.expiryDate.trim() || !formData.cvv.trim() || !formData.nameOnCard.trim())
    ) {
      setStepError('Please complete the card details before reviewing the order.');
      return false;
    }

    return true;
  };

  const goToPaymentStep = () => {
    if (!validateShippingStep()) return;
    setCurrentStep(2);
  };

  const goToReviewStep = () => {
    if (!validatePaymentStep()) return;
    setCurrentStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateShippingStep() || !validatePaymentStep()) {
      return;
    }

    const shippingData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      paymentMethod: formData.paymentMethod,
    };
    await onCheckout(formData.paymentProvider, shippingData);
  };

  const steps = [
    { id: 1, title: 'Shipping', icon: <FiTruck className="w-5 h-5" /> },
    { id: 2, title: 'Payment', icon: <FiCreditCard className="w-5 h-5" /> },
    { id: 3, title: 'Review', icon: <FiUser className="w-5 h-5" /> }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep >= step.id ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step.icon}
            </div>
            <span className="ml-2 font-medium text-gray-700">{step.title}</span>
            {index < steps.length - 1 && (
              <div className={`mx-4 hidden h-1 w-20 md:block ${currentStep > step.id ? 'bg-primary' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      {stepError && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {stepError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <FiMapPin className="mr-2" />
                  Shipping Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Street address, apartment, suite, etc." />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                    <select name="state" value={formData.state} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">Select State</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Maharashtra">Maharashtra</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code *</label>
                    <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                </div>

                <button type="button" onClick={goToPaymentStep} className="hidden w-full mt-6 rounded-lg bg-primary py-3 font-medium text-white transition-colors hover:bg-blue-700 md:block">
                  Continue to Payment
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <FiCreditCard className="mr-2" />
                  Payment Information
                </h3>

                <div className="space-y-4 mb-6">
                  <h4 className="text-lg font-medium mb-4">Choose Payment Provider</h4>
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="paymentProvider" value="razorpay" checked={formData.paymentProvider === 'razorpay'} onChange={handleInputChange} className="mr-3" />
                    <span>Razorpay</span>
                  </label>
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="paymentProvider" value="stripe" checked={formData.paymentProvider === 'stripe'} onChange={handleInputChange} className="mr-3" />
                    <span>Stripe</span>
                  </label>
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="paymentProvider" value="mock" checked={formData.paymentProvider === 'mock'} onChange={handleInputChange} className="mr-3" />
                    <span>Mock Payment (Testing)</span>
                  </label>
                </div>

                <div className="space-y-4 mb-6">
                  <h4 className="text-lg font-medium mb-4">Payment Method</h4>
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleInputChange} className="mr-3" />
                    <FiCreditCard className="mr-2" />
                    <span>Credit/Debit Card</span>
                  </label>
                  <label className={`flex items-center rounded-lg border p-4 ${availableMethods.includes('upi') ? 'cursor-pointer hover:bg-gray-50' : 'cursor-not-allowed bg-gray-50 text-gray-400'}`}>
                    <input type="radio" name="paymentMethod" value="upi" checked={formData.paymentMethod === 'upi'} onChange={handleInputChange} className="mr-3" disabled={!availableMethods.includes('upi')} />
                    <span>UPI Payment</span>
                  </label>
                  <label className={`flex items-center rounded-lg border p-4 ${availableMethods.includes('cod') ? 'cursor-pointer hover:bg-gray-50' : 'cursor-not-allowed bg-gray-50 text-gray-400'}`}>
                    <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} className="mr-3" disabled={!availableMethods.includes('cod')} />
                    <span>Cash on Delivery</span>
                  </label>
                </div>

                {formData.paymentProvider === 'stripe' && (
                  <p className="mb-6 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
                    Stripe checkout supports card payments only and redirects to Stripe for secure processing.
                  </p>
                )}

                {formData.paymentProvider === 'razorpay' && (
                  <p className="mb-6 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
                    Razorpay opens a secure payment window for card or UPI payments.
                  </p>
                )}

                {formData.paymentMethod === 'cod' && (
                  <p className="mb-6 rounded-lg border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                    Cash on Delivery orders are placed immediately and marked payment pending for admin processing.
                  </p>
                )}

                {formData.paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
                      <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="1234 5678 9012 3456" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                        <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} placeholder="MM/YY" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                        <input type="text" name="cvv" value={formData.cvv} onChange={handleInputChange} placeholder="123" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card *</label>
                      <input type="text" name="nameOnCard" value={formData.nameOnCard} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                  </div>
                )}

                <div className="mt-6 hidden space-x-4 md:flex">
                  <button type="button" onClick={() => setCurrentStep(1)} className="flex-1 rounded-lg border border-primary py-3 font-medium text-primary transition-colors hover:bg-primary hover:text-white">
                    Back to Shipping
                  </button>
                  <button type="button" onClick={goToReviewStep} className="flex-1 rounded-lg bg-primary py-3 font-medium text-white transition-colors hover:bg-blue-700">
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-6">Review Your Order</h3>

                <div className="space-y-4 mb-6">
                  <h4 className="text-lg font-medium">Delivery Address</h4>
                  <div className="rounded-lg border bg-gray-50 p-4 text-sm text-gray-700">
                    <p>{formData.firstName} {formData.lastName}</p>
                    <p>{formData.address}</p>
                    <p>{formData.city}, {formData.state} {formData.pincode}</p>
                    <p>{formData.email}</p>
                    <p>{formData.phone}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <h4 className="text-lg font-medium">Payment Review</h4>
                  <div className="rounded-lg border bg-gray-50 p-4 text-sm text-gray-700">
                    <p className="capitalize">Provider: {formData.paymentProvider}</p>
                    <p className="capitalize">Method: {formData.paymentMethod}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold">{inrFormatter.format(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="hidden space-x-4 md:flex">
                  <button type="button" onClick={() => setCurrentStep(2)} className="flex-1 rounded-lg border border-primary py-3 font-medium text-primary transition-colors hover:bg-primary hover:text-white">
                    Back to Payment
                  </button>
                  <button type="submit" disabled={loading} className="flex-1 rounded-lg bg-primary py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
                    {loading ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{inrFormatter.format(total)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>{inrFormatter.format(Math.round(total * 0.18))}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{inrFormatter.format(total + Math.round(total * 0.18))}</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <p>Free shipping on orders above {inrFormatter.format(500)}</p>
            <p>Secure payment with 256-bit SSL</p>
            <p>30-day return policy</p>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 z-20 mt-6 border-t bg-white/95 p-4 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur">
        <div className="mb-3 flex items-center justify-between text-sm text-gray-600 md:hidden">
          <span>Step {currentStep} of 3</span>
          <span className="font-semibold text-gray-900">{inrFormatter.format(total + Math.round(total * 0.18))}</span>
        </div>

        {currentStep === 1 && (
          <button
            type="button"
            onClick={goToPaymentStep}
            className="w-full rounded-lg bg-primary py-3 font-medium text-white shadow-sm"
          >
            Continue to Payment
          </button>
        )}

        {currentStep === 2 && (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="flex-1 rounded-lg border border-primary py-3 font-medium text-primary"
            >
              Back
            </button>
            <button
              type="button"
              onClick={goToReviewStep}
              className="flex-1 rounded-lg bg-primary py-3 font-medium text-white shadow-sm"
            >
              Review Order
            </button>
          </div>
        )}

        {currentStep === 3 && (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="flex-1 rounded-lg border border-primary py-3 font-medium text-primary"
            >
              Back
            </button>
            <button
              type="submit"
              form=""
              onClick={() => {
                const form = document.querySelector('form');
                if (form) {
                  form.requestSubmit();
                }
              }}
              disabled={loading}
              className="flex-1 rounded-lg bg-primary py-3 font-medium text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
