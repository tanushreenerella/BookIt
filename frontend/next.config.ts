const nextConfig = {
  output: "standalone",
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  experimental: { missingSuspenseWithCsrBailout: false },
};
export default nextConfig;


