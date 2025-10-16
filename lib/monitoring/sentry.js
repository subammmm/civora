/**
 * Sentry monitoring initialization for production error tracking
 * 
 * FIX #10: Sentry Integration Documentation
 * - Uses dynamic imports to avoid bundling Sentry when DSN is not configured
 * - Only initializes in browser context (not in server-side rendering)
 * - Gracefully handles missing @sentry/browser package
 * - Environment variable NEXT_PUBLIC_SENTRY_DSN must be set to enable Sentry
 * 
 * This file is imported dynamically in app/layout.js to prevent 404 errors
 * and ensure the application works even without Sentry configured.
 */

let sentryInitialized = false;

export function initSentry() {
  // Skip if already initialized
  if (sentryInitialized) {
    return;
  }

  // Skip if no DSN is configured - Sentry is optional
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Sentry: Skipping initialization (no DSN configured)');
    }
    return;
  }

  // Only run in browser (prevents SSR issues)
  if (typeof window === 'undefined') {
    return;
  }

  // FIX #11: Dynamic import prevents bundling issues and 404 errors
  // If @sentry/browser is not installed, the catch block handles it gracefully
  import('@sentry/browser')
    .then((Sentry) => {
      Sentry.init({
        dsn: dsn,
        environment: process.env.NODE_ENV || 'production',
        tracesSampleRate: 0.1, // Sample 10% of transactions for performance monitoring
        integrations: [
          // Automatically instrument browser performance
          Sentry.browserTracingIntegration(),
        ],
        beforeSend(event, hint) {
          // Filter out non-critical errors in development
          if (process.env.NODE_ENV === 'development') {
            console.log('Sentry event (not sent in dev):', event);
            return null;
          }
          return event;
        },
      });

      sentryInitialized = true;
      if (process.env.NODE_ENV === 'development') {
        console.log('Sentry: Initialized successfully');
      }
    })
    .catch((error) => {
      // FIX #12: Graceful handling of Sentry initialization failures
      // Application continues to work even if Sentry fails to load
      if (process.env.NODE_ENV === 'development') {
        console.error('Sentry: Failed to initialize', error);
      }
    });
}

/**
 * Manually capture an exception
 * @param {Error} error - The error to capture
 * @param {Object} context - Additional context
 * 
 * FIX #13: Error capture with graceful degradation
 * If Sentry is not initialized, errors are logged to console
 */
export function captureException(error, context = {}) {
  if (!sentryInitialized) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Sentry not initialized, logging error:', error, context);
    }
    return;
  }

  // Dynamic import ensures compatibility even if Sentry package changes
  import('@sentry/browser').then((Sentry) => {
    Sentry.captureException(error, {
      contexts: context,
    });
  }).catch((err) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to capture exception:', err);
    }
  });
}

/**
 * Set user context for error tracking
 * @param {Object} user - User information
 * 
 * FIX #14: User context setting with error handling
 */
export function setUser(user) {
  if (!sentryInitialized) {
    return;
  }

  import('@sentry/browser').then((Sentry) => {
    Sentry.setUser(user);
  }).catch((err) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to set user context:', err);
    }
  });
}

/**
 * Add breadcrumb for debugging
 * @param {Object} breadcrumb - Breadcrumb data
 * 
 * FIX #15: Breadcrumb tracking with error handling
 */
export function addBreadcrumb(breadcrumb) {
  if (!sentryInitialized) {
    return;
  }

  import('@sentry/browser').then((Sentry) => {
    Sentry.addBreadcrumb(breadcrumb);
  }).catch((err) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to add breadcrumb:', err);
    }
  });
}
