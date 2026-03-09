import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { createHash, randomBytes } from 'crypto';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from '@/dtos/create-user.dto';
import { RefreshToken } from '@/entities/refresh-token.entity';
import { User } from '@/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokensRepo: Repository<RefreshToken>,
    private readonly jwtService: JwtService,
  ) {}

  async register({ firstName, lastName, email, phone, password }: CreateUserDto) {
    try {
      const normalizedEmail = email.toLowerCase();
      const existingUser = await this.usersRepo.findOne({
        where: [{ email: normalizedEmail }, { phone }],
      });

      if (existingUser) {
        throw new ConflictException('User already exists. Please sign in.');
      }

      const hashed = await bcrypt.hash(password, 12);
      const user = this.usersRepo.create({
        firstName,
        lastName,
        email: normalizedEmail,
        phone,
        password: hashed,
      });

      await this.usersRepo.save(user);
      const tokens = await this.issueTokens(user);

      return {
        message: 'User registered successfully',
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user: this.serializeUser(user),
      };
    } catch (err) {
      if (err instanceof QueryFailedError && (err as any).code === '23505') {
        throw new ConflictException('User already exists. Please sign in.');
      }
      throw err;
    }
  }

  async login(email: string, password: string) {
    const normalizedEmail = email.toLowerCase();
    const user = await this.usersRepo
      .createQueryBuilder('user')
      .where('LOWER(user.email) = LOWER(:email)', { email: normalizedEmail })
      .getOne();

    if (!user?.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const tokens = await this.issueTokens(user);

    return {
      message: 'Login successful',
      token: tokens.accessToken,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: this.serializeUser(user),
    };
  }

  async refresh(refreshToken: string) {
    const tokenHash = this.hashToken(refreshToken);
    const tokenRecord = await this.refreshTokensRepo.findOne({
      where: { tokenHash },
      relations: ['user'],
    });

    if (!tokenRecord || tokenRecord.revokedAt || tokenRecord.expiresAt <= new Date()) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    tokenRecord.revokedAt = new Date();
    await this.refreshTokensRepo.save(tokenRecord);

    const tokens = await this.issueTokens(tokenRecord.user);
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: this.serializeUser(tokenRecord.user),
    };
  }

  async revokeRefreshToken(refreshToken: string) {
    const tokenRecord = await this.refreshTokensRepo.findOne({
      where: { tokenHash: this.hashToken(refreshToken) },
    });

    if (tokenRecord) {
      tokenRecord.revokedAt = new Date();
      await this.refreshTokensRepo.save(tokenRecord);
    }
  }

  async validateUser(userId: string) {
    return this.usersRepo.findOne({ where: { id: userId } });
  }

  async verify(userId: string) {
    const user = await this.validateUser(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return this.serializeUser(user);
  }

  private async issueTokens(user: User) {
    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = randomBytes(48).toString('hex');
    const tokenRecord = this.refreshTokensRepo.create({
      userId: user.id,
      tokenHash: this.hashToken(refreshToken),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    await this.refreshTokensRepo.save(tokenRecord);
    return { accessToken, refreshToken };
  }

  private hashToken(token: string) {
    return createHash('sha256').update(token).digest('hex');
  }

  private serializeUser(user: User) {
    return {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`.trim(),
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
