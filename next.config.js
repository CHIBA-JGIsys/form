
/** @type {import('next').NextConfig} */
const urlPrefix = process.env.URL_PREFIX ? '/' + process.env.URL_PREFIX : ''

const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  assetPrefix: '/member/input',
  basePath: '/member/input',
  publicRuntimeConfig: { urlPrefix },
}

module.exports = nextConfig
