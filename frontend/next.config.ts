// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // other experimental features
    },
    // Add this if you haven't already
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': require('path').resolve('./src'),
            '@/lib': require('path').resolve('./lib'),
        };
        return config;
    },
};

module.exports = nextConfig;