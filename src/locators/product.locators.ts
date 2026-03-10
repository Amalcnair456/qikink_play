import { Page, Locator } from '@playwright/test';

export class ProductLocators {
  readonly breadcrumb: Locator;
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly printingOptions: Locator;
  readonly colorSwatches: Locator;
  readonly sizeOptions: Locator;
  readonly pricingTable: Locator;
  readonly faqSection: Locator;
  readonly reviewsSection: Locator;
  readonly productImage: Locator;
  readonly designNowButton: Locator;

  constructor(page: Page) {
    this.breadcrumb = page.locator('div.flex.items-center.gap-1:has(a[href="/category"])').first();
    this.productTitle = page.locator('h1').first();
    this.productPrice = page.getByText(/[₹]\s*\d+/i).first();
    this.printingOptions = page.getByText(/DTG|DTF|Embroidery/i).first();
    this.colorSwatches = page.locator('div.flex.flex-wrap.gap-3 button[style*="background-color"]');
    this.sizeOptions = page.locator('[class*="size"] button, [class*="Size"] button').filter({ hasText: /^(XS|S|M|L|XL|XXL|2XL|3XL)$/i });
    this.pricingTable = page.locator('table, [class*="pricing"], [class*="Pricing"]').first();
    this.faqSection = page.getByText(/FAQ|Frequently Asked/i).first();
    this.reviewsSection = page.getByText(/Review|Rating/i).first();
    this.productImage = page.locator('img[alt="Product main image"]').first();
    this.designNowButton = page.getByRole('link', { name: /Design.*Now|Start.*Design/i }).first();
  }
}
