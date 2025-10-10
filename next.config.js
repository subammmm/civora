/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Disable React strict mode for production build compatibility
  reactStrictMode: true,
}

module.exports = nextConfig
