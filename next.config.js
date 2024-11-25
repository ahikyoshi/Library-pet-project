/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['page.tsx', 'api.ts'],
    i18n: {
        locales: ['en', 'ru'],
        defaultLocale: 'en'
    }
}

module.exports = nextConfig;