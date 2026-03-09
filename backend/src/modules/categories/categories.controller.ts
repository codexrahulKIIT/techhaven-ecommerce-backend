
// backend/src/modules/categories/categories.controller.ts

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
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from '@/entities/category.entity';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AdminRoleGuard } from '../../common/guards/admin-role.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // GET /categories
  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  // GET /categories/:id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    const category = await this.categoriesService.findOne(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  // GET /categories/slug/:slug
  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string): Promise<Category> {
    const category = await this.categoriesService.findBySlug(slug);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  // POST /categories
  @Post()
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async create(
    @Body('name') name: string,
    @Body('slug') slug?: string,
    @Body('parentId') parentId?: string,
  ): Promise<Category> {
    if (!name || name.trim() === '') {
      throw new BadRequestException('Name is required');
    }
    return this.categoriesService.create({ name, slug, parentId });
  }

  // PUT /categories/:id
  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async update(
    @Param('id') id: string,
    @Body('name') name?: string,
    @Body('slug') slug?: string,
    @Body('parentId') parentId?: string | null,
  ): Promise<Category> {
    return this.categoriesService.update(id, { name, slug, parentId });
  }

  // DELETE /categories/:id
  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.categoriesService.remove(id);
    return { message: 'Category deleted successfully' };
  }
}

