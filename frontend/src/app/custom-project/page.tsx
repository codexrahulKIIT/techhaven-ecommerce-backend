"use client";

// FILE: src/pages/custom-projects/index.tsx
// Put this file in: src/pages/custom-projects/index.tsx

import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {
  BeakerIcon,
  LightBulbIcon,
  CpuChipIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  DocumentTextIcon,
  PaperClipIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';

interface FormData {
  name: string;
  email: string;
  mobile: string;
  title: string;
  budget: string;
  timeline: string;
  category: string;
  description: string;
  file: File | null;
}

const projectCategories = [
  'Academic Projects',
  'Industrial Projects',
  'IoT Projects',
  'Embedded Systems',
  'Robotics',
  'PCB Design',
  'Prototype Development',
  'Power Electronics',
  'Digital Electronics',
  'Analog Electronics',
  'Audio Projects',
  'Automation',
  'Smart Home',
  'E-Bike/EV Projects',
  'Other'
];

const budgetRanges = [
  'Under ₹5,000',
  '₹5,000 - ₹10,000',
  '₹10,000 - ₹25,000',
  '₹25,000 - ₹50,000',
  '₹50,000 - ₹1,00,000',
  'Above ₹1,00,000',
  'Not Sure'
];

const timelineOptions = [
  '1-2 weeks',
  '2-4 weeks',
  '1-2 months',
  '2-3 months',
  '3-6 months',
  'Flexible'
];

const features = [
  {
    icon: BeakerIcon,
    title: 'Expert Guidance',
    description: 'Get professional consultation from experienced electronics engineers'
  },
  {
    icon: LightBulbIcon,
    title: 'Custom Solutions',
    description: 'Tailored project solutions designed specifically for your requirements'
  },
  {
    icon: CpuChipIcon,
    title: 'Latest Technology',
    description: 'Implementation using cutting-edge electronics and IoT technologies'
  },
  {
    icon: RocketLaunchIcon,
    title: 'Quick Turnaround',
    description: 'Fast project delivery with quality assurance and testing'
  }
];

const projectTypes = [
  {
    title: 'Academic Projects',
    description: 'College/University projects for Engineering students',
    icon: '🎓',
    examples: ['Final year projects', 'Mini projects', 'Semester projects']
  },
  {
    title: 'Industrial Projects',
    description: 'Professional solutions for industries and businesses',
    icon: '🏭',
    examples: ['Automation systems', 'Monitoring solutions', 'Control systems']
  },
  {
    title: 'IoT Projects',
    description: 'Internet of Things and smart connected devices',
    icon: '📡',
    examples: ['Smart home', 'Remote monitoring', 'Data logging']
  },
  {
    title: 'Robotics',
    description: 'Robotic systems and autonomous vehicles',
    icon: '🤖',
    examples: ['Line follower', 'Pick & place', 'Obstacle avoidance']
  },
  {
    title: 'PCB Design',
    description: 'Custom PCB layout and manufacturing',
    icon: '🔧',
    examples: ['Single/Multi-layer PCB', 'SMD assembly', 'Prototyping']
  },
  {
    title: 'E-Bike/EV',
    description: 'Electric vehicle and e-bike solutions',
    icon: '🚲',
    examples: ['Motor controllers', 'BMS systems', 'Display units']
  }
];

export default function CustomProjectsPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    mobile: '',
    title: '',
    budget: '',
    timeline: '',
    category: '',
    description: '',
    file: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        e.target.value = '';
        return;
      }
      setFormData(prev => ({
        ...prev,
        file
      }));
      toast.success('File attached successfully');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.mobile || !formData.title || !formData.description) {
      toast.error('Please fill all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Mobile validation (Indian format)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(formData.mobile.replace(/\s/g, ''))) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('customerName', formData.name);
      submitData.append('customerEmail', formData.email);
      submitData.append('customerMobile', formData.mobile);
      submitData.append('projectTitle', formData.title);
      submitData.append('projectDescription', formData.description);

      if (formData.category) {
        submitData.append('projectCategory', formData.category);
      }
      if (formData.budget) {
        submitData.append('budgetRange', formData.budget);
      }
      if (formData.timeline) {
        submitData.append('expectedTimeline', formData.timeline);
      }
      if (formData.file) {
        submitData.append('attachment', formData.file);
      }

      // API call to backend via Next.js proxy
      const response = await fetch('/api/custom-projects', {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit inquiry');
      }

      const result = await response.json();

      toast.success(result.message || 'Project inquiry submitted successfully! We will contact you within 10 hours.');

      // Reset form
      setFormData({
        name: '',
        email: '',
        mobile: '',
        title: '',
        budget: '',
        timeline: '',
        category: '',
        description: '',
        file: null
      });

      // Reset file input
      const fileInput = document.getElementById('file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      toast.error('Failed to submit inquiry. Please try again or call us directly.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Custom Projects | TechHaven Store - Expert Electronics Solutions</title>
        <meta name="description" content="Get custom electronics project solutions from TechHaven. Academic projects, industrial automation, IoT, robotics, PCB design and more. Expert guidance guaranteed." />
        <meta name="keywords" content="custom electronics projects, academic projects, industrial projects, IoT solutions, PCB design, robotics, Bangalore" />
      </Head>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <a href="/" className="text-gray-500 hover:text-primary">Home</a>
              </li>
              <li><span className="text-gray-400">/</span></li>
              <li className="text-gray-900 font-medium">Custom Projects</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Custom Electronics Projects
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              We are here to solve your electronics projects. From simple circuits to advanced MCU and IoT projects.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="h-5 w-5 text-green-300" />
                <span>700+ Projects Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="h-5 w-5 text-green-300" />
                <span>Expert Engineering Team</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="h-5 w-5 text-green-300" />
                <span>10 Hour Response Time</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Project Types Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Types of Projects We Handle</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We cover a wide range of electronics projects from various domains including Embedded Systems, 
              Power Electronics, Analog & Digital Electronics, Audio, and IoT.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
                <div className="text-4xl mb-4">{type.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <div className="space-y-1">
                  {type.examples.map((example, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Submit Your Project Requirements</h2>
                <p className="text-gray-600">
                  Fill out the form below with your project details. We will get back to you within 10 hours of form submission.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full"
                  />
                </div>

                {/* Email & Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Project Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Give your project a descriptive title"
                    className="w-full"
                  />
                </div>

                {/* Category, Budget, Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary focus:ring-primary"
                    >
                      <option value="">Select Category</option>
                      {projectCategories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary focus:ring-primary"
                    >
                      <option value="">Select Budget</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary focus:ring-primary"
                    >
                      <option value="">Select Timeline</option>
                      {timelineOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="Describe your project requirements in detail. Include specifications, features needed, expected outcomes, etc."
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary focus:ring-primary"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Minimum 50 characters required
                  </p>
                </div>

                {/* File Attachment */}
                <div>
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                    File Attachment (Optional)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-primary transition-colors">
                    <div className="space-y-1 text-center">
                      <PaperClipIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-blue-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file"
                            name="file"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, DOCX, JPG, PNG, ZIP up to 5MB
                      </p>
                      {formData.file && (
                        <p className="text-sm text-green-600 font-medium">
                          ✓ {formData.file.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 text-lg"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <DocumentTextIcon className="h-6 w-6" />
                        Submit Project Inquiry
                      </>
                    )}
                  </Button>
                  <p className="mt-3 text-center text-sm text-gray-500">
                    By submitting, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
              <p className="text-gray-600 text-sm mb-6">
                Our team is available to assist you with your project requirements.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <PhoneIcon className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Call Us</p>
                    <a href="tel:+918012345678" className="text-sm text-primary hover:underline">
                      +91 80-TECH-HAVEN
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <EnvelopeIcon className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email Us</p>
                    <a href="mailto:projects@techhaven.com" className="text-sm text-primary hover:underline">
                      projects@techhaven.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPinIcon className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Visit Us</p>
                    <p className="text-sm text-gray-600">
                      Bangalore, Karnataka, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <ClockIcon className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Working Hours</p>
                    <p className="text-sm text-gray-600">
                      Mon - Sat: 9 AM - 7 PM<br />
                      Sunday: 10 AM - 5 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">10+ years of experience</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">700+ projects completed</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Expert engineering team</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Quality assured work</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">On-time delivery</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Post-project support</span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg p-6 text-center">
              <UserGroupIcon className="h-12 w-12 mx-auto mb-3 text-blue-200" />
              <h3 className="text-lg font-bold mb-2">Join 700+ Satisfied Clients</h3>
              <p className="text-sm text-blue-100 mb-4">
                Get your project completed by experts
              </p>
              <a href="tel:+918012345678">
                <Button variant="secondary" className="w-full">
                  <PhoneIcon className="h-5 w-5" />
                  Call Now
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">Simple 4-step process to get your project done</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Submit Requirements</h3>
              <p className="text-sm text-gray-600">Fill the form with your project details</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Get Quotation</h3>
              <p className="text-sm text-gray-600">Receive detailed quote within 10 hours</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Development</h3>
              <p className="text-sm text-gray-600">We develop your project with quality assurance</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Delivery</h3>
              <p className="text-sm text-gray-600">Get your completed project with documentation</p>
            </div>
          </div>
        </div>

        {/* Projects Gallery/Examples Section */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Recent Projects</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Explore some of our successfully completed projects across various domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Smart Home Automation System',
                category: 'IoT Projects',
                description: 'ESP32-based home automation with mobile app control',
                image: 'https://via.placeholder.com/400x300/2563eb/ffffff?text=Smart+Home'
              },
              {
                title: 'Industrial Temperature Monitoring',
                category: 'Industrial Projects',
                description: 'Multi-sensor temperature monitoring with data logging',
                image: 'https://via.placeholder.com/400x300/10b981/ffffff?text=Temperature+Monitor'
              },
              {
                title: 'Line Following Robot',
                category: 'Robotics',
                description: 'Arduino-based autonomous line follower robot',
                image: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=Line+Follower'
              },
              {
                title: 'Solar Power Monitoring',
                category: 'Power Electronics',
                description: 'Real-time solar panel efficiency monitoring system',
                image: 'https://via.placeholder.com/400x300/ef4444/ffffff?text=Solar+Monitor'
              },
              {
                title: 'RFID Access Control',
                category: 'Embedded Systems',
                description: 'Secure RFID-based door access control system',
                image: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=RFID+Access'
              },
              {
                title: 'E-Bike Motor Controller',
                category: 'E-Bike/EV',
                description: 'Custom BLDC motor controller for electric bike',
                image: 'https://via.placeholder.com/400x300/06b6d4/ffffff?text=E-Bike+Controller'
              }
            ].map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-900">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What types of projects do you handle?
              </h3>
              <p className="text-gray-600">
                We handle a wide range of projects including Academic Projects, Industrial Automation, 
                IoT Solutions, Robotics, PCB Design, Embedded Systems, Power Electronics, and more. 
                From simple circuit designs to complex microcontroller-based systems.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How long does it take to complete a project?
              </h3>
              <p className="text-gray-600">
                Project timeline depends on complexity and requirements. Simple projects can be completed 
                in 1-2 weeks, while complex projects may take 1-3 months. We provide a detailed timeline 
                in our quotation.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is included in the project delivery?
              </h3>
              <p className="text-gray-600">
                We provide complete project documentation including circuit diagrams, PCB layouts, 
                source code, component list, assembly instructions, and user manual. Hardware is 
                delivered fully tested and operational.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you provide support after project completion?
              </h3>
              <p className="text-gray-600">
                Yes, we provide post-project support for troubleshooting and minor modifications. 
                Extended support packages are also available for long-term projects.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can you help with project idea and design?
              </h3>
              <p className="text-gray-600">
                Absolutely! Our expert team can help you refine your project idea, suggest improvements, 
                and create the complete design from scratch. We provide free consultation for all inquiries.
              </p>
            </div>

            <div className="pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is your pricing structure?
              </h3>
              <p className="text-gray-600">
                Pricing varies based on project complexity, components required, and timeline. We provide 
                detailed, transparent quotations after understanding your requirements. No hidden charges.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Submit your requirements now and get a response within 10 hours. 
            Our team of experts is ready to bring your ideas to life!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#form-section" onClick={() => {
              document.getElementById('name')?.focus();
            }}>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                <DocumentTextIcon className="h-6 w-6" />
                Submit Requirements
              </Button>
            </a>
            <a href="tel:+918012345678">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 border-white">
                <PhoneIcon className="h-6 w-6" />
                Call Us Now
              </Button>
            </a>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-gray-600">Real feedback from our satisfied customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                &ldquo;Excellent work on my final year project. The team was very professional and delivered
                exactly what I needed. Highly recommended for engineering students!&rdquo;
              </p>
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center text-blue-600 font-bold mr-3">
                  RK
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Rahul Kumar</p>
                  <p className="text-sm text-gray-500">Engineering Student, VTU</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                &ldquo;Great experience working with TechHaven. They completed our industrial automation
                project on time and within budget. Very knowledgeable team!&rdquo;
              </p>
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center text-green-600 font-bold mr-3">
                  PM
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Priya Mehta</p>
                  <p className="text-sm text-gray-500">Production Manager, ABC Industries</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                &ldquo;Amazing support throughout the project. They helped me with PCB design and
                prototype development. Will definitely work with them again!&rdquo;
              </p>
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-full w-10 h-10 flex items-center justify-center text-purple-600 font-bold mr-3">
                  AS
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Arjun Singh</p>
                  <p className="text-sm text-gray-500">IoT Enthusiast & Maker</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}