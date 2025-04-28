/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXTAUTH_SECRET:
      "8068bed4e1d79f790a6b3a9fc408c1aada386721ea32ddd3f44e2d6da3fb8937dea58c762e77b279c5b92df837ad51401a68879c9d9e970ad5a3b3e44ac0d92",
    REFRESH_SECRET:
      "3458bed2ehd79f790a6b2b9fc407a2aada386721eb32ddd3f44e2d6da3fa8946dea58c763e77b279c5b92de537ad51214a68879c9d9e970ad3a3a3e98ac0d63",
    VERIFY_SECRET:
      "0b5cdb2848892223454177d1eb64b7b59bc700501dd3ee84de25cbccff34c1319da69ceff174eee75f3d5d2ffc38612181f480fc05d07d1983a92965e6a93eb1",
    STORAGE_SECRET:
      "4b1edb28488222234541a7d1eb6457b59bc700501dd3ee842f25cbccffd1c1319da69ceff174eee75fbd5d2ffc3861fa41f480fc05a07d1983a92965e6e931bd",
    BASE_URL: "http://localhost:3000",
    SMTP_EMAIL_TO: "demirci.arsen@gmail.com",
    MONGODB_URI: "mongodb://localhost:27017/vocabMasterDb",
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
    prependData: `@import "/src/styles/variables/_variables.scss";
                  @import "/src/styles/_mixins.scss";`,
  },
};

export default nextConfig;
