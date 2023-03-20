
/** @type {import('next').NextConfig} */
const urlPrefix = process.env.URL_PREFIX ? '/' + process.env.URL_PREFIX : ''

const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  assetPrefix: '/2024/ad',
  basePath: '/2024/ad',
  publicRuntimeConfig: { urlPrefix },
}

module.exports = nextConfig
