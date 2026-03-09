'use client';
import { useEffect, useState } from 'react';
import { Shield, Truck, RefreshCw, CreditCard, FileText, Lock } from 'lucide-react';

const tabs = [
  { id: 'privacy', label: 'Privacy Policy', icon: Lock },
  { id: 'terms', label: 'Terms &amp; Conditions', icon: FileText },
  { id: 'shipping', label: 'Shipping Policy', icon: Truck },
  { id: 'return', label: 'Return &amp; Refund', icon: RefreshCw },
  { id: 'payment', label: 'Payment Policy', icon: CreditCard },
];

export default function PoliciesPage() {
  const [activeTab, setActiveTab] = useState('privacy');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab && tabs.some(item => item.id === tab)) {
      setActiveTab(tab);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Policies & Terms</h1>
          <p className="text-blue-200 text-lg">Understanding our commitment to you</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Privacy Policy */}
          {activeTab === 'privacy' && (
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Lock className="w-8 h-8 mr-3 text-blue-600" />
                Privacy Policy
              </h2>
              
              <div className="space-y-6 text-gray-700">
                <p className="text-sm text-gray-500">Last Updated: January 2025</p>
                
                <section>
                  <h3 className="text-xl font-semibold mb-3">1. Information We Collect</h3>
                  <p className="mb-3">We collect information you provide directly to us, including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address</li>
                    <li><strong>Payment Information:</strong> Credit card details (processed securely through payment gateways)</li>
                    <li><strong>Account Information:</strong> Username, password, order history</li>
                    <li><strong>Technical Information:</strong> IP address, browser type, device information</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">2. How We Use Your Information</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Process and fulfill your orders</li>
                    <li>Send order confirmations and shipping updates</li>
                    <li>Provide customer support</li>
                    <li>Improve our website and services</li>
                    <li>Send promotional emails (with your consent)</li>
                    <li>Prevent fraud and ensure security</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">3. Information Sharing</h3>
                  <p>We do not sell your personal information. We may share your information with:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Payment processors (Razorpay, Stripe, PayU)</li>
                    <li>Shipping partners for order delivery</li>
                    <li>Service providers who assist our operations</li>
                    <li>Law enforcement when legally required</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">4. Data Security</h3>
                  <p>We implement industry-standard security measures including:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>SSL encryption for all data transmission</li>
                    <li>Secure payment processing through certified gateways</li>
                    <li>Regular security audits and updates</li>
                    <li>Access controls and authentication protocols</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">5. Your Rights</h3>
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Access your personal data</li>
                    <li>Correct inaccurate information</li>
                    <li>Request data deletion</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Export your data</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">6. Cookies</h3>
                  <p>We use cookies to enhance your experience. You can control cookie settings through your browser preferences.</p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">7. Contact Us</h3>
                  <p>For privacy concerns, contact us at:</p>
                  <p className="mt-2">Email: privacy@techhaven.com</p>
                  <p>Phone: +91-9876543210</p>
                </section>
              </div>
            </div>
          )}

          {/* Terms & Conditions */}
          {activeTab === 'terms' && (
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <FileText className="w-8 h-8 mr-3 text-blue-600" />
                Terms &amp; Conditions
              </h2>
              
              <div className="space-y-6 text-gray-700">
                <p className="text-sm text-gray-500">Last Updated: January 2025</p>

                <section>
                  <h3 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h3>
                  <p>By accessing and using TechHaven Electronics Store, you accept and agree to be bound by these Terms &amp; Conditions.</p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">2. Account Registration</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You must be 18+ years old to create an account</li>
                    <li>Provide accurate and complete information</li>
                    <li>Maintain security of your account credentials</li>
                    <li>You are responsible for all activities under your account</li>
                    <li>We reserve the right to suspend accounts for violations</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">3. Product Information</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>We strive for accurate product descriptions and images</li>
                    <li>Colors may vary slightly from images</li>
                    <li>Product specifications are subject to manufacturer changes</li>
                    <li>Prices are in Indian Rupees (INR) and include applicable taxes</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">4. Orders and Payment</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Minimum order value: INR 199</li>
                    <li>We reserve the right to refuse any order</li>
                    <li>Payment must be completed before order processing</li>
                    <li>Prices are subject to change without notice</li>
                    <li>Order confirmation does not guarantee product availability</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">5. Intellectual Property</h3>
                  <p>All content on this website, including logos, designs, text, and images, is owned by TechHaven and protected by copyright laws.</p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">6. Limitation of Liability</h3>
                  <p>TechHaven is not liable for indirect, incidental, or consequential damages arising from product use or website access.</p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">7. Governing Law</h3>
                  <p>These terms are governed by the laws of India. All disputes are subject to Bangalore jurisdiction only.</p>
                </section>
              </div>
            </div>
          )}

          {/* Shipping Policy */}
          {activeTab === 'shipping' && (
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Truck className="w-8 h-8 mr-3 text-blue-600" />
                Shipping Policy
              </h2>
              
              <div className="space-y-6 text-gray-700">
                <section>
                  <h3 className="text-xl font-semibold mb-3">Shipping Charges</h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-semibold text-blue-900">FREE Shipping on orders above INR 999</p>
                    <p className="text-blue-700 mt-2">For orders below INR 999: INR 50 shipping charge applies</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Delivery Time</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Metro Cities:</strong> 3-5 business days</li>
                    <li><strong>Other Cities:</strong> 5-7 business days</li>
                    <li><strong>Remote Areas:</strong> 7-10 business days</li>
                    <li>Orders placed before 2 PM are processed the same day</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Order Tracking</h3>
                  <p>Once shipped, you will receive:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Email with tracking number</li>
                    <li>SMS updates on delivery status</li>
                    <li>Real-time tracking through your account dashboard</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Shipping Restrictions</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>We currently ship only within India</li>
                    <li>PO Box addresses are not accepted</li>
                    <li>Certain products may have shipping restrictions</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Delivery Issues</h3>
                  <p>If you don&apos;t receive your order within the expected timeframe:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Contact us at support@techhaven.com</li>
                    <li>Provide your order number</li>
                    <li>We will investigate and resolve within 48 hours</li>
                  </ul>
                </section>
              </div>
            </div>
          )}

          {/* Return & Refund */}
          {activeTab === 'return' && (
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <RefreshCw className="w-8 h-8 mr-3 text-blue-600" />
                Return & Refund Policy
              </h2>
              
              <div className="space-y-6 text-gray-700">
                <section>
                  <h3 className="text-xl font-semibold mb-3">Return Period</h3>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="font-semibold text-green-900">30-Day Return Policy</p>
                    <p className="text-green-700 mt-2">Products can be returned within 30 days of delivery</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Return Conditions</h3>
                  <p>Products must meet the following criteria:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Unused and in original condition</li>
                    <li>Original packaging intact</li>
                    <li>All accessories and manuals included</li>
                    <li>Product not damaged or tampered</li>
                    <li>Return request initiated within 30 days</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Non-Returnable Items</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Opened software or sealed products</li>
                    <li>Custom-made or personalized items</li>
                    <li>Products with missing serial numbers</li>
                    <li>Items marked as &quot;Final Sale&quot;</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Refund Process</h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Initiate return from your account dashboard</li>
                    <li>Pack the product securely with all accessories</li>
                    <li>Our courier partner will pick up the product</li>
                    <li>Quality check (2-3 business days)</li>
                    <li>Refund initiated to original payment method</li>
                    <li>Refund processed in 5-7 business days</li>
                  </ol>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Defective Products</h3>
                  <p>For defective or damaged products:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Contact us immediately with photos</li>
                    <li>Free return shipping provided</li>
                    <li>Replacement or full refund offered</li>
                    <li>Fast-tracked processing (2-3 days)</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Exchange Policy</h3>
                  <p>Exchanges are available for:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Size or specification changes</li>
                    <li>Color variations</li>
                    <li>Same-value product exchanges</li>
                  </ul>
                </section>
              </div>
            </div>
          )}

          {/* Payment Policy */}
          {activeTab === 'payment' && (
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <CreditCard className="w-8 h-8 mr-3 text-blue-600" />
                Payment Policy
              </h2>
              
              <div className="space-y-6 text-gray-700">
                <section>
                  <h3 className="text-xl font-semibold mb-3">Accepted Payment Methods</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Cards</h4>
                      <ul className="text-sm space-y-1">
                        <li>Credit Cards (Visa, MasterCard, Amex)</li>
                        <li>Debit Cards (All major banks)</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">UPI</h4>
                      <ul className="text-sm space-y-1">
                        <li>Google Pay, PhonePe, Paytm</li>
                        <li>All UPI-enabled apps</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Net Banking</h4>
                      <ul className="text-sm space-y-1">
                        <li>All major Indian banks</li>
                        <li>Secure payment gateway</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Cash on Delivery</h4>
                      <ul className="text-sm space-y-1">
                        <li>Available on orders above INR 199</li>
                        <li>Subject to location availability</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Payment Security</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>256-bit SSL Encryption:</strong> All transactions are encrypted</li>
                    <li><strong>PCI DSS Compliant:</strong> We follow industry security standards</li>
                    <li><strong>Secure Gateways:</strong> Razorpay, Stripe, PayU integration</li>
                    <li><strong>No Card Storage:</strong> We don&apos;t store your card details</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">GST & Tax Information</h3>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="font-semibold text-yellow-900">We provide GST Tax Bills</p>
                    <p className="text-yellow-700 mt-2">GSTIN: 29ABDCS0716N1Z1</p>
                    <p className="text-yellow-700">Claim your tax input credit with our invoices</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Payment Issues</h3>
                  <p>If your payment fails:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Amount will be auto-refunded within 5-7 business days</li>
                    <li>Try alternative payment methods</li>
                    <li>Contact your bank for authorization</li>
                    <li>Reach our support: payments@techhaven.com</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Pricing</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All prices are in Indian Rupees (INR)</li>
                    <li>Prices include applicable GST</li>
                    <li>Prices subject to change without notice</li>
                    <li>Order price locked at checkout time</li>
                  </ul>
                </section>
              </div>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-gray-700 mb-6">Our customer support team is here to help</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700">
              Contact Support
            </a>
            <a href="mailto:support@techhaven.com" className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white">
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
