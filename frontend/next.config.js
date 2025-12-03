/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  // For cPanel deployment
  output: 'standalone',
}

module.exports = nextConfig