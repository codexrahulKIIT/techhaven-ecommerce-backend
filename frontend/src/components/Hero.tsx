'use client';

import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "GET CUSTOMIZED PRODUCT FOR YOURSELF",
      couponCode: "COUPON CODE GET10EN",
      description: "Premium electronic components for your next innovation",
      backgroundColor: "from-slate-800 via-slate-700 to-blue-800"
    },
    {
      id: 2,
      title: "ARDUINO & ESP32 DEVELOPMENT BOARDS",
      couponCode: "BEST QUALITY GUARANTEED",
      description: "Complete range of development boards and modules",
      backgroundColor: "from-blue-900 via-blue-800 to-purple-800"
    },
    {
      id: 3,
      title: "ROBOTICS & IoT COMPONENTS STORE",
      couponCode: "FREE SHIPPING ABOVE ₹999",
      description: "Motors, sensors, and automation components",
      backgroundColor: "from-indigo-900 via-purple-800 to-pink-800"
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
    <section className="relative h-80 md:h-[450px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className={`h-full bg-gradient-to-r ${slide.backgroundColor} relative`}>
            {/* Circuit Board Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div 
                className="h-full w-full"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3Ccircle cx='27' cy='7' r='2'/%3E%3Ccircle cx='47' cy='7' r='2'/%3E%3Ccircle cx='7' cy='27' r='2'/%3E%3Ccircle cx='27' cy='27' r='2'/%3E%3Ccircle cx='47' cy='27' r='2'/%3E%3Ccircle cx='7' cy='47' r='2'/%3E%3Ccircle cx='27' cy='47' r='2'/%3E%3Ccircle cx='47' cy='47' r='2'/%3E%3Cpath d='M7 7h20M27 7h20M7 27h20M27 27h20M7 47h20M27 47h20M7 7v20M7 27v20M27 7v20M27 27v20M47 7v20M47 27v20' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>

            <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-8 items-center h-full">
                {/* Content Side */}
                <div className="text-white z-10">
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  
                  <div className="mb-6">
                    <span className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-md font-bold text-sm md:text-lg tracking-wider">
                      {slide.couponCode}
                    </span>
                  </div>
                  
                  <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-md">
                    {slide.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-semibold transition-colors duration-300">
                      Shop Now
                    </button>
                    <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-md font-semibold transition-colors duration-300">
                      View Catalog
                    </button>
                  </div>
                </div>

                {/* Robot/Electronics Illustration Side */}
                <div className="relative hidden md:flex justify-center items-center h-full">
                  <div className="relative">
                    {/* Main Robot/Device Assembly */}
                    <div className="relative z-10">
                      {/* Central Processing Unit */}
                      <div className="w-40 h-48 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 rounded-xl relative shadow-2xl border-4 border-blue-300">
                        {/* Screen/Display */}
                        <div className="absolute top-4 left-4 right-4 h-16 bg-cyan-300 rounded-lg border-2 border-white shadow-inner flex items-center justify-center">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                          </div>
                        </div>
                        
                        {/* Control Buttons */}
                        <div className="absolute top-24 left-6 right-6 grid grid-cols-3 gap-2">
                          <div className="w-6 h-6 bg-orange-400 rounded-full shadow-lg"></div>
                          <div className="w-6 h-6 bg-green-400 rounded-full shadow-lg"></div>
                          <div className="w-6 h-6 bg-purple-400 rounded-full shadow-lg"></div>
                        </div>
                        
                        {/* Ports */}
                        <div className="absolute bottom-6 left-6 right-6 h-8 bg-gray-700 rounded-md border border-gray-500">
                          <div className="flex justify-center items-center h-full space-x-1">
                            <div className="w-2 h-4 bg-yellow-300 rounded-sm"></div>
                            <div className="w-2 h-4 bg-blue-300 rounded-sm"></div>
                            <div className="w-2 h-4 bg-red-300 rounded-sm"></div>
                            <div className="w-2 h-4 bg-green-300 rounded-sm"></div>
                          </div>
                        </div>
                      </div>

                      {/* Side Modules */}
                      <div className="absolute -left-8 top-16 w-16 h-20 bg-gradient-to-b from-orange-400 to-orange-600 rounded-lg shadow-xl transform rotate-12">
                        <div className="absolute top-2 left-2 right-2 h-2 bg-orange-200 rounded"></div>
                        <div className="absolute top-6 left-2 right-2 h-2 bg-orange-200 rounded"></div>
                      </div>
                      
                      <div className="absolute -right-8 top-16 w-16 h-20 bg-gradient-to-b from-green-400 to-green-600 rounded-lg shadow-xl transform -rotate-12">
                        <div className="absolute top-2 left-2 right-2 h-2 bg-green-200 rounded"></div>
                        <div className="absolute top-6 left-2 right-2 h-2 bg-green-200 rounded"></div>
                      </div>
                    </div>

                    {/* Floating Components */}
                    <div className="absolute -top-12 -left-16 w-20 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl shadow-lg transform rotate-12 animate-bounce">
                      <div className="absolute inset-2 border-2 border-yellow-200 rounded-lg"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-200 rounded-full"></div>
                    </div>
                    
                    <div className="absolute -top-8 -right-20 w-16 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl shadow-lg transform -rotate-12 animate-bounce" style={{ animationDelay: '0.5s' }}>
                      <div className="absolute top-2 left-2 right-2 bottom-2 border-2 border-purple-200 rounded-lg flex items-center justify-center">
                        <div className="w-3 h-3 bg-purple-200 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="absolute -bottom-8 -left-12 w-18 h-14 bg-gradient-to-br from-red-400 to-red-600 rounded-lg shadow-lg transform rotate-45 animate-bounce" style={{ animationDelay: '1s' }}>
                      <div className="absolute inset-1 border border-red-200 rounded"></div>
                    </div>
                    
                    <div className="absolute -bottom-6 -right-16 w-14 h-18 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg shadow-lg transform -rotate-45 animate-bounce" style={{ animationDelay: '1.5s' }}>
                      <div className="absolute inset-1 border border-teal-200 rounded flex items-center justify-center">
                        <div className="w-2 h-2 bg-teal-200 rounded-full"></div>
                      </div>
                    </div>

                    {/* Connecting Lines/Circuits */}
                    <div className="absolute inset-0 pointer-events-none">
                      <svg className="w-full h-full" viewBox="0 0 300 300">
                        <defs>
                          <linearGradient id="circuit1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8"/>
                            <stop offset="100%" stopColor="#ff6b6b" stopOpacity="0.8"/>
                          </linearGradient>
                        </defs>
                        <path 
                          d="M50,150 Q150,50 250,150" 
                          stroke="url(#circuit1)" 
                          strokeWidth="3" 
                          fill="none" 
                          strokeDasharray="8,4"
                        >
                          <animate attributeName="stroke-dashoffset" values="0;12" dur="2s" repeatCount="indefinite"/>
                        </path>
                        <path 
                          d="M150,50 Q250,150 150,250" 
                          stroke="url(#circuit1)" 
                          strokeWidth="3" 
                          fill="none" 
                          strokeDasharray="8,4"
                          opacity="0.7"
                        >
                          <animate attributeName="stroke-dashoffset" values="0;12" dur="3s" repeatCount="indefinite"/>
                        </path>
                        <path 
                          d="M50,150 L100,100 L200,200 L250,150" 
                          stroke="#fbbf24" 
                          strokeWidth="2" 
                          fill="none" 
                          strokeDasharray="4,4" 
                          opacity="0.6"
                        >
                          <animate attributeName="stroke-dashoffset" values="0;8" dur="1.5s" repeatCount="indefinite"/>
                        </path>
                        
                        {/* Circuit Nodes */}
                        <circle cx="100" cy="100" r="4" fill="#00f0ff" opacity="0.8">
                          <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="200" cy="200" r="4" fill="#ff6b6b" opacity="0.8">
                          <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" begin="0.5s"/>
                        </circle>
                        <circle cx="250" cy="150" r="4" fill="#fbbf24" opacity="0.8">
                          <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" begin="1s"/>
                        </circle>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/40 transition-all duration-300 z-20"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/40 transition-all duration-300 z-20"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-110' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Floating Action Button */}
      <div className="absolute bottom-6 right-6 z-20">
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-lg transition-colors duration-300 text-sm font-semibold">
          Get Quote
        </button>
      </div>
    </section>
  );
}