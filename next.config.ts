import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fxybknowhujafbvimnya.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/announcements-images/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "fxybknowhujafbvimnya.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/posts/**",
        search: "",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

module.exports = nextConfig;
