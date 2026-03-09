// Placeholder for app.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

// Import your modules
import { AdminModule } from "./modules/admin/admin.module";
import { AddressesModule } from "./modules/addresses/addresses.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { ProductsModule } from "./modules/products/products.module";
import { CategoriesModule } from "./modules/categories/categories.module";
import { CartModule } from "./modules/cart/cart.module";
import { WishlistModule } from "./modules/wishlist/wishlist.module";
import { OrdersModule } from "./modules/orders/orders.module";
import { PaymentsModule } from "./modules/payments/payments.module";
import { B2BModule } from "./modules/b2b/b2b.module";
import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { CustomProjectsModule } from "./modules/custom-projects/custom-projects.module";
import { PlaceholderModule } from "./modules/placeholder/placeholder.module";
import { AppController } from "./app.controller";
import { RootController } from "./root.controller";
import { databaseConfig } from "./config/database.config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(databaseConfig),
    AdminModule,
    AddressesModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    CartModule,
    WishlistModule,
    OrdersModule,
    PaymentsModule,
    B2BModule,
    AnalyticsModule,
    CustomProjectsModule,
    PlaceholderModule,
  ],
  controllers: [AppController, RootController],
})
export class AppModule {}
