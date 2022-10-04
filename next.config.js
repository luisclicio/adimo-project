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
        source: '/eventos/:slug',
        destination: '/events/:slug',
      },
      {
        source: '/noticias',
        destination: '/articles',
      },
      {
        source: '/noticias/:slug',
        destination: '/articles/:slug',
      },
      {
        source: '/parceiros',
        destination: '/collaborators',
      },
      {
        source: '/apoie',
        destination: '/sponsor',
      },
      {
        source: '/admin/mensagens',
        destination: '/admin/messages',
      },
    ];
  },
};

module.exports = nextConfig;
