/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ichef.bbci.co.uk',
                port: '',
                pathname: '/news/**'
            }
        ]
    }
};

export default nextConfig;
