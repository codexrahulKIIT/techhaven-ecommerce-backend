import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Admin } from '../../entities/admin.entity';
import { AdminLog } from '../../entities/admin-log.entity';
import { User } from '../../entities/user.entity';
import { Order } from '../../entities/order.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(AdminLog)
    private adminLogRepository: Repository<AdminLog>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const admin = await this.adminRepository.findOne({ where: { email } });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      id: admin.id,
      email: admin.email,
      role: 'admin',
    });

    return {
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
        role: 'admin',
      },
    };
  }

  async findById(id: number) {
    return this.adminRepository.findOne({ where: { id } });
  }

  async getUsers(page = 1, limit = 10, search?: string, status?: string) {
    const query = this.userRepository.createQueryBuilder('user');

    if (search) {
      query.andWhere(
        '(user.firstName ILIKE :search OR user.lastName ILIKE :search OR user.email ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (status === 'inactive') {
      return {
        users: [],
        totalPages: 0,
        stats: {
          total: await this.userRepository.count(),
          active: await this.userRepository.count(),
          inactive: 0,
        },
      };
    }

    const total = await query.getCount();
    const users = await query
      .orderBy('user.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const orders = await this.orderRepository.find({ where: { userId: user.id } });
        const totalSpent = orders.reduce((sum, order) => sum + Number(order.totalAmount), 0);

        return {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`.trim(),
          email: user.email,
          phone: user.phone,
          status: 'active',
          totalOrders: orders.length,
          totalSpent,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      }),
    );

    return {
      users: usersWithStats,
      totalPages: Math.ceil(total / limit),
      stats: {
        total,
        active: total,
        inactive: 0,
      },
    };
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const orders = await this.orderRepository.find({ where: { userId: user.id } });
    const totalSpent = orders.reduce((sum, order) => sum + Number(order.totalAmount), 0);

    return {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`.trim(),
      email: user.email,
      phone: user.phone,
      status: 'active',
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      orderCount: orders.length,
      totalSpent,
    };
  }

  async createUser(payload: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role?: string;
  }) {
    const [firstName, ...lastNameParts] = payload.name.trim().split(/\s+/);
    const user = this.userRepository.create({
      firstName: firstName || 'User',
      lastName: lastNameParts.join(' '),
      email: payload.email.toLowerCase(),
      phone: payload.phone,
      password: await bcrypt.hash(payload.password, 12),
      role: payload.role || 'user',
    });

    const saved = await this.userRepository.save(user);
    await this.logAdminAction('user_created', 'user', saved.id, {
      email: saved.email,
      role: saved.role,
    });
    return saved;
  }

  async updateUser(
    id: string,
    payload: { name?: string; email?: string; phone?: string; status?: string },
  ) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (payload.name) {
      const [firstName, ...lastNameParts] = payload.name.trim().split(/\s+/);
      user.firstName = firstName || user.firstName;
      user.lastName = lastNameParts.join(' ');
    }

    if (payload.email) {
      user.email = payload.email.toLowerCase();
    }

    if (payload.phone !== undefined) {
      user.phone = payload.phone;
    }

    await this.userRepository.save(user);
    await this.logAdminAction('user_updated', 'user', user.id, {
      email: user.email,
      phone: user.phone,
    });
    return this.getUserById(id);
  }

  async deleteUser(id: string) {
    const result = await this.userRepository.delete(id);
    if ((result.affected ?? 0) === 0) {
      throw new NotFoundException('User not found');
    }

    await this.logAdminAction('user_deleted', 'user', id);
    return { message: 'User deleted successfully' };
  }

  async bulkDeleteUsers(userIds: string[]) {
    await this.userRepository.delete(userIds);
    await this.logAdminAction('users_bulk_deleted', 'user', undefined, { userIds });
    return { message: 'Users deleted successfully' };
  }

  async logAdminAction(
    action: string,
    entityType: string,
    entityId?: string,
    metadata?: Record<string, unknown>,
    adminId?: number,
  ) {
    await this.adminLogRepository.save(
      this.adminLogRepository.create({
        adminId,
        action,
        entityType,
        entityId,
        metadata,
      }),
    );
  }
}
