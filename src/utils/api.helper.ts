import { APIRequestContext, request } from '@playwright/test';
import { ENV } from '../config/env.config';

/**
 * Reusable API helper for making REST calls (test data setup, verification, etc.).
 */
export class ApiHelper {
  private context!: APIRequestContext;

  async init(extraHeaders?: Record<string, string>): Promise<void> {
    this.context = await request.newContext({
      baseURL: ENV.BASE_URL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        ...extraHeaders,
      },
    });
  }

  async get<T = unknown>(endpoint: string): Promise<{ status: number; body: T }> {
    const response = await this.context.get(endpoint);
    return { status: response.status(), body: await response.json() as T };
  }

  async post<T = unknown>(endpoint: string, data: Record<string, unknown>): Promise<{ status: number; body: T }> {
    const response = await this.context.post(endpoint, { data });
    return { status: response.status(), body: await response.json() as T };
  }

  async put<T = unknown>(endpoint: string, data: Record<string, unknown>): Promise<{ status: number; body: T }> {
    const response = await this.context.put(endpoint, { data });
    return { status: response.status(), body: await response.json() as T };
  }

  async delete(endpoint: string): Promise<{ status: number }> {
    const response = await this.context.delete(endpoint);
    return { status: response.status() };
  }

  async dispose(): Promise<void> {
    await this.context.dispose();
  }
}
