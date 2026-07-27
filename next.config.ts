import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [50, 60, 75],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // public/*.webp assets referenced directly (e.g. CSS background-image) never pass
  // through the image optimizer, so they don't get its minimumCacheTTL. Filenames here
  // are content-addressed enough in practice (we rename on every real edit), so a
  // 1-year immutable cache is safe.
  async headers() {
    return [
      {
        source: "/:path*.(webp|avif|png|jpg|jpeg|svg|ico)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
