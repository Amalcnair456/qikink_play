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
  editor: {
    defaultProductId: 6,
    defaultProductSlug: '/product/unisex-t-shirts-classic',
  },
  checkout: {
    guestEmail: `guest+${Date.now()}@example.com`,
    phone: '9876543210',
    fullName: 'Test Guest User',
    address1: '123 Test Street',
    address2: 'Apartment 4B',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    pinCode: '600001',
    invalidPinCode: '000000',
    invalidEmail: 'notanemail',
  },
} as const;
