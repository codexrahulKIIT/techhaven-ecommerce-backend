'use client';
import AdminProtectedRoute from '@/components/auth/AdminProtectedRoute';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package, Users, DollarSign, TrendingUp, ShoppingCart, AlertCircle } from 'lucide-react';

function AdminDashboardContent() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    // Fetch from your backend
    setStats({
      totalOrders: 150,
      totalUsers: 1250,
      totalRevenue: 245000,
      pendingOrders: 23,
    });
  };

  const statCards = [
    { title: 'Total Orders', value: stats.totalOrders, icon: Package, color: 'bg-blue-500' },
    { title: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-green-500' },
    { title: 'Total Revenue', value: `₹${stats.totalRevenue}`, icon: DollarSign, color: 'bg-purple-500' },
    { title: 'Pending Orders', value: stats.pendingOrders, icon: AlertCircle, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem('adminToken');
              router.push('/admin/login');
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <a href="/admin/products" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <ShoppingCart className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">Manage Products</h3>
            <p className="text-gray-600 text-sm">Add, edit, or remove products</p>
          </a>

          <a href="/admin/orders" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <Package className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">Manage Orders</h3>
            <p className="text-gray-600 text-sm">View and process orders</p>
          </a>

          <a href="/admin/users" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <Users className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">Manage Users</h3>
            <p className="text-gray-600 text-sm">View and manage customers</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AdminProtectedRoute>
      <AdminDashboardContent />
    </AdminProtectedRoute>
  );
}
