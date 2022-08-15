/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  async rewrites() {
    return [
      {
        source: '/sobre',
        destination: '/about',
      },
      {
        source: '/galeria',
        destination: '/gallery',
      },
      {
        source: '/eventos',
        destination: '/events',
      },
      {
        source: '/noticias',
        destination: '/posts',
      },
      {
        source: '/parceiros',
        destination: '/collaborators',
      },
      {
        source: '/apoie',
        destination: '/sponsor',
      },
    ];
  },
};

module.exports = nextConfig;
