"use client";

import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

const AnimatedText = ({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.1,
}: AnimatedTextProps) => {
  const letters = text.split("");

  return (
    <div className={`flex ${className}`}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: delay + index * staggerDelay,
            ease: "easeOut",
          }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
};

export default AnimatedText;
