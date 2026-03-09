import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly createAccountLink: Locator;
  readonly loginHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"]').first();
    this.passwordInput = page.locator('input[name="password"]').first();
    this.submitButton = page.getByRole('button', { name: /^Sign In$/i });
    this.createAccountLink = page.getByRole('link', { name: 'Create one', exact: true });
    this.loginHeading = page.getByRole('heading', { name: 'Sign In', exact: true });
  }

  async goto(redirectPath?: string) {
    const url = redirectPath ? `/login?redirect=${encodeURIComponent(redirectPath)}` : '/login';
    await this.page.goto(url);
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectRedirectToLogin(redirectPath = '/checkout') {
    const escapedRedirectPath = redirectPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const encodedRedirectPath = encodeURIComponent(redirectPath).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    await expect(this.page).toHaveURL(
      new RegExp(`\\/login\\?redirect=(${escapedRedirectPath}|${encodedRedirectPath})$`)
    );
    await expect(this.loginHeading).toBeVisible();
  }

  async expectLoginError() {
    await expect(this.page.getByText(/Invalid email or password/i).first()).toBeVisible();
  }
}

export class RegisterPage {
  readonly page: Page;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registerButton = page.getByRole('button', { name: /^REGISTER$/i });
  }

  async expectOnRegisterPage(redirectPath?: string) {
    if (redirectPath) {
      await expect(this.page).toHaveURL(
        new RegExp(`/register\\?redirect=${encodeURIComponent(redirectPath)}`.replace(/\//g, '\\/'))
      );
      return;
    }

    await expect(this.page).toHaveURL(/\/register/);
  }

  async register(user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) {
    await this.page.fill('input[name="firstName"]', user.firstName);
    await this.page.fill('input[name="lastName"]', user.lastName);
    await this.page.fill('input[name="email"]', user.email);
    await this.page.fill('input[name="phone"]', user.phone);
    await this.page.fill('input[name="password"]', user.password);
    await this.page.fill('input[name="confirmPassword"]', user.password);
    await this.page.check('input[name="acceptTerms"]');
    await this.registerButton.click();
  }

  async expectDuplicateRegistrationError() {
    await expect(this.page.getByText(/User already exists/i).first()).toBeVisible();
  }
}

export class AdminLoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(email: string, password: string) {
    await this.page.fill('input[type="email"]', email);
    await this.page.fill('input[type="password"]', password);
    await this.page.getByRole('button', { name: /Sign In as Admin/i }).click();

    await expect(this.page).toHaveURL(/\/admin\/dashboard$/);

    const token = await this.page.evaluate(() => localStorage.getItem('adminToken'));
    if (!token) {
      throw new Error('Admin token was not stored after login');
    }

    return token;
  }
}
