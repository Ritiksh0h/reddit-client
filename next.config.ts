import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "i.redd.it",
      port: "",
      pathname: "/**",
    }],
  },
};

export default nextConfig;
