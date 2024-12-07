import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    async rewrites() {
        return [
            {
                source: '/api/v1/linku',
                destination: 'https://localhost:443/api/v1/linku',
            },
        ];
    }
};

export default nextConfig;
