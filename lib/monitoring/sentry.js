/**
 * Sentry monitoring initialization
 * Only initializes when NEXT_PUBLIC_SENTRY_DSN environment variable is set
 */

let sentryInitialized = false;

export function initSentry() {
  // Skip if already initialized
  if (sentryInitialized) {
    return;
  }

  // Skip if no DSN is configured
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) {
    console.log('Sentry: Skipping initialization (no DSN configured)');
    return;
  }

  // Only run in browser
  if (typeof window === 'undefined') {
    return;
  }

  // Dynamic import to avoid bundling Sentry when not needed
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
      console.log('Sentry: Initialized successfully');
    })
    .catch((error) => {
      console.error('Sentry: Failed to initialize', error);
    });
}

/**
 * Manually capture an exception
 * @param {Error} error - The error to capture
 * @param {Object} context - Additional context
 */
export function captureException(error, context = {}) {
  if (!sentryInitialized) {
    console.error('Sentry not initialized, logging error:', error, context);
    return;
  }

  import('@sentry/browser').then((Sentry) => {
    Sentry.captureException(error, {
      contexts: context,
    });
  });
}

/**
 * Set user context for error tracking
 * @param {Object} user - User information
 */
export function setUser(user) {
  if (!sentryInitialized) {
    return;
  }

  import('@sentry/browser').then((Sentry) => {
    Sentry.setUser(user);
  });
}

/**
 * Add breadcrumb for debugging
 * @param {Object} breadcrumb - Breadcrumb data
 */
export function addBreadcrumb(breadcrumb) {
  if (!sentryInitialized) {
    return;
  }

  import('@sentry/browser').then((Sentry) => {
    Sentry.addBreadcrumb(breadcrumb);
  });
}
