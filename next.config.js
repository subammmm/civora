/** @type {import('next').NextConfig} */
const nextConfig = {
  // FIX: Conditional static export for GitHub Pages backup deployment
  // When EXPORT_MODE=true, builds static HTML for GitHub Pages (no API routes)
  // When EXPORT_MODE is not set, builds full Next.js with API routes for Vercel
  ...(process.env.EXPORT_MODE === 'true' && { output: 'export' }),
  
  // FIX: trailingSlash set to true only for static export mode
  // For Vercel deployment with API routes, trailing slashes cause 308 redirects
  // which lose POST request bodies. API routes should be accessed without trailing slashes.
  ...(process.env.EXPORT_MODE === 'true' && { trailingSlash: true }),
  
  // Image optimization
  images: {
    unoptimized: process.env.EXPORT_MODE === 'true',
    formats: ['image/avif', 'image/webp'],
  },
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  
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
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
