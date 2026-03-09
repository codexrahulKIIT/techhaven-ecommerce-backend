// File: src/app/services/pcb-layout/page.tsx
'use client'
import { useState } from 'react'
import { 
  Layout, 
  Cpu, 
  Zap, 
  Shield, 
  CheckCircle, 
  Layers,
  Ruler,
  GitBranch,
  Settings,
  Mail,
  Phone,
  Send,
  FileCheck,
  Target,
  TrendingUp
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function PcbLayoutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    boardType: 'single',
    layers: '2',
    dimensions: '',
    quantity: '',
    software: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise(resolve => setTimeout(resolve, 1500))
    
    toast.success('PCB layout request submitted! We&apos;ll contact you within 24 hours.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      boardType: 'single',
      layers: '2',
      dimensions: '',
      quantity: '',
      software: '',
      message: ''
    })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
              <Layout className="w-10 h-10" />
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Professional PCB Layout & Design Services
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Expert PCB layout design for optimal performance, manufacturability, and reliability
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#quote-form"
                className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                Request Layout Design
              </a>
              <a 
                href="#services"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-900 transition-colors"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <Layers className="w-8 h-8" />,
                title: 'Multi-Layer Design',
                description: 'Up to 32-layer PCB layouts'
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Signal Integrity',
                description: 'High-speed design optimization'
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'DFM Analysis',
                description: 'Design for manufacturability'
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Fast Turnaround',
                description: '2-5 days delivery'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4 text-purple-600">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Our PCB Layout Services</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              From simple single-layer boards to complex multi-layer designs, we deliver high-quality PCB layouts
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Multi-Layer PCB Layout</h3>
                <p className="text-gray-600 mb-4">
                  Complex multi-layer board designs with optimized layer stackup and impedance control.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>2 to 32 layer designs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>HDI (High-Density Interconnect)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Blind & buried vias</span>
                  </li>
                </ul>
              </div>

              {/* Service 2 */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">High-Speed Signal Design</h3>
                <p className="text-gray-600 mb-4">
                  Expert routing for high-speed signals with controlled impedance and minimal crosstalk.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Impedance matching</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Differential pair routing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Length matching</span>
                  </li>
                </ul>
              </div>

              {/* Service 3 */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <GitBranch className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Power Distribution Design</h3>
                <p className="text-gray-600 mb-4">
                  Robust power distribution networks for stable voltage supply across your board.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Power plane design</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Decoupling capacitor placement</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Voltage drop analysis</span>
                  </li>
                </ul>
              </div>

              {/* Service 4 */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Component Placement</h3>
                <p className="text-gray-600 mb-4">
                  Strategic component placement for optimal performance and thermal management.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Thermal analysis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>EMI/EMC optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Assembly-friendly design</span>
                  </li>
                </ul>
              </div>

              {/* Service 5 */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                  <FileCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Design Rule Checks (DRC)</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive verification to ensure manufacturability and reliability.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Electrical rule checks (ERC)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Design for manufacturing (DFM)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Design for assembly (DFA)</span>
                  </li>
                </ul>
              </div>

              {/* Service 6 */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Layout Optimization</h3>
                <p className="text-gray-600 mb-4">
                  Performance optimization and cost reduction through smart design choices.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Board size minimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Layer count optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Cost-effective solutions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Software & Tools */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Design Tools We Use</h2>
            <p className="text-center text-gray-600 mb-12">
              Industry-standard PCB design software for professional results
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Altium Designer', popular: true },
                { name: 'KiCad', popular: false },
                { name: 'Eagle CAD', popular: false },
                { name: 'OrCAD', popular: true },
                { name: 'PADS', popular: false },
                { name: 'Cadence Allegro', popular: true },
                { name: 'EasyEDA', popular: false },
                { name: 'Proteus', popular: false }
              ].map((software, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 text-center font-medium ${
                    software.popular
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 bg-gray-50 text-gray-700'
                  }`}
                >
                  {software.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our PCB Layout Process</h2>
            
            <div className="space-y-6">
              {[
                {
                  step: '01',
                  title: 'Schematic Review',
                  description: 'Thorough review of your schematic for completeness and design intent understanding.'
                },
                {
                  step: '02',
                  title: 'Footprint Verification',
                  description: 'Component footprint creation and verification against datasheets and manufacturer specifications.'
                },
                {
                  step: '03',
                  title: 'Layout & Routing',
                  description: 'Strategic component placement followed by expert routing with signal integrity considerations.'
                },
                {
                  step: '04',
                  title: 'Design Verification',
                  description: 'Comprehensive DRC, ERC, and DFM checks to ensure manufacturability and reliability.'
                },
                {
                  step: '05',
                  title: 'Gerber Generation',
                  description: 'Production-ready Gerber files, drill files, and complete fabrication documentation.'
                }
              ].map((process, index) => (
                <div key={index} className="flex items-start space-x-6 bg-white p-6 rounded-xl shadow-md">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {process.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{process.title}</h3>
                    <p className="text-gray-600">{process.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Design Capabilities</h2>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-purple-900">Layout Specifications</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Layers:</strong> 1-32 layers</li>
                    <li><strong>Min Track Width:</strong> 3 mil (0.075mm)</li>
                    <li><strong>Min Spacing:</strong> 3 mil (0.075mm)</li>
                    <li><strong>Min Drill Size:</strong> 0.15mm</li>
                    <li><strong>Via Types:</strong> Through-hole, Blind, Buried</li>
                    <li><strong>HDI Support:</strong> Microvia, laser drilling</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-purple-900">Special Features</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>Controlled impedance design</li>
                    <li>High-speed differential pairs</li>
                    <li>RF/Microwave PCB layout</li>
                    <li>Rigid-flex PCB design</li>
                    <li>Thermal management</li>
                    <li>EMI/EMC optimization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote-form" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Request PCB Layout Quote</h2>
                <p className="text-gray-600">Share your requirements and we&apos;ll provide a detailed quote</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="9876543210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Your company"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Board Type *
                    </label>
                    <select
                      name="boardType"
                      value={formData.boardType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="single">Single-sided</option>
                      <option value="double">Double-sided</option>
                      <option value="multi">Multi-layer</option>
                      <option value="flex">Flexible PCB</option>
                      <option value="rigid-flex">Rigid-flex</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Layers *
                    </label>
                    <select
                      name="layers"
                      value={formData.layers}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="1">1 Layer</option>
                      <option value="2">2 Layers</option>
                      <option value="4">4 Layers</option>
                      <option value="6">6 Layers</option>
                      <option value="8">8 Layers</option>
                      <option value="10+">10+ Layers</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Board Dimensions (mm)
                    </label>
                    <input
                      type="text"
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g., 100 x 80"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Number of boards"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Design Software
                    </label>
                    <input
                      type="text"
                      name="software"
                      value={formData.software}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g., Altium, KiCad, Eagle"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Details & Special Requirements
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your project requirements, special features needed, timeline, etc."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit Layout Request</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email Us</h3>
                  <p className="text-gray-600 text-sm">pcb@techhaven.com</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Call Us</h3>
                  <p className="text-gray-600 text-sm">+91-9876543210</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose TechHaven for PCB Layout?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">1000+</div>
                <p className="text-gray-600">PCB Layouts Designed</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">99%</div>
                <p className="text-gray-600">First-Time Success Rate</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">2-5 Days</div>
                <p className="text-gray-600">Average Turnaround</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-900 to-pink-900 text-white rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Need Expert PCB Layout Services?</h3>
              <p className="text-purple-100 mb-6">
                Our experienced PCB designers ensure your boards are optimized for performance, manufacturability, and cost-effectiveness.
              </p>
              <a 
                href="#quote-form"
                className="inline-block bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                Get Your Free Layout Quote
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}