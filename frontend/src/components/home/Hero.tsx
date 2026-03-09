import Link from 'next/link'
import { ArrowRight, Briefcase } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-amber-400/25 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '42px 42px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <span className="inline-flex items-center rounded-full border border-white/30 px-3 py-1 text-xs tracking-wide uppercase bg-white/10 mb-5">
              Electronics Store + Services
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Build Better
              <span className="text-amber-300"> Electronics Products</span>
            </h1>
            <p className="mt-5 text-blue-100 text-base sm:text-lg max-w-xl">
              Quality components, reliable BOM sourcing, and custom engineering support for prototyping and production.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/shop" className="inline-flex items-center justify-center rounded-xl bg-amber-400 text-slate-950 font-semibold px-6 py-3 hover:bg-amber-300 transition-colors">
                Shop Components
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/custom-project" className="inline-flex items-center justify-center rounded-xl border border-white/40 text-white font-semibold px-6 py-3 hover:bg-white/10 transition-colors">
                Custom Project
                <Briefcase className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md text-xs sm:text-sm">
              <Stat label="Products" value="10K+" />
              <Stat label="Brands" value="100+" />
              <Stat label="Support" value="24/7" />
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur p-6 sm:p-8 shadow-2xl">
              <div className="rounded-2xl bg-slate-950/60 border border-white/10 p-5">
                <h3 className="text-amber-300 text-lg font-bold mb-4">Production Ready Stack</h3>
                <ul className="space-y-3 text-sm text-blue-100">
                  <li>• Branded ICs, modules, connectors, and power parts</li>
                  <li>• Fast-moving inventory with stock visibility</li>
                  <li>• Engineering services: PCB, firmware, and integration</li>
                  <li>• GST billing and business support for B2B</li>
                </ul>
              </div>
              <div className="mt-5 inline-flex rounded-full bg-emerald-500/20 border border-emerald-300/40 px-3 py-1 text-emerald-200 text-xs">
                Free shipping on qualifying orders
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/20 bg-white/10 px-3 py-2">
      <div className="text-white font-bold text-lg leading-none">{value}</div>
      <div className="text-blue-100/90 mt-1">{label}</div>
    </div>
  )
}

