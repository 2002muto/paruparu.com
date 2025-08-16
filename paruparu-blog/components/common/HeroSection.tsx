"use client";

import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative w-full">
      {/* ファーストビュー画像 */}
      <div className="relative w-full h-96 md:h-[500px] lg:h-[600px]">
        <Image
          src="/fastview/01.png"
          alt="ファーストビュー"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
};

export default HeroSection;
