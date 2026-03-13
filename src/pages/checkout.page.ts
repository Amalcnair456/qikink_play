import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { CheckoutLocators } from '../locators/checkout.locators';

interface DeliveryAddress {
  fullName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
}

export class CheckoutPage extends BasePage {
  readonly locators: CheckoutLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new CheckoutLocators(page);
  }

  async open(): Promise<void> {
    await this.navigateTo('/checkout');
    await this.page.waitForTimeout(2000);
  }

  async fillContactDetails(email: string, phone: string): Promise<void> {
    await this.fill(this.locators.emailInput, email);
    await this.fill(this.locators.phoneInput, phone);
  }

  async fillDeliveryAddress(data: DeliveryAddress): Promise<void> {
    await this.fill(this.locators.fullNameInput, data.fullName);
    await this.fill(this.locators.address1Input, data.address1);
    if (data.address2) {
      await this.fill(this.locators.address2Input, data.address2);
    }
    await this.fill(this.locators.cityInput, data.city);
    await this.selectState(data.state);
    await this.fill(this.locators.countryInput, data.country);
    await this.fillPinCode(data.pinCode);
  }

  async fillFullCheckoutForm(
    contact: { email: string; phone: string },
    address: DeliveryAddress,
  ): Promise<void> {
    await this.fillContactDetails(contact.email, contact.phone);
    await this.fillDeliveryAddress(address);
  }

  async selectState(state: string): Promise<void> {
    await this.locators.stateSelect.waitFor({ state: 'visible' });
    await this.locators.stateSelect.selectOption({ label: state });
  }

  async fillPinCode(pinCode: string): Promise<void> {
    await this.fill(this.locators.pinCodeInput, pinCode);
    await this.page.waitForTimeout(500);
  }

  async getTotal(): Promise<string> {
    return this.getText(this.locators.totalText);
  }

  async clickPayNow(): Promise<void> {
    await this.click(this.locators.payNowButton);
    await this.page.waitForTimeout(1000);
  }

  async expectCheckoutPageVisible(): Promise<void> {
    await this.expectToBeVisible(this.locators.pageHeading);
    await this.expectToBeVisible(this.locators.contactDetailsHeading);
    await this.expectToBeVisible(this.locators.deliveryAddressHeading);
    await this.expectToBeVisible(this.locators.emailInput);
    await this.expectToBeVisible(this.locators.phoneInput);
    await this.expectToBeVisible(this.locators.fullNameInput);
    await this.expectToBeVisible(this.locators.payNowButton);
  }

  async expectOrderSummaryVisible(): Promise<void> {
    await this.expectToBeVisible(this.locators.orderSummaryHeading);
    await this.expectToBeVisible(this.locators.subtotalText);
    await this.expectToBeVisible(this.locators.shippingCharges);
    await this.expectToBeVisible(this.locators.totalText);
  }

  async getErrorMessages(): Promise<string[]> {
    const count = await this.locators.errorMessages.count();
    const messages: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await this.locators.errorMessages.nth(i).textContent();
      if (text) messages.push(text.trim());
    }
    return messages;
  }

  async expectPayNowDisabled(): Promise<void> {
    await expect(this.locators.payNowButton).toBeDisabled();
  }

  async expectPayNowEnabled(): Promise<void> {
    await expect(this.locators.payNowButton).toBeEnabled();
  }
}
