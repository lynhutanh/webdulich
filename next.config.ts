import type { NextConfig } from 'next';
import million from 'million/compiler';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { i18n } = require('./next-i18next.config.js');

const nextConfig: NextConfig = {
  i18n,
  compress: true,
  reactStrictMode: false,
  distDir: '.next',

  images: {
    unoptimized: true,
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    remotePatterns: [
      { protocol: 'https', hostname: '**.base-code.local', pathname: '**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '**' },
      { protocol: 'https', hostname: 'i.pravatar.cc', pathname: '**' },
    ]
  },
  poweredByHeader: false,

  webpack(config, { buildId, webpack }) {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          BUILD_ID: JSON.stringify(buildId)
        }
      })
    );

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false
    };

    return config;
  },
  transpilePackages: [],
  turbopack: {}
};

export default million.next(nextConfig);
