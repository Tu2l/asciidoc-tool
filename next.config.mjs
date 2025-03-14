/** @type {import('next').NextConfig} */
const nextConfig = {
    output:'export',
    publicRuntimeConfig: {
        version: process.env.npm_package_version
    },
    compiler: {}
};

export default nextConfig;
