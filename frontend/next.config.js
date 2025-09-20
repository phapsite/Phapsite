var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// next.config.js
/** @type {import('next').NextConfig} */
var nextConfig = {
    experimental: {
    // other experimental features
    },
    // Add this if you haven't already
    webpack: function (config) {
        config.resolve.alias = __assign(__assign({}, config.resolve.alias), { '@': require('path').resolve('./src'), '@/lib': require('path').resolve('./lib') });
        return config;
    },
};
module.exports = nextConfig;
