import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    // ─── Remote image domains ───────────────────────────────────────────────
    // Add any new image hosting domain here once; all projects share this list.
    remotePatterns: [
      // GitHub raw content — primary source for project screenshots
      // Usage: https://raw.githubusercontent.com/{user}/{repo}/main/screenshots/...
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      // Cloudinary — CDN-based image hosting (great for larger portfolios)
      // Usage: https://res.cloudinary.com/{cloud_name}/image/upload/...
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      // Imgur — quick ad-hoc screenshot sharing
      // Usage: https://i.imgur.com/{imageId}.png
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      // YouTube thumbnails — auto-generated from video ID
      // Usage: https://img.youtube.com/vi/{videoId}/hqdefault.jpg
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
};

export default nextConfig;
