import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  // --- Header / Navigation ---
  readonly logo: Locator;
  readonly homeNav: Locator;
  readonly productNav: Locator;
  readonly aboutUsNav: Locator;
  readonly supportNav: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly cartIcon: Locator;
  readonly loginButton: Locator;
  readonly signUpButton: Locator;

  // --- Hero Section ---
  readonly heroHeading: Locator;
  readonly heroSubtext: Locator;
  readonly designYoursNowButton: Locator;

  constructor(page: Page) {
    super(page);

    // Header
    this.logo = page.locator('header').getByRole('img', { name: /qikink/i }).first();
    this.homeNav = page.getByRole('link', { name: 'Home' }).first();
    this.productNav = page.locator('nav').getByRole('link', { name: 'Product' }).first();
    this.aboutUsNav = page.getByRole('link', { name: 'About Us' }).first();
    this.supportNav = page.getByRole('button', { name: /Support/i }).first();
    this.searchInput = page.getByPlaceholder(/Search Products, Pages, FAQs/i).first();
    this.searchButton = page.locator('button').filter({ has: page.locator('svg') }).first();
    this.cartIcon = page.locator('header a[href*="cart"], header button[aria-label*="cart"]').first();
    this.loginButton = page.getByRole('button', { name: 'Log in' }).first();
    this.signUpButton = page.getByRole('button', { name: 'Sign Up' }).first();

    // Hero
    this.heroHeading = page.getByText("India's Top Print on Demand Partner").first();
    this.heroSubtext = page.getByText('Create, customize, and sell products with zero inventory risks.');
    this.designYoursNowButton = page.getByRole('link', { name: /Design Yours Now/i });
  }

  // --- Actions ---

  async open(): Promise<void> {
    await this.navigateTo('/');
  }

  async clickLogin(): Promise<void> {
    await this.click(this.loginButton);
    // Handle the role selection step: select "Buy for Yourself" then Continue
    const dialog = this.page.locator('[role="dialog"]');
    await dialog.locator('text=Buy for Yourself').first().click();
    await dialog.getByRole('button', { name: 'Continue' }).click();
    await this.page.getByText('Welcome Back', { exact: true }).waitFor({ state: 'visible', timeout: 30000 });
  }

  async clickSignUp(): Promise<void> {
    await this.click(this.signUpButton);
  }

  async clickDesignYoursNow(): Promise<void> {
    await this.click(this.designYoursNowButton);
  }

  async searchFor(query: string): Promise<void> {
    await this.fill(this.searchInput, query);
    await this.searchInput.press('Enter');
  }

  async clickProduct(): Promise<void> {
    await this.click(this.productNav);
  }

  async clickAboutUs(): Promise<void> {
    await this.click(this.aboutUsNav);
  }

  async clickSupport(): Promise<void> {
    await this.click(this.supportNav);
  }

  // --- Assertions ---

  async expectHeroSectionVisible(): Promise<void> {
    await this.expectToBeVisible(this.heroHeading);
    await this.expectToBeVisible(this.designYoursNowButton);
  }

  async expectHeaderVisible(): Promise<void> {
    await this.expectToBeVisible(this.loginButton);
    await this.expectToBeVisible(this.signUpButton);
    await this.expectToBeVisible(this.searchInput);
  }
}
