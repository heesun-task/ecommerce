import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TODO: This line is to test build. strengthen conditons
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
