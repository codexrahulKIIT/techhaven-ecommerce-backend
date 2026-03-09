'use client';

import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Branded Components In Most Affordable Price",
      subtitle: "Complete BOM Support for Product Manufacturing",
      backgroundColor: "from-blue-900 via-blue-800 to-purple-900"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-96 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900">
        {/* Yellow Curved Design */}
        <div className="absolute inset-0">
          <svg viewBox="0 0 1200 400" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M0,250 Q300,100 600,180 T1200,150 L1200,400 L0,400 Z"
              fill="#fbbf24"
              opacity="0.9"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto h-full px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center h-full">
            {/* Left Content */}
            <div className="text-white">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                <span className="text-yellow-400">Branded Components In</span><br />
                <span className="text-yellow-400">Most Affordable</span><br />
                <span className="text-yellow-400">Price</span>
              </h1>
              
              <p className="text-xl mb-8 text-gray-200">
                Complete BOM Support for Product Manufacturing
              </p>
              
              <div className="flex space-x-4">
                <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors">
                  Shop Now
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors">
                  Custom Projects
                </button>
              </div>
            </div>

            {/* Right Content - Electronics Component */}
            <div className="relative flex justify-center items-center">
              <div className="relative">
                {/* Main Component Circle */}
                <div className="w-80 h-80 bg-gray-800 rounded-full shadow-2xl border-4 border-gray-700 relative flex items-center justify-center">
                  {/* Component Label */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <div className="w-8 h-8 bg-gray-800 rounded-sm"></div>
                    </div>
                    <h3 className="text-white text-2xl font-bold">Electronic Component</h3>
                    <p className="text-gray-300 text-lg">Premium Quality</p>
                  </div>
                  
                  {/* Component Pins/Connections */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                    <div className="flex space-x-1">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-2 h-8 bg-gray-400 rounded-sm"></div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
                    <div className="flex space-x-1">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-2 h-8 bg-gray-400 rounded-sm"></div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Free Shipping Badge */}
                <div className="absolute -bottom-4 right-0">
                  <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Free Shipping ₹999+
                  </div>
                </div>
                
                {/* Min Order Badge */}
                <div className="absolute -top-4 right-0">
                  <div className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    ₹199 Min Order
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Issues Badge (Bottom Left) */}
        <div className="absolute bottom-4 left-4 z-20">
          <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
            <span>N</span>
            <span className="ml-2">2 Issues</span>
            <button className="ml-2 text-white hover:text-red-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/40 transition-all duration-300 z-20"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/40 transition-all duration-300 z-20"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>
    </section>
  );
}