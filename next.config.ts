import type { NextConfig } from "next";

// GitHub Pages serves this project repo under /driftly (a sub-path), and has no
// image optimizer, so we export a fully static site. If you later attach a
// custom domain, set basePath to "" and BASE_PATH in lib/constants.ts to "".
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/driftly" : "",
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
