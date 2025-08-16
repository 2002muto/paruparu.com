'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface SlicedImageProps {
  src: string;
  alt: string;
  slices?: number;
}

const SlicedImage = ({ src, alt, slices = 8 }: SlicedImageProps) => {
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
    hidden: { y: '100%' },
    visible: {
      y: '0%',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      y: '-100%',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
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
      {Array.from({ length: slices }).map((_, i) => (
        <div
          key={i}
          className="relative h-full overflow-hidden"
          style={{ width: `${100 / slices}%` }}
        >
          <motion.div className="h-full" variants={sliceVariants}>
            <div
              className="absolute inset-0"
              style={{
                width: `${slices * 100}%`,
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
        </div>
      ))}
    </motion.div>
  );
};

export default SlicedImage;