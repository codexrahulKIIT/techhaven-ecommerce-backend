import React from 'react';
import Image from 'next/image';

const BrandLogos: React.FC = () => {
  const brands = [
    { name: 'Microchip', logo: '/images/brands/microchip.png' },
    { name: 'Atmel', logo: '/images/brands/atmel.png' },
    { name: 'Infineon', logo: '/images/brands/infineon.png' },
    { name: 'NXP', logo: '/images/brands/nxp.png' },
    { name: 'STM', logo: '/images/brands/stm.png' },
    { name: 'Analog Devices', logo: '/images/brands/analog-devices.png' },
    { name: 'Texas Instruments', logo: '/images/brands/texas-instruments.png' },
    { name: 'Intel', logo: '/images/brands/intel.png' },
  ];

  return (
    <section className="bg-white py-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center space-x-12 overflow-x-auto">
          {brands.map((brand, index) => (
            <div key={index} className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300">
              <div className="w-24 h-12 flex items-center justify-center">
                <div className="text-gray-600 font-semibold text-sm border border-gray-300 px-3 py-1 rounded">
                  {brand.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandLogos;