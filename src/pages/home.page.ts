import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { HeaderLocators } from '../locators/header.locators';
import { HomeLocators } from '../locators/home.locators';

export class HomePage extends BasePage {
  readonly header: HeaderLocators;
  readonly home: HomeLocators;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderLocators(page);
    this.home = new HomeLocators(page);
  }

  // --- Actions ---

  async open(): Promise<void> {
    await this.navigateTo('/');
  }

  async clickLogin(): Promise<void> {
    await this.click(this.header.loginButton);
    // Handle the role selection step: select "Buy for Yourself" then Continue
    const dialog = this.page.locator('[role="dialog"]');
    await dialog.locator('text=Buy for Yourself').first().click();
    await dialog.getByRole('button', { name: 'Continue' }).click();
    await this.page.getByText('Welcome Back', { exact: true }).waitFor({ state: 'visible', timeout: 30000 });
  }

  async clickSignUp(): Promise<void> {
    // Sign up for "Buy for Yourself" is accessed through the login dialog
    await this.click(this.header.loginButton);
    const dialog = this.page.locator('[role="dialog"]');
    await dialog.locator('text=Buy for Yourself').first().click();
    await dialog.getByRole('button', { name: 'Continue' }).click();
    await this.page.getByText('Welcome Back', { exact: true }).waitFor({ state: 'visible', timeout: 30000 });
    // Click "Sign Up" link inside the login dialog ("New Here? Sign Up")
    await dialog.getByRole('button', { name: 'Sign Up' }).click();
    await dialog.getByText(/create.*account/i).first().waitFor({ state: 'visible', timeout: 30000 });
  }

  async clickDesignYoursNow(): Promise<void> {
    await this.click(this.home.designYoursNowButton);
  }

  async searchFor(query: string): Promise<void> {
    await this.fill(this.header.searchInput, query);
    await this.header.searchInput.press('Enter');
  }

  async clickProduct(): Promise<void> {
    await this.click(this.header.productNav);
  }

  async clickAboutUs(): Promise<void> {
    await this.click(this.header.aboutUsNav);
  }

  async clickSupport(): Promise<void> {
    await this.click(this.header.supportNav);
  }

  // --- Assertions ---

  async expectHeroSectionVisible(): Promise<void> {
    await this.expectToBeVisible(this.home.heroHeading);
    await this.expectToBeVisible(this.home.designYoursNowButton);
  }

  async expectHeaderVisible(): Promise<void> {
    await this.expectToBeVisible(this.header.loginButton);
    await this.expectToBeVisible(this.header.signUpButton);
    await this.expectToBeVisible(this.header.searchInput);
  }
}
