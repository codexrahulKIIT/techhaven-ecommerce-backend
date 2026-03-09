import { Product } from '../../types';

export const projects: Product[] = [
  {
    id: 'PR001',
    name: 'Arduino Starter Kit with UNO',
    description: 'Complete Arduino starter kit with sensors, modules and components',
    price: 2850,
    stock: 89,
    images: ['https://via.placeholder.com/600x600/2563eb/ffffff?text=Arduino+Kit'],
    categoryId: 'projects',
    rating: 4.8,
    isBestSeller: true,
    sku: 'ARDUINO-KIT-UNO'
  },
  {
    id: 'PR002',
    name: 'Raspberry Pi 4 Complete Kit',
    description: 'Raspberry Pi 4 with case, power supply, SD card and HDMI cable',
    price: 8500,
    stock: 45,
    images: ['https://via.placeholder.com/600x600/10b981/ffffff?text=RPi+Kit'],
    categoryId: 'projects',
    rating: 4.7,
    isBestSeller: true,
    sku: 'RPI4-COMPLETE'
  },
  {
    id: 'PR003',
    name: 'ESP32 IoT Development Kit',
    description: 'ESP32 with sensors, OLED display and battery for IoT projects',
    price: 1650,
    stock: 67,
    images: ['https://via.placeholder.com/600x600/f59e0b/ffffff?text=ESP32+IoT'],
    categoryId: 'projects',
    rating: 4.6,
    isNew: true,
    sku: 'ESP32-IOT-KIT'
  },
  {
    id: 'PR004',
    name: 'Robot Car Kit with Bluetooth',
    description: 'Complete robot car kit with Bluetooth control and obstacle avoidance',
    price: 2250,
    stock: 34,
    images: ['https://via.placeholder.com/600x600/8b5cf6/ffffff?text=Robot+Car'],
    categoryId: 'projects',
    rating: 4.7,
    isBestSeller: true,
    sku: 'ROBOT-CAR-BT'
  },
  {
    id: 'PR005',
    name: 'Home Automation Kit',
    description: 'Smart home kit with relay modules, sensors and ESP8266',
    price: 1950,
    stock: 56,
    images: ['https://via.placeholder.com/600x600/ef4444/ffffff?text=Home+Auto'],
    categoryId: 'projects',
    rating: 4.5,
    sku: 'HOME-AUTO-KIT'
  },
  {
    id: 'PR006',
    name: 'Weather Station Kit',
    description: 'Complete weather monitoring station with multiple sensors',
    price: 3200,
    stock: 23,
    images: ['https://via.placeholder.com/600x600/06b6d4/ffffff?text=Weather+Station'],
    categoryId: 'projects',
    rating: 4.6,
    sku: 'WEATHER-STATION'
  },
  {
    id: 'PR007',
    name: 'LED Matrix Display Kit',
    description: '8x8 LED matrix with MAX7219 driver and Arduino',
    price: 850,
    stock: 78,
    images: ['https://via.placeholder.com/600x600/ec4899/ffffff?text=LED+Matrix'],
    categoryId: 'projects',
    rating: 4.4,
    sku: 'LED-MATRIX-KIT'
  },
  {
    id: 'PR008',
    name: 'Solar Power Bank Kit',
    description: 'DIY solar power bank with charging circuit and battery',
    price: 1450,
    stock: 45,
    images: ['https://via.placeholder.com/600x600/14b8a6/ffffff?text=Solar+Bank'],
    categoryId: 'projects',
    rating: 4.5,
    isNew: true,
    sku: 'SOLAR-BANK-KIT'
  }
];
