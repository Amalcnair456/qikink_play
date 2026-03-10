import { test, expect } from '../src/fixtures/test.fixture';

test.describe('Product Detail Page', () => {
  test.beforeEach(async ({ productPage }) => {
    await productPage.open();
  });

  test('should display product title', async ({ productPage }) => {
    await productPage.expectToBeVisible(productPage.locators.productTitle);
    const title = await productPage.getProductTitle();
    expect(title.length).toBeGreaterThan(0);
  });

  test('should display product price', async ({ productPage }) => {
    await productPage.expectToBeVisible(productPage.locators.productPrice);
  });

  test('should display product image', async ({ productPage }) => {
    await productPage.expectToBeVisible(productPage.locators.productImage);
  });

  test('should display printing options', async ({ productPage }) => {
    await productPage.expectToBeVisible(productPage.locators.printingOptions);
  });

  
  test('should display color swatches', async ({ productPage }) => {
    const colorCount = await productPage.getColorCount();
    expect(colorCount).toBeGreaterThan(0);
  });

  test('should allow selecting a color', async ({ productPage }) => {
    const colorCount = await productPage.getColorCount();
    if (colorCount > 1) {
      await productPage.selectColor(1);
      // Should not throw — color selected successfully
    }
  });

  test('should display breadcrumb navigation', async ({ productPage }) => {
    await productPage.expectToBeVisible(productPage.locators.breadcrumb);
  });

  test('should display FAQ section', async ({ productPage, page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    await productPage.expectToBeVisible(productPage.locators.faqSection);
  });

  test('should display reviews section', async ({ productPage, page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    await productPage.expectToBeVisible(productPage.locators.reviewsSection);
  });
});

test.describe('Product Listing Page', () => {
  test('should display products on listing page', async ({ productPage, page }) => {
    await productPage.navigateTo('/print-on-demand-products');
    await page.waitForLoadState('domcontentloaded');
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });

  test('should have product cards on listing page', async ({ productPage, page }) => {
    await productPage.navigateTo('/print-on-demand-products');
    await page.waitForLoadState('domcontentloaded');
    const productCards = page.locator('a[href*="product"]').filter({ hasText: /.+/ });
    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should navigate to product detail from listing', async ({ productPage, page }) => {
    await productPage.navigateTo('/print-on-demand-products');
    await page.waitForLoadState('domcontentloaded');
    const productLink = page.locator('a[href*="/product/"]').first();
    if (await productLink.isVisible()) {
      await productLink.click();
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(/\/product\//i);
    }
  });
});
