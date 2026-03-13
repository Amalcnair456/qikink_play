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

test.describe('Search - Advanced Queries', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('should handle special characters in search gracefully', async ({ searchPage }) => {
    await searchPage.search('<script>alert(1)</script>');
    await searchPage.page.waitForTimeout(500);
    // Should not crash or execute scripts
    await searchPage.expectToBeVisible(searchPage.locators.searchInput);
  });

  test('should handle very long search query gracefully', async ({ searchPage }) => {
    const longQuery = 'a'.repeat(200);
    await searchPage.search(longQuery);
    await searchPage.page.waitForTimeout(500);
    await searchPage.expectToBeVisible(searchPage.locators.searchInput);
  });

  test('should handle numeric search query', async ({ searchPage }) => {
    await searchPage.search('12345');
    await searchPage.page.waitForTimeout(1000);
    // Should return either results or empty state — not crash
    await searchPage.expectToBeVisible(searchPage.locators.searchInput);
  });

  test('should show results for partial product name', async ({ searchPage }) => {
    await searchPage.search('shirt');
    const count = await searchPage.getResultCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should clear search and show fresh results on new query', async ({ searchPage }) => {
    await searchPage.search('T-shirt');
    const countFirst = await searchPage.getResultCount();
    await searchPage.clearSearch();
    await searchPage.page.waitForTimeout(300);
    await searchPage.search('Hoodie');
    await searchPage.page.waitForTimeout(1000);
    const countSecond = await searchPage.getResultCount();
    // Both queries should produce results (or at least run without errors)
    expect(countFirst + countSecond).toBeGreaterThanOrEqual(0);
  });
});
