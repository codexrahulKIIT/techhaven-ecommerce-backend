import { Product } from '../../types';

export const smdComponents: Product[] = [
  {
    id: 'SMD001',
    name: 'SMD Resistor Kit 0805 (1200 pieces)',
    description: 'Assorted 0805 SMD resistors 0Ω to 10MΩ',
    price: 280,
    stock: 234,
    images: ['https://via.placeholder.com/600x600/2563eb/ffffff?text=SMD+Resistors'],
    categoryId: 'smd-components',
    rating: 4.7,
    isBestSeller: true,
    sku: 'SMD-RES-0805'
  },
  {
    id: 'SMD002',
    name: 'SMD Capacitor Kit 0805 (660 pieces)',
    description: 'Ceramic capacitors 0.5pF to 10µF',
    price: 320,
    stock: 178,
    images: ['https://via.placeholder.com/600x600/10b981/ffffff?text=SMD+Caps'],
    categoryId: 'smd-components',
    rating: 4.6,
    sku: 'SMD-CAP-0805'
  },
  {
    id: 'SMD003',
    name: 'SMD LED 0805 White (Pack of 100)',
    description: 'Surface mount white LEDs 0805 package',
    price: 95,
    stock: 456,
    images: ['https://via.placeholder.com/600x600/f59e0b/ffffff?text=SMD+LED'],
    categoryId: 'smd-components',
    rating: 4.5,
    isBestSeller: true,
    sku: 'SMD-LED-0805-W'
  },
  {
    id: 'SMD004',
    name: 'SMD Transistor SOT-23 Kit (300 pieces)',
    description: 'Assorted SMD transistors NPN/PNP',
    price: 245,
    stock: 189,
    images: ['https://via.placeholder.com/600x600/8b5cf6/ffffff?text=SMD+Trans'],
    categoryId: 'smd-components',
    rating: 4.4,
    sku: 'SMD-TRANS-KIT'
  },
  {
    id: 'SMD005',
    name: 'SMD Diode 1N4148 SOD-123 (Pack of 100)',
    description: 'Fast switching diodes SMD package',
    price: 85,
    stock: 345,
    images: ['https://via.placeholder.com/600x600/ef4444/ffffff?text=SMD+Diode'],
    categoryId: 'smd-components',
    rating: 4.5,
    sku: 'SMD-1N4148-100'
  },
  {
    id: 'SMD006',
    name: 'AMS1117-3.3V SMD Regulator (Pack of 10)',
    description: 'Low dropout voltage regulator SOT-223',
    price: 75,
    stock: 234,
    images: ['https://via.placeholder.com/600x600/06b6d4/ffffff?text=AMS1117'],
    categoryId: 'smd-components',
    rating: 4.6,
    sku: 'AMS1117-3.3-10'
  }
];
