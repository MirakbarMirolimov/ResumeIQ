/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is now stable in Next.js 14, no experimental flag needed
  experimental: {
    optimizePackageImports: ['@next/font']
  },
  // Add font optimization and fallback handling
  images: {
    domains: ['fonts.googleapis.com', 'fonts.gstatic.com']
  }
}

module.exports = nextConfig
