// backend/src/modules/b2b/b2b.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { B2BRequest, B2BStatus } from '@/entities/b2b.entity';
import { User } from '@/entities/user.entity';

interface SubmitB2BDto {
  userId?: string;
  company?: string;
  email?: string;
  phone?: string;
  details: string;
}

@Injectable()
export class B2BService {
  constructor(
    @InjectRepository(B2BRequest)
    private readonly b2bRepo: Repository<B2BRequest>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async findAll(): Promise<B2BRequest[]> {
    return this.b2bRepo.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<B2BRequest | null> {
    return this.b2bRepo.findOne({ where: { id }, relations: ['user'] });
  }

  async submitRequest(data: SubmitB2BDto): Promise<B2BRequest> {
    if (data.userId) {
      const user = await this.usersRepo.findOne({ where: { id: data.userId } });
      if (!user) throw new NotFoundException('User not found');
    }

    const request = this.b2bRepo.create({
      ...data,
      status: 'pending',
    });

    return this.b2bRepo.save(request);
  }

  async updateStatus(id: string, status: B2BStatus): Promise<B2BRequest> {
    const request = await this.b2bRepo.findOne({ where: { id } });
    if (!request) {
      throw new NotFoundException('B2B request not found');
    }
    request.status = status;
    return this.b2bRepo.save(request);
  }
}
