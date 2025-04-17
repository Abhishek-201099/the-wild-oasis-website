/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cknarcnpwneuuknllqpu.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/*",
        search: "",
      },
      {
        protocol: "https",
        hostname: "authjs.dev",
        port: "",
        pathname: "/img/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
