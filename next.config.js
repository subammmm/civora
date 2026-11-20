// FIXED: Next.js Configuration - Vercel deployment compatible

// 'unsafe-inline' stays for scripts because Next's inline bootstrap needs it without per-request nonces
// (nonces would turn every static page dynamic). The policy still pins where scripts, requests and forms may go.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${process.env.NODE_ENV === 'production' ? '' : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com",
  "font-src 'self'",
  "connect-src 'self' https://formspree.io https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com",
  "form-action 'self' https://formspree.io",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "object-src 'none'",
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image Optimization
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'placehold.co' },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  async redirects() {
    return [{ source: '/privacy', destination: '/legal/privacy', permanent: true }];
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: csp
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
