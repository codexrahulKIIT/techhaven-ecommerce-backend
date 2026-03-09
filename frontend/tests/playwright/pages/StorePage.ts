import { expect, type Locator, type Page } from '@playwright/test';

export class ShopPage {
  readonly page: Page;
  readonly firstProductAddButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstProductAddButton = page
      .locator('[data-testid="product-card"]')
      .first()
      .locator('button:has-text("Add to Cart")');
  }

  async goto() {
    await this.page.goto('/shop', { waitUntil: 'networkidle' });
  }

  async addFirstProductToCart() {
    await this.firstProductAddButton.click();
  }
}

export class CartPage {
  readonly page: Page;
  readonly proceedToCheckoutButton: Locator;
  readonly cartHeading: Locator;
  readonly firstQuantityBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.proceedToCheckoutButton = page.getByRole('button', { name: /Proceed to Checkout/i });
    this.cartHeading = page.locator('h1').filter({ hasText: /Shopping Cart/i });
    this.firstQuantityBadge = page.locator('span.px-3.py-1.bg-gray-100.rounded').first();
  }

  async goto() {
    await this.page.goto('/cart');
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }

  async expectHasItems() {
    await expect(this.cartHeading).toBeVisible();
    await expect(this.proceedToCheckoutButton).toBeVisible();
  }

  async expectFirstItemQuantity(quantity: number) {
    await expect(this.firstQuantityBadge).toHaveText(String(quantity));
  }
}

export class CheckoutPage {
  readonly page: Page;
  readonly orderSummaryText: Locator;
  readonly continueToPaymentButton: Locator;
  readonly mockPaymentRadio: Locator;
  readonly reviewOrderButton: Locator;
  readonly placeOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderSummaryText = page.getByText('Order Summary');
    this.continueToPaymentButton = page.getByRole('button', { name: /Continue to Payment/i });
    this.mockPaymentRadio = page.locator('input[name="paymentProvider"][value="mock"]');
    this.reviewOrderButton = page.getByRole('button', { name: /Review Order/i });
    this.placeOrderButton = page.getByRole('button', { name: /Place Order/i });
  }

  async expectOnCheckout() {
    await expect(this.page).toHaveURL(/\/checkout$/);
    await expect(this.orderSummaryText).toBeVisible();
  }

  async completeMockCheckout() {
    await this.continueToPaymentButton.click();
    await this.mockPaymentRadio.check();
    await this.reviewOrderButton.click();
    await this.placeOrderButton.click();
  }

  async expectOrderSuccess() {
    await expect(this.page).toHaveURL(/\/order-success\//, { timeout: 30000 });
    await expect(this.page.getByRole('heading', { name: /Order Placed Successfully!/i })).toBeVisible();
  }
}

export class DashboardPage {
  readonly page: Page;
  readonly recentOrdersText: Locator;
  readonly viewAllLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.recentOrdersText = page.getByText(/Recent Orders/i);
    this.viewAllLink = page.getByRole('link', { name: /View All/i });
  }

  async expectOnDashboard() {
    await expect(this.page).toHaveURL(/\/dashboard$/);
    await expect(this.recentOrdersText).toBeVisible();
  }

  async goToAllOrders() {
    await this.viewAllLink.click();
    await expect(this.page).toHaveURL(/\/orders$/);
    await expect(this.page.getByRole('heading', { name: /My Orders/i })).toBeVisible();
  }
}

export class OrdersPage {
  readonly page: Page;
  readonly ordersHeading: Locator;
  readonly firstOrderLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ordersHeading = page.getByRole('heading', { name: /My Orders/i });
    this.firstOrderLink = page.locator('a[href^="/orders/"]').first();
  }

  async expectOnOrdersPage() {
    await expect(this.page).toHaveURL(/\/orders$/);
    await expect(this.ordersHeading).toBeVisible();
  }

  async openFirstOrder() {
    await this.firstOrderLink.click();
  }
}

export class OrderDetailsPage {
  readonly page: Page;
  readonly orderHeading: Locator;
  readonly backToOrdersLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderHeading = page.getByRole('heading', { name: /Order #/i });
    this.backToOrdersLink = page.getByRole('link', { name: /Back to orders/i });
  }

  async expectOnOrderDetails() {
    await expect(this.page).toHaveURL(/\/orders\/.+/);
    await expect(this.orderHeading).toBeVisible();
    await expect(this.page.getByText(/Status:/i)).toBeVisible();
    await expect(this.page.getByText(/Payment:/i)).toBeVisible();
    await expect(this.page.getByText(/Total:/i)).toBeVisible();
  }
}

export class AdminOrdersPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly firstStatusSelect: Locator;
  readonly firstOrderIdCell: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: /Manage Orders/i });
    this.firstStatusSelect = page.locator('tbody tr select').first();
    this.firstOrderIdCell = page.locator('tbody tr td').first();
  }

  async expectOnAdminOrdersPage() {
    await expect(this.page).toHaveURL(/\/admin\/orders$/);
    await expect(this.heading).toBeVisible();
    await expect(this.firstStatusSelect).toBeVisible();
  }
}

export class AdminProductsPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly addProductLink: Locator;
  readonly searchInput: Locator;
  readonly firstEditLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: /Products Management/i });
    this.addProductLink = page.getByRole('link', { name: /Add Product/i });
    this.searchInput = page.getByPlaceholder(/Search products/i);
    this.firstEditLink = page.locator('a[href*="/admin/products/edit/"]').first();
  }

  async expectOnPage() {
    await expect(this.page).toHaveURL(/\/admin\/products$/);
    await expect(this.heading).toBeVisible();
  }

  async search(name: string) {
    await this.searchInput.fill(name);
  }

  async expectProductVisible(name: string) {
    await expect(this.page.getByText(name).first()).toBeVisible();
  }

  async openCreate() {
    await this.addProductLink.click();
  }

  async openFirstEdit() {
    await this.firstEditLink.click();
  }
}

export class AdminProductFormPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly descriptionInput: Locator;
  readonly priceInput: Locator;
  readonly stockInput: Locator;
  readonly categorySelect: Locator;
  readonly imageInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('input[name="name"]');
    this.descriptionInput = page.locator('textarea[name="description"]');
    this.priceInput = page.locator('input[name="price"]');
    this.stockInput = page.locator('input[name="stock"]');
    this.categorySelect = page.locator('select[name="categoryId"]');
    this.imageInput = page.locator('input[type="url"]');
    this.submitButton = page.getByRole('button', {
      name: /Create Product|Update Product/i,
    });
  }

  async fillProduct(payload: {
    name: string;
    description: string;
    price: string;
    stock: string;
    image?: string;
  }) {
    await this.nameInput.fill(payload.name);
    await this.descriptionInput.fill(payload.description);
    await this.priceInput.fill(payload.price);
    await this.stockInput.fill(payload.stock);
    const firstCategoryValue = await this.categorySelect.locator('option').nth(1).getAttribute('value');
    if (!firstCategoryValue) {
      throw new Error('No admin product category option is available');
    }
    await this.categorySelect.selectOption(firstCategoryValue);
    if (payload.image) {
      await this.imageInput.fill(payload.image);
    }
  }

  async submit() {
    await this.submitButton.click();
  }
}
