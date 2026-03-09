import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  UseGuards,
  Request,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginAdminDto } from '../../dtos/login-admin.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AdminRoleGuard } from '../../common/guards/admin-role.guard';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginAdminDto: LoginAdminDto) {
    return this.adminService.login(loginAdminDto.email, loginAdminDto.password);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminRoleGuard)
  async getProfile(@Request() req: any) {
    return this.adminService.findById(Number(req.user.id));
  }

  @Get('users')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async getUsers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    return this.adminService.getUsers(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 10,
      search,
      status,
    );
  }

  @Get('users/:id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async getUserById(@Param('id') id: string) {
    return this.adminService.getUserById(id);
  }

  @Post('users')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async createUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('phone') phone?: string,
    @Body('role') role?: string,
  ) {
    return this.adminService.createUser({ name, email, password, phone, role });
  }

  @Put('users/:id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async updateUser(
    @Param('id') id: string,
    @Body('name') name?: string,
    @Body('email') email?: string,
    @Body('phone') phone?: string,
    @Body('status') status?: string,
  ) {
    return this.adminService.updateUser(id, { name, email, phone, status });
  }

  @Delete('users/:id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id);
  }

  @Post('users/bulk-delete')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async bulkDeleteUsers(@Body('userIds') userIds: string[]) {
    return this.adminService.bulkDeleteUsers(userIds || []);
  }
}
