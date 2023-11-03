/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
        {
            protocol: "https",
            hostname: "**",
        },
        ],
    },
    // async headers() {
    //     return [
    //       {
    //         // matching all API routes
    //         source: "/api/:path*",
    //         headers: [
    //           { key: "Access-Control-Allow-Credentials", value: "true" },
    //           { key: "Access-Control-Allow-Origin", value: "*" },
    //           { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
    //           { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Referer, User-Agent" },
    //         ]
    //       }
    //     ]
    //   },
      // experimental: {
      //   appDir: true,
      //   esmExternals: "loose", // required to make canvas work
      // },
      webpack: (config) => {
        config.externals = [...config.externals, { canvas: "canvas" }];  // required to make canvas work
        return config;
      },
}

module.exports = nextConfig
