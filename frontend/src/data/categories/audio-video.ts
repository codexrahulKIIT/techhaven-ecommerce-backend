import { Product } from '../../types';

export const audioVideo: Product[] = [
  {
    id: 'AV001',
    name: 'Bluetooth Speaker',
    description: 'Portable wireless Bluetooth speaker with high-quality sound and long battery life. Perfect for music lovers on the go.',
    price: 1500,
    stock: 30,
    images: [
      'https://picsum.photos/seed/speaker1/600/600',
      'https://picsum.photos/seed/speaker2/600/600',
      'https://picsum.photos/seed/speaker3/600/600',
    ],
    categoryId: 'audio-video',
    rating: 4.7,
    isBestSeller: true,
    features: ['Bluetooth 5.0', '10-hour battery life', 'Water-resistant', 'Built-in microphone', 'Compact design'],
    specifications: {
      'Connectivity': 'Bluetooth 5.0',
      'Battery Life': 'Up to 10 hours',
      'Water Resistance': 'IPX7',
      'Dimensions': '8 x 8 x 4 cm',
      'Weight': '200g'
    },
    sku: 'BT-SPK-001',
    tags: ['bluetooth', 'speaker', 'portable', 'wireless'],
    warranty: '1 year',
    returnPolicy: '30 days'
  },
  {
    id: 'AV002',
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with tactile switches. Ideal for gaming and typing enthusiasts.',
    price: 2500,
    stock: 20,
    images: [
      'https://picsum.photos/seed/keyboard1/600/600',
      'https://picsum.photos/seed/keyboard2/600/600',
      'https://picsum.photos/seed/keyboard3/600/600',
    ],
    categoryId: 'audio-video',
    rating: 4.8,
    isNew: true,
    features: ['Mechanical switches', 'RGB backlighting', 'USB-C connection', 'Aluminum frame', 'Hot-swappable switches'],
    specifications: {
      'Switch Type': 'Cherry MX Red',
      'Backlighting': 'RGB per-key',
      'Connection': 'USB-C',
      'Layout': 'Full-size',
      'Dimensions': '44 x 13.5 x 3.5 cm'
    },
    sku: 'MECH-KB-001',
    tags: ['keyboard', 'mechanical', 'gaming', 'RGB'],
    warranty: '2 years',
    returnPolicy: '30 days'
  },
  {
    id: 'AV003',
    name: 'Wireless Headphones',
    description: 'Noise-cancelling wireless headphones with premium sound quality and comfortable fit for all-day use.',
    price: 1800,
    stock: 25,
    images: [
      'https://picsum.photos/seed/headphones1/600/600',
      'https://picsum.photos/seed/headphones2/600/600',
      'https://picsum.photos/seed/headphones3/600/600',
    ],
    categoryId: 'audio-video',
    rating: 4.6,
    isBestSeller: true,
    features: ['Active noise cancellation', '30-hour battery life', 'Quick charge', 'Foldable design', 'Hi-Res audio'],
    specifications: {
      'Driver Size': '40mm',
      'Battery Life': 'Up to 30 hours',
      'Charging Time': '2 hours',
      'Weight': '250g',
      'Connectivity': 'Bluetooth 5.0'
    },
    sku: 'WL-HP-001',
    tags: ['headphones', 'wireless', 'noise-cancelling', 'bluetooth'],
    warranty: '1 year',
    returnPolicy: '30 days'
  }
];
