import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const BASE_URL = process.env.BASE_URL || 'https://qa-marketplace.qikink.com';
const CI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: CI,

  /* Retry failed tests */
  retries: CI ? 2 : 1,

  /* Parallel workers */
  workers: CI ? 1 : '50%',

  /* Reporters */
  reporter: CI
    ? [['html', { open: 'never' }], ['junit', { outputFile: 'test-results/junit-report.xml' }]]
    : [['html', { open: 'on-failure' }], ['list']],

  /* Global test timeout */
  timeout: 60000,

  /* Expect timeout */
  expect: {
    timeout: 10000,
  },

  /* Shared settings for all projects */
  use: {
    baseURL: BASE_URL,
    trace: CI ? 'on-first-retry' : 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 30000,
    headless: process.env.HEADLESS !== 'false',
  },

  /* Configure projects for major browsers */
  projects: [
    // --- Setup project for authentication ---
    // {
    //   name: 'auth-setup',
    //   testDir: './src/fixtures',
    //   testMatch: /auth\.setup\.ts/,
    // },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      // dependencies: ['auth-setup'],
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      // dependencies: ['auth-setup'],
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      // dependencies: ['auth-setup'],
    },

    /* Mobile viewports */
    // {
    //   name: 'mobile-chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'mobile-safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],
});
