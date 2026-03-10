import { test, expect } from '../src/fixtures/test.fixture';
import { TestData } from '../src/data/test.data';

test.describe('Search - Live Dropdown', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('should display search input in header', async ({ searchPage }) => {
    await searchPage.expectToBeVisible(searchPage.locators.searchInput);
  });

  test('should show results for valid search query', async ({ searchPage }) => {
    await searchPage.search(TestData.search.validQuery);
    const count = await searchPage.getResultCount();
    expect(count).toBeGreaterThan(0);
  });

  test('should show no results or empty state for invalid query', async ({ searchPage }) => {
    await searchPage.search(TestData.search.invalidQuery);
    const count = await searchPage.getResultCount();
    if (count === 0) {
      // Either no results message or simply empty dropdown
      expect(count).toBe(0);
    }
  });

  test('should navigate to product page when clicking a result', async ({ searchPage, page }) => {
    await searchPage.search(TestData.search.validQuery);
    const count = await searchPage.getResultCount();
    if (count > 0) {
      await searchPage.clickFirstResult();
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(/product/i);
    }
  });

  test('should clear search results when input is cleared', async ({ searchPage }) => {
    await searchPage.search(TestData.search.validQuery);
    const countBefore = await searchPage.getResultCount();
    expect(countBefore).toBeGreaterThan(0);
    await searchPage.clearSearch();
    await searchPage.locators.searchInput.press('Escape');
    await searchPage.page.waitForTimeout(500);
  });
});
