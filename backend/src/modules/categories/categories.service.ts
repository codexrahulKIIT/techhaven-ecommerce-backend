
// backend/src/modules/categories/categories.service.ts

import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '@/entities/category.entity';
import { isValidUUID } from '@/common/utils/validation.util';

interface CreateCategoryDto {
  name: string;
  slug?: string;
  parentId?: string;
}

interface UpdateCategoryDto {
  name?: string;
  slug?: string;
  parentId?: string | null;
}

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepo: Repository<Category>,
  ) {}

  // Get all categories
  async findAll(): Promise<Category[]> {
    try {
      return await this.categoriesRepo.find({
        relations: ['parent', 'children'],
        order: { name: 'ASC' },
      });
    } catch (error) {
      console.error('Error fetching all categories:', error);
      throw new InternalServerErrorException('Failed to fetch categories');
    }
  }

  // Get category by ID
  async findOne(id: string): Promise<Category> {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }
    try {
      const category = await this.categoriesRepo.findOne({
        where: { id },
        relations: ['parent', 'children', 'products'],
      });

      if (!category) {
        throw new NotFoundException(`Category with id "${id}" not found`);
      }

      return category;
    } catch (error) {
      console.error(`Error fetching category by ID (${id}):`, error);
      throw error;
    }
  }

  // Get category by slug
  async findBySlug(slug: string): Promise<Category> {
    try {
      const category = await this.categoriesRepo.findOne({
        where: { slug },
        relations: ['parent', 'children', 'products'],
      });

      if (!category) {
        throw new NotFoundException(`Category with slug "${slug}" not found`);
      }

      return category;
    } catch (error) {
      console.error(`Error fetching category by slug (${slug}):`, error);
      throw error;
    }
  }

  // Create new category
  async create(data: CreateCategoryDto): Promise<Category> {
    if (data.parentId && !isValidUUID(data.parentId)) {
      throw new BadRequestException('Invalid parentId');
    }
    try {
      let parentCategory: Category | null = null;

      if (data.parentId) {
        parentCategory = await this.categoriesRepo.findOne({
          where: { id: data.parentId },
        });
        if (!parentCategory) {
          throw new NotFoundException('Parent category not found');
        }
      }

      const category = this.categoriesRepo.create({
        name: data.name,
        slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
        parent: parentCategory,
      });

      return await this.categoriesRepo.save(category);
    } catch (error) {
      console.error('Error creating category:', error);
      throw new InternalServerErrorException('Failed to create category');
    }
  }

  // Update existing category
  async update(id: string, data: UpdateCategoryDto): Promise<Category> {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }
    if (data.parentId !== undefined && data.parentId !== null && !isValidUUID(data.parentId)) {
      throw new BadRequestException('Invalid parentId');
    }
    try {
      const category = await this.categoriesRepo.findOne({
        where: { id },
        relations: ['parent'],
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      if (data.name) {
        category.name = data.name;
        category.slug = data.slug || data.name.toLowerCase().replace(/\s+/g, '-');
      }

      if (data.slug) {
        category.slug = data.slug;
      }

      if (data.parentId !== undefined) {
        if (data.parentId === null) {
          category.parent = null;
        } else {
          const parentCategory = await this.categoriesRepo.findOne({
            where: { id: data.parentId },
          });
          if (!parentCategory) {
            throw new NotFoundException('Parent category not found');
          }
          category.parent = parentCategory;
        }
      }

      return await this.categoriesRepo.save(category);
    } catch (error) {
      console.error(`Error updating category (${id}):`, error);
      throw new InternalServerErrorException('Failed to update category');
    }
  }

  // Delete category
  async remove(id: string): Promise<void> {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }
    try {
      const category = await this.categoriesRepo.findOne({ where: { id } });
      if (!category) {
        throw new NotFoundException('Category not found');
      }

      await this.categoriesRepo.remove(category);
    } catch (error) {
      console.error(`Error deleting category (${id}):`, error);
      throw new InternalServerErrorException('Failed to delete category');
    }
  }
}
