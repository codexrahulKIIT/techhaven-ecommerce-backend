// File: src/components/FeaturedProducts.tsx
'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
  loading: boolean;
}

const FALLBACK_IMAGE = '/placeholder.svg';
const isUuid = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products, loading }) => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const inrFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });

  // Default featured products with better structure
  const defaultProducts: Product[] = [
    {
      id: '1',
      name: 'Arduino UNO R3 ATmega328P',
      description: 'Microcontroller board based on ATmega328P with USB cable',
      price: 450,
      stock: 25,
      images: ['https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400&h=400&fit=crop&q=80'],
      categoryId: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'ESP32 DevKit V1 WiFi Bluetooth',
      description: 'Dual-core WiFi + Bluetooth development board',
      price: 280,
      stock: 40,
      images: ['https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=400&fit=crop&q=80'],
      categoryId: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      name: 'DHT22 Temperature Humidity Sensor',
      description: 'High precision digital temperature and humidity sensor',
      price: 120,
      stock: 60,
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&q=80'],
      categoryId: '4',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '4',
      name: 'HC-05 Bluetooth Module',
      description: 'Wireless Bluetooth serial communication module',
      price: 200,
      stock: 30,
      images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop&q=80'],
      categoryId: '4',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '5',
      name: 'L298N Motor Driver Module',
      description: 'Dual H-bridge motor driver for DC and stepper motors',
      price: 85,
      stock: 45,
      images: ['https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=400&fit=crop&q=80'],
      categoryId: '7',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '6',
      name: 'SG90 Micro Servo Motor 9g',
      description: '180-degree rotation micro servo motor for robotics',
      price: 95,
      stock: 70,
      images: ['https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop&q=80'],
      categoryId: '7',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '7',
      name: 'HC-SR04 Ultrasonic Sensor',
      description: 'Distance measuring sensor module 2cm-400cm',
      price: 75,
      stock: 55,
      images: ['https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=400&fit=crop&q=80'],
      categoryId: '4',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '8',
      name: 'RGB LED Strip 5050 SMD 1M',
      description: 'Flexible waterproof RGB LED strip light',
      price: 180,
      stock: 20,
      images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=400&fit=crop&q=80'],
      categoryId: '5',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '9',
      name: 'Dummy Test Product - Smart IoT Hub',
      description: 'A dummy product for testing cart and wishlist functionality. Smart IoT hub with multiple sensors and connectivity options.',
      price: 299,
      stock: 50,
      images: ['https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop&q=80'],
      categoryId: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  const hasLiveProducts = products.some((product) => isUuid(product.id));
  const displayProducts = hasLiveProducts ? products : defaultProducts;

  // Enhanced product display with additional metadata
  const getProductDisplay = (product: Product, index: number) => {
    const badges = ['Best Seller', 'New Arrival', 'Hot Deal', 'Limited', 'Popular', 'Trending', 'Featured', 'Top Rated'];
    const badgeColors = ['bg-green-500', 'bg-blue-500', 'bg-red-500', 'bg-orange-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'];
    const ratings = [4.5, 4.6, 4.7, 4.8, 4.9, 5.0];
    const reviewCounts = [34, 45, 56, 67, 78, 89, 92, 124];
    
    return {
      ...product,
      originalPrice: Math.floor(product.price * 1.25),
      rating: ratings[index % ratings.length],
      reviews: reviewCounts[index % reviewCounts.length],
      badge: badges[index % badges.length],
      badgeColor: badgeColors[index % badgeColors.length],
      discount: 20,
      inStock: (product.stock ?? 0) > 0
    };
  };



  const handleImageError = (productId: string) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  const getImageUrl = (product: Product): string => {
    if (imageErrors[product.id]) {
      return FALLBACK_IMAGE;
    }

    try {
      // Handle case where images might be stored as arrays, JSON strings or single-quoted lists
      let raw = product.images?.[0] ?? FALLBACK_IMAGE;

      // If someone accidentally stored the whole images array as the value (e.g. product.images is a string of array),
      // try to normalize it into a single URL string.
      let imageUrl: string;

      if (Array.isArray(raw)) {
        imageUrl = String(raw[0] ?? FALLBACK_IMAGE);
      } else {
        imageUrl = String(raw);
      }

      imageUrl = imageUrl.trim();

      // Try JSON.parse for proper JSON array strings like '["a.jpg"]'
      if (imageUrl.startsWith('[') && imageUrl.endsWith(']')) {
        try {
          const parsed = JSON.parse(imageUrl);
          if (Array.isArray(parsed) && parsed.length > 0) {
            imageUrl = String(parsed[0]);
          }
        } catch (e) {
          // Fallback: support single-quoted arrays like ['a.jpg'] or strings with stray quotes
          imageUrl = imageUrl.replace(/^\[|\]$/g, '').replace(/^['"]|['"]$/g, '').trim();
        }
      }

      // Strip any surrounding quotes (single or double)
      imageUrl = imageUrl.replace(/^['"]+|['"]+$/g, '').trim();

      // If it's not an absolute URL and doesn't start with '/', make it a relative path with leading '/'
      if (!imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
        imageUrl = '/' + imageUrl.replace(/^\/+/, '');
      }

      return imageUrl || FALLBACK_IMAGE;
    } catch (error) {
      return FALLBACK_IMAGE;
    }
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        description: product.description,
        stock: product.stock
      });
    }
  };

  // Loading Skeleton
  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-square bg-gray-200 animate-pulse"></div>
                <div className="p-3 sm:p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-700 font-semibold mb-2">Featured Collection</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-2 md:mb-4">
            Featured Products
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular electronic components and development boards
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {displayProducts.slice(0, 8).map((product, index) => {
            const productDisplay = getProductDisplay(product, index);
            const inWishlist = isInWishlist(product.id);
            
            return (
              <div 
                key={product.id} 
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 flex flex-col h-full hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <Link href={`/product/${product.id}`}>
                    <div className="absolute inset-0">
                      <Image
                        src={getImageUrl(product)}
                        alt={product.name}
                        fill
                        className="object-contain p-2 sm:p-4 group-hover:scale-110 transition-transform duration-300"
                        onError={() => handleImageError(product.id)}
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                  </Link>

                  {/* Badge */}
                  {productDisplay.badge && (
                    <div className={`absolute top-2 left-2 ${productDisplay.badgeColor} text-white px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold shadow-lg z-10`}>
                      {productDisplay.badge}
                    </div>
                  )}

                  {/* Discount Badge */}
                  {productDisplay.discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-lg z-10">
                      -{productDisplay.discount}%
                    </div>
                  )}

                  {/* Quick Action Buttons */}
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-1 z-10">
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`p-2 rounded-full shadow-lg transition-all ${
                        inWishlist 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                      title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                    </button>
                    <Link href={`/product/${product.id}`}>
                      <button
                        className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all"
                        title="Quick view"
                      >
                        <Eye className="w-4 h-4 text-gray-700" />
                      </button>
                    </Link>
                  </div>

                  {/* Stock Status Overlay */}
                  {!productDisplay.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10">
                      <span className="bg-white text-red-600 px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-3 sm:p-4 flex flex-col flex-grow">
                  {/* Product Name */}
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 text-sm sm:text-base min-h-[2.5rem] sm:min-h-[3rem]">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${
                            i < Math.floor(productDisplay.rating) 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'fill-gray-200 text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray-500">
                      ({productDisplay.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg sm:text-xl font-bold text-blue-600">
                      {inrFormatter.format(product.price)}
                    </span>
                    {productDisplay.originalPrice > product.price && (
                      <span className="text-xs sm:text-sm text-gray-400 line-through">
                        {inrFormatter.format(productDisplay.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Stock Status */}
                  <div className="text-[10px] sm:text-xs mb-3">
                    {productDisplay.inStock ? (
                      <span className="text-green-600 font-medium">
                        In stock ({product.stock} available)
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium">
                        Out of stock
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button 
                    onClick={() => {
                      addToCart({
                        id: product.id,
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                        image: getImageUrl(product)
                      });
                    }}
                    className="w-full bg-blue-700 text-white py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg hover:bg-blue-800 active:bg-blue-900 transition-colors text-xs sm:text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mt-auto"
                    disabled={!productDisplay.inStock || !isUuid(product.id)}
                  >
                    <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{isUuid(product.id) ? 'Add to Cart' : 'Catalog Loading'}</span>
                    <span className="sm:hidden">{isUuid(product.id) ? 'Add' : 'Wait'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {!hasLiveProducts && (
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Live products are still loading from the backend. Preview cards are shown, but checkout is enabled only for catalog items synced from the database.
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-8 md:mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            <span>View All Products</span>
            <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
