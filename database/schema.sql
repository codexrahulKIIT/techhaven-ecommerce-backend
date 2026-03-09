CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'custom_projects_project_category_enum'
  ) THEN
    CREATE TYPE custom_projects_project_category_enum AS ENUM (
      'Academic Projects',
      'Industrial Projects',
      'IoT Projects',
      'Embedded Systems',
      'Robotics',
      'PCB Design',
      'Prototype Development',
      'Power Electronics',
      'Digital Electronics',
      'Analog Electronics',
      'Audio Projects',
      'Automation',
      'Smart Home',
      'E-Bike/EV Projects',
      'Other'
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'custom_projects_status_enum'
  ) THEN
    CREATE TYPE custom_projects_status_enum AS ENUM (
      'pending',
      'contacted',
      'quotation_sent',
      'approved',
      'in_progress',
      'completed',
      'rejected',
      'cancelled'
    );
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS "admins" (
  "id" SERIAL PRIMARY KEY,
  "email" character varying NOT NULL UNIQUE,
  "password" character varying NOT NULL,
  "firstName" character varying NOT NULL,
  "lastName" character varying NOT NULL,
  "phone" character varying,
  "role" character varying NOT NULL DEFAULT 'admin',
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "users" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "firstName" character varying(75) NOT NULL DEFAULT 'Unknown',
  "lastName" character varying(75) NOT NULL DEFAULT 'Unknown',
  "email" character varying(150) NOT NULL,
  "phone" character varying(20),
  "address" text,
  "password" character varying(255) NOT NULL,
  "role" character varying NOT NULL DEFAULT 'user',
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "categories" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "name" character varying(150) NOT NULL,
  "slug" character varying(255) NOT NULL UNIQUE,
  "parentId" uuid,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT "PK_categories_id" PRIMARY KEY ("id"),
  CONSTRAINT "FK_categories_parent" FOREIGN KEY ("parentId")
    REFERENCES "categories"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "products" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "name" character varying(200) NOT NULL,
  "description" text NOT NULL,
  "price" numeric(10,2) NOT NULL,
  "stock" integer NOT NULL DEFAULT 0,
  "images" text,
  "featured" boolean NOT NULL DEFAULT false,
  "categoryId" uuid NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT "PK_products_id" PRIMARY KEY ("id"),
  CONSTRAINT "FK_products_category" FOREIGN KEY ("categoryId")
    REFERENCES "categories"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "cart" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "userId" uuid,
  "guestToken" character varying(100) UNIQUE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT "PK_cart_id" PRIMARY KEY ("id"),
  CONSTRAINT "FK_cart_user" FOREIGN KEY ("userId")
    REFERENCES "users"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "cart_items" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "cartId" uuid NOT NULL,
  "productId" uuid NOT NULL,
  "quantity" integer NOT NULL DEFAULT 1,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT "PK_cart_items_id" PRIMARY KEY ("id"),
  CONSTRAINT "FK_cart_items_cart" FOREIGN KEY ("cartId")
    REFERENCES "cart"("id") ON DELETE CASCADE,
  CONSTRAINT "FK_cart_items_product" FOREIGN KEY ("productId")
    REFERENCES "products"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "wishlist" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "userId" uuid NOT NULL,
  "productId" uuid NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT "PK_wishlist_id" PRIMARY KEY ("id"),
  CONSTRAINT "UQ_wishlist_user_product" UNIQUE ("userId", "productId"),
  CONSTRAINT "FK_wishlist_user" FOREIGN KEY ("userId")
    REFERENCES "users"("id") ON DELETE CASCADE,
  CONSTRAINT "FK_wishlist_product" FOREIGN KEY ("productId")
    REFERENCES "products"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "orders" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "userId" uuid NOT NULL,
  "totalAmount" numeric(12,2) NOT NULL DEFAULT 0,
  "status" character varying(20) NOT NULL DEFAULT 'pending',
  "paymentStatus" character varying(20) NOT NULL DEFAULT 'pending',
  "paymentProvider" character varying(50),
  "paymentId" character varying(255),
  "paymentMethod" character varying(50),
  "shippingAddress" jsonb,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT "PK_orders_id" PRIMARY KEY ("id"),
  CONSTRAINT "FK_orders_user" FOREIGN KEY ("userId")
    REFERENCES "users"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "addresses" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "userId" uuid NOT NULL,
  "label" character varying(100),
  "firstName" character varying(100) NOT NULL,
  "lastName" character varying(100) NOT NULL,
  "email" character varying(150) NOT NULL,
  "phone" character varying(20) NOT NULL,
  "address" text NOT NULL,
  "city" character varying(100) NOT NULL,
  "state" character varying(100) NOT NULL,
  "pincode" character varying(20) NOT NULL,
  "isDefault" boolean NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT "PK_addresses_id" PRIMARY KEY ("id"),
  CONSTRAINT "FK_addresses_user" FOREIGN KEY ("userId")
    REFERENCES "users"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "payments" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "orderId" uuid NOT NULL,
  "provider" character varying(50) NOT NULL,
  "status" character varying(50) NOT NULL DEFAULT 'pending',
  "providerPaymentId" character varying(255),
  "amount" numeric(12,2) NOT NULL,
  "currency" character varying(12) NOT NULL DEFAULT 'INR',
  "payload" jsonb,
  "confirmedAt" TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT "PK_payments_id" PRIMARY KEY ("id"),
  CONSTRAINT "FK_payments_order" FOREIGN KEY ("orderId")
    REFERENCES "orders"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "refresh_tokens" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "userId" uuid NOT NULL,
  "tokenHash" text NOT NULL,
  "expiresAt" TIMESTAMP NOT NULL,
  "revokedAt" TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT "PK_refresh_tokens_id" PRIMARY KEY ("id"),
  CONSTRAINT "FK_refresh_tokens_user" FOREIGN KEY ("userId")
    REFERENCES "users"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "admin_logs" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "adminId" integer,
  "action" character varying(100) NOT NULL,
  "entityType" character varying(100) NOT NULL,
  "entityId" character varying(100),
  "metadata" jsonb,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT "PK_admin_logs_id" PRIMARY KEY ("id"),
  CONSTRAINT "FK_admin_logs_admin" FOREIGN KEY ("adminId")
    REFERENCES "admins"("id") ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS "inventory_movements" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "productId" uuid NOT NULL,
  "delta" integer NOT NULL,
  "reason" character varying(100) NOT NULL,
  "orderId" uuid,
  "adminId" integer,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT "PK_inventory_movements_id" PRIMARY KEY ("id"),
  CONSTRAINT "FK_inventory_movements_product" FOREIGN KEY ("productId")
    REFERENCES "products"("id") ON DELETE CASCADE,
  CONSTRAINT "FK_inventory_movements_order" FOREIGN KEY ("orderId")
    REFERENCES "orders"("id") ON DELETE SET NULL,
  CONSTRAINT "FK_inventory_movements_admin" FOREIGN KEY ("adminId")
    REFERENCES "admins"("id") ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS "order_items" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "orderId" uuid NOT NULL,
  "productId" uuid NOT NULL,
  "quantity" integer NOT NULL,
  "price" numeric(12,2) NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT "PK_order_items_id" PRIMARY KEY ("id"),
  CONSTRAINT "FK_order_items_order" FOREIGN KEY ("orderId")
    REFERENCES "orders"("id") ON DELETE CASCADE,
  CONSTRAINT "FK_order_items_product" FOREIGN KEY ("productId")
    REFERENCES "products"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "posts" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "title" character varying NOT NULL,
  "content" text NOT NULL,
  "authorId" uuid,
  "imageUrl" character varying,
  "published" boolean NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT "PK_posts_id" PRIMARY KEY ("id"),
  CONSTRAINT "FK_posts_author" FOREIGN KEY ("authorId")
    REFERENCES "users"("id") ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS "b2b_requests" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "userId" uuid,
  "company" character varying NOT NULL,
  "email" character varying NOT NULL,
  "phone" character varying,
  "details" character varying NOT NULL,
  "status" character varying NOT NULL DEFAULT 'pending',
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT "PK_b2b_requests_id" PRIMARY KEY ("id"),
  CONSTRAINT "FK_b2b_requests_user" FOREIGN KEY ("userId")
    REFERENCES "users"("id") ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS "b2b_inquiries" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "userId" uuid,
  "company" character varying NOT NULL,
  "email" character varying NOT NULL,
  "phone" character varying,
  "details" character varying NOT NULL,
  "status" character varying NOT NULL DEFAULT 'pending',
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT "PK_b2b_inquiries_id" PRIMARY KEY ("id"),
  CONSTRAINT "FK_b2b_inquiries_user" FOREIGN KEY ("userId")
    REFERENCES "users"("id") ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS "custom_projects" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "customer_name" character varying(255) NOT NULL,
  "customer_email" character varying(255) NOT NULL,
  "customer_mobile" character varying(20) NOT NULL,
  "project_title" character varying(500) NOT NULL,
  "project_category" custom_projects_project_category_enum,
  "project_description" text NOT NULL,
  "budget_range" character varying(100),
  "expected_timeline" character varying(100),
  "attachment_url" character varying(1000),
  "attachment_name" character varying(255),
  "attachment_size" integer,
  "attachment_type" character varying(100),
  "status" custom_projects_status_enum NOT NULL DEFAULT 'pending',
  "priority" character varying(20) NOT NULL DEFAULT 'normal',
  "estimated_cost" numeric(10,2),
  "quoted_amount" numeric(10,2),
  "quotation_sent_at" TIMESTAMP,
  "quotation_file_url" character varying(1000),
  "admin_notes" text,
  "customer_notes" text,
  "internal_remarks" text,
  "assigned_to" uuid,
  "contacted_at" TIMESTAMP,
  "approved_at" TIMESTAMP,
  "started_at" TIMESTAMP,
  "completed_at" TIMESTAMP,
  "source" character varying(50) NOT NULL DEFAULT 'website',
  "ip_address" character varying(45),
  "user_agent" text,
  "created_at" TIMESTAMP NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
  "deleted_at" TIMESTAMP,
  "is_deleted" boolean NOT NULL DEFAULT false,
  CONSTRAINT "PK_custom_projects_id" PRIMARY KEY ("id"),
  CONSTRAINT "FK_custom_projects_assigned_user" FOREIGN KEY ("assigned_to")
    REFERENCES "users"("id") ON DELETE NO ACTION
);

CREATE UNIQUE INDEX IF NOT EXISTS "UQ_users_email" ON "users" ("email");
CREATE UNIQUE INDEX IF NOT EXISTS "UQ_users_phone" ON "users" ("phone") WHERE "phone" IS NOT NULL;
CREATE INDEX IF NOT EXISTS "IDX_users_email" ON "users" ("email");
CREATE INDEX IF NOT EXISTS "IDX_users_phone" ON "users" ("phone");
CREATE INDEX IF NOT EXISTS "IDX_categories_parentId" ON "categories" ("parentId");
CREATE INDEX IF NOT EXISTS "IDX_products_categoryId" ON "products" ("categoryId");
CREATE INDEX IF NOT EXISTS "IDX_cart_userId" ON "cart" ("userId");
CREATE INDEX IF NOT EXISTS "IDX_cart_guestToken" ON "cart" ("guestToken");
CREATE INDEX IF NOT EXISTS "IDX_cart_items_cartId" ON "cart_items" ("cartId");
CREATE INDEX IF NOT EXISTS "IDX_cart_items_productId" ON "cart_items" ("productId");
CREATE INDEX IF NOT EXISTS "IDX_wishlist_userId" ON "wishlist" ("userId");
CREATE INDEX IF NOT EXISTS "IDX_orders_userId" ON "orders" ("userId");
CREATE INDEX IF NOT EXISTS "IDX_addresses_userId" ON "addresses" ("userId");
CREATE INDEX IF NOT EXISTS "IDX_payments_orderId" ON "payments" ("orderId");
CREATE INDEX IF NOT EXISTS "IDX_refresh_tokens_userId" ON "refresh_tokens" ("userId");
CREATE INDEX IF NOT EXISTS "IDX_admin_logs_adminId" ON "admin_logs" ("adminId");
CREATE INDEX IF NOT EXISTS "IDX_inventory_movements_productId" ON "inventory_movements" ("productId");
CREATE INDEX IF NOT EXISTS "IDX_order_items_orderId" ON "order_items" ("orderId");
CREATE INDEX IF NOT EXISTS "IDX_order_items_productId" ON "order_items" ("productId");
CREATE INDEX IF NOT EXISTS "IDX_posts_authorId" ON "posts" ("authorId");
CREATE INDEX IF NOT EXISTS "IDX_b2b_requests_userId" ON "b2b_requests" ("userId");
CREATE INDEX IF NOT EXISTS "IDX_b2b_inquiries_userId" ON "b2b_inquiries" ("userId");
CREATE INDEX IF NOT EXISTS "IDX_custom_projects_assigned_to" ON "custom_projects" ("assigned_to");
