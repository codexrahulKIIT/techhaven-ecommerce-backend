// backend/src/modules/wishlist/wishlist.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  BadRequestException,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WishlistService } from './wishlist.service';
import { Wishlist } from '@/entities/wishlist.entity';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getMyWishlist(@Request() req: any): Promise<Wishlist[]> {
    return this.wishlistService.getWishlist(req.user.id);
  }

  @Get('count')
  @UseGuards(AuthGuard('jwt'))
  async getMyWishlistCount(@Request() req: any): Promise<{ count: number }> {
    const count = await this.wishlistService.getWishlistCount(req.user.id);
    return { count };
  }

  @Get('check/:productId')
  @UseGuards(AuthGuard('jwt'))
  async checkWishlistItem(
    @Request() req: any,
    @Param('productId') productId: string,
  ): Promise<{ inWishlist: boolean }> {
    const inWishlist = await this.wishlistService.isInWishlist(req.user.id, productId);
    return { inWishlist };
  }

  @Get(':userId')
  async getWishlist(@Param('userId') userId: string): Promise<Wishlist[]> {
    return this.wishlistService.getWishlist(userId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addMyWishlistItem(
    @Request() req: any,
    @Body('productId') productId: string,
  ): Promise<Wishlist> {
    if (!productId) {
      throw new BadRequestException('Missing required field: productId');
    }

    return this.wishlistService.addToWishlist(req.user.id, productId);
  }

  @Post('toggle')
  @UseGuards(AuthGuard('jwt'))
  async toggleWishlist(
    @Request() req: any,
    @Body('productId') productId: string,
  ): Promise<{ action: 'added' | 'removed'; item?: Wishlist }> {
    if (!productId) {
      throw new BadRequestException('Missing required field: productId');
    }

    const inWishlist = await this.wishlistService.isInWishlist(req.user.id, productId);
    if (inWishlist) {
      await this.wishlistService.removeByUserAndProduct(req.user.id, productId);
      return { action: 'removed' };
    }

    const item = await this.wishlistService.addToWishlist(req.user.id, productId);
    return { action: 'added', item };
  }

  @Post('add')
  async addToWishlist(
    @Body('userId') userId: string,
    @Body('productId') productId: string,
  ): Promise<Wishlist> {
    if (!userId || !productId) {
      throw new BadRequestException('Missing required fields');
    }
    return this.wishlistService.addToWishlist(userId, productId);
  }

  @Delete('clear')
  @UseGuards(AuthGuard('jwt'))
  async clearMyWishlist(@Request() req: any): Promise<{ message: string }> {
    await this.wishlistService.clearWishlist(req.user.id);
    return { message: 'Wishlist cleared successfully' };
  }

  @Delete(':productId')
  @UseGuards(AuthGuard('jwt'))
  async removeMyWishlistItem(@Request() req: any, @Param('productId') productId: string): Promise<void> {
    const removed = await this.wishlistService.removeByUserAndProduct(req.user.id, productId);
    if (!removed) {
      throw new NotFoundException('Wishlist item not found');
    }
  }

  @Delete('remove/:id')
  async removeFromWishlist(@Param('id') id: string): Promise<void> {
    const removed = await this.wishlistService.removeFromWishlist(id);
    if (!removed) {
      throw new NotFoundException('Wishlist item not found');
    }
  }
}
