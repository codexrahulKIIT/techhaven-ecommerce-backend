import { Product } from '../types';

export const audioVideoProducts: Product[] = [
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
    category: {
      id: 'audio-video',
      name: 'Audio & Video'
    },
    rating: 4.7,
    reviews: [
      {
        id: 'R_AV001',
        userId: 'U_AV001',
        productId: 'AV001',
        rating: 5,
        comment: 'Amazing sound quality and battery life. Highly recommended!',
        createdAt: '2024-10-01'
      }
    ],
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
    category: {
      id: 'audio-video',
      name: 'Audio & Video'
    },
    rating: 4.8,
    reviews: [
      {
        id: 'R_AV002',
        userId: 'U_AV002',
        productId: 'AV002',
        rating: 5,
        comment: 'Great typing experience with beautiful RGB lighting.',
        createdAt: '2024-10-05'
      }
    ],
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
    category: {
      id: 'audio-video',
      name: 'Audio & Video'
    },
    rating: 4.6,
    reviews: [
      {
        id: 'R_AV003',
        userId: 'U_AV003',
        productId: 'AV003',
        rating: 4,
        comment: 'Excellent noise cancellation and comfort.',
        createdAt: '2024-10-10'
      }
    ],
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

export const developmentBoardsProducts: Product[] = [
  {
    id: 'DB001',
    name: 'Arduino Uno R3 ATmega328P Development Board with USB Cable',
    description: 'Original Arduino Uno R3 with ATmega328P microcontroller. Perfect for beginners and professionals. Comes with USB cable and documentation.',
    price: 850,
    stock: 45,
    images: [
      'https://via.placeholder.com/600x600/2563eb/ffffff?text=Arduino+Uno+R3',
      'https://via.placeholder.com/600x600/2563eb/ffffff?text=Arduino+Back',
      'https://via.placeholder.com/600x600/2563eb/ffffff?text=Arduino+Cable'
    ],
    categoryId: 'development-boards',
    category: {
      id: 'development-boards',
      name: 'Development Boards'
    },
    rating: 4.8,
    reviews: [
      {
        id: 'R001',
        userId: 'U001',
        productId: 'DB001',
        rating: 5,
        comment: 'Excellent quality board. Works perfectly for all my projects!',
        createdAt: '2024-09-15'
      },
      {
        id: 'R002',
        userId: 'U002',
        productId: 'DB001',
        rating: 4,
        comment: 'Good board, fast shipping. Minor scratches on PCB but works fine.',
        createdAt: '2024-09-20'
      }
    ],
    isNew: false,
    isBestSeller: true,
    features: [
      'ATmega328P Microcontroller',
      '14 Digital I/O Pins (6 PWM)',
      '6 Analog Input Pins',
      '32KB Flash Memory',
      '16MHz Clock Speed',
      'USB Interface',
      'Power Jack 7-12V DC',
      'ICSP Header'
    ],
    specifications: {
      'Microcontroller': 'ATmega328P',
      'Operating Voltage': '5V',
      'Input Voltage (recommended)': '7-12V',
      'Digital I/O Pins': '14 (6 PWM)',
      'Analog Input Pins': '6',
      'DC Current per I/O Pin': '20 mA',
      'DC Current for 3.3V Pin': '50 mA',
      'Flash Memory': '32 KB',
      'SRAM': '2 KB',
      'EEPROM': '1 KB',
      'Clock Speed': '16 MHz',
      'Length': '68.6 mm',
      'Width': '53.4 mm',
      'Weight': '25 g'
    },
    sku: 'ARD-UNO-R3-001',
    tags: ['Arduino', 'ATmega328P', 'Development Board', 'Microcontroller'],
    warranty: '6 months',
    returnPolicy: '7 days replacement'
  },
  {
    id: 'DB002',
    name: 'ESP32 DevKit V1 WiFi Bluetooth Development Board',
    description: 'Dual-core ESP32 with built-in WiFi 802.11b/g/n and Bluetooth 4.2 capabilities. Ideal for IoT projects with ultra-low power consumption.',
    price: 650,
    stock: 32,
    images: [
      'https://via.placeholder.com/600x600/10b981/ffffff?text=ESP32+DevKit',
      'https://via.placeholder.com/600x600/10b981/ffffff?text=ESP32+Pins',
      'https://via.placeholder.com/600x600/10b981/ffffff?text=ESP32+Board'
    ],
    categoryId: 'development-boards',
    category: {
      id: 'development-boards',
      name: 'Development Boards'
    },
    rating: 4.7,
    reviews: [
      {
        id: 'R003',
        userId: 'U003',
        productId: 'DB002',
        rating: 5,
        comment: 'Amazing board for IoT projects. WiFi connectivity is stable and fast.',
        createdAt: '2024-10-01'
      }
    ],
    isNew: true,
    isBestSeller: true,
    features: [
      'Dual-Core 32-bit LX6 Microprocessor',
      'WiFi 802.11 b/g/n',
      'Bluetooth v4.2 BR/EDR and BLE',
      '34 GPIO Pins',
      '12-bit ADC',
      '2 x DAC',
      '10 Touch Sensors',
      '16MB Flash Memory',
      'Ultra-Low Power Consumption'
    ],
    specifications: {
      'Microcontroller': 'ESP32-WROOM-32',
      'Operating Voltage': '3.3V',
      'Input Voltage': '5V via USB / 7-12V via VIN',
      'CPU': 'Dual-core Xtensa LX6',
      'Clock Speed': 'Up to 240 MHz',
      'Flash Memory': '16 MB',
      'SRAM': '520 KB',
      'WiFi': '802.11 b/g/n (2.4 GHz)',
      'Bluetooth': 'v4.2 BR/EDR and BLE',
      'GPIO Pins': '34',
      'ADC': '18 channels 12-bit',
      'DAC': '2 channels 8-bit',
      'PWM': '16 channels',
      'SPI': '4',
      'I2C': '2',
      'UART': '3',
      'Dimensions': '55 x 28 x 12 mm'
    },
    sku: 'ESP32-DK-V1-001',
    tags: ['ESP32', 'WiFi', 'Bluetooth', 'IoT', 'Development Board'],
    warranty: '6 months',
    returnPolicy: '7 days replacement'
  },
  {
    id: 'DB003',
    name: 'Raspberry Pi 4 Model B 4GB RAM Single Board Computer',
    description: 'Latest Raspberry Pi 4 with 4GB RAM, dual 4K display support, Gigabit Ethernet, and USB 3.0. Perfect for desktop replacement and advanced projects.',
    price: 7500,
    stock: 23,
    images: [
      'https://via.placeholder.com/600x600/ef4444/ffffff?text=Raspberry+Pi+4',
      'https://via.placeholder.com/600x600/ef4444/ffffff?text=RPi4+Ports',
      'https://via.placeholder.com/600x600/ef4444/ffffff?text=RPi4+Board'
    ],
    categoryId: 'development-boards',
    category: {
      id: 'development-boards',
      name: 'Development Boards'
    },
    rating: 4.9,
    reviews: [
      {
        id: 'R004',
        userId: 'U004',
        productId: 'DB003',
        rating: 5,
        comment: 'Powerful mini computer. Running multiple applications smoothly!',
        createdAt: '2024-09-28'
      },
      {
        id: 'R005',
        userId: 'U005',
        productId: 'DB003',
        rating: 5,
        comment: 'Great for home automation and media center. Highly recommended!',
        createdAt: '2024-10-03'
      }
    ],
    isNew: true,
    isBestSeller: true,
    features: [
      'Broadcom BCM2711 Quad-core Cortex-A72 64-bit SoC',
      '4GB LPDDR4-3200 SDRAM',
      'Dual 4K Display Support via micro HDMI',
      'Gigabit Ethernet',
      'Dual-band 802.11ac Wireless',
      'Bluetooth 5.0, BLE',
      '2 x USB 3.0 Ports',
      '2 x USB 2.0 Ports',
      '40-pin GPIO Header',
      'VideoCore VI Graphics'
    ],
    specifications: {
      'Processor': 'Broadcom BCM2711, Quad core Cortex-A72 (ARM v8) 64-bit SoC',
      'Clock Speed': '1.5GHz',
      'RAM': '4GB LPDDR4-3200 SDRAM',
      'Wireless': '2.4 GHz and 5.0 GHz IEEE 802.11ac wireless',
      'Bluetooth': 'Bluetooth 5.0, BLE',
      'Ethernet': 'Gigabit Ethernet',
      'GPIO': '40-pin GPIO header',
      'Video Output': '2 × micro-HDMI ports (up to 4Kp60)',
      'USB': '2 × USB 3.0 ports, 2 × USB 2.0 ports',
      'Storage': 'microSD card slot',
      'Power': '5V DC via USB-C connector (minimum 3A)',
      'Operating Temperature': '0 – 50°C',
      'Dimensions': '85 x 56 x 17 mm',
      'Weight': '46g'
    },
    sku: 'RPI4-4GB-001',
    tags: ['Raspberry Pi', 'Single Board Computer', 'ARM', 'Linux', '4K'],
    warranty: '12 months',
    returnPolicy: '7 days replacement'
  },
  {
    id: 'DB004',
    name: 'NodeMCU ESP8266 WiFi Development Board CH340',
    description: 'Compact ESP8266 based development board with WiFi capability. Arduino IDE compatible with built-in USB to serial converter.',
    price: 380,
    stock: 78,
    images: [
      'https://via.placeholder.com/600x600/f59e0b/ffffff?text=NodeMCU+ESP8266',
      'https://via.placeholder.com/600x600/f59e0b/ffffff?text=NodeMCU+Pins',
      'https://via.placeholder.com/600x600/f59e0b/ffffff?text=NodeMCU+Size'
    ],
    categoryId: 'development-boards',
    category: {
      id: 'development-boards',
      name: 'Development Boards'
    },
    rating: 4.6,
    reviews: [],
    isNew: false,
    isBestSeller: true,
    features: [
      'ESP8266 WiFi SoC',
      'CH340 USB to Serial Chip',
      'WiFi 802.11 b/g/n',
      '11 GPIO Pins',
      '10-bit ADC',
      'Arduino IDE Compatible',
      'Lua Programming Support',
      'Low Power Consumption',
      'Micro USB Interface'
    ],
    specifications: {
      'Microcontroller': 'ESP8266',
      'Operating Voltage': '3.3V',
      'Input Voltage': '5V via USB',
      'Digital I/O Pins': '11',
      'Analog Input': '1 (10-bit ADC)',
      'Clock Speed': '80 MHz (160 MHz max)',
      'Flash Memory': '4 MB',
      'WiFi': '802.11 b/g/n',
      'WiFi Frequency': '2.4 GHz',
      'USB': 'Micro USB with CH340',
      'Dimensions': '49 x 25.5 x 12 mm'
    },
    sku: 'NMCU-ESP-CH340-001',
    tags: ['NodeMCU', 'ESP8266', 'WiFi', 'IoT', 'Arduino Compatible'],
    warranty: '6 months',
    returnPolicy: '7 days replacement'
  },
  {
    id: 'DB005',
    name: 'Arduino Nano V3 ATmega328P Mini Development Board',
    description: 'Compact Arduino board with ATmega328P chip. Same functionality as Arduino Uno but in smaller form factor. Perfect for space-constrained projects.',
    price: 420,
    stock: 156,
    images: [
      'https://via.placeholder.com/600x600/8b5cf6/ffffff?text=Arduino+Nano',
      'https://via.placeholder.com/600x600/8b5cf6/ffffff?text=Nano+Pins',
      'https://via.placeholder.com/600x600/8b5cf6/ffffff?text=Nano+Size'
    ],
    categoryId: 'development-boards',
    category: {
      id: 'development-boards',
      name: 'Development Boards'
    },
    rating: 4.7,
    reviews: [],
    isNew: false,
    isBestSeller: false,
    features: [
      'ATmega328P Microcontroller',
      'Compact Size Design',
      '14 Digital I/O Pins',
      '8 Analog Input Pins',
      'Mini USB Interface',
      'ICSP Header',
      'Arduino IDE Compatible',
      'Breadboard Friendly'
    ],
    specifications: {
      'Microcontroller': 'ATmega328P',
      'Operating Voltage': '5V',
      'Input Voltage': '7-12V',
      'Digital I/O Pins': '14 (6 PWM)',
      'Analog Input Pins': '8',
      'DC Current per I/O': '40 mA',
      'Flash Memory': '32 KB',
      'SRAM': '2 KB',
      'EEPROM': '1 KB',
      'Clock Speed': '16 MHz',
      'USB': 'Mini-B USB',
      'Dimensions': '45 x 18 mm',
      'Weight': '5g'
    },
    sku: 'ARD-NANO-V3-001',
    tags: ['Arduino', 'Nano', 'ATmega328P', 'Mini', 'Compact'],
    warranty: '6 months',
    returnPolicy: '7 days replacement'
  },
  {
    id: 'DB006',
    name: 'STM32F103C8T6 ARM Cortex-M3 Blue Pill Development Board',
    description: 'Powerful ARM Cortex-M3 based development board. 72MHz clock, 64KB flash, 20KB RAM. Great for advanced embedded projects.',
    price: 520,
    stock: 67,
    images: [
      'https://via.placeholder.com/600x600/06b6d4/ffffff?text=STM32+Blue+Pill',
      'https://via.placeholder.com/600x600/06b6d4/ffffff?text=STM32+Pins',
      'https://via.placeholder.com/600x600/06b6d4/ffffff?text=STM32+Board'
    ],
    categoryId: 'development-boards',
    category: {
      id: 'development-boards',
      name: 'Development Boards'
    },
    rating: 4.5,
    reviews: [],
    isNew: false,
    isBestSeller: false,
    features: [
      'ARM Cortex-M3 32-bit',
      '72 MHz Clock Speed',
      '64KB Flash Memory',
      '20KB SRAM',
      '37 GPIO Pins',
      '12-bit ADC (2 channels)',
      '12-bit DAC (2 channels)',
      'USB 2.0 Full Speed',
      'SPI, I2C, USART, CAN',
      'Arduino IDE Compatible'
    ],
    specifications: {
      'Microcontroller': 'STM32F103C8T6',
      'Core': 'ARM 32-bit Cortex-M3',
      'Clock Speed': '72 MHz',
      'Flash Memory': '64 KB',
      'SRAM': '20 KB',
      'Operating Voltage': '3.3V',
      'Input Voltage': '5V via USB',
      'GPIO Pins': '37',
      'ADC': '10 channels 12-bit',
      'DAC': '2 channels 12-bit',
      'Timers': '7',
      'USB': 'USB 2.0 Full Speed',
      'Communication': '2x SPI, 2x I2C, 3x USART, 1x CAN',
      'Dimensions': '53 x 23 mm'
    },
    sku: 'STM32-BP-C8T6-001',
    tags: ['STM32', 'ARM', 'Cortex-M3', 'Blue Pill', '32-bit'],
    warranty: '6 months',
    returnPolicy: '7 days replacement'
  },
  {
    id: 'DB007',
    name: 'Arduino Mega 2560 R3 ATmega2560 Development Board',
    description: 'Arduino Mega with 54 digital I/O pins and 16 analog inputs. Ideal for projects requiring many I/O pins. 4 UARTs for multiple serial communication.',
    price: 1450,
    stock: 34,
    images: [
      'https://via.placeholder.com/600x600/ec4899/ffffff?text=Arduino+Mega',
      'https://via.placeholder.com/600x600/ec4899/ffffff?text=Mega+Pins',
      'https://via.placeholder.com/600x600/ec4899/ffffff?text=Mega+Board'
    ],
    categoryId: 'development-boards',
    category: {
      id: 'development-boards',
      name: 'Development Boards'
    },
    rating: 4.8,
    reviews: [],
    isNew: false,
    isBestSeller: false,
    features: [
      'ATmega2560 Microcontroller',
      '54 Digital I/O Pins (15 PWM)',
      '16 Analog Input Pins',
      '256KB Flash Memory',
      '16MHz Clock Speed',
      '4 Hardware Serial Ports',
      'USB Interface',
      'Power Jack',
      'ICSP Header'
    ],
    specifications: {
      'Microcontroller': 'ATmega2560',
      'Operating Voltage': '5V',
      'Input Voltage (recommended)': '7-12V',
      'Digital I/O Pins': '54 (15 PWM)',
      'Analog Input Pins': '16',
      'DC Current per I/O Pin': '20 mA',
      'DC Current for 3.3V Pin': '50 mA',
      'Flash Memory': '256 KB',
      'SRAM': '8 KB',
      'EEPROM': '4 KB',
      'Clock Speed': '16 MHz',
      'USB': 'USB Type-B',
      'Dimensions': '101.52 x 53.3 mm',
      'Weight': '37 g'
    },
    sku: 'ARD-MEGA-2560-R3-001',
    tags: ['Arduino', 'Mega', 'ATmega2560', 'Large I/O', 'Development Board'],
    warranty: '6 months',
    returnPolicy: '7 days replacement'
  },
  {
    id: 'DB008',
    name: 'ESP32-CAM WiFi Bluetooth Camera Module OV2640',
    description: 'ESP32 with integrated camera (OV2640 2MP), WiFi, and Bluetooth. Perfect for IoT camera projects, surveillance, and image recognition.',
    price: 780,
    stock: 45,
    images: [
      'https://via.placeholder.com/600x600/14b8a6/ffffff?text=ESP32+CAM',
      'https://via.placeholder.com/600x600/14b8a6/ffffff?text=ESP32+Camera',
      'https://via.placeholder.com/600x600/14b8a6/ffffff?text=ESP32+Module'
    ],
    categoryId: 'development-boards',
    category: {
      id: 'development-boards',
      name: 'Development Boards'
    },
    rating: 4.6,
    reviews: [],
    isNew: true,
    isBestSeller: true,
    features: [
      'ESP32 Dual-Core Processor',
      'OV2640 2MP Camera',
      'WiFi 802.11 b/g/n',
      'Bluetooth 4.2',
      'MicroSD Card Slot',
      'Multiple GPIO Pins',
      'Low Power Consumption',
      'Built-in Flash LED',
      'Arduino IDE Support'
    ],
    specifications: {
      'Processor': 'ESP32 Dual-core',
      'Camera': 'OV2640 2 Megapixel',
      'Max Resolution': '1600 x 1200 (UXGA)',
      'Flash Memory': '4 MB',
      'PSRAM': '8 MB',
      'WiFi': '802.11 b/g/n (2.4 GHz)',
      'Bluetooth': 'v4.2 BR/EDR and BLE',
      'Operating Voltage': '5V via USB',
      'MicroSD': 'Up to 4GB',
      'GPIO': '9 available',
      'Sleep Current': '<6mA',
      'Dimensions': '27 x 40.5 x 4.5 mm'
    },
    sku: 'ESP32-CAM-OV2640-001',
    tags: ['ESP32', 'Camera', 'WiFi', 'Bluetooth', 'IoT', 'Vision'],
    warranty: '6 months',
    returnPolicy: '7 days replacement'
  },
  {
    id: 'DB009',
    name: 'Dummy Test Product - Smart IoT Hub',
    description: 'A dummy product for testing cart and wishlist functionality. Smart IoT hub with multiple sensors and connectivity options.',
    price: 299,
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center'
    ],
    categoryId: 'development-boards',
    category: {
      id: 'development-boards',
      name: 'Development Boards'
    },
    rating: 4.5,
    reviews: [],
    isNew: true,
    isBestSeller: false,
    features: [
      'WiFi and Bluetooth connectivity',
      'Multiple sensor inputs',
      'Expandable GPIO pins',
      'Low power consumption',
      'Arduino compatible'
    ],
    specifications: {
      'Processor': 'ESP32 Dual-core',
      'WiFi': '802.11 b/g/n',
      'Bluetooth': 'v4.2',
      'GPIO Pins': '20+',
      'Operating Voltage': '3.3V-5V',
      'Dimensions': '50x30mm'
    },
    sku: 'DUMMY-IOT-HUB-001',
    tags: ['IoT', 'ESP32', 'WiFi', 'Bluetooth', 'Sensors'],
    warranty: '6 months',
    returnPolicy: '7 days replacement'
  }
];

// Export all products
export const allProducts = {
  developmentBoards: developmentBoardsProducts,
  audioVideo: audioVideoProducts
};

export const flatAllProducts: Product[] = Object.values(allProducts).flat();

// Helper function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return flatAllProducts.find(product => product.id === id);
};

// Helper function to get products by category
export const getProductsByCategory = (categoryId: string): Product[] => {
  return flatAllProducts.filter(product => product.categoryId === categoryId);
};

// Helper function to get featured products
export const getFeaturedProducts = (): Product[] => {
  return flatAllProducts.filter(product => product.isBestSeller || product.isNew);
};

// Helper function to search products
export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return flatAllProducts.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description?.toLowerCase().includes(lowerQuery) ||
    product.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};
