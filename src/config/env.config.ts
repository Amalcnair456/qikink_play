import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const ENV = {
  BASE_URL: process.env.BASE_URL || 'https://qa-marketplace.qikink.com',
  ENV: process.env.ENV || 'qa',
  DEFAULT_TIMEOUT: Number(process.env.DEFAULT_TIMEOUT) || 30000,
  NAVIGATION_TIMEOUT: Number(process.env.NAVIGATION_TIMEOUT) || 60000,
  HEADLESS: process.env.HEADLESS !== 'false',
  CREDENTIALS: {
    USERNAME: process.env.TEST_USERNAME || '',
    PASSWORD: process.env.TEST_PASSWORD || '',
  },
} as const;
