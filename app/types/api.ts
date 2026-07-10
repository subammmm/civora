// Issue #44 FIXED: TypeScript Type Definitions
// Auto-generated types for Python Pydantic models

export interface User {
    id: number;
    email: string;
    full_name: string;
    created_at: string;
    is_active: boolean;
}

export interface Opportunity {
    id: number;
    type: 'scholarship';
    name: string;
    country: string;
    level?: string;
    deadline?: string;
    description?: string;
    requirements?: string;
    application_link?: string;
    created_at: string;
}

export interface OpportunityFilter {
    type?: 'scholarship' | 'all';
    country?: string;
    level?: string;
    page?: number;
    limit?: number;
}

export interface APIResponse<T> {
    data: T;
    message?: string;
    error?: APIError;
}

export interface APIError {
    code: string;
    message: string;
    timestamp: string;
    details?: Record<string, any>;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    total_pages: number;
}

// Issue #20: Error types
export type ErrorCode =
    | 'VALIDATION_ERROR'
    | 'NOT_FOUND'
    | 'UNAUTHORIZED'
    | 'SERVER_ERROR'
    | 'NETWORK_ERROR';

// Issue #24: i18n types
export interface TranslationKeys {
    home: {
        welcome: string;
        discover: string;
    };
    scholarships: {
        title: string;
        filter: string;
    };
    common: {
        loading: string;
        error: string;
        success: string;
    };
}

export type Locale = 'en' | 'ne';

// Issue #49: Feature flags
export interface FeatureFlags {
    aiChat: boolean;
    betaFeatures: boolean;
    advancedFilters: boolean;
}

// Issue #46: API Client types
export interface APIClientConfig {
    baseURL: string;
    timeout: number;
    headers?: Record<string, string>;
}

export interface RequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
    headers?: Record<string, string>;
    cache?: RequestCache;
}
