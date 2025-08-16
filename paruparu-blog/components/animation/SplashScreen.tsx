"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import FireworksEffect from "@/components/FireworksEffect";

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
  const [fireworksActive, setFireworksActive] = useState(true);
  const [showSpecialFirework, setShowSpecialFirework] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // 0.08から0.15に変更（よりゆっくり）
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
        duration: 2.0, // 1.2から2.0に変更（よりゆっくり）
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

  // 文字アニメーション完了後に花火を停止し、特別な花火を表示
  useEffect(() => {
    const fireworksTimer = setTimeout(() => {
      setFireworksActive(false);
      setShowSpecialFirework(true);
    }, 4000); // 文字アニメーション完了後（0.15秒 × 13文字 + 2.0秒 = 約3.95秒）

    return () => clearTimeout(fireworksTimer);
  }, []);

  // 文字アニメーション完了後にフェードアウト開始
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 7000); // 文字アニメーション完了後1秒でフェードアウト開始

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
      {/* 花火エフェクト */}
      <FireworksEffect
        isActive={fireworksActive}
        showSpecialFirework={showSpecialFirework}
      />

      <motion.div
        className="flex items-center justify-center h-full overflow-hidden px-4"
        initial={{ opacity: 1 }}
        animate={{ opacity: fadeOut ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider whitespace-nowrap"
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
                transform: `translate(${(index - 5) * 1}px, ${Math.sin(index * 0.5) * 2}px)`,
              }}
              className="whitespace-nowrap"
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
      </motion.div>
    </motion.div>
  );
}
