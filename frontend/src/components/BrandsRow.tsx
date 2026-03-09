'use client';

import React from 'react';

const brands = [
  { name: 'NXP', logo: 'NXP' },
  { name: 'STMicroelectronics', logo: 'ST' },
  { name: 'Texas Instruments', logo: 'TI' },
  { name: 'Intel', logo: 'Intel' }
];

const BrandsRow: React.FC = () => {
  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center space-x-12">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-20 h-12 bg-white rounded shadow-sm border border-gray-200"
            >
              <span className="text-gray-600 font-bold text-sm">
                {brand.logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsRow;
