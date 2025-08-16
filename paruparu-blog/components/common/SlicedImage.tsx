"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

interface SlicedImageProps {
  src: string;
  alt: string;
  slices?: number;
}

const SlicedImage = ({ src, alt, slices = 8 }: SlicedImageProps) => {
  const [responsiveSlices, setResponsiveSlices] = useState(slices);

  useEffect(() => {
    const updateSlices = () => {
      // スマホサイズでも縦の切り替え効果を実装するため、適切なスライス数を設定
      if (window.innerWidth < 640) {
        setResponsiveSlices(4); // スマホサイズ：4スライス
      } else if (window.innerWidth < 768) {
        setResponsiveSlices(6); // タブレットサイズ：6スライス
      } else {
        setResponsiveSlices(slices); // デスクトップサイズ：8スライス
      }
    };

    updateSlices();
    window.addEventListener("resize", updateSlices);
    return () => window.removeEventListener("resize", updateSlices);
  }, [slices]);
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const sliceVariants = {
    hidden: { y: "100%" },
    visible: {
      y: "0%",
      transition: { duration: 0.8 },
    },
    exit: {
      y: "-100%",
      transition: { duration: 0.8 },
    },
  };

  return (
    <motion.div
      key={src}
      className="absolute inset-0 flex"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {Array.from({ length: responsiveSlices }).map((_, i) => (
        <motion.div
          key={i}
          className="relative h-full overflow-hidden"
          style={{
            width: `${100 / responsiveSlices}%`,
            marginLeft: i === 0 ? "0" : "-1px", // スライス間の境界線を重ねて表示
          }}
        >
          <motion.div className="h-full" variants={sliceVariants}>
            <div
              className="absolute inset-0"
              style={{
                width: `${responsiveSlices * 100}%`,
                left: `-${i * 100}%`,
              }}
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SlicedImage;
