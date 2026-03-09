// frontend/app/dashboard/page.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User, Package, Heart, MapPin, Gift, HelpCircle, FileText, LogOut, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getUserOrders } from '@/lib/orders';
import { getAddresses } from '@/lib/addresses';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?redirect=/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      void loadDashboardData();
    }
  }, [isAuthenticated, isLoading]);

  async function loadDashboardData() {
    try {
      const ordersData = await getUserOrders().catch(() => []);
      setOrders(Array.isArray(ordersData) ? ordersData : []);
      const addresses = await getAddresses().catch(() => []);
      setSavedAddresses(Array.isArray(addresses) ? addresses : []);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setOrders([]);
      setSavedAddresses([]);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const menuItems = [
    {
      icon: Package,
      title: 'My Orders',
      subtitle: 'Track, return, or buy things again',
      href: '/orders',
      color: 'text-blue-600'
    },
    {
      icon: Heart,
      title: 'Wishlist',
      subtitle: 'Your saved items',
      href: '/wishlist',
      color: 'text-red-500'
    },
    {
      icon: Gift,
      title: 'My Coupons',
      subtitle: 'View and apply coupons',
      href: '/coupons',
      color: 'text-green-600'
    },
    {
      icon: MapPin,
      title: 'Manage Addresses',
      subtitle: 'Save addresses for hassle-free checkout',
      href: '/profile',
      color: 'text-purple-600'
    },
    {
      icon: User,
      title: 'Profile Information',
      subtitle: 'Edit your personal details',
      href: '/profile',
      color: 'text-orange-600'
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      subtitle: 'Get assistance with your orders',
      href: '/contact',
      color: 'text-gray-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow-sm mb-6">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">
                  {user.firstName?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Hello,</p>
                <h1 className="text-xl font-semibold text-gray-900">{user.firstName}</h1>
              </div>
            </div>
            <button
              onClick={logout}
              className="hidden sm:flex items-center text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Account</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-2">
                {menuItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                        {item.title}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                  </Link>
                ))}
                
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-red-50 transition-colors group sm:hidden mt-2"
                >
                  <div className="flex items-center space-x-3">
                    <LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-red-600">
                      Logout
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                </button>
              </nav>
            </div>

            {/* Quick Stats - Mobile */}
            <div className="mt-4 bg-white shadow-sm rounded-lg p-4 lg:hidden">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">0</p>
                  <p className="text-xs text-gray-500">Orders</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-500">0</p>
                  <p className="text-xs text-gray-500">Wishlist</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">0</p>
                  <p className="text-xs text-gray-500">Coupons</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.slice(0, 3).map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="bg-white shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className={`w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                </Link>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white shadow-sm rounded-lg">
              <div className="px-6 py-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                <Link href="/orders" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View All
                </Link>
              </div>
              {orders.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500 mb-4">You haven&apos;t placed any orders yet</p>
                  <Link
                    href="/shop"
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="divide-y">
                  {orders.slice(0, 3).map((order) => (
                    <Link key={order.id} href={`/orders/${order.id}`} className="block px-6 py-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Order #{order.id.slice(0, 8)}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()} · {order.items?.length || 0} items
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">Rs. {Number(order.totalAmount).toLocaleString('en-IN')}</p>
                          <p className="text-sm capitalize text-gray-500">{order.paymentStatus}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Info Card */}
            <div className="bg-white shadow-sm rounded-lg">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
              </div>
              <div className="p-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Full Name</p>
                    <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email Address</p>
                    <p className="font-medium text-gray-900">{user.email}</p>
                  </div>
                  {user.phone && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                      <p className="font-medium text-gray-900">{user.phone}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Account Type</p>
                    <p className="font-medium text-gray-900 capitalize">{user.role}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    href="/profile"
                    className="inline-block px-6 py-2 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors"
                  >
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Saved Addresses</h2>
              </div>
              <div className="p-6">
                {savedAddresses.length === 0 ? (
                  <p className="text-sm text-gray-500">Your saved addresses will appear here after checkout.</p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {savedAddresses.map((address, index) => (
                      <div key={`${address.address}-${index}`} className="rounded-lg border p-4 text-sm text-gray-700">
                        <p className="font-medium text-gray-900">{address.firstName} {address.lastName}</p>
                        <p>{address.address}</p>
                        <p>{address.city}, {address.state} {address.pincode}</p>
                        <p>{address.phone}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Help Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Get assistance with your orders, payments, and more
                  </p>
                  <Link
                    href="/contact"
                    className="inline-block px-6 py-2 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors"
                  >
                    Contact Support
                  </Link>
                </div>
                <HelpCircle className="w-12 h-12 text-blue-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
