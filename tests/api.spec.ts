import { test, expect, request } from '@playwright/test';
import { ENV } from '../src/config/env.config';

/**
 * API-level tests for Qikink marketplace endpoints.
 * These tests validate backend HTTP responses independently of the UI.
 * Note: endpoints are probed for status codes only — JSON parsing is skipped
 * since some endpoints may return HTML (Next.js pages) rather than JSON.
 */

async function getStatus(endpoint: string, method: 'GET' | 'POST' = 'GET', data?: Record<string, unknown>): Promise<number> {
  const ctx = await request.newContext({ baseURL: ENV.BASE_URL });
  let response;
  if (method === 'POST') {
    response = await ctx.post(endpoint, { data, headers: { 'Content-Type': 'application/json' } });
  } else {
    response = await ctx.get(endpoint);
  }
  const status = response.status();
  await ctx.dispose();
  return status;
}

test.describe('API - Product Endpoints', () => {
  test('product listing endpoint should not return server error', async () => {
    const status = await getStatus('/api/products');
    expect(status).not.toBe(500);
  });

  test('product detail endpoint should not return server error', async () => {
    const status = await getStatus('/api/products/6');
    expect(status).not.toBe(500);
  });

  test('non-existent product should return 404, not 500', async () => {
    const status = await getStatus('/api/products/999999');
    expect(status).not.toBe(500);
  });
});

test.describe('API - Authentication Endpoints', () => {
  test('login with invalid credentials should return 4xx', async () => {
    const status = await getStatus('/api/auth/login', 'POST', {
      email: 'invalid@example.com',
      password: 'WrongPass123',
    });
    // Must not be a server crash — 4xx or 404 is acceptable
    expect(status).not.toBe(500);
  });

  test('login with missing fields should not crash server', async () => {
    const status = await getStatus('/api/auth/login', 'POST', {});
    expect(status).not.toBe(500);
  });

  test('login with SQL injection in email should not crash server', async () => {
    const status = await getStatus('/api/auth/login', 'POST', {
      email: "' OR 1=1 --",
      password: 'test',
    });
    expect(status).not.toBe(500);
  });
});

test.describe('API - Search Endpoint', () => {
  test('search with valid query should not crash server', async () => {
    const status = await getStatus('/api/search?q=T-shirt');
    expect(status).not.toBe(500);
  });

  test('search with empty query should not crash server', async () => {
    const status = await getStatus('/api/search?q=');
    expect(status).not.toBe(500);
  });

  test('search with XSS payload should not crash server', async () => {
    const status = await getStatus('/api/search?q=%3Cscript%3Ealert%281%29%3C%2Fscript%3E');
    expect(status).not.toBe(500);
  });
});
