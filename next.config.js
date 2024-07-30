// const isProd = process.env.NODE_ENV === 'production'
const isProd = false;
const bundleAnalyzer = require('@next/bundle-analyzer')
const withBundleAnalyzer = bundleAnalyzer({
    enabled: false,
    openAnalyzer: false,
})


module.exports = withBundleAnalyzer({
    swcMinify: true,
    output: "standalone",
    reactStrictMode: false,
    env: {
        STATIC_URL: isProd ? STATIC_URL : "http://localhost:3000",
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    webpack: (config) => {
        config.externals = [...config.externals, { canvas: 'canvas' }];
        return config;
    },
    experimental: {
        serverActions: {
            allowedOrigins: []
        },
    },

    async redirects() {
        return [
            {
                source: "/home",
                destination: "/",
                permanent: false,
            }]
    }
})