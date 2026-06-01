/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.campfire.jp" },
      { protocol: "https", hostname: "*.bandcamp.com" },
      { protocol: "https", hostname: "*.enjine.co.jp" },
    ],
  },
};

module.exports = nextConfig;
