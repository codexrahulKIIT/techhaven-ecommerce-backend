import React from 'react';
import Link from 'next/link';
import { FiUsers, FiTrendingUp, FiDollarSign, FiHeadphones, FiArrowRight, FiBookOpen, FiBriefcase, FiCpu, FiShield, FiPhone } from 'react-icons/fi';

const B2BSection: React.FC = () => {
  const features = [
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: 'Bulk Pricing',
      description: 'Get special wholesale prices for orders above Rs 10,000'
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: 'Dedicated Support',
      description: 'Personal account manager for all your business needs'
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: 'Custom Quotes',
      description: 'Tailored pricing for your specific requirements'
    },
    {
      icon: <FiHeadphones className="w-8 h-8" />,
      title: '24/7 Support',
      description: 'Round-the-clock technical and sales support'
    }
  ];

  const clientTypes = [
    { name: 'Educational Institutions', icon: <FiBookOpen className="w-8 h-8 mx-auto" />, count: '200+' },
    { name: 'Startups & Companies', icon: <FiBriefcase className="w-8 h-8 mx-auto" />, count: '150+' },
    { name: 'Research Labs', icon: <FiCpu className="w-8 h-8 mx-auto" />, count: '80+' },
    { name: 'Government Projects', icon: <FiShield className="w-8 h-8 mx-auto" />, count: '45+' }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="mb-6">
              <span className="inline-block bg-blue-700 text-blue-100 px-4 py-2 rounded-full text-sm font-medium mb-4">
                B2B Solutions
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Scale Your Business with Bulk Orders
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join 500+ businesses that trust us for their electronic component needs. 
                Get competitive pricing and dedicated support for your projects.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="text-blue-300 mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-blue-100 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/b2b"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Get B2B Quote
                <FiArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-colors"
              >
                Register as B2B
              </Link>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            {/* Stats */}
            <div className="bg-blue-800/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Trusted by</h3>
              <div className="grid grid-cols-2 gap-6">
                {clientTypes.map((client, index) => (
                  <div key={index} className="text-center">
                    <div className="text-blue-200 mb-2">{client.icon}</div>
                    <div className="text-2xl font-bold text-blue-100">{client.count}</div>
                    <div className="text-sm text-blue-200">{client.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white/10 rounded-2xl p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">IIT</span>
                </div>
                <div>
                  <p className="text-blue-100 mb-4">
                    &ldquo;TechHaven has been our go-to supplier for electronics components.
                    Their bulk pricing and quick delivery helped us complete our research projects on time.&rdquo;
                  </p>
                  <div>
                    <div className="font-semibold">Dr. Rajesh Kumar</div>
                    <div className="text-sm text-blue-200">Professor, IIT Bangalore</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-center">
              <p className="text-blue-100 mb-2">Need help with bulk orders?</p>
              <div className="text-xl font-semibold inline-flex items-center gap-2">
                <FiPhone className="w-5 h-5" />
                <span>+91-9876543210</span>
              </div>
              <div className="text-blue-200">b2b@techhaven.com</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default B2BSection;
