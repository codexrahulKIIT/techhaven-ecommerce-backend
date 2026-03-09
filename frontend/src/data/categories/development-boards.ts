import { Product } from '../../types';

export const developmentBoards: Product[] = [
  {
    id: 'DB001',
    name: 'Arduino Uno R3 ATmega328P Development Board',
    description: 'Original Arduino Uno R3 with ATmega328P microcontroller, USB cable included',
    price: 850,
    stock: 45,
    images: [
      'https://via.placeholder.com/600x600/2563eb/ffffff?text=Arduino+Uno',
      'https://via.placeholder.com/600x600/2563eb/ffffff?text=Arduino+Back',
    ],
    categoryId: 'development-boards',
    rating: 4.8,
    isBestSeller: true,
    features: ['ATmega328P', '14 Digital I/O', '6 Analog Inputs', '32KB Flash', '16MHz Clock'],
    specifications: {
      'Microcontroller': 'ATmega328P',
      'Operating Voltage': '5V',
      'Input Voltage': '7-12V',
      'Digital I/O': '14',
      'Clock Speed': '16 MHz'
    },
    sku: 'ARD-UNO-R3',
    warranty: '6 months'
  },
  {
    id: 'DB002',
    name: 'ESP32 DevKit V1 WiFi Bluetooth Board',
    description: 'Dual-core ESP32 with WiFi and Bluetooth 4.2, perfect for IoT projects',
    price: 650,
    stock: 67,
    images: ['https://via.placeholder.com/600x600/10b981/ffffff?text=ESP32'],
    categoryId: 'development-boards',
    rating: 4.7,
    isNew: true,
    isBestSeller: true,
    sku: 'ESP32-DK-V1'
  },
  {
    id: 'DB003',
    name: 'NodeMCU ESP8266 WiFi Module',
    description: 'Compact ESP8266 board with WiFi, Arduino compatible',
    price: 380,
    stock: 89,
    images: ['https://via.placeholder.com/600x600/f59e0b/ffffff?text=NodeMCU'],
    categoryId: 'development-boards',
    rating: 4.6,
    isBestSeller: true,
    sku: 'NODEMCU-ESP8266'
  },
  {
    id: 'DB004',
    name: 'Arduino Nano V3 ATmega328P',
    description: 'Compact Arduino board, breadboard friendly',
    price: 420,
    stock: 156,
    images: ['https://via.placeholder.com/600x600/8b5cf6/ffffff?text=Arduino+Nano'],
    categoryId: 'development-boards',
    rating: 4.7,
    sku: 'ARD-NANO-V3'
  },
  {
    id: 'DB005',
    name: 'Raspberry Pi 4 Model B 4GB',
    description: 'Latest Raspberry Pi with 4GB RAM, dual 4K display support',
    price: 7500,
    stock: 23,
    images: ['https://via.placeholder.com/600x600/ef4444/ffffff?text=RPi4'],
    categoryId: 'development-boards',
    rating: 4.9,
    isNew: true,
    sku: 'RPI4-4GB'
  },
  {
    id: 'DB006',
    name: 'STM32F103C8T6 Blue Pill',
    description: 'ARM Cortex-M3 development board, 72MHz',
    price: 520,
    stock: 67,
    images: ['https://via.placeholder.com/600x600/06b6d4/ffffff?text=STM32'],
    categoryId: 'development-boards',
    rating: 4.5,
    sku: 'STM32-BP'
  },
  {
    id: 'DB007',
    name: 'Arduino Mega 2560 R3',
    description: '54 Digital I/O pins, 16 analog inputs, 4 UARTs',
    price: 1450,
    stock: 34,
    images: ['https://via.placeholder.com/600x600/ec4899/ffffff?text=Arduino+Mega'],
    categoryId: 'development-boards',
    rating: 4.8,
    sku: 'ARD-MEGA-2560'
  },
  {
    id: 'DB008',
    name: 'ESP32-CAM WiFi Bluetooth Camera Module',
    description: 'ESP32 with OV2640 2MP camera, microSD slot',
    price: 780,
    stock: 45,
    images: ['https://via.placeholder.com/600x600/14b8a6/ffffff?text=ESP32-CAM'],
    categoryId: 'development-boards',
    rating: 4.6,
    isNew: true,
    sku: 'ESP32-CAM'
  }
];
