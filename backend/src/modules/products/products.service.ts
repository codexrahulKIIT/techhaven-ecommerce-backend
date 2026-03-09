// backend/src/modules/products/products.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '@/entities/product.entity';
import { isValidUUID } from '@/common/utils/validation.util';

interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
  images?: string[];
  categoryId: string;
}

interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  images?: string[];
  categoryId?: string;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepo: Repository<Product>,
  ) {}

  async findAll(options?: {
    categoryId?: string;
    search?: string;
    page?: number;
    limit?: number;
    featured?: boolean;
  }): Promise<{ products: Product[]; total: number; pages: number }> {
    const { categoryId, search, page = 1, limit = 10, featured } = options || {};
    if (categoryId && !isValidUUID(categoryId)) {
      throw new BadRequestException('Invalid categoryId');
    }
    const queryBuilder = this.productsRepo.createQueryBuilder('product');

    if (categoryId) {
      queryBuilder.andWhere('product.categoryId = :categoryId', { categoryId });
    }

    if (search) {
      queryBuilder.andWhere(
        '(product.name ILIKE :search OR product.description ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    if (featured !== undefined) {
      queryBuilder.andWhere('product.featured = :featured', { featured });
    }

    const total = await queryBuilder.getCount();
    const pages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;

    const products = await queryBuilder
      .skip(skip)
      .take(limit)
      .getMany();

    return { products, total, pages };
  }

  async findOne(id: string): Promise<Product | null> {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }
    return this.productsRepo.findOne({ where: { id } });
  }

  async create(data: CreateProductDto): Promise<Product> {
    if (!isValidUUID(data.categoryId)) {
      throw new BadRequestException('Invalid categoryId');
    }
    const product = this.productsRepo.create(data);
    return this.productsRepo.save(product);
  }

  async update(id: string, data: UpdateProductDto): Promise<Product> {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }
    if (data.categoryId && !isValidUUID(data.categoryId)) {
      throw new BadRequestException('Invalid categoryId');
    }
    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    Object.assign(product, data);
    return this.productsRepo.save(product);
  }

  async remove(id: string): Promise<void> {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }
    const result = await this.productsRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Product not found');
    }
  }

  async count(options?: {
    categoryId?: string;
    search?: string;
  }): Promise<number> {
    const { categoryId, search } = options || {};
    if (categoryId && !isValidUUID(categoryId)) {
      throw new BadRequestException('Invalid categoryId');
    }
    const queryBuilder = this.productsRepo.createQueryBuilder('product');

    if (categoryId) {
      queryBuilder.andWhere('product.categoryId = :categoryId', { categoryId });
    }

    if (search) {
      queryBuilder.andWhere(
        '(product.name ILIKE :search OR product.description ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    return queryBuilder.getCount();
  }
}
