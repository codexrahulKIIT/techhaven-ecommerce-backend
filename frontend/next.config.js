/** @type {import('next').NextConfig} */
const fs = require('fs');
const path = require('path');

let backendUrl = process.env.NEXT_INTERNAL_BACKEND_URL || 'http://localhost:3001';

try {
  const backendPortPath = path.join(__dirname, 'public', 'backend-port.json');
  if (!process.env.NEXT_INTERNAL_BACKEND_URL && fs.existsSync(backendPortPath)) {
    const data = fs.readFileSync(backendPortPath, 'utf8');
    const { port } = JSON.parse(data);
    backendUrl = `http://localhost:${port}`;
  }
} catch (error) {
  console.error('Error reading backend port:', error);
}

const nextConfig = {
  reactStrictMode: true,
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
