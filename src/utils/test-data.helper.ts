/**
 * Generate dynamic test data to avoid flaky tests caused by stale/duplicate data.
 */
export class TestDataHelper {
  static uniqueEmail(prefix = 'testuser'): string {
    return `${prefix}+${Date.now()}@example.com`;
  }

  static uniqueString(prefix = 'test'): string {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  }

  static randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
