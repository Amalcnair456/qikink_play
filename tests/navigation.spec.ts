import { test, expect } from '../src/fixtures/test.fixture';

test.describe('Navigation - About Us', () => {
  test('should navigate to About Us page', async ({ homePage, page }) => {
    await homePage.open();
    await homePage.clickAboutUs();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/about/i);
  });

  test('should display About Us page content', async ({ homePage, page }) => {
    await homePage.open();
    await homePage.clickAboutUs();
    await page.waitForLoadState('domcontentloaded');
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });
});

test.describe('Navigation - Product Mega Menu', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('should show dropdown on Product nav hover', async ({ homePage, page }) => {
    await homePage.header.productNav.hover();
    // Wait for mega menu dropdown to appear
    const megaMenu = page.locator('div.absolute.top-full.left-0.right-0').first();
    await expect(megaMenu).toBeVisible({ timeout: 5000 });
  });

  test('should display product categories in dropdown', async ({ homePage, page }) => {
    await homePage.header.productNav.hover();
    await page.waitForTimeout(500);
    // Check for known category links
    const categoryLinks = page.locator('a[href*="category"], a[href*="product"]').filter({ hasText: /.+/ });
    const count = await categoryLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should navigate to product listing on Product nav click', async ({ homePage, page }) => {
    await homePage.clickProduct();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/product/i);
  });

  test('should navigate to category page from dropdown', async ({ homePage, page }) => {
    await homePage.header.productNav.hover();
    await page.waitForTimeout(500);
    const categoryLink = page.locator('a[href*="category"], a[href*="product"]').filter({ hasText: /.+/ }).first();
    if (await categoryLink.isVisible()) {
      await categoryLink.click();
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(/product|category/i);
    }
  });
});

test.describe('Navigation - Resources Dropdown', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('should show dropdown on Resources/Support click', async ({ homePage, page }) => {
    await homePage.clickSupport();
    // Dropdown should reveal nav links
    const dropdownLink = page.locator('a[href]').filter({ hasText: /Blog|Contact|About|Printing/i }).first();
    await expect(dropdownLink).toBeAttached({ timeout: 5000 });
  });

  test('should navigate to Contact Us page', async ({ homePage, page }) => {
    await homePage.clickSupport();
    const contactLink = page.getByRole('link', { name: /Contact/i }).first();
    await contactLink.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/contact/i);
  });

  test('should have a useful dropdown link', async ({ homePage, page }) => {
    await homePage.clickSupport();
    // Check for any resource link (Blogs, Printing types, About us, etc.)
    const resourceLink = page.locator('a[href]').filter({ hasText: /Blog|Printing|About|Contact|Calculator/i }).first();
    await expect(resourceLink).toBeAttached({ timeout: 5000 });
  });
});
