import { Page, Locator } from '@playwright/test';

/**
 * Locators specific to the Home page (hero section, etc.).
 */
export class HomeLocators {
  readonly heroHeading: Locator;
  readonly heroSubtext: Locator;
  readonly designYoursNowButton: Locator;

  constructor(page: Page) {
    this.heroHeading = page.getByText("India's Top Print on Demand Partner").first();
    this.heroSubtext = page.getByText('Create, customize, and sell products with zero inventory risks.');
    this.designYoursNowButton = page.getByRole('link', { name: /Design Yours Now/i });
  }
}
