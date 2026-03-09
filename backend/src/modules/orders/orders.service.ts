// backend/src/modules/orders/orders.service.ts
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { AdminLog } from '@/entities/admin-log.entity';
import { Order, OrderStatus, PaymentStatus } from '@/entities/order.entity';
import { OrderItem } from '@/entities/order-item.entity';
import { User } from '@/entities/user.entity';
import { Product } from '@/entities/product.entity';
import { CreateOrderDto } from '@/dtos/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(AdminLog)
    private readonly adminLogsRepo: Repository<AdminLog>,
    @InjectRepository(Order)
    private readonly ordersRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemsRepo: Repository<OrderItem>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @InjectRepository(Product)
    private readonly productsRepo: Repository<Product>,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.ordersRepo.find({ relations: ['user'] });
  }

  async findAllWithItems(): Promise<Order[]> {
    return this.ordersRepo.find({ relations: ['user', 'items', 'items.product'] });
  }

  async findOne(id: string): Promise<Order | null> {
    return this.ordersRepo.findOne({ where: { id }, relations: ['user', 'items', 'items.product'] });
  }

  async findByUser(userId: string): Promise<Order[]> {
    return this.ordersRepo.find({ where: { userId }, relations: ['user', 'items', 'items.product'] });
  }

  async create(userId: string, data: CreateOrderDto): Promise<Order> {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    // Validate products and prepare order items
    const orderItems: OrderItem[] = [];
    let totalAmount = 0;

    for (const item of data.items) {
      const product = await this.productsRepo.findOne({ where: { id: item.productId } });
      if (!product) {
        throw new NotFoundException(`Product not found: ${item.productId}`);
      }
      const orderItem = this.orderItemsRepo.create({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      });
      totalAmount += product.price * item.quantity;
      orderItems.push(orderItem);
    }

    const order = this.ordersRepo.create({
      userId,
      status: 'pending' as OrderStatus,
      paymentStatus: 'pending' as PaymentStatus,
      totalAmount,
      paymentProvider: data.paymentProvider,
      paymentMethod: data.paymentMethod,
      shippingAddress: data.shippingAddress,
      items: orderItems,
    });

    // Use transaction to save order and order items atomically
    return await this.dataSource.transaction(async (manager) => {
      const savedOrder = await manager.save(order);
      for (const orderItem of orderItems) {
        orderItem.order = savedOrder;
        await manager.save(orderItem);
      }
      return savedOrder;
    });
  }

  async updatePayment(id: string, paymentProvider: string, paymentId: string, paymentStatus: PaymentStatus): Promise<Order> {
    const order = await this.ordersRepo.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.paymentProvider = paymentProvider;
    order.paymentId = paymentId;
    order.paymentStatus = paymentStatus;
    return this.ordersRepo.save(order);
  }

  async updateStatus(id: string, status: OrderStatus, adminId?: number): Promise<Order> {
    const order = await this.ordersRepo.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.status = status;
    const saved = await this.ordersRepo.save(order);
    await this.adminLogsRepo.save(
      this.adminLogsRepo.create({
        adminId,
        action: 'order_status_updated',
        entityType: 'order',
        entityId: order.id,
        metadata: { status },
      }),
    );
    return saved;
  }

  async remove(id: string): Promise<void> {
    const result = await this.ordersRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Order not found');
    }
  }
}
