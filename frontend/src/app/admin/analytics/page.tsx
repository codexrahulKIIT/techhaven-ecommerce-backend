// frontend/app/admin/analytics/page.tsx
"use client";

import { useEffect, useState } from "react";
import AnalyticsCharts from "@/components/admin/AnalyticsCharts";
import { getSalesData, getTopProducts, getLowStock } from "@/lib/analytics";
import { ChartSales, ChartTopProduct, ChartLowStock } from "@/types";

export default function AdminAnalyticsPage() {
  const [sales, setSales] = useState<ChartSales[]>([]);
  const [topProducts, setTopProducts] = useState<ChartTopProduct[]>([]);
  const [lowStock, setLowStock] = useState<ChartLowStock[]>([]);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    const salesData = await getSalesData();
    const top = await getTopProducts();
    const low = await getLowStock();

    setSales(salesData.map((item: any) => ({ date: item.date, total: item.total_sales })));
    setTopProducts(top.map((item: any) => ({ name: item.productName, sales: item.total_sold })));
    setLowStock(low.map((item: any) => ({ name: item.name, stock: item.stock })));
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Analytics Dashboard</h1>
      <AnalyticsCharts sales={sales} topProducts={topProducts} lowStock={lowStock} />
    </div>
  );
}
