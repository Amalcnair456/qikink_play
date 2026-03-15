import { test, expect } from '../src/fixtures/test.fixture';

test.describe('Home Page', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('should display the hero section', async ({ homePage }) => {
    await homePage.expectHeroSectionVisible();
  });

  test('should have the correct document title', async ({ page }) => {
    await expect(page).toHaveTitle(/qikink|print on demand/i);
  });

  test('should navigate to Design Yours Now page', async ({ homePage, page }) => {
    await homePage.clickDesignYoursNow();
    await expect(page).toHaveURL(/new-products|category/i);
  });

  test('should display the header elements', async ({ homePage }) => {
    await homePage.expectHeaderVisible();
  });
});

test.describe('Home Page - Header & Logo', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('should display the Qikink logo', async ({ homePage }) => {
    await homePage.expectToBeVisible(homePage.header.logo);
  });

  test('should navigate to home when logo is clicked', async ({ homePage, page }) => {
    await homePage.header.logo.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/$|\/home/);
  });

  test('should display navigation links in header', async ({ homePage, page }) => {
    await homePage.expectToBeVisible(homePage.header.productNav);
    // Check for a secondary nav dropdown (Support / Resources / How it works depending on app version)
    const secondaryNav = page.locator('header button, nav button').filter({ hasText: /Resources|Support|How it works/i }).first();
    await expect(secondaryNav).toBeVisible({ timeout: 10000 });
  });

  test('should display cart icon in header', async ({ homePage }) => {
    await homePage.expectToBeVisible(homePage.header.cartIcon);
  });

  test('should display search input in header', async ({ homePage }) => {
    await homePage.expectToBeVisible(homePage.header.searchInput);
  });
});

test.describe('Home Page - Footer', () => {
  test('should display footer section', async ({ homePage, page }) => {
    await homePage.open();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should display footer links', async ({ homePage, page }) => {
    await homePage.open();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    const footerLinks = page.locator('footer a').filter({ hasText: /.+/ });
    const count = await footerLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});
