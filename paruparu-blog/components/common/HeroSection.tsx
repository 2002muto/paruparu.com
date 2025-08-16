"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection = () => {
  const images = [
    "/fastview/01.png",
    "/fastview/02.png",
    "/fastview/03.png",
    "/fastview/04.png",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 3秒間隔で画像を切り替え
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative w-full">
      {/* ファーストビュー画像 */}
      <div className="relative w-full h-[80vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentImageIndex]}
              alt={`ファーストビュー ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              priority={currentImageIndex === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HeroSection;
