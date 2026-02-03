/** @type {import('next').NextConfig} */

const path = require('path')

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development'
})

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com'
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/tiktok',
        destination: 'https://www.tiktok.com/@taldosbars_official',
        permanent: true
      },
      {
        source: '/discord',
        destination: 'https://discord.gg/acMgWMDeBC',
        permanent: true
      },
      {
        source: '/faturamento',
        destination: 'https://billing.stripe.com/p/login/6oE7tlfwQ3LafqE9AA',
        permanent: true
      }
    ]
  }
}

module.exports = withPWA(nextConfig)
