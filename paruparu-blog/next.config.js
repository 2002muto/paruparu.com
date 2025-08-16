/** @type {import('next').NextConfig} */
const nextConfig = {
  // 画像最適化設定
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30日間キャッシュ
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // 圧縮設定
  compress: true,
  // 実験的機能
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  // 出力設定
  output: "standalone",
  // 静的生成設定
  trailingSlash: false,
};

module.exports = nextConfig;
