/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXTAUTH_SECRET:
      "8068bed4e1d79f790a6b3a9fc408c1aada386721ea32ddd3f44e2d6da3fb8937dea58c762e77b279c5b92df837ad51401a68879c9d9e970ad5a3b3e44ac0d92",
    BASE_URL: "http://localhost:3000",
    SMTP_EMAIL_TO: "demirci.arsen@gmail.com",
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
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
