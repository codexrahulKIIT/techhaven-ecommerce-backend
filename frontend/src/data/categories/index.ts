import { Product, Category } from '../../types';
import { developmentBoards } from './development-boards';
import { powerSupply } from './power-supply';
import { batteryCells } from './battery-cells';
import { sensorsModules } from './sensors-modules';
import { components } from './components';
import { smdComponents } from './smd-components';
import { robotics } from './robotics';
import { projects } from './projects';
import { audioVideo } from './audio-video';

// All products combined
export const allProducts: Product[] = [
  ...developmentBoards,
  ...powerSupply,
  ...batteryCells,
  ...sensorsModules,
  ...components,
  ...smdComponents,
  ...robotics,
  ...projects,
  ...audioVideo,
];

// Categories data
export const categories: Category[] = [
  {
    id: 'development-boards',
    name: 'Development Boards',
    slug: 'development-boards',
    icon: '🖥️',
    description: 'Microcontrollers, development boards, and single-board computers',
  },
  {
    id: 'power-supply',
    name: 'Power Supply',
    slug: 'power-supply',
    icon: '🔋',
    description: 'Power adapters, regulators, converters, and solar panels',
  },
  {
    id: 'battery-cells',
    name: 'Battery Cells',
    slug: 'battery-cells',
    icon: '🔋',
    description: 'Batteries, cells, holders, and charging solutions',
  },
  {
    id: 'sensors-modules',
    name: 'Sensors & Modules',
    slug: 'sensors-modules',
    icon: '📡',
    description: 'Sensors, modules, and electronic components for projects',
  },
  {
    id: 'components',
    name: 'Components',
    slug: 'components',
    icon: '⚡',
    description: 'Through-hole electronic components and parts',
  },
  {
    id: 'smd-components',
    name: 'SMD Components',
    slug: 'smd-components',
    icon: '🔧',
    description: 'Surface mount device components and kits',
  },
  {
    id: 'robotics',
    name: 'Robotics',
    slug: 'robotics',
    icon: '🤖',
    description: 'Motors, servos, chassis, and robotics components',
  },
  {
    id: 'projects',
    name: 'Projects & Kits',
    slug: 'projects',
    icon: '🛠️',
    description: 'Complete project kits and DIY electronics kits',
  },
  {
    id: 'audio-video',
    name: 'Audio & Video',
    slug: 'audio-video',
    icon: '🎧',
    description: 'Speakers, headphones, keyboards, and audio/video accessories',
  },
];

// Helper functions
export const getProductsByCategory = (categoryId: string): Product[] => {
  return allProducts.filter(product => product.categoryId === categoryId);
};

export const getCategoryById = (categoryId: string): Category | undefined => {
  return categories.find(category => category.id === categoryId);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(category => category.slug === slug);
};

export const getFeaturedProducts = (): Product[] => {
  return allProducts.filter(product => product.isBestSeller || product.isNew);
};

export const getNewArrivals = (): Product[] => {
  return allProducts.filter(product => product.isNew);
};

export const getBestSellers = (): Product[] => {
  return allProducts.filter(product => product.isBestSeller);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return allProducts.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description?.toLowerCase().includes(lowercaseQuery) ||
    product.sku?.toLowerCase().includes(lowercaseQuery) ||
    product.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getProductById = (id: string): Product | undefined => {
  return allProducts.find(product => product.id === id);
};
