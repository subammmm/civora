/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  
  // Note: redirects() and headers() are not supported with output: 'export'
  // For GitHub Pages, use _redirects and _headers files (see public/ directory)
  // Or configure via Cloudflare/Netlify dashboard
};

module.exports = nextConfig;
