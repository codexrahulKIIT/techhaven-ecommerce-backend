import { Product } from '../../types';

export const sensorsModules: Product[] = [
  {
    id: 'SM001',
    name: 'DHT22 Temperature Humidity Sensor',
    description: 'Digital temperature and humidity sensor with high precision',
    price: 280,
    stock: 345,
    images: ['https://via.placeholder.com/600x600/2563eb/ffffff?text=DHT22'],
    categoryId: 'sensors-modules',
    rating: 4.7,
    isBestSeller: true,
    sku: 'DHT22-TH'
  },
  {
    id: 'SM002',
    name: 'HC-SR04 Ultrasonic Distance Sensor',
    description: 'Ultrasonic ranging module 2cm to 400cm',
    price: 120,
    stock: 567,
    images: ['https://via.placeholder.com/600x600/10b981/ffffff?text=HC-SR04'],
    categoryId: 'sensors-modules',
    rating: 4.6,
    isBestSeller: true,
    sku: 'HC-SR04-DIST'
  },
  {
    id: 'SM003',
    name: 'PIR Motion Sensor HC-SR501',
    description: 'Passive infrared motion detector module',
    price: 95,
    stock: 456,
    images: ['https://via.placeholder.com/600x600/f59e0b/ffffff?text=PIR'],
    categoryId: 'sensors-modules',
    rating: 4.5,
    isBestSeller: true,
    sku: 'HC-SR501-PIR'
  },
  {
    id: 'SM004',
    name: 'MQ-2 Gas Smoke Sensor',
    description: 'Detects LPG, smoke, alcohol, propane, methane',
    price: 145,
    stock: 234,
    images: ['https://via.placeholder.com/600x600/8b5cf6/ffffff?text=MQ-2'],
    categoryId: 'sensors-modules',
    rating: 4.4,
    sku: 'MQ2-GAS'
  },
  {
    id: 'SM005',
    name: 'MPU6050 Gyroscope Accelerometer',
    description: '3-axis gyroscope and accelerometer I2C module',
    price: 220,
    stock: 345,
    images: ['https://via.placeholder.com/600x600/ef4444/ffffff?text=MPU6050'],
    categoryId: 'sensors-modules',
    rating: 4.7,
    sku: 'MPU6050-6DOF'
  },
  {
    id: 'SM006',
    name: 'Soil Moisture Sensor',
    description: 'Capacitive soil moisture detection module',
    price: 85,
    stock: 456,
    images: ['https://via.placeholder.com/600x600/06b6d4/ffffff?text=Soil+Sensor'],
    categoryId: 'sensors-modules',
    rating: 4.3,
    sku: 'SOIL-MOIST'
  },
  {
    id: 'SM007',
    name: 'IR Infrared Obstacle Avoidance Sensor',
    description: 'Adjustable distance infrared proximity sensor',
    price: 65,
    stock: 678,
    images: ['https://via.placeholder.com/600x600/ec4899/ffffff?text=IR+Sensor'],
    categoryId: 'sensors-modules',
    rating: 4.4,
    isBestSeller: true,
    sku: 'IR-OBST'
  },
  {
    id: 'SM008',
    name: 'RFID RC522 13.56MHz Module',
    description: 'RFID reader writer with cards and tags',
    price: 180,
    stock: 234,
    images: ['https://via.placeholder.com/600x600/14b8a6/ffffff?text=RFID'],
    categoryId: 'sensors-modules',
    rating: 4.6,
    sku: 'RC522-RFID'
  },
  {
    id: 'SM009',
    name: 'DS18B20 Waterproof Temperature Sensor',
    description: 'Digital temperature sensor probe 1-wire interface',
    price: 165,
    stock: 345,
    images: ['https://via.placeholder.com/600x600/2563eb/ffffff?text=DS18B20'],
    categoryId: 'sensors-modules',
    rating: 4.7,
    sku: 'DS18B20-TEMP'
  },
  {
    id: 'SM010',
    name: 'Relay Module 5V 4 Channel',
    description: '4-channel relay board with optocoupler isolation',
    price: 185,
    stock: 234,
    images: ['https://via.placeholder.com/600x600/10b981/ffffff?text=4CH+Relay'],
    categoryId: 'sensors-modules',
    rating: 4.6,
    isBestSeller: true,
    sku: 'RELAY-4CH-5V'
  }
];
