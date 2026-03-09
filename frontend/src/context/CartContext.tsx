'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { getBackendUrlSync } from '../utils/getBackendUrl';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  originalPrice?: number;
  stock?: number;
  isAvailable?: boolean;
  category?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
  isHydrated: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const isUuid = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

const sanitizeCartItems = (items: CartItem[]) => items.filter((item) => isUuid(item.productId));

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [guestToken, setGuestToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      let storedGuestToken = localStorage.getItem('guestCartToken');
      if (!storedGuestToken) {
        storedGuestToken = uuidv4();
        localStorage.setItem('guestCartToken', storedGuestToken);
      }
      setGuestToken(storedGuestToken);

      const saved = localStorage.getItem('cart');
      if (saved) {
        const parsedItems = JSON.parse(saved) as CartItem[];
        const sanitizedItems = sanitizeCartItems(parsedItems);
        if (sanitizedItems.length !== parsedItems.length) {
          localStorage.setItem('cart', JSON.stringify(sanitizedItems));
          toast.info('Removed outdated cart items that are no longer available.');
        }
        setItems(sanitizedItems);
      }
    } catch (error) {
      console.error('Failed to parse cart from localStorage:', error);
      localStorage.removeItem('cart');
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== 'cart') return;

      try {
        const parsedItems = event.newValue ? (JSON.parse(event.newValue) as CartItem[]) : [];
        setItems(sanitizeCartItems(parsedItems));
      } catch (error) {
        console.error('Failed to sync cart from storage:', error);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items, isHydrated]);

  useEffect(() => {
    if (!isHydrated || !guestToken) return;

    void fetch(`${getBackendUrlSync()}/cart/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        guestToken,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      }),
    }).catch((error) => {
      console.error('Failed to sync guest cart:', error);
    });
  }, [guestToken, isHydrated, items]);

  const addToCart = (product: any) => {
    const resolvedProductId = product.productId || product.id;
    if (!resolvedProductId) {
      toast.error('Invalid product');
      return;
    }

    if (!isUuid(resolvedProductId)) {
      toast.error('This item is not ready for checkout yet. Please use products loaded from the live catalog.');
      return;
    }

    setItems(prev => {
      const existing = prev.find(item => item.productId === resolvedProductId);
      if (existing) {
        toast.info('Updated quantity in cart');
        return prev.map(item =>
          item.productId === resolvedProductId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success('Added to cart!');
      return [...prev, {
        id: uuidv4(),
        productId: resolvedProductId,
        name: product.name,
        price: product.price,
        quantity: product.quantity && product.quantity > 0 ? product.quantity : 1,
        image: product.image || product.images?.[0] || '/placeholder.svg',
        originalPrice: product.originalPrice,
        stock: product.stock,
        isAvailable: (product.stock ?? 0) > 0,
        category: typeof product.category === 'string' ? product.category : product.category?.name
      }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(item => item.productId !== productId));
    toast.success('Removed from cart');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev =>
      prev.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems, isHydrated }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
