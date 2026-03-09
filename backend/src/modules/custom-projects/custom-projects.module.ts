import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { JwtModule } from '@nestjs/jwt';
import { CustomProjectsService } from './custom-projects.service';
import { CustomProjectsController } from './custom-projects.controller';
import { CustomProject } from '../../entities/custom-project.entity';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AdminRoleGuard } from '../../common/guards/admin-role.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomProject]),
    MulterModule.register({
      dest: './uploads/custom-projects',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-key',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [CustomProjectsController],
  providers: [CustomProjectsService, JwtAuthGuard, AdminRoleGuard],
  exports: [CustomProjectsService],
})
export class CustomProjectsModule {}
