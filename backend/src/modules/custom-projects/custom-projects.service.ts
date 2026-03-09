import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CustomProject, ProjectStatus } from '../../entities/custom-project.entity';
import {
  CreateCustomProjectDto,
  UpdateCustomProjectDto,
  CustomProjectFilterDto,
} from '../../dtos/custom-project.dto';

@Injectable()
export class CustomProjectsService {
  constructor(
    @InjectRepository(CustomProject)
    private readonly customProjectRepository: Repository<CustomProject>,
  ) {}

  async create(
    createDto: CreateCustomProjectDto,
    file?: Express.Multer.File,
    metadata?: { ipAddress?: string; userAgent?: string },
  ): Promise<CustomProject> {
    const project = this.customProjectRepository.create({
      customerName: createDto.customerName,
      customerEmail: createDto.customerEmail,
      customerMobile: createDto.customerMobile,
      projectTitle: createDto.projectTitle,
      projectCategory: createDto.projectCategory,
      projectDescription: createDto.projectDescription,
      budgetRange: createDto.budgetRange,
      expectedTimeline: createDto.expectedTimeline,
      ipAddress: metadata?.ipAddress,
      userAgent: metadata?.userAgent,
    });

    if (file) {
      project.attachmentUrl = file.path || file.filename; // Adjust based on your storage
      project.attachmentName = file.originalname;
      project.attachmentSize = file.size;
      project.attachmentType = file.mimetype;
    }

    const savedProject = await this.customProjectRepository.save(project);

    // TODO: Send email notification to admin
    // this.emailService.sendAdminNotification(savedProject);

    // TODO: Send confirmation email to customer
    // this.emailService.sendCustomerConfirmation(savedProject);

    return savedProject;
  }

  async findAll(filters: CustomProjectFilterDto): Promise<{
    data: CustomProject[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { status, category, assignedTo, searchQuery, page = 1, limit = 10 } = filters;

    const query = this.customProjectRepository
      .createQueryBuilder('project')
      .where('project.isDeleted = :isDeleted', { isDeleted: false })
      .leftJoinAndSelect('project.assignedUser', 'user');

    if (status) {
      query.andWhere('project.status = :status', { status });
    }

    if (category) {
      query.andWhere('project.projectCategory = :category', { category });
    }

    if (assignedTo) {
      query.andWhere('project.assignedTo = :assignedTo', { assignedTo });
    }

    if (searchQuery) {
      query.andWhere(
        '(project.customerName ILIKE :search OR project.customerEmail ILIKE :search OR project.projectTitle ILIKE :search)',
        { search: `%${searchQuery}%` },
      );
    }

    const [data, total] = await query
      .orderBy('project.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<CustomProject> {
    const project = await this.customProjectRepository.findOne({
      where: { id, isDeleted: false },
      relations: ['assignedUser'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async update(id: string, updateDto: UpdateCustomProjectDto): Promise<CustomProject> {
    const project = await this.findOne(id);

    // Track status changes
    if (updateDto.status && updateDto.status !== project.status) {
      switch (updateDto.status) {
        case ProjectStatus.CONTACTED:
          project.contactedAt = new Date();
          break;
        case ProjectStatus.APPROVED:
          project.approvedAt = new Date();
          break;
        case ProjectStatus.IN_PROGRESS:
          project.startedAt = new Date();
          break;
        case ProjectStatus.COMPLETED:
          project.completedAt = new Date();
          break;
      }
    }

    Object.assign(project, updateDto);
    return await this.customProjectRepository.save(project);
  }

  async remove(id: string): Promise<void> {
    const project = await this.findOne(id);
    project.isDeleted = true;
    project.deletedAt = new Date();
    await this.customProjectRepository.save(project);
  }

  async getStatistics(): Promise<any> {
    const stats = await this.customProjectRepository
      .createQueryBuilder('project')
      .select('project.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('project.isDeleted = :isDeleted', { isDeleted: false })
      .groupBy('project.status')
      .getRawMany();

    const categoryStats = await this.customProjectRepository
      .createQueryBuilder('project')
      .select('project.projectCategory', 'category')
      .addSelect('COUNT(*)', 'count')
      .where('project.isDeleted = :isDeleted', { isDeleted: false })
      .groupBy('project.projectCategory')
      .getRawMany();

    return {
      byStatus: stats,
      byCategory: categoryStats,
    };
  }
}
