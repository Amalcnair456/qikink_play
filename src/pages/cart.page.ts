import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { CartLocators } from '../locators/cart.locators';

export class CartPage extends BasePage {
  readonly locators: CartLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new CartLocators(page);
  }

  async open(productId: number = 6): Promise<void> {
    await this.navigateTo(`/add-cart?from=editor&productId=${productId}`);
    await this.page.waitForTimeout(2000);
  }

  async getProductName(): Promise<string> {
    return this.getText(this.locators.productName);
  }

  async getItemPrice(): Promise<string> {
    return this.getText(this.locators.itemPrice);
  }

  async getQuantity(): Promise<string> {
    await this.locators.quantityInput.waitFor({ state: 'visible' });
    return this.locators.quantityInput.inputValue();
  }

  async setQuantity(qty: number): Promise<void> {
    await this.locators.quantityInput.waitFor({ state: 'visible' });
    await this.locators.quantityInput.clear();
    await this.locators.quantityInput.fill(qty.toString());
    await this.page.waitForTimeout(1000);
  }

  async clickEdit(): Promise<void> {
    await this.click(this.locators.editButton);
  }

  async clickDuplicate(): Promise<void> {
    await this.click(this.locators.duplicateButton);
  }

  async clickBuyNow(): Promise<void> {
    await this.click(this.locators.buyNowButton);
  }

  async clickClearCart(): Promise<void> {
    await this.click(this.locators.clearCartButton);
    await this.page.waitForTimeout(1000);
  }

  async clickDeleteItem(): Promise<void> {
    await this.click(this.locators.deleteButton);
    await this.page.waitForTimeout(1000);
  }

  async clickCheckout(): Promise<void> {
    await this.click(this.locators.checkoutButton);
    await this.page.waitForURL(/checkout/, { timeout: 15000 });
  }

  async getSubtotal(): Promise<string> {
    return this.getText(this.locators.subtotalText);
  }

  async expectCartItemVisible(): Promise<void> {
    await this.expectToBeVisible(this.locators.pageHeading);
    await this.expectToBeVisible(this.locators.productName);
    await this.expectToBeVisible(this.locators.quantityInput);
    await this.expectToBeVisible(this.locators.itemPrice);
  }

  async expectEmptyCart(): Promise<void> {
    await expect(this.locators.subtotalText).toContainText('0 items');
  }
}
