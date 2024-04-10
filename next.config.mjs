/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://nextjs.org/docs/app/api-reference/next-config-js/output#automatically-copying-traced-files
  output: "standalone",
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
