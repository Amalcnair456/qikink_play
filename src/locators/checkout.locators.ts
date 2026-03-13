import { Page, Locator } from '@playwright/test';

export class CheckoutLocators {
  readonly pageHeading: Locator;
  readonly countdownTimer: Locator;
  readonly backButton: Locator;

  // Contact Details
  readonly contactDetailsHeading: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;

  // Delivery Address
  readonly deliveryAddressHeading: Locator;
  readonly fullNameInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly cityInput: Locator;
  readonly stateSelect: Locator;
  readonly countryInput: Locator;
  readonly pinCodeInput: Locator;

  // Payment
  readonly paymentMethodHeading: Locator;
  readonly payNowButton: Locator;

  // Order Summary
  readonly orderSummaryHeading: Locator;
  readonly subtotalText: Locator;
  readonly shippingCharges: Locator;
  readonly taxCharges: Locator;
  readonly totalText: Locator;

  // Errors
  readonly errorMessages: Locator;

  constructor(page: Page) {
    this.pageHeading = page.getByRole('heading', { name: 'Secure Checkout' });
    this.countdownTimer = page.locator('text=/\\d{2}:\\d{2}/').first();
    this.backButton = page.locator('button:has(svg), a:has(svg)').first();

    // Contact Details
    this.contactDetailsHeading = page.getByText('Contact Details');
    this.emailInput = page.locator('#email');
    this.phoneInput = page.locator('#phone');

    // Delivery Address
    this.deliveryAddressHeading = page.getByText('Delivery Address');
    this.fullNameInput = page.locator('#fullName');
    this.address1Input = page.locator('#address1');
    this.address2Input = page.locator('#address2');
    this.cityInput = page.locator('#city');
    this.stateSelect = page.locator('#state');
    this.countryInput = page.locator('#country');
    this.pinCodeInput = page.locator('#pinCode');

    // Payment
    this.paymentMethodHeading = page.getByText('Payment Method');
    this.payNowButton = page.getByRole('button', { name: 'Pay Now' });

    // Order Summary
    this.orderSummaryHeading = page.getByText(/Subtotal/).first();
    this.subtotalText = page.getByText(/Subtotal/).first();
    this.shippingCharges = page.getByText(/Shipping Charges/).first();
    this.taxCharges = page.getByText(/Tax Charges/).first();
    this.totalText = page.getByText(/^Total:/).first();

    // Errors
    this.errorMessages = page.locator('[role="alert"], [class*="error"], [class*="Error"]');
  }
}
