"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete?: () => void;
  textWeight?: number; // 文字の太さを調整可能にする
}

export default function SplashScreen({
  onComplete,
  textWeight = 0.5,
}: SplashScreenProps) {
  const text = "PARUPARU.COM";
  const characters = Array.from(text);
  const [fadeOut, setFadeOut] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const charVariants = {
    hidden: () => ({
      opacity: 0,
      x: (Math.random() - 0.5) * 1000,
      y: (Math.random() - 0.5) * 1000,
      rotate: (Math.random() - 0.5) * 360,
      scale: Math.random() * 1.5 + 0.5,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut" as const,
      },
    },
  };

  // 各文字の色収差効果を個別に定義（太さ調整可能）
  const getCharShadow = (char: string, index: number) => {
    const baseShadows = [
      // より多様な色収差効果 - パターン1
      `-${textWeight}px -${textWeight}px 0 #ffffff, ${textWeight}px -${textWeight}px 0 #ffffff, -${textWeight}px ${textWeight}px 0 #ffffff, ${textWeight}px ${textWeight}px 0 #ffffff,
       -${textWeight + 1}px -${textWeight + 1}px 0 #ff0000, ${textWeight + 1}px -${textWeight + 1}px 0 #00ff00, -${textWeight + 1}px ${textWeight + 1}px 0 #0000ff, ${textWeight + 1}px ${textWeight + 1}px 0 #ffff00,
       -${textWeight + 2}px -${textWeight + 2}px 0 #00ffff, ${textWeight + 2}px -${textWeight + 2}px 0 #ff00ff, -${textWeight + 2}px ${textWeight + 2}px 0 #ff8800, ${textWeight + 2}px ${textWeight + 2}px 0 #8800ff`,
      // より多様な色収差効果 - パターン2
      `-${textWeight}px -${textWeight}px 0 #ffffff, ${textWeight}px -${textWeight}px 0 #ffffff, -${textWeight}px ${textWeight}px 0 #ffffff, ${textWeight}px ${textWeight}px 0 #ffffff,
       -${textWeight + 1}px -1px 0 #ff0000, ${textWeight + 1}px -1px 0 #00ff00, -${textWeight + 1}px 1px 0 #0000ff, ${textWeight + 1}px 1px 0 #ffff00,
       -1px -${textWeight + 1}px 0 #00ffff, 1px -${textWeight + 1}px 0 #ff00ff, -1px ${textWeight + 1}px 0 #ff8800, 1px ${textWeight + 1}px 0 #8800ff`,
      // より多様な色収差効果 - パターン3
      `-${textWeight}px -${textWeight}px 0 #ffffff, ${textWeight}px -${textWeight}px 0 #ffffff, -${textWeight}px ${textWeight}px 0 #ffffff, ${textWeight}px ${textWeight}px 0 #ffffff,
       -${textWeight + 1}px 0px 0 #ff0000, ${textWeight + 1}px 0px 0 #00ff00, 0px -${textWeight + 1}px 0 #0000ff, 0px ${textWeight + 1}px 0 #ffff00,
       -${textWeight + 2}px 0px 0 #00ffff, ${textWeight + 2}px 0px 0 #ff00ff, 0px -${textWeight + 2}px 0 #ff8800, 0px ${textWeight + 2}px 0 #8800ff`,
      // より多様な色収差効果 - パターン4
      `-${textWeight}px -${textWeight}px 0 #ffffff, ${textWeight}px -${textWeight}px 0 #ffffff, -${textWeight}px ${textWeight}px 0 #ffffff, ${textWeight}px ${textWeight}px 0 #ffffff,
       -1px -${textWeight + 1}px 0 #ff0000, 1px -${textWeight + 1}px 0 #00ff00, -1px ${textWeight + 1}px 0 #0000ff, 1px ${textWeight + 1}px 0 #ffff00,
       -2px -${textWeight + 2}px 0 #00ffff, 2px -${textWeight + 2}px 0 #ff00ff, -2px ${textWeight + 2}px 0 #ff8800, 2px ${textWeight + 2}px 0 #8800ff`,
      // より多様な色収差効果 - パターン5
      `-${textWeight}px -${textWeight}px 0 #ffffff, ${textWeight}px -${textWeight}px 0 #ffffff, -${textWeight}px ${textWeight}px 0 #ffffff, ${textWeight}px ${textWeight}px 0 #ffffff,
       -${textWeight + 1}px -${textWeight + 1}px 0 #ff0000, ${textWeight + 1}px -${textWeight + 1}px 0 #00ff00, -${textWeight + 1}px ${textWeight + 1}px 0 #0000ff, ${textWeight + 1}px ${textWeight + 1}px 0 #ffff00,
       -1px -${textWeight + 2}px 0 #00ffff, 1px -${textWeight + 2}px 0 #ff00ff, -1px ${textWeight + 2}px 0 #ff8800, 1px ${textWeight + 2}px 0 #8800ff`,
    ];

    return `${baseShadows[index % baseShadows.length]}`;
  };

  // 文字アニメーション完了後にフェードアウト開始
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3500); // 文字アニメーション完了後1秒でフェードアウト開始

    return () => clearTimeout(fadeTimer);
  }, []);

  // フェードアウト完了後に完了通知
  useEffect(() => {
    if (fadeOut) {
      const completeTimer = setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 1000); // フェードアウト2秒後に完了

      return () => clearTimeout(completeTimer);
    }
  }, [fadeOut, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50"
      style={{
        background:
          "linear-gradient(to bottom, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.div
        className="flex items-center justify-center h-full overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: fadeOut ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-7xl font-bold tracking-wider"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          aria-label={text}
          style={{
            fontFamily: "'Catamaran', sans-serif",
            color: "#ffffff",
            fontWeight: 400,
            letterSpacing: "0.1em",
          }}
        >
          {characters.map((char, index) => (
            <motion.span
              key={index}
              variants={charVariants}
              style={{
                display: "inline-block",
                textShadow: getCharShadow(char, index),
                transform: `translate(${(index - 5) * 2}px, ${Math.sin(index * 0.5) * 3}px)`,
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
      </motion.div>
    </motion.div>
  );
}
