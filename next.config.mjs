/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    // images: {
    //     remotePatterns: [
    //         {
    //             protocol: 'http',
    //             hostname: 'localhost',
    //             port: '3000',
    //             pathname: '/app/**'
    //         }
    //     ]
    // }
    // headers: async () => {
    //     return [
    //         {
    //             source: '/(.*)',
    //             headers: [
    //                 { key: 'Accept', value: '*/*' },
    //                 { key: 'Content-Type', value: 'application/json' }, // For JSON data
    //             ]
    //         }
    //     ];
    // }
};

export default nextConfig;
