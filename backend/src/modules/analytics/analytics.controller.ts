// backend/src/modules/analytics/analytics.controller.ts
import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { AdminRoleGuard } from "../../common/guards/admin-role.guard";

@Controller("analytics")
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get("sales")
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async getSales() {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);

    return this.analyticsService.getSalesReport(
      startDate.toISOString(),
      endDate.toISOString(),
    );
  }

  @Get("sales-report")
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async getSalesReport(
    @Query("startDate") startDate: string,
    @Query("endDate") endDate: string
  ) {
    return this.analyticsService.getSalesReport(
      new Date(startDate).toISOString(),
      new Date(endDate).toISOString()
    );
  }

  @Get("top-products")
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async getTopProducts(@Query("limit") limit = 5) {
    return this.analyticsService.getTopProducts(Number(limit));
  }

  @Get("low-stock")
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async getLowStock(@Query("threshold") threshold = 10) {
    return this.analyticsService.getLowStock(Number(threshold));
  }
}
