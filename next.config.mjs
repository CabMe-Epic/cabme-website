/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['www.cabme.in','cabmeapi.epicglobal.co.in','api.cabme.in','example.com'], // Add your domain here
      },
      experimental: {
        missingSuspenseWithCSRBailout: false,
      },
};

export default nextConfig;
