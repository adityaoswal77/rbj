import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export -> `out/` directory, deployed to Cloudflare Workers/Pages.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
