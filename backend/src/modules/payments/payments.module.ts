// backend/src/modules/payments/payments.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '@/entities/address.entity';
import { CartItem } from '@/entities/cart-item.entity';
import { Cart } from '@/entities/cart.entity';
import { InventoryMovement } from '@/entities/inventory-movement.entity';
import { Order } from '@/entities/order.entity';
import { OrderItem } from '@/entities/order-item.entity';
import { Payment } from '@/entities/payment.entity';
import { Product } from '@/entities/product.entity';
import { User } from '@/entities/user.entity';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Address,
      Cart,
      CartItem,
      InventoryMovement,
      Order,
      OrderItem,
      Payment,
      Product,
      User,
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
