import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Professional Hardware Design Services | Custom PCB & Embedded Systems | TechHaven Store',
  description: 'Expert hardware design services including custom PCB design, embedded systems, IoT devices, firmware development, and prototyping. Get your quote within 10 hours.',
  keywords: 'hardware design, PCB design, embedded systems, IoT devices, firmware development, custom electronics, hardware prototyping',
  openGraph: {
    title: 'Professional Hardware Design Services | TechHaven Store',
    description: 'Expert hardware design services for custom electronics, PCB design, and embedded systems.',
    type: 'website',
  }
}

interface ServiceCard {
  title: string
  description: string
  icon: string
}

const services: ServiceCard[] = [
  {
    title: 'Custom PCB Design & Layout',
    description: 'Professional PCB design from schematic to manufacturing-ready files. Multi-layer boards, high-speed designs, and signal integrity analysis.',
    icon: '🔌'
  },
  {
    title: 'Embedded Systems Development',
    description: 'Complete embedded solutions using STM32, ESP32, Arduino, and other microcontroller platforms. Real-time systems and low-power designs.',
    icon: '💻'
  },
  {
    title: 'IoT Device Design',
    description: 'End-to-end IoT solutions with Wi-Fi, Bluetooth, LoRa, and cellular connectivity. Gateway design and cloud integration.',
    icon: '🌐'
  },
  {
    title: 'Hardware Prototyping',
    description: 'Rapid prototyping services from breadboard to fully functional prototypes. Testing, validation, and design iteration support.',
    icon: '🔧'
  },
  {
    title: 'Firmware Development',
    description: 'Custom firmware for microcontrollers and embedded systems. RTOS implementation, bootloaders, and peripheral drivers.',
    icon: '⚙️'
  },
  {
    title: 'Analog & Digital Circuit Design',
    description: 'Precision analog circuits, power supplies, motor drivers, and digital logic design. Sensor interface and signal conditioning.',
    icon: '📊'
  }
]

const expertise: string[] = [
  'STM32, ESP32, Arduino, Raspberry Pi platforms',
  'Wireless modules: Wi-Fi, Bluetooth, LoRa, RF',
  'Robotic boards and motion control systems',
  'Industrial automation and control systems',
  'Power management and battery systems',
  'Sensor integration and data acquisition'
]

export default function HardwareDesignPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Hardware Design Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              From concept to production - We bring your electronic ideas to life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#contact" 
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
              >
                Get a Free Quote
              </Link>
              <Link 
                href="#services" 
                className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors border-2 border-white"
              >
                View Services
              </Link>
            </div>
            <p className="mt-6 text-blue-100">
              ⚡ Response within 10 hours | 📞 Call us anytime for urgent queries
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
              Our Hardware Design Services
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              We specialize in complete hardware design solutions tailored to your specific requirements
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Expertise Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Our Technical Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {expertise.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-md flex items-start"
                >
                  <span className="text-blue-600 text-2xl mr-4">✓</span>
                  <span className="text-gray-700 text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Our Design Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Consultation', desc: 'Discuss your requirements and project goals' },
                { step: '02', title: 'Design', desc: 'Create schematics, PCB layouts, and prototypes' },
                { step: '03', title: 'Testing', desc: 'Thorough validation and quality assurance' },
                { step: '04', title: 'Delivery', desc: 'Production files and comprehensive documentation' }
              ].map((phase, index) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {phase.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{phase.title}</h3>
                  <p className="text-gray-600">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Why Choose TechHaven for Hardware Design?
              </h2>
              <div className="space-y-4 text-gray-700 mb-8">
                <p className="leading-relaxed">
                  With extensive experience in electronics engineering and hardware design, we deliver end-to-end solutions from initial concept through to production-ready designs. Our team works with the latest design tools and industry-standard practices to ensure your project meets all technical and commercial requirements.
                </p>
                <p className="leading-relaxed">
                  We understand the complexities of modern hardware design - from signal integrity in high-speed designs to power optimization in battery-operated devices. Our expertise spans analog circuits, digital systems, RF modules, and embedded software integration.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">10+ Years</div>
                  <div className="text-gray-600">Industry Experience</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-gray-600">Projects Delivered</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                  <div className="text-gray-600">Client Satisfaction</div>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="#contact"
                  className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Request a Free Consultation
                </Link>
                <p className="mt-4 text-gray-600">
                  Get response within 10 hours | No obligation quote
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Hardware Project?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Contact us today to discuss your requirements. We&apos;re here to help resolve your circuit design complications and bring your ideas to reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Submit Requirements
              </Link>
              <a 
                href="tel:+1234567890" 
                className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors border-2 border-white"
              >
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}