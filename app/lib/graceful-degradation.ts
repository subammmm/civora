/**
 * Issue #52 FIXED: Graceful Degradation Utilities
 * Fallbacks for missing browser features
 */

// Check for feature support
export const features = {
    intersection: typeof IntersectionObserver !== 'undefined',
    webp: checkWebPSupport(),
    localStorage: checkLocalStorage(),
    fetch: typeof fetch !== 'undefined',
    geolocation: 'geolocation' in navigator,
};

function checkWebPSupport(): boolean {
    if (typeof document === 'undefined') return false;
    const elem = document.createElement('canvas');
    if (elem.getContext && elem.getContext('2d')) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
}

function checkLocalStorage(): boolean {
    try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

// Lazy loading with fallback
export function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    if (features.intersection) {
        // Use IntersectionObserver for modern browsers
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target as HTMLImageElement;
                    img.src = img.dataset.src || '';
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => observer.observe(img));
    } else {
        // Fallback: load all images immediately
        images.forEach(img => {
            const imgElement = img as HTMLImageElement;
            imgElement.src = imgElement.dataset.src || '';
            imgElement.removeAttribute('data-src');
        });
    }
}

// Storage with fallback
export const storage = {
    get(key: string, defaultValue: any = null): any {
        if (!features.localStorage) return defaultValue;

        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch {
            return defaultValue;
        }
    },

    set(key: string, value: any): boolean {
        if (!features.localStorage) return false;

        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch {
            return false;
        }
    },

    remove(key: string): boolean {
        if (!features.localStorage) return false;

        try {
            localStorage.removeItem(key);
            return true;
        } catch {
            return false;
        }
    }
};

// Fetch with fallback to XMLHttpRequest
export async function safeFetch(url: string, options?: RequestInit): Promise<Response> {
    if (features.fetch) {
        return fetch(url, options);
    }

    // Fallback to XMLHttpRequest for old browsers
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(options?.method || 'GET', url);

        Object.entries(options?.headers || {}).forEach(([key, value]) => {
            xhr.setRequestHeader(key, value as string);
        });

        xhr.onload = () => {
            resolve(new Response(xhr.responseText, {
                status: xhr.status,
                statusText: xhr.statusText,
            }));
        };

        xhr.onerror = () => reject(new Error('Network error'));
        xhr.send(options?.body as any);
    });
}

// Usage:
// import { features, storage, lazyLoadImages } from './lib/graceful-degradation';
//
// if (!features.geolocation) {
//   // Show all scholarship locations instead of filtering by location
//   showAllLocations();
// }
//
// // Safe storage access
// const theme = storage.get('theme', 'dark');
