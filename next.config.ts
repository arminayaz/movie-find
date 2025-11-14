import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ['image.tmdb.org'],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            type: 'asset/source',
        });
        return config;
    },
};

export default nextConfig;
