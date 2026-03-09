import Link from 'next/link'
import type { ReactNode } from 'react'
import { FiFacebook, FiLinkedin, FiMail, FiPhone, FiMapPin, FiTruck, FiShield, FiHeadphones, FiCreditCard } from 'react-icons/fi'

const quickLinks = {
  shop: [
    { label: 'Development Boards', href: '/categories/development-boards' },
    { label: 'Sensors & Modules', href: '/categories/sensors-modules' },
    { label: 'Robotics', href: '/categories/robotics' },
    { label: 'Projects', href: '/categories/projects' },
    { label: 'Power Supply', href: '/categories/power-supply' },
  ],
  account: [
    { label: 'My Account', href: '/dashboard' },
    { label: 'Orders', href: '/orders' },
    { label: 'Wishlist', href: '/wishlist' },
    { label: 'Help Center', href: '/contact' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Blog', href: '/blog' },
    { label: 'B2B', href: '/b2b' },
  ],
  policy: [
    { label: 'Privacy Policy', href: '/policies?tab=privacy' },
    { label: 'Terms & Conditions', href: '/policies?tab=terms' },
    { label: 'Shipping Policy', href: '/policies?tab=shipping' },
    { label: 'Return Policy', href: '/policies?tab=return' },
    { label: 'Payment Policy', href: '/policies?tab=payment' },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-950">
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Feature icon={<FiTruck className="w-5 h-5 text-blue-300" />} title="Fast Delivery" text="3-7 Business Days" />
          <Feature icon={<FiShield className="w-5 h-5 text-green-300" />} title="Secure Payment" text="100% Safe & Secure" />
          <Feature icon={<FiHeadphones className="w-5 h-5 text-cyan-300" />} title="Support" text="Dedicated Customer Help" />
          <Feature icon={<FiCreditCard className="w-5 h-5 text-amber-300" />} title="COD Available" text="Cash on Delivery" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <Links title="Shop" items={quickLinks.shop} />
        <Links title="My Account" items={quickLinks.account} />
        <Links title="Company" items={quickLinks.company} />
        <Links title="Policies" items={quickLinks.policy} />

        <div className="col-span-2 text-sm text-slate-300 space-y-3">
          <h3 className="font-semibold text-white uppercase text-sm">Contact Us</h3>
          <div className="flex items-start gap-2"><FiMapPin className="w-4 h-4 mt-0.5" /> KIIT, Patia, Bhubaneswar, Odisha 751024</div>
          <div className="flex items-center gap-2"><FiMail className="w-4 h-4" /> <a href="mailto:info@techhaven.com" className="hover:text-white">info@techhaven.com</a></div>
          <div className="flex items-center gap-2"><FiPhone className="w-4 h-4" /> <a href="tel:+916202587293" className="hover:text-white">+91 6202587293</a></div>
          <div className="pt-1 text-xs text-slate-400">Mon-Fri: 9 AM - 6 PM, Sat: 9 AM - 2 PM</div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-center text-xs text-slate-400">
          <div>© {currentYear} TechHaven Technologies. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/techhaven" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white"><FiFacebook /></a>
            <a href="https://www.linkedin.com/company/techhaven" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white"><FiLinkedin /></a>
            <Link href="/sitemap" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function Feature({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">{icon}</div>
      <div>
        <div className="font-semibold text-sm text-white">{title}</div>
        <div className="text-xs text-slate-400">{text}</div>
      </div>
    </div>
  )
}

function Links({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-semibold text-white mb-3 text-sm uppercase">{title}</h3>
      <ul className="space-y-2">
        {items.map(link => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
