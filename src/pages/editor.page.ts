import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { EditorLocators } from '../locators/editor.locators';

export class EditorPage extends BasePage {
  readonly locators: EditorLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new EditorLocators(page);
  }

  async open(productId: number = 6): Promise<void> {
    await this.navigateTo(`/product/${productId}/editor`);
    await this.page.waitForTimeout(3000);
  }

  async openGraphicsKit(): Promise<void> {
    await this.click(this.locators.graphicsButton);
    await this.page.waitForTimeout(2000);
  }

  async selectFirstGraphic(): Promise<void> {
    await this.locators.graphicImages.first().waitFor({ state: 'visible' });
    await this.locators.graphicImages.first().click();
    await this.page.waitForTimeout(2000);
  }

  async selectGraphicByIndex(index: number): Promise<void> {
    await this.locators.graphicImages.nth(index).waitFor({ state: 'visible' });
    await this.locators.graphicImages.nth(index).click();
    await this.page.waitForTimeout(2000);
  }

  async waitForPriceCalculation(): Promise<void> {
    await this.page.waitForFunction(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(
        b => b.textContent?.includes('Add to Cart')
      );
      return btn && !btn.disabled;
    }, { timeout: 20000 });
  }

  async getTotalPrice(): Promise<string> {
    return this.getText(this.locators.totalPrice);
  }

  async clickAddToCart(): Promise<void> {
    await this.click(this.locators.addToCartButton);
    await this.page.waitForURL(/add-cart/, { timeout: 30000 });
  }

  async addGraphicAndGoToCart(): Promise<void> {
    await this.openGraphicsKit();
    await this.selectFirstGraphic();
    await this.waitForPriceCalculation();
    await this.clickAddToCart();
  }

  async selectPrintingOption(option: 'DTG' | 'DTF' | 'Embroidery'): Promise<void> {
    await this.openProductPanel();
    const locator = {
      DTG: this.locators.printingOptionDTG,
      DTF: this.locators.printingOptionDTF,
      Embroidery: this.locators.printingOptionEmbroidery,
    }[option];
    await this.click(locator);
  }

  async selectPlacement(placement: string): Promise<void> {
    const btn = this.page.getByRole('button', { name: placement, exact: true }).first();
    await this.click(btn);
  }

  async openProductPanel(): Promise<void> {
    // Product panel may already be open — only click if not visible
    const panelVisible = await this.page.getByText('Product Information').first().isVisible();
    if (!panelVisible) {
      await this.click(this.locators.productButton);
      await this.page.waitForTimeout(2000);
    }
    await this.page.getByText('Product Information').first().waitFor({ state: 'visible', timeout: 10000 });
  }

  async expectEditorLoaded(): Promise<void> {
    await this.expectToBeVisible(this.locators.productTitle);
    await this.expectToBeVisible(this.locators.graphicsButton);
    await this.expectToBeVisible(this.locators.addToCartButton);
  }
}
