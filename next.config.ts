import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export -> `out/` directory, deployed to Cloudflare Workers.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,

  // Frozen at build time so the server-rendered HTML and the client bundle
  // always agree. Deriving it from `new Date()` at runtime would disagree on
  // the first visit after New Year and trip a hydration error.
  env: {
    NEXT_PUBLIC_BUILD_YEAR: String(new Date().getFullYear()),
  },
};

export default nextConfig;
