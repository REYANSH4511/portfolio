/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  eslint: {
    // Warnings don't fail the build
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Type errors will still fail — this is intentional
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
