// backend/src/modules/b2b/b2b.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { B2BController } from './b2b.controller';
import { B2BService } from './b2b.service';
import { B2BRequest } from '@/entities/b2b.entity';
import { User } from '@/entities/user.entity';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AdminRoleGuard } from '../../common/guards/admin-role.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([B2BRequest, User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-key',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [B2BController],
  providers: [B2BService, JwtAuthGuard, AdminRoleGuard],
  exports: [B2BService],
})
export class B2BModule {}
