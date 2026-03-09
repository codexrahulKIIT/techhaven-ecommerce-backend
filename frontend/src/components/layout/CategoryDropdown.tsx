'use client'
import React from 'react';
import Link from 'next/link';
import { ChevronRight, Cpu, Zap, Battery, Eye, Wrench, Cog, Bot, Beaker } from 'lucide-react';

interface CategoryDropdownProps {
  onClose: () => void;
}

interface Category {
  name: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
  subcategories: string[];
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ onClose }) => {
  const categories: Category[] = [
    {
      name: 'DEVELOPMENT BOARDS',
      slug: 'development-boards',
      icon: Cpu,
      subcategories: ['Arduino', 'Raspberry Pi', 'ESP32', 'Microcontrollers', 'Development Kits']
    },
    {
      name: 'POWER SUPPLY & SOLAR',
      slug: 'power-supply',
      icon: Zap,
      subcategories: ['SMPS', 'Solar Panels', 'Voltage Regulators', 'Chargers', 'Power Modules']
    },
    {
      name: 'BATTERY & CELLS',
      slug: 'battery-cells',
      icon: Battery,
      subcategories: ['Li-ion Batteries', 'Battery Packs', 'Chargers', 'Battery Holders', 'Solar Batteries']
    },
    {
      name: 'SENSORS AND MODULE',
      slug: 'sensors-modules',
      icon: Eye,
      subcategories: ['Temperature', 'Humidity', 'Motion/PIR', 'Proximity', 'Gas', 'Relay/Driver Modules']
    },
    {
      name: 'COMPONENT',
      slug: 'components',
      icon: Wrench,
      subcategories: ['Resistors', 'Capacitors', 'Diodes', 'Transistors', 'Connectors']
    },
    {
      name: 'SMD',
      slug: 'smd-components',
      icon: Cog,
      subcategories: ['SMD Resistors', 'SMD Capacitors', 'SMD LEDs', 'SMD Inductors', 'SMD Packages']
    },
    {
      name: 'ROBOTICS',
      slug: 'robotics',
      icon: Bot,
      subcategories: ['Motors', 'Motor Drivers', 'Wheels & Chassis', 'Robot Kits', 'Servos']
    },
    {
      name: 'PROJECTS',
      slug: 'projects',
      icon: Beaker,
      subcategories: ['Basic Projects', 'DIY Kits', 'Arduino Kits', 'ESP/IoT Kits', 'Microcontroller Boards']
    }
  ];

  return (
    <div className="absolute top-full left-0 mt-2 w-full lg:w-80 bg-white/80 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200 z-50 category-dropdown">
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-3 text-xs md:text-sm lg:text-base">Shop by Category</h3>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <div key={index} className="group">
              <Link
                href={`/categories/${category.slug}`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-all duration-300"
                onClick={onClose}
              >
                <div className="flex items-center space-x-3">
                  <category.icon className="w-5 h-5" />
                  <span className="font-medium text-gray-700 group-hover:text-primary text-xs md:text-sm lg:text-base">
                    {category.name}
                  </span>
                  <span className="text-gray-400 group-hover:text-primary">▼</span>
                </div>
              </Link>

              {/* Subcategories */}
              <div className="ml-8 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {category.subcategories.slice(0, 3).map((sub, subIndex) => (
                  <Link
                    key={subIndex}
                    href={`/categories/${category.slug}/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block text-xs md:text-sm lg:text-base text-gray-600 hover:text-primary py-1 px-2 transition-all duration-300"
                    onClick={onClose}
                  >
                    {sub}
                  </Link>
                ))}
                {category.subcategories.length > 3 && (
                  <Link
                    href={`/categories/${category.slug}`}
                    className="block text-xs md:text-sm lg:text-base text-primary py-1 px-2 transition-all duration-300"
                    onClick={onClose}
                  >
                    +{category.subcategories.length - 3} more
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <Link
            href="/categories"
            className="block text-center text-primary font-medium hover:text-blue-700 transition-all duration-300 text-xs md:text-sm lg:text-base"
            onClick={onClose}
          >
            View All Categories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown;    