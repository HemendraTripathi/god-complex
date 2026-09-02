import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
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
      {
        source: "/who-is-hemendra",
        destination: "/hemendra",
        permanent: true,
      },
      {
        source: "/case",
        destination: "/work/callin-io",
        permanent: true,
      },
      {
        source: "/case-study",
        destination: "/work/callin-io",
        permanent: true,
      },
      {
        source: "/hire-me",
        destination: "/hire",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
