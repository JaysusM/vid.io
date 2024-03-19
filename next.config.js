/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.plugins.push(
          new webpack.DefinePlugin({
            'process.env.FLUENTFFMPEG_COV': false
        })
        )
     
        return config
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com'
            }
        ],
    },
    reactStrictMode: false
}

module.exports = nextConfig
