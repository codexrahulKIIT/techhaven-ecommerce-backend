'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca3e97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'Latest Sensors & Modules',
    subtitle: 'Discover our new arrivals in sensors and electronic modules',
    cta: 'Shop Now',
    href: '/categories/sensors'
  },
  {
    image: 'https://images.unsplash.com/photo-1558618048-6f0c5f5e6b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'Best Deals on Tools',
    subtitle: 'High-quality tools for your electronics projects at unbeatable prices',
    cta: 'Explore Tools',
    href: '/categories/tools'
  },
  {
    image: 'https://images.unsplash.com/photo-1558618049-75c7da3b3a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'Premium Components',
    subtitle: 'Reliable electronic components for professionals and hobbyists',
    cta: 'View All',
    href: '/shop'
  }
]

export default function SliderHero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl mx-auto px-4">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 font-open-sans">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-90">{slide.subtitle}</p>
                <Link
                  href={slide.href}
                  className="btn-techhaven inline-block px-8 py-4 text-lg"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

