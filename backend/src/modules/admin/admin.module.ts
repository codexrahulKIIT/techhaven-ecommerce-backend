import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from '../../entities/admin.entity';
import { AdminLog } from '../../entities/admin-log.entity';
import { User } from '../../entities/user.entity';
import { Order } from '../../entities/order.entity';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AdminRoleGuard } from '../../common/guards/admin-role.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, AdminLog, User, Order]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-key',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService, JwtAuthGuard, AdminRoleGuard],
  exports: [AdminService],
})
export class AdminModule {}
