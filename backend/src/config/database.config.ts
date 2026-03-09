import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Admin } from '../entities/admin.entity';
import { Address } from '../entities/address.entity';
import { AdminLog } from '../entities/admin-log.entity';
import { B2BInquiry } from '../entities/b2b-inquiry.entity';
import { B2BRequest } from '../entities/b2b.entity';
import { CartItem } from '../entities/cart-item.entity';
import { Cart } from '../entities/cart.entity';
import { Category } from '../entities/category.entity';
import { CustomProject } from '../entities/custom-project.entity';
import { InventoryMovement } from '../entities/inventory-movement.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Order } from '../entities/order.entity';
import { Payment } from '../entities/payment.entity';
import { Post } from '../entities/post.entity';
import { Product } from '../entities/product.entity';
import { RefreshToken } from '../entities/refresh-token.entity';
import { User } from '../entities/user.entity';
import { Wishlist } from '../entities/wishlist.entity';

function getEnv(...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = process.env[key];
    if (value && value.trim()) return value.trim();
  }
  return undefined;
}

const databaseUrl = getEnv('DATABASE_URL');
let parsedUrl: URL | null = null;

if (databaseUrl) {
  try {
    parsedUrl = new URL(databaseUrl);
  } catch {
    parsedUrl = null;
  }
}

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: getEnv('DB_HOST', 'DATABASE_HOST') || parsedUrl?.hostname || 'localhost',
  port: parseInt(getEnv('DB_PORT', 'DATABASE_PORT') || parsedUrl?.port || '5432', 10),
  username:
    getEnv('DB_USERNAME', 'DB_USER', 'DATABASE_USER', 'POSTGRES_USER') ||
    parsedUrl?.username ||
    'techhaven_user',
  password:
    getEnv('DB_PASSWORD', 'DB_PASS', 'DATABASE_PASSWORD', 'POSTGRES_PASSWORD') ||
    parsedUrl?.password ||
    'techhaven_pass',
  database:
    getEnv('DB_NAME', 'DATABASE_NAME', 'POSTGRES_DB') ||
    (parsedUrl?.pathname ? parsedUrl.pathname.replace(/^\//, '') : undefined) ||
    'techhaven',
  entities: [
    Admin,
    Address,
    AdminLog,
    User,
    Category,
    Product,
    Cart,
    CartItem,
    Wishlist,
    Order,
    OrderItem,
    Payment,
    Post,
    B2BRequest,
    B2BInquiry,
    CustomProject,
    RefreshToken,
    InventoryMovement,
  ],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false, // Use migrations in production
  logging: process.env.NODE_ENV === 'development',
};
