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
