import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "http",
  //       hostname: "localhost",
  //       port: "",
  //       pathname: "/wordpresswebshop/wp-content/uploads/**",
  //     },
  //   ],
  // },
};

export default nextConfig;
