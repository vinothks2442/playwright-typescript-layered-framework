import {
  APIRequestContext,
  APIResponse,
  expect,
} from '@playwright/test';

export class ApiService {

  constructor(private readonly request: APIRequestContext) {}

  async get(endpoint: string): Promise<APIResponse> {
    return await this.request.get(endpoint);
  }

  async post(
    endpoint: string,
    data: unknown
  ): Promise<APIResponse> {
    return await this.request.post(endpoint, {
      data,
    });
  }

  async getJson<T>(
    endpoint: string
  ): Promise<T> {
    const response = await this.get(endpoint);

    expect(response.ok()).toBeTruthy();

    return await response.json() as T;
  }

  async postJson<T>(
    endpoint: string,
    data: unknown
  ): Promise<T> {
    const response = await this.post(endpoint, data);

    expect(response.ok()).toBeTruthy();

    return await response.json() as T;
  }
}