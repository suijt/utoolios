/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Workspace packages ship as TypeScript source; Next transpiles them (docs/05).
  transpilePackages: [
    '@utoolios/core',
    '@utoolios/engine',
    '@utoolios/tools',
    '@utoolios/ui',
    '@utoolios/config',
  ],
}

export default nextConfig
