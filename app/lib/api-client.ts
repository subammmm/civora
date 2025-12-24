// Issue #46 FIXED: API Client Abstraction
'use client';

import type { APIResponse, RequestOptions, APIClientConfig } from '../types/api';
import { ERROR_MESSAGES } from './validation';

export class APIClient {
    private baseURL: string;
    private timeout: number;
    private defaultHeaders: Record<string, string>;

    constructor(config?: Partial<APIClientConfig>) {
        this.baseURL = config?.baseURL || '/api/v1';
        this.timeout = config?.timeout || 30000;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            ...config?.headers,
        };
    }

    private async request<T>(
        endpoint: string,
        options: RequestOptions = {}
    ): Promise<APIResponse<T>> {
        // Issue #27: Timeout implementation
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: options.method || 'GET',
                headers: {
                    ...this.defaultHeaders,
                    ...options.headers,
                },
                body: options.body ? JSON.stringify(options.body) : undefined,
                signal: controller.signal,
                cache: options.cache,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const error = await response.json();
                throw new APIError(error.error || ERROR_MESSAGES.SERVER_ERROR, response.status);
            }

            return await response.json();
        } catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
                throw new APIError(ERROR_MESSAGES.NETWORK_ERROR, 408);
            }
            throw error;
        }
    }

    async get<T>(endpoint: string, options?: RequestOptions): Promise<APIResponse<T>> {
        return this.request<T>(endpoint, { ...options, method: 'GET' });
    }

    async post<T>(endpoint: string, body: any, options?: RequestOptions): Promise<APIResponse<T>> {
        return this.request<T>(endpoint, { ...options, method: 'POST', body });
    }

    async put<T>(endpoint: string, body: any, options?: RequestOptions): Promise<APIResponse<T>> {
        return this.request<T>(endpoint, { ...options, method: 'PUT', body });
    }

    async delete<T>(endpoint: string, options?: RequestOptions): Promise<APIResponse<T>> {
        return this.request<T>(endpoint, { ...options, method: 'DELETE' });
    }
}

class APIError extends Error {
    constructor(message: string, public statusCode: number) {
        super(message);
        this.name = 'APIError';
    }
}

// Singleton instance
export const api = new APIClient();

// Usage:
// import { api } from './lib/api-client';
//
// const data = await api.get('/opportunities');
// const created = await api.post('/opportunities', { name: 'Test' });
