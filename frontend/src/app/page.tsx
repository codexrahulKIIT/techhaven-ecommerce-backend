'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/home/Hero';
import BrandStrip from '@/components/home/BrandStrip';
import Categories from '@/components/categories/Categories';
import FeaturedProducts from '@/components/FeaturedProducts';
import { api } from '@/lib/api';
import { Product } from '@/types/product';
import { Category } from '@/types/category';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        api.getProducts({ limit: 8, featured: true }),
        api.getCategories()
      ]);
      setProducts(productsRes.products || []);
      setCategories(categoriesRes || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main>
        <Hero />
        <BrandStrip />
        <Categories categories={categories} loading={loading} />
        <FeaturedProducts products={products} loading={loading} />
      </main>
    </div>
  );
}
