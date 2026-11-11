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
        source: "/:path*",
        has: [{ type: "host", value: "me.readwith.io" }],
        destination: "https://hemendra.readwith.io/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.me.readwith.io" }],
        destination: "https://hemendra.readwith.io/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.hemendra.readwith.io" }],
        destination: "https://hemendra.readwith.io/:path*",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
      {
        source: "/who-is-hemendra-tripathi",
        destination: "/",
        permanent: true,
      },
      {
        source: "/who-is-hemendra",
        destination: "/",
        permanent: true,
      },
      {
        source: "/hemendra",
        destination: "/",
        permanent: true,
      },
      {
        source: "/hemendra-tripathi",
        destination: "/",
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
