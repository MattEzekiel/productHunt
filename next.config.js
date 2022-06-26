/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_GOOGLE: process.env.API_GOOGLE
  }
}

module.exports = nextConfig
