'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiHeart, FiShoppingCart, FiEye, FiStar } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Product } from '@/types/product';
import { WishlistItem } from '@/types/index';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    addToWishlist(product);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div 
      className="product-card bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`}>
        {/* Product Image */}
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <Image
            src={product.images?.[0] ? (product.images[0].startsWith('/') ? product.images[0] : '/' + product.images[0]) : ''}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 space-y-1">
            {(product.stock ?? 0) === 0 && (
              <span className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-bold">
                Out of Stock
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className={`absolute top-2 right-2 space-y-2 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <button
              onClick={handleWishlist}
              className={`p-2 rounded-full shadow-md transition-colors ${
                isInWishlist(product.id.toString())
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-600 hover:text-red-500'
              }`}
            >
              <FiHeart className="w-4 h-4" />
            </button>
            <button className="p-2 bg-white text-gray-600 rounded-full shadow-md hover:text-primary transition-colors">
              <FiEye className="w-4 h-4" />
            </button>
          </div>
        </div>

          {/* Product Info */}
          <div className="p-4">
          <div className="text-sm text-gray-500 mb-1">{product.categoryId}</div>
          
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          {/* Rating */}
          {/* Rating and reviews not available in Product type, so omitted */}
          
          {/* Price */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price}
            </span>
            {/* originalPrice not available in Product type */}
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="px-4 pb-4 flex space-x-2">
        <button
          onClick={handleAddToCart}
          disabled={(product.stock ?? 0) === 0}
          className={`flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors ${
            (product.stock ?? 0) === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Add to Cart
        </button>
        <button
          onClick={handleWishlist}
          className={`p-2 border rounded-lg ${isInWishlist(product.id) ? 'bg-red-50 border-red-500' : 'border-gray-300'}`}
        >
          <FiHeart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;