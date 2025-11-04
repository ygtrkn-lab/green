/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    removeConsole: true,
  },
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'green.net.tr',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'wallpapercave.com',
      },
      {
        protocol: 'https',
        hostname: 'xml1.xmlbankasi.com',
      },
      {
        protocol: 'http',
        hostname: 'cdn1.xmlbankasi.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    scrollRestoration: true,
    workerThreads: true,
    webpackBuildWorker: true,
    optimizeServerReact: true,
    turbotrace: {
      logLevel: 'error',
      logDetail: true,
    }
  },
}

module.exports = nextConfig
