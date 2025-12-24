// Issue #49 FIXED: Feature Flags System
import type { FeatureFlags } from '../types/api';

const DEFAULT_FLAGS: FeatureFlags = {
    aiChat: false,
    betaFeatures: false,
    advancedFilters: true,
};

export function getFeatureFlags(): FeatureFlags {
    // Server-side flags from environment
    if (typeof window === 'undefined') {
        return {
            aiChat: process.env.NEXT_PUBLIC_CIVORA_AI_ENABLED === 'true',
            betaFeatures: process.env.NEXT_PUBLIC_ENABLE_BETA === 'true',
            advancedFilters: true,
        };
    }

    // Client-side flags (from localStorage override or default)
    try {
        const stored = localStorage.getItem('featureFlags');
        if (stored) {
            return { ...DEFAULT_FLAGS, ...JSON.parse(stored) };
        }
    } catch (e) {
        console.warn('Failed to load feature flags from localStorage');
    }

    return DEFAULT_FLAGS;
}

export function isFeatureEnabled(feature: keyof FeatureFlags): boolean {
    const flags = getFeatureFlags();
    return flags[feature] ?? false;
}

export function setFeatureFlag(feature: keyof FeatureFlags, enabled: boolean): void {
    if (typeof window === 'undefined') return;

    try {
        const flags = getFeatureFlags();
        flags[feature] = enabled;
        localStorage.setItem('featureFlags', JSON.stringify(flags));
    } catch (e) {
        console.warn('Failed to save feature flag');
    }
}

// Usage:
// import { isFeatureEnabled } from './lib/feature-flags';
//
// function MyComponent() {
//   if (!isFeatureEnabled('aiChat')) {
//     return <div>AI Chat coming soon</div>;
//   }
//   return <AIChatInterface />;
// }
