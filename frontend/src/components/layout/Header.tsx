'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingCart, Search, ChevronDown, User, LogOut, Package, Settings } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { wishlistAPI, wishlistUtils } from '@/lib/wishlist';
import { useAuth } from '@/context/AuthContext';
import CartSidebar from '@/components/cart/CartSidebar';
import BackendPortDisplay from './BackendPortDisplay';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('SELECT CATEGORY');
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { totalItems, totalPrice } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchWishlistCount = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const count = await wishlistAPI.getWishlistCount(token);
          setWishlistCount(count);
        } else {
          setWishlistCount(wishlistUtils.getLocalWishlist().length);
        }
      } catch (error) {
        console.error('Failed to fetch wishlist count:', error);
        setWishlistCount(0);
      }
    };
    fetchWishlistCount();
  }, [user]);

  const handleHeartClick = () => {
    router.push('/wishlist');
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalPrice);

  return (
    <div className="bg-white shadow-sm">
      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Mobile Layout - Stack vertically */}
        <div className="block lg:hidden">
          {/* Top Row: Logo and Icons */}
          <div className="flex items-center justify-between mb-3">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mr-2 shadow-lg">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <div>
                  <div className="text-red-600 font-bold text-lg leading-tight tracking-wide">TECHHAVEN</div>
                  <div className="text-red-600 font-bold text-sm leading-tight tracking-wider">STORE</div>
                </div>
              </div>
            </Link>

            {/* Right Icons */}
            <div className="flex items-center space-x-3">
              <a href="/wishlist" className="flex flex-col items-center cursor-pointer hover:opacity-80">
                <div className="relative">
                  <Heart className="w-5 h-5 text-gray-700" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </div>
              </a>
              <a href="/cart" data-testid="cart-icon" className="flex flex-col items-center cursor-pointer hover:opacity-80">
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 text-gray-700" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
              </a>
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center text-gray-700 hover:text-blue-600"
                  >
                    <User className="w-5 h-5" />
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                      <div className="px-4 py-2 text-sm font-medium text-gray-900 border-b">{user?.firstName}</div>
                      <a href="/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50">
                        <User className="w-4 h-4 mr-2" />
                        My Dashboard
                      </a>
                      <a href="/orders" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50">
                        <Package className="w-4 h-4 mr-2" />
                        My Orders
                      </a>
                      <a href="/wishlist" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50">
                        <Heart className="w-4 h-4 mr-2" />
                        Wishlist
                      </a>
                      <hr className="my-2" />
                      <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-50"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <a href="/login" className="text-gray-700 text-sm hover:text-blue-600 font-medium">
                  LOGIN
                </a>
              )}
            </div>
          </div>

          {/* Search Bar - Full width on mobile */}
          <div className="mb-3">
            <div className="flex shadow-sm">
              <input
                type="text"
                placeholder="Search for products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2 py-2 border-t border-b border-gray-300 bg-gray-50 text-gray-700 text-xs min-w-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option>SELECT CATEGORY</option>
                <option>Development Boards</option>
                <option>Sensors</option>
                <option>Components</option>
                <option>Robotics</option>
                <option>Power Supply & Solar</option>
                <option>Battery & Cells</option>
                <option>SMD</option>
              </select>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Custom Project Button and Cart Total */}
          <div className="flex items-center justify-between">
            <Link href="/custom-project">
              <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-red-700 transition-all duration-300 focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                CUSTOM PROJECT
              </button>
            </Link>
            <div className="text-right">
              <div className="text-blue-600 font-bold text-lg">{formattedTotal}</div>
              <div className="text-gray-500 text-xs">{totalItems} {totalItems === 1 ? 'item' : 'items'}</div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mr-3 shadow-lg">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <div>
                <div className="text-red-600 font-bold text-xl leading-tight tracking-wide">TECHHAVEN</div>
                <div className="text-red-600 font-bold text-lg leading-tight tracking-wider">STORE</div>
                <div className="text-gray-600 text-xs tracking-widest">LET&apos;S MAKE IT</div>
              </div>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="flex shadow-sm">
              <input
                type="text"
                placeholder="Search for products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border-t border-b border-gray-300 bg-gray-50 text-gray-700 text-sm min-w-[160px] focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option>SELECT CATEGORY</option>
                <option>Development Boards</option>
                <option>Sensors</option>
                <option>Components</option>
                <option>Robotics</option>
                <option>Power Supply & Solar</option>
                <option>Battery & Cells</option>
                <option>SMD</option>
              </select>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            <Link href="/custom-project">
              <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-lg focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer">
                CUSTOM PROJECT
              </button>
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">{user?.firstName}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                    <a href="/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50">
                      <User className="w-4 h-4 mr-2" />
                      My Dashboard
                    </a>
                    <a href="/orders" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50">
                      <Package className="w-4 h-4 mr-2" />
                      My Orders
                    </a>
                    <a href="/wishlist" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50">
                      <Heart className="w-4 h-4 mr-2" />
                      Wishlist
                    </a>
                    <a href="/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </a>
                    <hr className="my-2" />
                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a href="/login" className="text-gray-700 text-sm hover:text-blue-600 font-medium">
                LOGIN / REGISTER
              </a>
            )}

            <div className="flex items-center space-x-3">
            <a href="/wishlist" className="flex flex-col items-center cursor-pointer hover:opacity-80">
              <div className="relative">
                <Heart className="w-6 h-6 text-gray-700" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </div>
              <div className="text-blue-600 text-xs font-bold mt-1">{wishlistItems.length}</div>
            </a>
            <a href="/cart" data-testid="cart-icon" className="flex flex-col items-center cursor-pointer hover:opacity-80">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="text-blue-600 text-xs font-bold mt-1">{totalItems}</div>
            </a>
            </div>

            <div className="flex flex-col items-end">
              <div className="text-blue-600 font-bold text-xl">{formattedTotal}</div>
              <div className="text-gray-500 text-xs">{totalItems} {totalItems === 1 ? 'item' : 'items'}</div>
            </div>
          </div>
        </div>
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <div className="max-w-7xl mx-auto px-4 py-1 text-center">
        <BackendPortDisplay />
      </div>
    </div>
  );
}

