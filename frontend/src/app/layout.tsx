import type { Metadata } from 'next'
import NoticeBar from '@/components/layout/NoticeBar'
import Header from '@/components/layout/Header'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { Providers } from '@/components/providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'TechHaven Store',
  description: 'Electronics components, development boards, and custom project services.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <NoticeBar />
          <Header />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
