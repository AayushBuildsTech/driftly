import type { NextConfig } from "next";

// Served from the custom apex domain driftlytravels.in (site root), and GitHub
// Pages has no image optimizer, so we export a fully static site. If you ever
// revert to the github.io/driftly sub-path, set basePath back to "/driftly" and
// BASE_PATH in lib/constants.ts to "/driftly".
const nextConfig: NextConfig = {
  output: "export",
  basePath: "",
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
