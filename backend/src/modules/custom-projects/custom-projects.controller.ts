import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Request,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AdminRoleGuard } from '../../common/guards/admin-role.guard';
import { CustomProjectsService } from './custom-projects.service';
import {
  CreateCustomProjectDto,
  UpdateCustomProjectDto,
  CustomProjectFilterDto,
} from '../../dtos/custom-project.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Custom Projects')
@Controller('custom-projects')
export class CustomProjectsController {
  constructor(private readonly customProjectsService: CustomProjectsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new custom project inquiry' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Custom project data with optional file attachment',
    type: CreateCustomProjectDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Project inquiry created successfully',
  })
  @UseInterceptors(
    FileInterceptor('attachment', {
      storage: diskStorage({
        destination: './uploads/custom-projects',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
      }),
      fileFilter: (req, file, callback) => {
        const allowedTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'image/jpeg',
          'image/png',
          'application/zip',
        ];
        if (allowedTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new Error('Invalid file type'), false);
        }
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  async create(
    @Body() createDto: CreateCustomProjectDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: any,
  ) {
    const metadata = {
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent'),
    };

    const project = await this.customProjectsService.create(
      createDto,
      file,
      metadata,
    );

    return {
      message: 'Project inquiry submitted successfully! We will contact you within 10 hours.',
      data: project,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all custom projects (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'List of custom projects',
  })
  async findAll(@Query() filters: CustomProjectFilterDto) {
    return this.customProjectsService.findAll(filters);
  }

  @Get('statistics')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get custom projects statistics (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Custom projects statistics',
  })
  async getStatistics() {
    return this.customProjectsService.getStatistics();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a specific custom project (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Custom project details',
  })
  async findOne(@Param('id') id: string) {
    return this.customProjectsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a custom project (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Custom project updated successfully',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateCustomProjectDto,
  ) {
    return this.customProjectsService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a custom project (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Custom project deleted successfully',
  })
  async remove(@Param('id') id: string) {
    await this.customProjectsService.remove(id);
    return { message: 'Project deleted successfully' };
  }
}
