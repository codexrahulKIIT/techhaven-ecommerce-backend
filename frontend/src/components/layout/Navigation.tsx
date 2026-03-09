'use client';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import CategoryDropdown from './CategoryDropdown';

export default function Navigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center">
            {/* Hamburger Button */}
            <button
              onClick={toggleDropdown}
              className={`p-3 hover:bg-blue-700 rounded transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isDropdownOpen ? 'transform rotate-90' : ''}`}
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Category Links */}
            <div className="hidden lg:flex ml-4">
              <a href="/categories/development-boards" className="px-3 py-2 text-sm font-medium hover:bg-blue-700 cursor-pointer transition-all duration-300 whitespace-nowrap">
                DEVELOPMENT BOARDS
              </a>
              <a href="/categories/power-supply" className="px-3 py-2 text-sm font-medium hover:bg-blue-700 cursor-pointer transition-all duration-300 whitespace-nowrap">
                POWER SUPPLY & SOLAR
              </a>
              <a href="/categories/battery-cells" className="px-3 py-2 text-sm font-medium hover:bg-blue-700 cursor-pointer transition-all duration-300 whitespace-nowrap">
                BATTERY & CELLS
              </a>
              <a href="/categories/sensors-modules" className="px-3 py-2 text-sm font-medium hover:bg-blue-700 cursor-pointer transition-all duration-300 whitespace-nowrap">
                SENSORS AND MODULE
              </a>
              <a href="/categories/components" className="px-3 py-2 text-sm font-medium hover:bg-blue-700 cursor-pointer transition-all duration-300 whitespace-nowrap">
                COMPONENT
              </a>
              <a href="/categories/smd-components" className="px-3 py-2 text-sm font-medium hover:bg-blue-700 cursor-pointer transition-all duration-300 whitespace-nowrap">
                SMD
              </a>
              <a href="/categories/robotics" className="px-3 py-2 text-sm font-medium hover:bg-blue-700 cursor-pointer transition-all duration-300 whitespace-nowrap">
                ROBOTICS
              </a>
              <a href="/categories/projects" className="px-3 py-2 text-sm font-medium hover:bg-blue-700 cursor-pointer transition-all duration-300 whitespace-nowrap">
                PROJECTS
              </a>
            </div>
          </div>
        </div>
      </nav>

      {isDropdownOpen && (
        <CategoryDropdown onClose={() => setIsDropdownOpen(false)} />
      )}
    </>
  );
}
