// backend/src/modules/products/products.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '@/entities/product.entity';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AdminRoleGuard } from '../../common/guards/admin-role.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(
    @Query('categoryId') categoryId?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('featured') featured?: string,
  ): Promise<{ products: Product[]; total: number; pages: number }> {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    const featuredBool = featured === 'true';
    return this.productsService.findAll({ categoryId, search, page: pageNum, limit: limitNum, featured: featuredBool });
  }

  @Get('count')
  async count(
    @Query('categoryId') categoryId?: string,
    @Query('search') search?: string,
  ): Promise<{ count: number }> {
    const count = await this.productsService.count({ categoryId, search });
    return { count };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async create(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('price') price: number,
    @Body('stock') stock: number,
    @Body('images') images: string[],
    @Body('categoryId') categoryId: string,
  ): Promise<Product> {
    if (!name || !description || !price || categoryId === undefined) {
      throw new BadRequestException('Missing required fields');
    }
    return this.productsService.create({ name, description, price, stock, images, categoryId });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async update(
    @Param('id') id: string,
    @Body('name') name?: string,
    @Body('description') description?: string,
    @Body('price') price?: number,
    @Body('stock') stock?: number,
    @Body('images') images?: string[],
    @Body('categoryId') categoryId?: string,
  ): Promise<Product> {
    return this.productsService.update(id, { name, description, price, stock, images, categoryId });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(id);
  }
}
