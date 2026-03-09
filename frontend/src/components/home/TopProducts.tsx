'use client'
import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/product/ProductCard';
import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import { Product } from '@/types/product';

const TopProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState('featured');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Arduino Uno R3 Development Board',
        price: 650,
        originalPrice: 750,
        images: ['https://dummyimage.com/300x200/cccccc/000000&text=Arduino+Uno'],
        rating: 4.8,
        categoryId: '1',
        inStock: true,
        isBestSeller: true,
        discount: 13,
        reviewCount: 125
      },
      {
        id: '2',
        name: 'ESP32 WiFi Bluetooth Module',
        price: 450,
        originalPrice: 520,
        images: ['https://dummyimage.com/300x200/cccccc/000000&text=ESP32'],
        rating: 4.7,
        categoryId: '2',
        inStock: true,
        isBestSeller: true,
        discount: 13,
        reviewCount: 98
      },
      {
        id: '3',
        name: 'DHT22 Temperature Humidity Sensor',
        price: 280,
        images: ['https://dummyimage.com/300x200/cccccc/000000&text=DHT22'],
        rating: 4.6,
        categoryId: '3',
        inStock: true,
        isBestSeller: true,
        reviewCount: 87
      },
      {
        id: '4',
        name: 'HC-SR04 Ultrasonic Distance Sensor',
        price: 120,
        images: ['https://dummyimage.com/300x200/cccccc/000000&text=HC-SR04'],
        rating: 4.5,
        categoryId: '3',
        inStock: true,
        isBestSeller: true,
        reviewCount: 76
      },
      {
        id: '5',
        name: 'L298N Motor Driver Module',
        price: 180,
        originalPrice: 220,
        images: ['https://dummyimage.com/300x200/cccccc/000000&text=L298N'],
        rating: 4.7,
        categoryId: '4',
        inStock: true,
        isBestSeller: true,
        discount: 18,
        reviewCount: 112
      },
      {
        id: '6',
        name: 'Raspberry Pi 4 Model B 4GB',
        price: 6500,
        images: ['https://dummyimage.com/300x200/cccccc/000000&text=Raspberry+Pi+4'],
        rating: 4.9,
        categoryId: '5',
        inStock: true,
        isBestSeller: true,
        reviewCount: 156
      },
      {
        id: '7',
        name: 'Servo Motor SG90 9g Micro',
        price: 150,
        images: ['https://dummyimage.com/300x200/cccccc/000000&text=SG90'],
        rating: 4.4,
        categoryId: '6',
        inStock: true,
        isNew: true,
        reviewCount: 43
      },
      {
        id: '8',
        name: 'Breadboard 830 Point',
        price: 80,
        images: ['https://dummyimage.com/300x200/cccccc/000000&text=Breadboard'],
        rating: 4.3,
        categoryId: '7',
        inStock: true,
        isNew: true,
        reviewCount: 29
      }
    ];

    // Filter products based on active tab
    let filteredProducts = mockProducts;

    switch (activeTab) {
      case 'featured':
        filteredProducts = mockProducts.filter(p => p.isBestSeller);
        break;
      case 'bestsellers':
        filteredProducts = mockProducts.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case 'new':
        filteredProducts = mockProducts.filter(p => p.isNew);
        break;
      case 'sale':
        filteredProducts = mockProducts.filter(p => p.discount);
        break;
    }

    setProducts(filteredProducts.slice(0, 8));
  }, [activeTab]);

  const tabs = [
    { id: 'featured', label: 'Featured', icon: '⭐' },
    { id: 'bestsellers', label: 'Best Sellers', icon: '🔥' },
    { id: 'new', label: 'New Arrivals', icon: '🆕' },
    { id: 'sale', label: 'On Sale', icon: '💰' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Top Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular electronic components and modules
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap justify-center bg-gray-100 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-md font-medium transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/shop"
            className="inline-flex items-center px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Products
            <FiArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopProducts;