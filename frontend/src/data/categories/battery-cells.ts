import { Product } from '../../types';

export const batteryCells: Product[] = [
  {
    id: 'BC001',
    name: '18650 Lithium Ion Battery 3.7V 2600mAh',
    description: 'Rechargeable Li-ion cell with protection circuit',
    price: 180,
    stock: 567,
    images: ['https://via.placeholder.com/600x600/2563eb/ffffff?text=18650+Battery'],
    categoryId: 'battery-cells',
    rating: 4.6,
    isBestSeller: true,
    sku: 'BAT-18650-2600'
  },
  {
    id: 'BC002',
    name: '9V Rechargeable Li-ion Battery 650mAh',
    description: 'USB rechargeable 9V battery with charging cable',
    price: 320,
    stock: 234,
    images: ['https://via.placeholder.com/600x600/10b981/ffffff?text=9V+Battery'],
    categoryId: 'battery-cells',
    rating: 4.5,
    sku: 'BAT-9V-RECH'
  },
  {
    id: 'BC003',
    name: '3.7V 1000mAh Lithium Polymer Battery',
    description: 'LiPo battery 103450 for electronics projects',
    price: 150,
    stock: 456,
    images: ['https://via.placeholder.com/600x600/f59e0b/ffffff?text=LiPo+Battery'],
    categoryId: 'battery-cells',
    rating: 4.7,
    isBestSeller: true,
    sku: 'BAT-LIPO-1000'
  },
  {
    id: 'BC004',
    name: '12V 7Ah Lead Acid Battery',
    description: 'Sealed maintenance-free battery for UPS, solar systems',
    price: 850,
    stock: 89,
    images: ['https://via.placeholder.com/600x600/8b5cf6/ffffff?text=Lead+Acid'],
    categoryId: 'battery-cells',
    rating: 4.4,
    sku: 'BAT-12V-7AH'
  },
  {
    id: 'BC005',
    name: 'CR2032 3V Coin Cell Battery (Pack of 5)',
    description: 'Button cell battery for CMOS, watches, remotes',
    price: 45,
    stock: 1234,
    images: ['https://via.placeholder.com/600x600/ef4444/ffffff?text=CR2032'],
    categoryId: 'battery-cells',
    rating: 4.5,
    isBestSeller: true,
    sku: 'BAT-CR2032-5'
  },
  {
    id: 'BC006',
    name: 'AA Alkaline Battery (Pack of 4)',
    description: 'High capacity 1.5V AA batteries',
    price: 80,
    stock: 890,
    images: ['https://via.placeholder.com/600x600/06b6d4/ffffff?text=AA+Battery'],
    categoryId: 'battery-cells',
    rating: 4.3,
    sku: 'BAT-AA-ALK-4'
  },
  {
    id: 'BC007',
    name: '3S 12V Li-ion Battery Pack 2200mAh',
    description: 'Lithium battery pack with BMS protection',
    price: 650,
    stock: 123,
    images: ['https://via.placeholder.com/600x600/ec4899/ffffff?text=3S+Battery'],
    categoryId: 'battery-cells',
    rating: 4.6,
    isNew: true,
    sku: 'BAT-3S-2200'
  },
  {
    id: 'BC008',
    name: 'Battery Holder for 18650 Single Cell',
    description: 'Plastic battery holder with wire leads',
    price: 25,
    stock: 678,
    images: ['https://via.placeholder.com/600x600/14b8a6/ffffff?text=Holder'],
    categoryId: 'battery-cells',
    rating: 4.2,
    sku: 'HOLD-18650-1'
  }
];
