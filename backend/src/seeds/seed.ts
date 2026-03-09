import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { User } from '../entities/user.entity';
import { Admin } from '../entities/admin.entity';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cart-item.entity';
import { Wishlist } from '../entities/wishlist.entity';
import * as bcrypt from 'bcrypt';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export async function seedDatabase(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);
  const adminRepository = dataSource.getRepository(Admin);
  const productRepository = dataSource.getRepository(Product);
  const categoryRepository = dataSource.getRepository(Category);
  const orderRepository = dataSource.getRepository(Order);
  const orderItemRepository = dataSource.getRepository(OrderItem);
  const cartRepository = dataSource.getRepository(Cart);
  const cartItemRepository = dataSource.getRepository(CartItem);
  const wishlistRepository = dataSource.getRepository(Wishlist);

  // Seed admin user in admins table
  const adminEmail = 'admin@techhaven.com';
  const existingAdmin = await adminRepository.findOne({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('adminpassword', 10);
    const admin = adminRepository.create({
      email: adminEmail,
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
    });
    await adminRepository.save(admin);
    console.log('Admin user seeded in admins table');
  } else {
    console.log('Admin user already exists in admins table');
  }

  // Seed regular user example (optional)
  const userEmail = 'user@techhaven.com';
  const existingUser = await userRepository.findOne({ where: { email: userEmail } });
  if (!existingUser) {
    const hashedPassword = await bcrypt.hash('userpassword', 10);
    const user = userRepository.create({
      id: 'ae7dfa1f-de88-444c-b5b0-e98ba2ed825e',
      email: userEmail,
      password: hashedPassword,
      firstName: 'Regular',
      lastName: 'User',
      role: 'user',
    });
    await userRepository.save(user);
    console.log('Regular user seeded');
  } else {
    console.log('Regular user already exists');
  }

  // Seed test user for login testing
  const testUserEmail = 'test3@example.com';
  const existingTestUser = await userRepository.findOne({ where: { email: testUserEmail } });
  if (!existingTestUser) {
    const hashedPassword = await bcrypt.hash('password', 10);
    const user = userRepository.create({
      id: 'b8c9d10e-f11f-4a12-b3c4-d5e6f7a8b9c0',
      email: testUserEmail,
      password: hashedPassword,
      firstName: 'Test',
      lastName: 'User',
      role: 'user',
    });
    await userRepository.save(user);
    console.log('Test user seeded');
  } else {
    console.log('Test user already exists');
  }

  // Seed categories
  const categories = [
    { id: 'c1a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c', name: 'Development Boards', slug: 'development-boards' },
    { id: 'd2b3c4d5-e6f7-4a8b-9c0d-1e2f3a4b5c6d', name: 'Sensors & Modules', slug: 'sensors-modules' },
    { id: 'e3c4d5e6-f7a8-4b9c-8d0e-2f3a4b5c6d7e', name: 'Power Supply', slug: 'power-supply' },
  ];

  for (const categoryData of categories) {
    const existingCategory = await categoryRepository.findOne({ where: { id: categoryData.id } });
    if (!existingCategory) {
      const category = categoryRepository.create(categoryData);
      await categoryRepository.save(category);
      console.log(`Category ${categoryData.name} seeded`);
    }
  }

  // Seed products
  const products = [
    {
      id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
      name: 'Arduino Uno R3 ATmega328P Development Board with USB Cable',
      description: 'The Arduino Uno is a microcontroller board based on the ATmega328P.',
      price: 850,
      stock: 50,
      categoryId: 'c1a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c',
      images: ['/placeholder.svg'],
    },
    {
      id: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
      name: 'Raspberry Pi 4 Model B',
      description: 'The Raspberry Pi 4 Model B is the latest product in the Raspberry Pi 4 range.',
      price: 1200,
      stock: 30,
      categoryId: 'c1a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c',
      images: ['/placeholder.svg'],
    },
    {
      id: 'c3d4e5f6-a7b8-4c9d-8e0f-2a3b4c5d6e7f',
      name: 'DHT11 Temperature & Humidity Sensor',
      description: 'The DHT11 is a basic, ultra low-cost digital temperature and humidity sensor.',
      price: 150,
      stock: 100,
      categoryId: 'd2b3c4d5-e6f7-4a8b-9c0d-1e2f3a4b5c6d',
      images: ['/placeholder.svg'],
    },
  ];

  for (const productData of products) {
    const existingProduct = await productRepository.findOne({ where: { id: productData.id } });
    if (!existingProduct) {
      const product = productRepository.create(productData);
      await productRepository.save(product);
      console.log(`Product ${productData.name} seeded`);
    }
  }

  // Seed orders and order items
  const orders = [
    {
      id: 'd4e5f6a7-b8c9-4d0e-8f1a-3b4c5d6e7f80',
      userId: 'b8c9d10e-f11f-4a12-b3c4-d5e6f7a8b9c0',
      totalAmount: 1700,
      status: 'pending' as const,
      paymentStatus: 'pending' as const,
      items: [
        {
          id: 'e5f6a7b8-c9d0-4e1f-8a2b-4c5d6e7f8091',
          productId: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
          quantity: 2,
          price: 850,
        },
      ],
    },
  ];

  for (const orderData of orders) {
    const existingOrder = await orderRepository.findOne({ where: { id: orderData.id } });
    if (!existingOrder) {
      const order = orderRepository.create({
        id: orderData.id,
        userId: orderData.userId,
        totalAmount: orderData.totalAmount,
        status: orderData.status,
        paymentStatus: orderData.paymentStatus,
      });
      const savedOrder = await orderRepository.save(order);

      for (const itemData of orderData.items) {
        const orderItem = orderItemRepository.create({
          id: itemData.id,
          orderId: savedOrder.id,
          productId: itemData.productId,
          quantity: itemData.quantity,
          price: itemData.price,
        });
        await orderItemRepository.save(orderItem);
      }
      console.log(`Order ${orderData.id} seeded`);
    }
  }

  // Seed cart and cart items
  const carts = [
    {
      id: 'f6a7b8c9-d0e1-4f2a-8b3c-5d6e7f8091a2',
      userId: 'b8c9d10e-f11f-4a12-b3c4-d5e6f7a8b9c0',
      items: [
        {
          id: '0a7b8c9d-e1f2-4a3b-8c4d-6e7f8091a2b3',
          productId: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
          quantity: 1,
        },
      ],
    },
  ];

  for (const cartData of carts) {
    const existingCart = await cartRepository.findOne({ where: { id: cartData.id } });
    if (!existingCart) {
      const cart = cartRepository.create({
        id: cartData.id,
        userId: cartData.userId,
      });
      const savedCart = await cartRepository.save(cart);

      for (const itemData of cartData.items) {
        const cartItem = cartItemRepository.create({
          id: itemData.id,
          cartId: savedCart.id,
          productId: itemData.productId,
          quantity: itemData.quantity,
        });
        await cartItemRepository.save(cartItem);
      }
      console.log(`Cart ${cartData.id} seeded`);
    }
  }

  // Seed wishlist
  const wishlists = [
    {
      id: '1b8c9d0e-f2a3-4b4c-8d5e-7f8091a2b3c4',
      userId: 'b8c9d10e-f11f-4a12-b3c4-d5e6f7a8b9c0',
      productId: 'c3d4e5f6-a7b8-4c9d-8e0f-2a3b4c5d6e7f',
    },
  ];

  for (const wishlistData of wishlists) {
    const existingWishlist = await wishlistRepository.findOne({ where: { id: wishlistData.id } });
    if (!existingWishlist) {
      const wishlist = wishlistRepository.create(wishlistData);
      await wishlistRepository.save(wishlist);
      console.log(`Wishlist ${wishlistData.id} seeded`);
    }
  }

}

const seedDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DB_PORT || process.env.DATABASE_PORT || 5432),
  username:
    process.env.DB_USERNAME ||
    process.env.DB_USER ||
    process.env.DATABASE_USER ||
    process.env.POSTGRES_USER ||
    'postgres',
  password:
    process.env.DB_PASSWORD ||
    process.env.DB_PASS ||
    process.env.DATABASE_PASSWORD ||
    process.env.POSTGRES_PASSWORD ||
    '',
  database:
    process.env.DB_NAME ||
    process.env.DATABASE_NAME ||
    process.env.POSTGRES_DB ||
    'techhaven',
  entities: [User, Admin, Product, Category, Order, OrderItem, Cart, CartItem, Wishlist],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
};

export async function runSeed() {
  try {
    const dataSource = new DataSource(seedDataSourceOptions);
    await dataSource.initialize();
    console.log('Database connected, running seeds...');
    await seedDatabase(dataSource);
    await dataSource.destroy();
    console.log('Seeding completed.');
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  void runSeed();
}
