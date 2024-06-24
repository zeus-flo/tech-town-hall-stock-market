/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "cdn.builder.io",
            "upload.wikimedia.org"
        ],
        dangerouslyAllowSVG: true,
    },
};

export default nextConfig;
