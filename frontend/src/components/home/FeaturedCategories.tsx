import React from 'react';
import Link from 'next/link';
import { FiArrowRight, FiTool, FiRadio, FiCpu, FiCode, FiZap, FiHardDrive } from 'react-icons/fi';

type Category = {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  productCount: string;
  image: string;
  link: string;
  color: string;
};

const FeaturedCategories: React.FC = () => {
  const categories: Category[] = [
    {
      id: 1,
      name: 'SMD Components',
      description: 'Resistors, Capacitors, Diodes & More',
      icon: <FiTool className="w-14 h-14 mx-auto" />,
      productCount: '2,500+',
      image: '/images/categories/smd.jpg',
      link: '/categories/smd-components',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Sensors & Modules',
      description: 'Temperature, Motion, Gas Sensors',
      icon: <FiRadio className="w-14 h-14 mx-auto" />,
      productCount: '1,200+',
      image: '/images/categories/sensors.jpg',
      link: '/categories/sensors-modules',
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: 'Robotics',
      description: 'Motors, Drivers, Wheels & Kits',
      icon: <FiCpu className="w-14 h-14 mx-auto" />,
      productCount: '800+',
      image: '/images/categories/robotics.jpg',
      link: '/categories/robotics',
      color: 'bg-orange-500'
    },
    {
      id: 4,
      name: 'Arduino & ESP',
      description: 'Development Boards & Modules',
      icon: <FiCode className="w-14 h-14 mx-auto" />,
      productCount: '600+',
      image: '/images/categories/arduino.jpg',
      link: '/categories/development-boards',
      color: 'bg-indigo-500'
    },
    {
      id: 5,
      name: 'Power Supply',
      description: 'SMPS, Batteries, Solar Panels',
      icon: <FiZap className="w-14 h-14 mx-auto" />,
      productCount: '400+',
      image: '/images/categories/power.jpg',
      link: '/categories/power-supply',
      color: 'bg-red-500'
    },
    {
      id: 6,
      name: 'Tools & Equipment',
      description: 'Soldering, Testing Equipment',
      icon: <FiHardDrive className="w-14 h-14 mx-auto" />,
      productCount: '300+',
      image: '/images/categories/tools.jpg',
      link: '/categories/components',
      color: 'bg-yellow-500'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our extensive collection of electronic components organized by category
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.link}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <div className={`absolute inset-0 ${category.color} opacity-90`} />
                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="mb-4">{category.icon}</div>
                    <h3 className="text-xl font-bold">{category.name}</h3>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-3">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">
                    {category.productCount} Products
                  </span>
                  <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform">
                    <span className="text-sm font-medium mr-1">Shop Now</span>
                    <FiArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/categories"
            className="inline-flex items-center px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Categories
            <FiArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
