// backend/src/modules/b2b/b2b.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { B2BService } from './b2b.service';
import { B2BRequest } from '@/entities/b2b.entity';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AdminRoleGuard } from '../../common/guards/admin-role.guard';

@Controller('b2b')
export class B2BController {
  constructor(private readonly b2bService: B2BService) {}

  @Get()
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async findAll(): Promise<B2BRequest[]> {
    return this.b2bService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async findOne(@Param('id') id: string): Promise<B2BRequest> {
    const request = await this.b2bService.findOne(id);
    if (!request) {
      throw new NotFoundException('B2B request not found');
    }
    return request;
  }

  @Post()
  async submitAnonymousRequest(
    @Body('company') company: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('details') details: string,
  ): Promise<B2BRequest> {
    if (!company || !email || !details) {
      throw new BadRequestException('Missing required fields');
    }
    return this.b2bService.submitRequest({ company, email, phone, details });
  }

  @Post('submit')
  async submitRequest(
    @Body('userId') userId: string,
    @Body('projectDetails') projectDetails: string,
    @Body('quantity') quantity: number,
  ): Promise<B2BRequest> {
    if (!userId || !projectDetails || !quantity) {
      throw new BadRequestException('Missing required fields');
    }
    return this.b2bService.submitRequest({ userId, details: projectDetails });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<B2BRequest> {
    return this.b2bService.updateStatus(id, status as any);
  }

  @Put(':id/approve')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async approve(@Param('id') id: string): Promise<B2BRequest> {
    return this.b2bService.updateStatus(id, 'approved');
  }

  @Put(':id/reject')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async reject(@Param('id') id: string): Promise<B2BRequest> {
    return this.b2bService.updateStatus(id, 'rejected');
  }
}
