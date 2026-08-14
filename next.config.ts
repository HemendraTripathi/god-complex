import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/hemendra-tripathi",
        permanent: true,
      },
      {
        source: "/who-is-hemendra-tripathi",
        destination: "/hemendra-tripathi",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
