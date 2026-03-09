// backend/src/modules/analytics/analytics.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { Order } from '@/entities/order.entity';
import { OrderItem } from '@/entities/order-item.entity';
import { Product } from '@/entities/product.entity';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AdminRoleGuard } from '../../common/guards/admin-role.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Product]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-key',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, JwtAuthGuard, AdminRoleGuard],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
