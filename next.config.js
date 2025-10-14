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
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
