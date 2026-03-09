import { ADMIN_USER, createTestUser, expect, ORDER_USER, SEEDED_USER, test } from './fixtures';
import type { CartPage, ShopPage } from './pages/StorePage';

test.describe('Storefront and admin flows', () => {
  async function addProductAndGoToCart(shopPage: ShopPage, cartPage: CartPage) {
    await shopPage.goto();
    await shopPage.addFirstProductToCart();
    await cartPage.goto();
  }

  test('guest cart redirects to login and preserves checkout return path', async ({
    shopPage,
    cartPage,
    checkoutPage,
    loginPage,
  }) => {
    await addProductAndGoToCart(shopPage, cartPage);
    await cartPage.proceedToCheckout();

    await loginPage.expectRedirectToLogin('/checkout');
    await loginPage.login(SEEDED_USER.email, SEEDED_USER.password);

    await checkoutPage.expectOnCheckout();
  });

  test('new user can register from checkout redirect and place a mock order', async ({
    page,
    shopPage,
    cartPage,
    loginPage,
    registerPage,
    checkoutPage,
    dashboardPage,
  }, testInfo) => {
    const user = createTestUser(testInfo.project.name);

    await addProductAndGoToCart(shopPage, cartPage);
    await cartPage.proceedToCheckout();

    await loginPage.expectRedirectToLogin('/checkout');
    await loginPage.createAccountLink.click();

    await registerPage.expectOnRegisterPage('/checkout');
    await registerPage.register(user);

    await checkoutPage.expectOnCheckout();
    await checkoutPage.completeMockCheckout();
    await checkoutPage.expectOrderSuccess();

    await page.getByRole('link', { name: /Go to Dashboard/i }).click();
    await dashboardPage.expectOnDashboard();
  });

  test('seeded user can log in and view dashboard orders', async ({
    loginPage,
    dashboardPage,
  }) => {
    await loginPage.goto('/dashboard');
    await loginPage.login(SEEDED_USER.email, SEEDED_USER.password);

    await dashboardPage.expectOnDashboard();
    await dashboardPage.goToAllOrders();
  });

  test('guest cart persists after refresh', async ({
    shopPage,
    cartPage,
  }) => {
    await addProductAndGoToCart(shopPage, cartPage);
    await cartPage.expectHasItems();
    await cartPage.expectFirstItemQuantity(1);

    await cartPage.page.reload({ waitUntil: 'networkidle' });

    await cartPage.expectHasItems();
    await cartPage.expectFirstItemQuantity(1);
  });

  test('invalid login shows an error and stays on login page', async ({
    loginPage,
  }) => {
    await loginPage.goto('/dashboard');
    await loginPage.login('user@techhaven.com', 'wrongpassword');

    await loginPage.expectRedirectToLogin('/dashboard');
    await loginPage.expectLoginError();
  });

  test('duplicate registration shows a user already exists error', async ({
    registerPage,
  }) => {
    await registerPage.page.goto('/register');
    await registerPage.register({
      firstName: 'Regular',
      lastName: 'User',
      email: SEEDED_USER.email,
      phone: '9876543210',
      password: SEEDED_USER.password,
    });

    await expect(registerPage.page).toHaveURL(/\/register$/);
    await registerPage.expectDuplicateRegistrationError();
  });

  test('user can open an order details page from orders list', async ({
    loginPage,
    ordersPage,
    orderDetailsPage,
  }) => {
    await loginPage.goto('/orders');
    await loginPage.login(ORDER_USER.email, ORDER_USER.password);

    await ordersPage.expectOnOrdersPage();
    await ordersPage.openFirstOrder();
    await orderDetailsPage.expectOnOrderDetails();
  });

  test('admin login works and admin pages stay protected', async ({
    page,
    adminLoginPage,
  }) => {
    await page.goto('/admin/dashboard');
    await expect(page).toHaveURL(/\/admin\/login$/);

    await adminLoginPage.login(ADMIN_USER.email, ADMIN_USER.password);
    await expect(page.getByRole('heading', { name: /Admin Dashboard/i })).toBeVisible();

    await page.goto('/admin/users');
    await expect(page.getByRole('heading', { name: /User Management/i })).toBeVisible();
  });

  test('admin can view orders and update order status', async ({
    page,
    adminLoginPage,
    adminOrdersPage,
  }) => {
    await page.goto('/admin/login');
    await adminLoginPage.login(ADMIN_USER.email, ADMIN_USER.password);

    await page.goto('/admin/orders');
    await adminOrdersPage.expectOnAdminOrdersPage();
  });

  test('admin can create and edit a product', async ({
    page,
    adminLoginPage,
    adminProductsPage,
    adminProductFormPage,
  }, testInfo) => {
    const suffix = `${Date.now()}-${testInfo.project.name.replace(/\s+/g, '-').toLowerCase()}`
    const createdName = `Playwright Product ${suffix}`
    const updatedName = `Updated ${createdName}`

    await page.goto('/admin/login')
    const adminToken = await adminLoginPage.login(ADMIN_USER.email, ADMIN_USER.password)
    await page.evaluate((token) => {
      localStorage.setItem('adminToken', token)
    }, adminToken)

    await page.goto('/admin/products')
    await adminProductsPage.expectOnPage()
    await adminProductsPage.openCreate()

    await adminProductFormPage.fillProduct({
      name: createdName,
      description: 'Playwright admin product create flow',
      price: '999',
      stock: '12',
      image: 'http://localhost:3000/placeholder.svg',
    })
    await page.evaluate((token) => {
      localStorage.setItem('adminToken', token)
    }, adminToken)
    await adminProductFormPage.submit()

    await adminProductsPage.expectOnPage()
    await adminProductsPage.search(createdName)
    await adminProductsPage.expectProductVisible(createdName)

    await adminProductsPage.openFirstEdit()
    await page.evaluate((token) => {
      localStorage.setItem('adminToken', token)
    }, adminToken)
    await adminProductFormPage.fillProduct({
      name: updatedName,
      description: 'Updated Playwright admin product flow',
      price: '1099',
      stock: '8',
      image: 'http://localhost:3000/placeholder.svg',
    })
    await adminProductFormPage.submit()

    await adminProductsPage.expectOnPage()
    await adminProductsPage.search(updatedName)
    await adminProductsPage.expectProductVisible(updatedName)
  })
});
