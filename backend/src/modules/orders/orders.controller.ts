// backend/src/modules/orders/orders.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrdersService } from './orders.service';
import { Order } from '@/entities/order.entity';
import { CreateOrderDto } from '@/dtos/create-order.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AdminRoleGuard } from '../../common/guards/admin-role.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAllWithItems();
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async findMyOrders(@Request() req: any): Promise<Order[]> {
    return this.ordersService.findByUser(req.user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string, @Request() req: any): Promise<Order> {
    const order = await this.ordersService.findOne(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    if (order.userId !== req.user.id) {
      throw new ForbiddenException('Access denied');
    }
    return order;
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Request() req: any, @Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(req.user.id, createOrderDto);
  }

  @Put(':id/status')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'pending' | 'shipped' | 'delivered',
    @Request() req: any,
  ): Promise<Order> {
    return this.ordersService.updateStatus(id, status, Number(req.user.id));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async remove(@Param('id') id: string): Promise<void> {
    return this.ordersService.remove(id);
  }
}
