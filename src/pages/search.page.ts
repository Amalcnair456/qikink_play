import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { SearchLocators } from '../locators/search.locators';

export class SearchPage extends BasePage {
  readonly locators: SearchLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new SearchLocators(page);
  }

  async search(query: string): Promise<void> {
    await this.fill(this.locators.searchInput, query);
    // Wait for live dropdown results
    await this.page.waitForTimeout(1500);
  }

  async clearSearch(): Promise<void> {
    await this.locators.searchInput.clear();
  }

  async getResultCount(): Promise<number> {
    return this.locators.searchResultItems.count();
  }

  async clickFirstResult(): Promise<void> {
    await this.locators.searchResultItems.first().click();
  }
}
