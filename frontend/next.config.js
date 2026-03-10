/** @type {import('next').NextConfig} */
const fs = require('fs');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const publicApiUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  '';

const internalBackendUrl = process.env.NEXT_INTERNAL_BACKEND_URL || '';

function normalizeBackendBase(url) {
  if (!url) return '';
  const trimmed = url.replace(/\/+$/, '');
  return trimmed.replace(/\/api$/, '');
}

let backendUrl = normalizeBackendBase(internalBackendUrl || publicApiUrl) || 'http://localhost:3001';

try {
  const backendPortPath = path.join(__dirname, 'public', 'backend-port.json');
  if (!isProduction && !process.env.NEXT_INTERNAL_BACKEND_URL && fs.existsSync(backendPortPath)) {
    const data = fs.readFileSync(backendPortPath, 'utf8');
    const { port } = JSON.parse(data);
    backendUrl = `http://localhost:${port}`;
  }
} catch (error) {
  console.error('Error reading backend port:', error);
}

const skipChecks = process.env.NEXT_SKIP_CHECKS === 'true';

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: skipChecks,
  },
  typescript: {
    ignoreBuildErrors: skipChecks,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
  webpack(config, { dev }) {
    // Avoid noisy Windows-only path casing warnings from webpack's filesystem cache.
    if (dev && process.platform === 'win32') {
      config.cache = {
        type: 'memory',
      };
    }

    return config;
  },
};

module.exports = nextConfig;
