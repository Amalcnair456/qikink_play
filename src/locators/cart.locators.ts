import { Page, Locator } from '@playwright/test';

export class CartLocators {
  readonly pageHeading: Locator;
  readonly productImage: Locator;
  readonly productName: Locator;
  readonly sizeLabel: Locator;
  readonly colorLabel: Locator;
  readonly quantityInput: Locator;
  readonly itemPrice: Locator;
  readonly editButton: Locator;
  readonly duplicateButton: Locator;
  readonly buyNowButton: Locator;
  readonly deleteButton: Locator;
  readonly clearCartButton: Locator;
  readonly addAnotherProduct: Locator;
  readonly orderSummary: Locator;
  readonly subtotalText: Locator;
  readonly checkoutButton: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    this.pageHeading = page.locator('h2').filter({ hasText: 'Add to Cart' });
    this.productImage = page.locator('img[alt*="product"], img[alt*="Product"]').first();
    this.productName = page.locator('div.font-heading.font-semibold').first();
    this.sizeLabel = page.locator('label:has-text("Size:")').first();
    this.colorLabel = page.locator('label:has-text("Color:")').first();
    this.quantityInput = page.locator('input[type="number"]').first();
    this.itemPrice = page.locator('h2, h3').filter({ hasText: /₹/ }).first();
    this.editButton = page.getByRole('button', { name: 'Edit', exact: true });
    this.duplicateButton = page.getByRole('button', { name: 'Duplicate', exact: true });
    this.buyNowButton = page.getByRole('button', { name: 'Buy Now' });
    this.deleteButton = page.locator('button[aria-label*="delete"], button:has(svg)').filter({ hasText: '' }).first();
    this.clearCartButton = page.getByRole('button', { name: 'Clear Cart' });
    this.addAnotherProduct = page.getByText('Add Another Product');
    this.orderSummary = page.getByText('Order Summary');
    this.subtotalText = page.getByText(/Subtotal.*items.*₹/);
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.backButton = page.locator('button:has(svg), a:has(svg)').first();
  }
}
