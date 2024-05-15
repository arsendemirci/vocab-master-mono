/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        prependData: `@import "/src/styles/_variables.scss";`,
    },
};

export default nextConfig;
