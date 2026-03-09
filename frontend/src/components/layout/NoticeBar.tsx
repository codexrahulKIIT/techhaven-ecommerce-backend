'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FiFacebook, 
  FiLinkedin 
} from 'react-icons/fi';

const NoticeBar: React.FC = () => {
  return (
    <div className="bg-blue-800 text-white">
      {/* Top Notice Bar */}
      <div className="py-2 text-center text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <span className="font-medium">
            Note: Minimum eligible amount Rs 999 to place order, and Free Shipping on all orders above Rs 999
          </span>
        </div>
      </div>

      {/* Single-Line Menu Bar */}
      <div className="py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center text-base gap-4">
            <div className="flex items-center space-x-4">
              <Link href="/web-development" className="hover:text-blue-200 transition-all duration-300 font-medium text-sm">
                Web Development
              </Link>
              <Link href="/pcb-manufacture" className="hover:text-blue-200 transition-all duration-300 font-medium text-sm">
                PCB Manufacture
              </Link>
              <Link href="/pcb-layout" className="hover:text-blue-200 transition-all duration-300 font-medium text-sm">
                PCB Layout
              </Link>
              <Link href="/hardware-design" className="hover:text-blue-200 transition-all duration-300 font-medium text-sm">
                Hardware Design
              </Link>
              <Link href="/blog" className="hover:text-blue-200 transition-all duration-300 font-medium text-sm">
                Blog
              </Link>
              <Link href="/shop" className="hover:text-blue-200 transition-all duration-300 font-medium text-sm">
                Shop
              </Link>
              <Link href="/b2b" className="hover:text-blue-200 transition-all duration-300 font-medium text-sm">
                B2B Client
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Social Icons */}
              <div className="flex items-center space-x-2">
                <a href="https://www.facebook.com/techhaven" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-all duration-300">
                  <FiFacebook className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/company/techhaven" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-all duration-300">
                  <FiLinkedin className="w-5 h-5" />
                </a>
              </div>

              {/* Links */}
              <Link href="/contact" className="hover:text-blue-200 transition-all duration-300 font-medium text-sm">
                Contact
              </Link>
              <Link href="/policies" className="hover:text-blue-200 transition-all duration-300 font-medium text-sm">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeBar;
