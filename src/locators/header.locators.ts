import { Page, Locator } from '@playwright/test';

/**
 * Shared header/navigation locators used across multiple pages.
 */
export class HeaderLocators {
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

  constructor(page: Page) {
    this.logo = page.locator('header').getByRole('img', { name: /qikink/i }).first();
    this.homeNav = page.getByRole('link', { name: 'Home' }).first();
    this.productNav = page.locator('nav').getByRole('link', { name: 'Product' }).first();
    this.aboutUsNav = page.getByRole('link', { name: 'About Us' }).first();
    this.supportNav = page.locator('header button, nav button').filter({ hasText: /^(Resources|Support|How it works)$/i }).first();
    this.searchInput = page.getByPlaceholder(/Search Products, Pages, FAQs/i).first();
    this.searchButton = page.locator('button').filter({ has: page.locator('svg') }).first();
    this.cartIcon = page.locator('header a[href*="cart"], header button[aria-label*="cart"]').first();
    this.loginButton = page.getByRole('button', { name: 'Log in' }).first();
    this.signUpButton = page.getByRole('button', { name: 'Sign Up' }).first();
  }
}
