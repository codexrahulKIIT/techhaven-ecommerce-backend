export default function BrandStrip() {
  const brands = [
    'MICROCHIP',
    'ATMEL',
    'INFINEON',
    'NXP',
    'STM',
    'ANALOG DEVICES',
    'TEXAS INSTRUMENTS',
    'INTEL',
  ]

  return (
    <section className="bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-500 mb-5">Trusted Component Ecosystem</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {brands.map(brand => (
            <div
              key={brand}
              className="rounded-lg border border-slate-200 bg-slate-50 text-slate-700 text-xs font-semibold text-center px-2 py-3 hover:border-blue-400 hover:text-blue-800 hover:bg-blue-50 transition-colors"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
