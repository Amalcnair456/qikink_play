import { Page } from '@playwright/test';

/**
 * Custom wait utilities beyond Playwright's built-in waits.
 */
export class WaitHelper {
  constructor(private readonly page: Page) {}

  async waitForUrlToContain(substring: string, timeout = 30000): Promise<void> {
    await this.page.waitForURL(`**/*${substring}*`, { timeout });
  }

  async waitForNetworkIdle(timeout = 30000): Promise<void> {
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  async waitForResponse(urlPattern: string | RegExp, timeout = 30000): Promise<void> {
    await this.page.waitForResponse(urlPattern, { timeout });
  }
}
