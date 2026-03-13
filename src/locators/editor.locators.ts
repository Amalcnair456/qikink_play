import { Page, Locator } from '@playwright/test';

export class EditorLocators {
  readonly productTitle: Locator;
  readonly designToggle: Locator;
  readonly previewToggle: Locator;

  // Sidebar tools
  readonly productButton: Locator;
  readonly layersButton: Locator;
  readonly uploadsButton: Locator;
  readonly textButton: Locator;
  readonly graphicsButton: Locator;

  // Graphics Kit
  readonly searchCategoryInput: Locator;
  readonly graphicImages: Locator;
  readonly viewMoreButtons: Locator;
  readonly graphicsKitClose: Locator;

  // Product panel
  readonly printingOptionDTG: Locator;
  readonly printingOptionDTF: Locator;
  readonly printingOptionEmbroidery: Locator;
  readonly colorSwatches: Locator;
  readonly sizeButtons: Locator;
  readonly quantitiesAccordion: Locator;

  // Placement buttons
  readonly frontButton: Locator;
  readonly backButton: Locator;
  readonly leftPocketButton: Locator;
  readonly rightPocketButton: Locator;
  readonly leftSleeveButton: Locator;
  readonly rightSleeveButton: Locator;

  // Cart
  readonly addToCartButton: Locator;
  readonly totalPrice: Locator;

  constructor(page: Page) {
    this.productTitle = page.locator('h1, h2').first();
    this.designToggle = page.getByRole('button', { name: 'Design', exact: true });
    this.previewToggle = page.getByRole('button', { name: 'Preview', exact: true });

    // Sidebar tools (desktop — first visible instance)
    this.productButton = page.locator('button.inline-flex.flex-col:has-text("Product")').first();
    this.layersButton = page.locator('button.inline-flex.flex-col:has-text("Layers")').first();
    this.uploadsButton = page.locator('button.inline-flex.flex-col:has-text("Uploads")').first();
    this.textButton = page.locator('button.inline-flex.flex-col:has-text("Text")').first();
    this.graphicsButton = page.locator('button.inline-flex.flex-col:has-text("Graphics")').first();

    // Graphics Kit
    this.searchCategoryInput = page.locator('input[placeholder="Search Category"]').first();
    this.graphicImages = page.locator('img[alt*="graphics/assets"]');
    this.viewMoreButtons = page.getByRole('button', { name: 'View More' });
    this.graphicsKitClose = page.locator('text=Graphics Kit').locator('..').locator('button').first();

    // Product panel
    this.printingOptionDTG = page.getByRole('button', { name: 'DTG', exact: true }).first();
    this.printingOptionDTF = page.getByRole('button', { name: 'DTF', exact: true }).first();
    this.printingOptionEmbroidery = page.getByRole('button', { name: 'Embroidery', exact: true }).first();
    this.colorSwatches = page.locator('button[style*="background-color"]');
    this.sizeButtons = page.locator('button').filter({ hasText: /^(XS|S|M|L|XL|XXL|3XL|4XL|5XL|6XL|7XL)$/ });
    this.quantitiesAccordion = page.getByRole('button', { name: 'Quantities' }).first();

    // Placement buttons
    this.frontButton = page.getByRole('button', { name: 'Front', exact: true }).first();
    this.backButton = page.getByRole('button', { name: 'Back', exact: true }).first();
    this.leftPocketButton = page.getByRole('button', { name: 'Left Pocket' }).first();
    this.rightPocketButton = page.getByRole('button', { name: 'Right Pocket' }).first();
    this.leftSleeveButton = page.getByRole('button', { name: 'Left Sleeve' }).first();
    this.rightSleeveButton = page.getByRole('button', { name: 'Right Sleeve' }).first();

    // Cart
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
    this.totalPrice = page.locator('text=/Total Price.*₹/');
  }
}
