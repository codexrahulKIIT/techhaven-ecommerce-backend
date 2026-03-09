import { Product } from '../../types';

export const powerSupply: Product[] = [
  {
    id: 'PS001',
    name: '5V 2A Adapter Power Supply',
    description: 'Regulated 5V 2A SMPS adapter with DC barrel jack',
    price: 180,
    stock: 234,
    images: ['https://via.placeholder.com/600x600/2563eb/ffffff?text=5V+2A+Adapter'],
    categoryId: 'power-supply',
    rating: 4.5,
    isBestSeller: true,
    sku: 'PS-5V-2A'
  },
  {
    id: 'PS002',
    name: '12V 5A SMPS Power Supply',
    description: 'Switching mode power supply 12V 5A for LED strips, motors',
    price: 450,
    stock: 156,
    images: ['https://via.placeholder.com/600x600/10b981/ffffff?text=12V+5A+SMPS'],
    categoryId: 'power-supply',
    rating: 4.7,
    isBestSeller: true,
    sku: 'PS-12V-5A'
  },
  {
    id: 'PS003',
    name: 'LM2596 Buck Converter DC-DC Step Down',
    description: 'Adjustable voltage regulator 4-40V to 1.25-37V, 3A',
    price: 85,
    stock: 445,
    images: ['https://via.placeholder.com/600x600/f59e0b/ffffff?text=LM2596'],
    categoryId: 'power-supply',
    rating: 4.6,
    isBestSeller: true,
    sku: 'LM2596-BUCK'
  },
  {
    id: 'PS004',
    name: 'LM317 Adjustable Voltage Regulator',
    description: 'Linear voltage regulator 1.25V to 37V, 1.5A',
    price: 25,
    stock: 678,
    images: ['https://via.placeholder.com/600x600/8b5cf6/ffffff?text=LM317'],
    categoryId: 'power-supply',
    rating: 4.4,
    sku: 'LM317-TO220'
  },
  {
    id: 'PS005',
    name: 'Solar Panel 12V 10W Polycrystalline',
    description: 'Solar panel for charging 12V batteries, outdoor use',
    price: 850,
    stock: 67,
    images: ['https://via.placeholder.com/600x600/ef4444/ffffff?text=Solar+Panel'],
    categoryId: 'power-supply',
    rating: 4.6,
    isNew: true,
    sku: 'SOLAR-12V-10W'
  },
  {
    id: 'PS006',
    name: 'TP4056 Lithium Battery Charger Module',
    description: 'Micro USB 5V 1A lithium battery charging board with protection',
    price: 45,
    stock: 890,
    images: ['https://via.placeholder.com/600x600/06b6d4/ffffff?text=TP4056'],
    categoryId: 'power-supply',
    rating: 4.7,
    isBestSeller: true,
    sku: 'TP4056-CHG'
  },
  {
    id: 'PS007',
    name: 'XL6009 DC-DC Boost Converter',
    description: 'Step up voltage regulator 3-32V to 5-35V, 4A',
    price: 95,
    stock: 345,
    images: ['https://via.placeholder.com/600x600/ec4899/ffffff?text=XL6009'],
    categoryId: 'power-supply',
    rating: 4.5,
    sku: 'XL6009-BOOST'
  },
  {
    id: 'PS008',
    name: '5V USB Power Bank PCB Board',
    description: 'DIY power bank circuit with LED indicators, 2A output',
    price: 120,
    stock: 234,
    images: ['https://via.placeholder.com/600x600/14b8a6/ffffff?text=Power+Bank'],
    categoryId: 'power-supply',
    rating: 4.3,
    sku: 'PWR-BANK-PCB'
  }
];
