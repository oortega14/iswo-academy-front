/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iswo-academy.s3.amazonaws.com',
        port: '',
      },
    ],
  }
}

export default nextConfig
