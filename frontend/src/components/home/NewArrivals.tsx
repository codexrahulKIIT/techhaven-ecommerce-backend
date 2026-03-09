'use client'
import React from 'react';
import ProductCard from '@/components/product/ProductCard';
import { FiArrowRight, FiClock } from 'react-icons/fi';
import Link from 'next/link';

const NewArrivals: React.FC = () => {
  // Mock new products data
  const newProducts = [
    {
      id: '101',
      name: 'ESP32-S3 DevKitC-1',
      price: 1200,
      image: 'https://dummyimage.com/300x200/cccccc/000000&text=ESP32-S3',
      rating: 4.8,
      category: 'Development Boards',
      inStock: true,
      isNew: true,
      arrivalDate: '2024-01-15'
    },
    {
      id: '102',
      name: 'BME680 Environmental Sensor',
      price: 890,
      image: 'https://dummyimage.com/300x200/cccccc/000000&text=BME680',
      rating: 4.7,
      category: 'Sensors',
      inStock: true,
      isNew: true,
      arrivalDate: '2024-01-12'
    },
    {
      id: '103',
      name: 'TCS3472 Color Light Sensor',
      price: 450,
      image: 'https://dummyimage.com/300x200/cccccc/000000&text=TCS3472',
      rating: 4.6,
      category: 'Sensors',
      inStock: true,
      isNew: true,
      arrivalDate: '2024-01-10'
    },
    {
      id: '104',
      name: 'WS2812B LED Strip 1m',
      price: 320,
      originalPrice: 380,
      image: 'https://dummyimage.com/300x200/cccccc/000000&text=WS2812B',
      rating: 4.5,
      category: 'LEDs',
      inStock: true,
      isNew: true,
      discount: 16,
      arrivalDate: '2024-01-08'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center space-x-2 text-primary">
                <FiClock className="w-6 h-6" />
                <span className="text-sm font-medium">Just In</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              New Arrivals
            </h2>
            <p className="text-lg text-gray-600 max-w-xl">
              Check out the latest additions to our electronics collection
            </p>
          </div>
          <div className="hidden lg:block">
            <Link
              href="/shop?filter=new"
              className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              View All New
              <FiArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <div key={product.id} className="relative">
              {/* New Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  NEW
                </span>
              </div>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="text-center mt-8 lg:hidden">
          <Link
            href="/shop?filter=new"
            className="inline-flex items-center px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All New Arrivals
            <FiArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Stay Updated with New Arrivals
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Be the first to know about new products, exclusive deals, and technical updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;