import { ENV } from '../config/env.config';

export const TestData = {
  validUser: {
    email: ENV.CREDENTIALS.USERNAME || 'amal@qikinkstorer.com',
    password: ENV.CREDENTIALS.PASSWORD || 'Test@1234',
  },
  invalidUser: {
    email: 'invalid@example.com',
    password: 'WrongPass123',
  },
  signUp: {
    name: 'Test User',
    email: `testuser+${Date.now()}@example.com`,
    phone: '9876543210',
    password: 'SecurePass@123',
    weakPassword: '123',
    mismatchPassword: 'DifferentPass@456',
  },
  search: {
    validQuery: 'T-shirt',
    invalidQuery: 'xyznonexistent12345',
  },
} as const;
