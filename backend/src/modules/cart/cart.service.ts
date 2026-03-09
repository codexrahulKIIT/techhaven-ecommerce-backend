import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '@/entities/cart-item.entity';
import { Cart } from '@/entities/cart.entity';
import { Product } from '@/entities/product.entity';
import { User } from '@/entities/user.entity';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);

  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepo: Repository<CartItem>,
    @InjectRepository(Cart)
    private readonly cartRepo: Repository<Cart>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getCart(userId?: string, guestToken?: string): Promise<CartItem[]> {
    const cart = await this.findCart(userId, guestToken);
    if (!cart) {
      return [];
    }

    return this.cartItemRepo.find({
      where: { cartId: cart.id },
      relations: ['product'],
      order: { createdAt: 'ASC' },
    });
  }

  async addItem(
    userId: string | undefined,
    guestToken: string | undefined,
    productId: string,
    quantity: number,
  ): Promise<CartItem> {
    try {
      await this.validateOwner(userId, guestToken);
      const product = await this.requireProduct(productId);
      const cart = await this.getOrCreateCart(userId, guestToken);

      let cartItem = await this.cartItemRepo.findOne({
        where: { cartId: cart.id, productId },
      });

      const nextQuantity = (cartItem?.quantity ?? 0) + quantity;
      if (nextQuantity < 1 || nextQuantity > product.stock) {
        throw new BadRequestException('Requested quantity is not available');
      }

      if (cartItem) {
        cartItem.quantity = nextQuantity;
      } else {
        cartItem = this.cartItemRepo.create({ cartId: cart.id, productId, quantity });
      }

      return this.cartItemRepo.save(cartItem);
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Failed to add item to cart: ${err.message}`, err.stack);
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to add item to cart');
    }
  }

  async updateItemQuantity(id: string, quantity: number): Promise<CartItem> {
    const cartItem = await this.cartItemRepo.findOne({
      where: { id },
      relations: ['product'],
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    if (quantity < 1 || quantity > cartItem.product.stock) {
      throw new BadRequestException('Requested quantity is not available');
    }

    cartItem.quantity = quantity;
    return this.cartItemRepo.save(cartItem);
  }

  async syncGuestCart(
    guestToken: string,
    items: Array<{ productId: string; quantity: number }>,
  ): Promise<CartItem[]> {
    const cart = await this.getOrCreateCart(undefined, guestToken);
    await this.cartItemRepo.delete({ cartId: cart.id });

    for (const item of items) {
      await this.addItem(undefined, guestToken, item.productId, item.quantity);
    }

    return this.getCart(undefined, guestToken);
  }

  async mergeGuestCartIntoUser(guestToken: string, userId: string): Promise<CartItem[]> {
    await this.validateOwner(userId, guestToken);
    const guestCart = await this.findCart(undefined, guestToken);
    const userCart = await this.getOrCreateCart(userId);

    if (!guestCart) {
      return this.getCart(userId);
    }

    const guestItems = await this.cartItemRepo.find({ where: { cartId: guestCart.id } });
    for (const guestItem of guestItems) {
      const product = await this.requireProduct(guestItem.productId);
      const existing = await this.cartItemRepo.findOne({
        where: { cartId: userCart.id, productId: guestItem.productId },
      });

      const mergedQuantity = Math.min(product.stock, (existing?.quantity ?? 0) + guestItem.quantity);
      if (mergedQuantity < 1) {
        continue;
      }

      if (existing) {
        existing.quantity = mergedQuantity;
        await this.cartItemRepo.save(existing);
      } else {
        await this.cartItemRepo.save(
          this.cartItemRepo.create({
            cartId: userCart.id,
            productId: guestItem.productId,
            quantity: mergedQuantity,
          }),
        );
      }
    }

    await this.cartItemRepo.delete({ cartId: guestCart.id });
    await this.cartRepo.delete({ id: guestCart.id });
    return this.getCart(userId);
  }

  async clearCartByOwner(userId?: string, guestToken?: string): Promise<void> {
    const cart = await this.findCart(userId, guestToken);
    if (!cart) {
      return;
    }
    await this.cartItemRepo.delete({ cartId: cart.id });
  }

  async removeItem(id: string): Promise<boolean> {
    const result = await this.cartItemRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }

  private async validateOwner(userId?: string, guestToken?: string) {
    if (!userId && !guestToken) {
      throw new BadRequestException('Cart owner is required');
    }

    if (userId) {
      const user = await this.userRepo.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
    }
  }

  private async requireProduct(productId: string) {
    const product = await this.productRepo.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  private async findCart(userId?: string, guestToken?: string) {
    if (userId) {
      return this.cartRepo.findOne({ where: { userId } });
    }

    if (guestToken) {
      return this.cartRepo.findOne({ where: { guestToken } });
    }

    return null;
  }

  private async getOrCreateCart(userId?: string, guestToken?: string) {
    const existing = await this.findCart(userId, guestToken);
    if (existing) {
      return existing;
    }

    try {
      return await this.cartRepo.save(this.cartRepo.create({ userId, guestToken }));
    } catch (error) {
      const err = error as { code?: string };
      if (err.code === '23505') {
        const cart = await this.findCart(userId, guestToken);
        if (cart) {
          return cart;
        }
      }

      throw new ConflictException('Failed to create cart');
    }
  }
}
