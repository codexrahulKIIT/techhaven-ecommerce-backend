import { test as base, expect } from '@playwright/test';
import { AdminLoginPage, LoginPage, RegisterPage } from '../pages/AuthPage';
import {
  AdminProductFormPage,
  AdminProductsPage,
  AdminOrdersPage,
  CartPage,
  CheckoutPage,
  DashboardPage,
  OrderDetailsPage,
  OrdersPage,
  ShopPage,
} from '../pages/StorePage';

type Pages = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  adminLoginPage: AdminLoginPage;
  shopPage: ShopPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  dashboardPage: DashboardPage;
  ordersPage: OrdersPage;
  orderDetailsPage: OrderDetailsPage;
  adminOrdersPage: AdminOrdersPage;
  adminProductsPage: AdminProductsPage;
  adminProductFormPage: AdminProductFormPage;
};

export const test = base.extend<Pages>({
  page: async ({ page }, use) => {
    await page.context().clearCookies();
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await use(page);
  },

  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  registerPage: async ({ page }, use) => use(new RegisterPage(page)),
  adminLoginPage: async ({ page }, use) => use(new AdminLoginPage(page)),
  shopPage: async ({ page }, use) => use(new ShopPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  dashboardPage: async ({ page }, use) => use(new DashboardPage(page)),
  ordersPage: async ({ page }, use) => use(new OrdersPage(page)),
  orderDetailsPage: async ({ page }, use) => use(new OrderDetailsPage(page)),
  adminOrdersPage: async ({ page }, use) => use(new AdminOrdersPage(page)),
  adminProductsPage: async ({ page }, use) => use(new AdminProductsPage(page)),
  adminProductFormPage: async ({ page }, use) => use(new AdminProductFormPage(page)),
});

export { expect };

export function createTestUser(projectName: string) {
  const slug = projectName.replace(/\s+/g, '-').toLowerCase();
  const timestamp = Date.now();

  return {
    firstName: 'Playwright',
    lastName: 'User',
    email: `pw-${slug}-${timestamp}@example.com`,
    phone: `9${timestamp.toString().slice(-9)}`,
    password: 'Password123!',
  };
}

export const SEEDED_USER = {
  email: 'user@techhaven.com',
  password: 'userpassword',
} as const;

export const ADMIN_USER = {
  email: 'admin@techhaven.com',
  password: 'adminpassword',
} as const;

export const ORDER_USER = {
  email: 'test3@example.com',
  password: 'password',
} as const;
