/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  sassOptions: {
    prependData: `@import "/src/styles/variables/_variables.scss";`,
  },
};

export default nextConfig;
