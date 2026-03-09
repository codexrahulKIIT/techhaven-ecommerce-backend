// backend/src/modules/analytics/analytics.service.ts
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, LessThanOrEqual, Repository } from "typeorm";
import { Order } from "@/entities/order.entity";
import { Product } from "@/entities/product.entity";
import { OrderItem } from "@/entities/order-item.entity";

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemsRepo: Repository<OrderItem>,
    @InjectRepository(Product)
    private readonly productsRepo: Repository<Product>
  ) {}

  async getSalesReport(startDate: string, endDate: string) {
    try {
      const result = await this.ordersRepo
        .createQueryBuilder("order")
        .select("DATE(order.createdAt)", "date")
        .addSelect("SUM(order.totalAmount)", "total_sales")
        .where("order.createdAt BETWEEN :startDate AND :endDate", {
          startDate,
          endDate,
        })
        .groupBy("DATE(order.createdAt)")
        .orderBy("date", "ASC")
        .getRawMany();

      return result.length ? result : [];
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching sales report: ${(error as Error).message}`
      );
    }
  }

  async getTopProducts(limit: number) {
    try {
      const result = await this.orderItemsRepo
        .createQueryBuilder("orderItem")
        .innerJoin("orderItem.product", "product")
        .select("orderItem.productId", "productId")
        .addSelect("product.name", "productName")
        .addSelect("SUM(orderItem.quantity)", "total_sold")
        .groupBy("orderItem.productId")
        .addGroupBy("product.name")
        .orderBy("total_sold", "DESC")
        .limit(limit)
        .getRawMany();

      return result.length ? result : [];
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching top products: ${(error as Error).message}`
      );
    }
  }

  async getLowStock(threshold: number) {
    const products = await this.productsRepo.find({
      where: { stock: LessThanOrEqual(threshold) },
    });
    return products.map((p) => ({
      productId: p.id,
      name: p.name,
      stock: p.stock,
    }));
  }
}
