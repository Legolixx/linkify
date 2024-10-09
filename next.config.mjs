/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*.googleusercontent.com",
      },
      {
        hostname: "utfs.io",
      },
      {
         hostname: "img.freepik.com"
      }
    ],
  },
};

export default nextConfig;
