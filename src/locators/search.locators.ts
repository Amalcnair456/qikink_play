import { Page, Locator } from '@playwright/test';

export class SearchLocators {
  readonly searchInput: Locator;
  readonly searchDropdown: Locator;
  readonly searchResults: Locator;
  readonly searchResultItems: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    this.searchInput = page.getByPlaceholder(/Search Products, Pages, FAQs/i).first();
    this.searchDropdown = page.locator('div.absolute.top-full.left-0.right-0.z-50').first();
    this.searchResults = page.locator('div.absolute.top-full.left-0.right-0.z-50 a').filter({ hasText: /.+/ });
    this.searchResultItems = page.locator('div.absolute.top-full.left-0.right-0.z-50 a[href*="product"]');
    this.noResultsMessage = page.getByText(/no results|no products found|nothing found/i).first();
  }
}
