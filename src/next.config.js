
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, 
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['lucide-react'],
    serverActions: {
      allowedOrigins: [
        'localhost:3001',
        '*.replit.dev',
        '*.replit.dev:3001',
        '*.spock.replit.dev',
        '*.spock.replit.dev:3001',
        '64f9135f-4c2c-455c-a9b7-9e326d59f291-00-11gv1x3f7z16.spock.replit.dev', 
        '6000-firebase-studio-1751928450615.cluster-f4iwdviaqvc2ct6pgytzw4xqy4.cloudworkstations.dev',
        '9000-firebase-studio-1751928450615.cluster-f4iwdviaqvc2ct6pgytzw4xqy4.cloudworkstations.dev',
      ]
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      ignored: [
        '**/.git/**',
        '**/.next/**',
        '**/node_modules/**',
        '**/.genkit/**',
      ],
    };
    
    // These modules are server-side only and should not be included in the client-side bundle.
    if (!isServer) {
        config.externals.push('@opentelemetry/winston-transport');
        config.externals.push('winston');
        config.externals.push('handlebars');
    }

    return config;
  }
};

module.exports = nextConfig;
