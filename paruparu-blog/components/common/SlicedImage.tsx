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
      setResponsiveSlices(window.innerWidth < 768 ? 1 : slices);
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

  // スマホサイズではスライス効果を無効にして通常の画像表示にする
  if (responsiveSlices === 1) {
    return (
      <motion.div
        key={src}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image src={src} alt={alt} fill className="object-cover" priority />
      </motion.div>
    );
  }

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
