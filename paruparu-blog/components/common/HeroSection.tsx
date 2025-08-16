"use client";

import Image from "next/image";
import FireworksEffect from "@/components/FireworksEffect";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景画像 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/posts/2025-01-15/01.jpg"
          alt="パルムちゃん"
          fill
          className="object-cover"
          priority
        />
        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
          パルムちゃんと暮らす毎日
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 drop-shadow-md">
          写真とひとことを毎日更新。パルムちゃんの日常をお届けします。
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            記事を見る
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors">
            お問い合わせ
          </button>
        </div>
      </div>

      {/* 底部アニメーション */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <FireworksEffect isActive={true} showSpecialFirework={true} />
      </div>

      {/* スクロールインジケーター */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
