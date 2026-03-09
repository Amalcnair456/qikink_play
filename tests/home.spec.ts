import { test, expect } from '../src/fixtures/test.fixture';

test.describe('Qikink Home Page', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('should load the home page with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Print on Demand/i);
  });

  test('should display the header with navigation elements', async ({ homePage }) => {
    await homePage.expectHeaderVisible();
  });

  test('should display hero section with CTA', async ({ homePage }) => {
    await homePage.expectHeroSectionVisible();
  });

  test('should have navigation links visible', async ({ homePage }) => {
    await homePage.expectToBeVisible(homePage.homeNav);
    await homePage.expectToBeVisible(homePage.aboutUsNav);
  });

  test('should open login modal when clicking Log in', async ({ homePage, page }) => {
    await homePage.clickLogin();
    await expect(page.getByText('Welcome Back', { exact: true })).toBeVisible();
  });

  test('should have a search bar in the header', async ({ homePage }) => {
    await homePage.expectToBeVisible(homePage.searchInput);
  });

  test('should navigate to Products page on click', async ({ homePage, page }) => {
    await homePage.clickProduct();
    await expect(page).toHaveURL(/print-on-demand-products/i, { timeout: 10000 });
  });
});
