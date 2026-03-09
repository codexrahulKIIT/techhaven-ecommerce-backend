import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartItem } from '@/entities/cart-item.entity';
import { CartService } from './cart.service';
import { AddCartItemDto, CartItemQuantityDto, MergeGuestCartDto, SyncGuestCartDto } from './dto/cart.dto';

@Controller('cart')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(
    @Query('userId') userId?: string,
    @Query('guestToken') guestToken?: string,
  ): Promise<CartItem[]> {
    return this.cartService.getCart(userId, guestToken);
  }

  @Post('add')
  async addItem(@Body() payload: AddCartItemDto): Promise<CartItem> {
    if ((!payload.userId && !payload.guestToken) || !payload.productId || !payload.quantity) {
      throw new BadRequestException('Missing required fields');
    }
    return this.cartService.addItem(payload.userId, payload.guestToken, payload.productId, payload.quantity);
  }

  @Put('item/:id')
  async updateItem(@Param('id') id: string, @Body() payload: CartItemQuantityDto): Promise<CartItem> {
    if (!payload.quantity) {
      throw new BadRequestException('Missing quantity');
    }
    return this.cartService.updateItemQuantity(id, payload.quantity);
  }

  @Post('sync')
  async syncGuestCart(@Body() payload: SyncGuestCartDto): Promise<CartItem[]> {
    if (!payload.guestToken) {
      throw new BadRequestException('Missing guest token');
    }
    return this.cartService.syncGuestCart(payload.guestToken, payload.items || []);
  }

  @Post('merge')
  async mergeGuestCart(@Body() payload: MergeGuestCartDto): Promise<CartItem[]> {
    if (!payload.guestToken || !payload.userId) {
      throw new BadRequestException('Missing required fields');
    }
    return this.cartService.mergeGuestCartIntoUser(payload.guestToken, payload.userId);
  }

  @Delete('remove/:id')
  async removeItem(@Param('id') id: string): Promise<void> {
    const removed = await this.cartService.removeItem(id);
    if (!removed) {
      throw new NotFoundException('Cart item not found');
    }
  }
}
