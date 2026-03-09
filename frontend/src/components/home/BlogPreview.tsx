import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar, FiUser, FiClock, FiArrowRight } from 'react-icons/fi';

const BlogPreview: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with Arduino: A Beginner\'s Guide',
      excerpt: 'Learn the basics of Arduino programming and build your first LED blinking project with step-by-step instructions.',
      image: '/images/blog/arduino-guide.jpg',
      author: 'Tech Team',
      date: '2024-01-20',
      readTime: '8 min read',
      category: 'Tutorials',
      tags: ['Arduino', 'Beginner', 'Programming']
    },
    {
      id: 2,
      title: 'ESP32 vs ESP8266: Which One Should You Choose?',
      excerpt: 'Comprehensive comparison of ESP32 and ESP8266 microcontrollers to help you make the right choice for your IoT project.',
      image: '/images/blog/esp-comparison.jpg',
      author: 'Rajesh Kumar',
      date: '2024-01-18',
      readTime: '12 min read',
      category: 'Comparison',
      tags: ['ESP32', 'ESP8266', 'IoT', 'WiFi']
    },
    {
      id: 3,
      title: 'Building a Home Automation System with IoT',
      excerpt: 'Step-by-step guide to create your own smart home system using sensors, microcontrollers, and mobile app integration.',
      image: '/images/blog/home-automation.jpg',
      author: 'Priya Sharma',
      date: '2024-01-15',
      readTime: '15 min read',
      category: 'Projects',
      tags: ['IoT', 'Home Automation', 'Sensors', 'Mobile App']
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest from Our Blog
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with tutorials, project guides, and industry insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <FiCalendar className="w-4 h-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FiClock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FiUser className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{post.author}</span>
                  </div>
                  
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-primary hover:text-blue-700 font-medium text-sm group"
                  >
                    Read More
                    <FiArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Articles
            <FiArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;