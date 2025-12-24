"""
Issue #51 FIXED: Client - Side Rate Limiting
Token bucket implementation to prevent API abuse
"""

class RateLimiter {
    private tokens: number;
    private lastRefill: number;
    private readonly maxTokens: number;
    private readonly refillRate: number; // tokens per second

    constructor(maxRequests: number, windowSeconds: number) {
        this.maxTokens = maxRequests;
        this.tokens = maxRequests;
        this.refillRate = maxRequests / windowSeconds;
        this.lastRefill = Date.now();
    }

    private refill(): void {
        const now = Date.now();
        const timePassed = (now - this.lastRefill) / 1000; // convert to seconds
        const tokensToAdd = timePassed * this.refillRate;

        this.tokens = Math.min(this.maxTokens, this.tokens + tokensToAdd);
        this.lastRefill = now;
    }

    async acquire(): Promise<boolean> {
        this.refill();

        if (this.tokens >= 1) {
            this.tokens -= 1;
            return true;
        }

        return false;
    }

    async waitForToken(): Promise<void> {
        while (!(await this.acquire())) {
            // Wait for 100ms before trying again
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    getTokensRemaining(): number {
        this.refill();
        return Math.floor(this.tokens);
    }
}

// Create rate limiter instances for different endpoints
const searchLimiter = new RateLimiter(10, 60); // 10 requests per minute
const apiLimiter = new RateLimiter(30, 60); // 30 requests per minute

export async function rateLimitedFetch(url: string, options?: RequestInit): Promise<Response> {
    // Wait for rate limit token
    await apiLimiter.waitForToken();

    // Make the request
    return fetch(url, options);
}

export async function rateLimitedSearch(query: string): Promise<any> {
    if (!(await searchLimiter.acquire())) {
        throw new Error('Rate limit exceeded. Please wait before searching again.');
    }

    return fetch(`/api/search?q=${query}`).then(r => r.json());
}

// Usage:
// import { rateLimitedFetch } from './lib/rate-limiter';
//
// try {
//   const response = await rateLimitedFetch('/api/opportunities');
//   const data = await response.json();
// } catch (error) {
//   console.error('Rate limit exceeded:', error);
// }

export { RateLimiter };
