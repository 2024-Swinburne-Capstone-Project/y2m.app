/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://nextjs.org/docs/app/api-reference/next-config-js/output#automatically-copying-traced-files
  output: 'standalone',
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    disableStaticImages: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      // Increase polling interval to avoid permission issues
      poll: 1000,
    };
    return config;
  },
};

export default nextConfig;
