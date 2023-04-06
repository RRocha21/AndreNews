/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    images: {
        domains: ['media.ignimgs.com', 'media.ign.com', 'pt.ign.com', 'www.ign.com', 'www.ignimgs.com', 'sm.ign.com']
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        fontsFolder: '/fonts',
    }
}

module.exports = nextConfig
