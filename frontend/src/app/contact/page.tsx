'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { toast } from 'react-toastify'
import { getBackendUrl } from '@/utils/getBackendUrl'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const baseUrl = await getBackendUrl()
      const response = await fetch(`${baseUrl}/custom-projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          customerMobile: formData.phone.replace(/\D/g, '').slice(-10),
          projectTitle: `Contact: ${formData.subject || 'General Inquiry'}`,
          projectDescription: formData.message.padEnd(50, '.'),
          budgetRange: 'Not Sure',
          expectedTimeline: 'Flexible',
        }),
      })

      if (!response.ok) throw new Error('Submit failed')

      toast.success('Message sent successfully. We will get back to you soon.')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      toast.error('Failed to send message. Please email support@techhaven.com.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-blue-200 text-lg">We are here to help with orders, products, and projects.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <InfoCard icon={<MapPin className="w-6 h-6 text-blue-600" />} title="Visit Us">
            KIIT, Patia, Bhubaneswar, Odisha 751024
          </InfoCard>
          <InfoCard icon={<Phone className="w-6 h-6 text-green-600" />} title="Call Us">
            +91 6202587293
          </InfoCard>
          <InfoCard icon={<Mail className="w-6 h-6 text-purple-600" />} title="Email Us">
            support@techhaven.com
          </InfoCard>
          <InfoCard icon={<Clock className="w-6 h-6 text-orange-600" />} title="Business Hours">
            Mon-Fri: 9:00 AM - 6:00 PM, Sat: 9:00 AM - 2:00 PM
          </InfoCard>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                required
                placeholder="Full name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                required
                placeholder="Email address"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="tel"
                required
                placeholder="Phone number"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                required
                placeholder="Subject"
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <textarea
              required
              rows={6}
              placeholder="How can we help?"
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <div className="mt-8 grid md:grid-cols-3 gap-4 text-sm">
            <Link href="/policies" className="bg-blue-50 rounded-lg p-4 hover:bg-blue-100">Policies</Link>
            <Link href="/policies?tab=shipping" className="bg-blue-50 rounded-lg p-4 hover:bg-blue-100">Shipping Info</Link>
            <Link href="/b2b" className="bg-blue-50 rounded-lg p-4 hover:bg-blue-100">B2B Support</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">{icon}</div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{children}</p>
    </div>
  )
}
