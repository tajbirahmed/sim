/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ichef.bbci.co.uk',
                port: '',
                pathname: '/news/**'
            }, 
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
                port: '',
                pathname: '*'
            }, 
            {
                protocol: 'https',
                hostname: 'cdn.iconscout.com',
                port: '',
                pathname: '**'
            }
        ]
    }
};

export default nextConfig;
