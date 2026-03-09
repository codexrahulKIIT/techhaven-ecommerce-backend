// backend/src/modules/wishlist/wishlist.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Wishlist } from "@/entities/wishlist.entity";
import { Product } from "@/entities/product.entity";
import { User } from "@/entities/user.entity";
import { isValidUUID } from "@/common/utils/validation.util";

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepo: Repository<Wishlist>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async getWishlist(userId: string): Promise<Wishlist[]> {
    if (!isValidUUID(userId)) {
      throw new BadRequestException('Invalid userId');
    }

    return this.wishlistRepo.find({
      where: { userId },
      relations: ["product"],
    });
  }

  async getWishlistCount(userId: string): Promise<number> {
    if (!isValidUUID(userId)) {
      throw new BadRequestException('Invalid userId');
    }

    return this.wishlistRepo.count({ where: { userId } });
  }

  async isInWishlist(userId: string, productId: string): Promise<boolean> {
    if (!isValidUUID(userId) || !isValidUUID(productId)) {
      throw new BadRequestException('Invalid wishlist lookup');
    }

    const item = await this.wishlistRepo.findOne({ where: { userId, productId } });
    return !!item;
  }

  async addToWishlist(userId: string, productId: string): Promise<Wishlist> {
    if (!isValidUUID(userId) || !isValidUUID(productId)) {
      throw new BadRequestException('Invalid wishlist payload');
    }

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const product = await this.productRepo.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    const existing = await this.wishlistRepo.findOne({
      where: { userId, productId },
    });
    if (existing) {
      throw new ConflictException("Product already in wishlist");
    }

    const item = this.wishlistRepo.create({ userId, productId });
    return this.wishlistRepo.save(item);
  }

  async removeFromWishlist(id: string): Promise<boolean> {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid wishlist item id');
    }

    const result = await this.wishlistRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async removeByUserAndProduct(userId: string, productId: string): Promise<boolean> {
    if (!isValidUUID(userId) || !isValidUUID(productId)) {
      throw new BadRequestException('Invalid wishlist payload');
    }

    const result = await this.wishlistRepo.delete({ userId, productId });
    return (result.affected ?? 0) > 0;
  }

  async clearWishlist(userId: string): Promise<void> {
    if (!isValidUUID(userId)) {
      throw new BadRequestException('Invalid userId');
    }

    await this.wishlistRepo.delete({ userId });
  }
}
