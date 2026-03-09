import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProjectCategory, ProjectStatus } from '../entities/custom-project.entity';

export class CreateCustomProjectDto {
  @ApiProperty({ example: 'John Doe', description: 'Customer full name' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  customerName!: string;

  @ApiProperty({ example: 'john@example.com', description: 'Customer email address' })
  @IsEmail()
  @IsNotEmpty()
  customerEmail!: string;

  @ApiProperty({ example: '9876543210', description: '10-digit mobile number' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[6-9]\d{9}$/, {
    message: 'Mobile number must be a valid 10-digit Indian number',
  })
  customerMobile!: string;

  @ApiProperty({
    example: 'IoT Based Smart Home Automation',
    description: 'Project title',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  projectTitle!: string;

  @ApiPropertyOptional({
    enum: ProjectCategory,
    example: ProjectCategory.IOT,
    description: 'Project category',
  })
  @IsEnum(ProjectCategory)
  @IsOptional()
  projectCategory?: ProjectCategory;

  @ApiProperty({
    example: 'Detailed description of the project requirements...',
    description: 'Project description',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(50, { message: 'Description must be at least 50 characters' })
  projectDescription!: string;

  @ApiPropertyOptional({
    example: '₹10,000 - ₹25,000',
    description: 'Budget range',
  })
  @IsString()
  @IsOptional()
  budgetRange?: string;

  @ApiPropertyOptional({
    example: '1-2 months',
    description: 'Expected timeline',
  })
  @IsString()
  @IsOptional()
  expectedTimeline?: string;

  @ApiPropertyOptional({
    description: 'Project requirement file',
  })
  @IsOptional()
  attachment?: any; // Will be handled by multer
}

export class UpdateCustomProjectDto {
  @ApiPropertyOptional({ enum: ProjectStatus })
  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  priority?: string;

  @ApiPropertyOptional()
  @IsOptional()
  estimatedCost?: number;

  @ApiPropertyOptional()
  @IsOptional()
  quotedAmount?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  quotationFileUrl?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  adminNotes?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  customerNotes?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  internalRemarks?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  assignedTo?: string;
}

export class CustomProjectResponseDto {
  id!: string;
  customerName!: string;
  customerEmail!: string;
  customerMobile!: string;
  projectTitle!: string;
  projectCategory!: ProjectCategory;
  projectDescription!: string;
  budgetRange!: string;
  expectedTimeline!: string;
  status!: ProjectStatus;
  priority!: string;
  attachmentUrl?: string;
  attachmentName?: string;
  quotedAmount?: number;
  assignedTo?: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class CustomProjectFilterDto {
  @ApiPropertyOptional({ enum: ProjectStatus })
  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;

  @ApiPropertyOptional({ enum: ProjectCategory })
  @IsEnum(ProjectCategory)
  @IsOptional()
  category?: ProjectCategory;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  assignedTo?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  searchQuery?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  limit?: number;
}
