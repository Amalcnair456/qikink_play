import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { ProductLocators } from '../locators/product.locators';

export class ProductPage extends BasePage {
  readonly locators: ProductLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new ProductLocators(page);
  }

  async open(slug: string = '/product/unisex-t-shirts-classic'): Promise<void> {
    await this.navigateTo(slug);
  }

  async getProductTitle(): Promise<string> {
    return this.getText(this.locators.productTitle);
  }

  async getColorCount(): Promise<number> {
    return this.locators.colorSwatches.count();
  }

  async selectColor(index: number): Promise<void> {
    await this.locators.colorSwatches.nth(index).click();
  }

  async expectProductDetailsVisible(): Promise<void> {
    await this.expectToBeVisible(this.locators.productTitle);
    await this.expectToBeVisible(this.locators.productPrice);
    await this.expectToBeVisible(this.locators.productImage);
  }
}
