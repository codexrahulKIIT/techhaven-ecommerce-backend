import Link from 'next/link'

const links = [
  '/', '/shop', '/categories', '/about', '/contact', '/blog', '/b2b', '/custom-project', '/policies', '/login', '/register', '/cart', '/checkout', '/orders', '/wishlist'
]

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold mb-6">Sitemap</h1>
        <ul className="grid sm:grid-cols-2 gap-3">
          {links.map(path => (
            <li key={path}>
              <Link href={path} className="text-blue-700 hover:underline">{path}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
