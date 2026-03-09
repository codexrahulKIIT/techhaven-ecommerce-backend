import { Product } from '../../types';

export const components: Product[] = [
  {
    id: 'CP001',
    name: 'LED 5mm Red (Pack of 100)',
    description: 'Standard 5mm red LED diodes, 20mA',
    price: 45,
    stock: 2345,
    images: ['https://via.placeholder.com/600x600/ef4444/ffffff?text=Red+LED'],
    categoryId: 'components',
    rating: 4.5,
    isBestSeller: true,
    sku: 'LED-5MM-RED-100'
  },
  {
    id: 'CP002',
    name: 'Resistor Kit 1/4W (600 pieces)',
    description: 'Assorted resistor values 10Ω to 1MΩ',
    price: 180,
    stock: 456,
    images: ['https://via.placeholder.com/600x600/f59e0b/ffffff?text=Resistors'],
    categoryId: 'components',
    rating: 4.7,
    isBestSeller: true,
    sku: 'RES-KIT-600'
  },
  {
    id: 'CP003',
    name: 'Capacitor Electrolytic Kit (120 pieces)',
    description: 'Assorted electrolytic capacitors 0.1µF to 1000µF',
    price: 165,
    stock: 345,
    images: ['https://via.placeholder.com/600x600/2563eb/ffffff?text=Capacitors'],
    categoryId: 'components',
    rating: 4.6,
    sku: 'CAP-ELEC-KIT'
  },
  {
    id: 'CP004',
    name: '1N4007 Diode (Pack of 50)',
    description: 'General purpose rectifier diode 1A 1000V',
    price: 35,
    stock: 1234,
    images: ['https://via.placeholder.com/600x600/8b5cf6/ffffff?text=Diodes'],
    categoryId: 'components',
    rating: 4.4,
    sku: '1N4007-50'
  },
  {
    id: 'CP005',
    name: 'BC547 NPN Transistor (Pack of 25)',
    description: 'General purpose NPN transistor TO-92',
    price: 28,
    stock: 890,
    images: ['https://via.placeholder.com/600x600/10b981/ffffff?text=BC547'],
    categoryId: 'components',
    rating: 4.5,
    isBestSeller: true,
    sku: 'BC547-25'
  },
  {
    id: 'CP006',
    name: '7805 Voltage Regulator (Pack of 10)',
    description: 'Linear voltage regulator +5V 1A TO-220',
    price: 75,
    stock: 567,
    images: ['https://via.placeholder.com/600x600/06b6d4/ffffff?text=7805'],
    categoryId: 'components',
    rating: 4.6,
    sku: '7805-10'
  },
  {
    id: 'CP007',
    name: 'IC 555 Timer (Pack of 10)',
    description: 'Classic 555 timer IC DIP-8 package',
    price: 45,
    stock: 678,
    images: ['https://via.placeholder.com/600x600/ec4899/ffffff?text=555'],
    categoryId: 'components',
    rating: 4.7,
    isBestSeller: true,
    sku: 'IC555-10'
  },
  {
    id: 'CP008',
    name: 'Tactile Push Button Switch (Pack of 50)',
    description: '6x6x5mm momentary push button switches',
    price: 55,
    stock: 890,
    images: ['https://via.placeholder.com/600x600/14b8a6/ffffff?text=Buttons'],
    categoryId: 'components',
    rating: 4.4,
    sku: 'BTN-TACT-50'
  },
  {
    id: 'CP009',
    name: 'Crystal Oscillator 16MHz (Pack of 10)',
    description: 'Quartz crystal 16MHz for microcontrollers',
    price: 65,
    stock: 456,
    images: ['https://via.placeholder.com/600x600/2563eb/ffffff?text=Crystal'],
    categoryId: 'components',
    rating: 4.5,
    sku: 'XTAL-16MHZ-10'
  },
  {
    id: 'CP010',
    name: 'Zener Diode Kit (200 pieces)',
    description: 'Assorted zener diodes 3.3V to 30V',
    price: 145,
    stock: 234,
    images: ['https://via.placeholder.com/600x600/f59e0b/ffffff?text=Zener'],
    categoryId: 'components',
    rating: 4.6,
    sku: 'ZENER-KIT-200'
  }
];
