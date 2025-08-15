"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SplashScreen from "@/components/animation/SplashScreen";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [status, setStatus] = useState("loading");
  const [showSplash, setShowSplash] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const handleSplashComplete = () => {
    setStatus("loaded");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("loaded");
    }, 8000); // フォールバック用のタイマー

    return () => clearTimeout(timer);
  }, []);

  // ページアクセスから2秒後にSplashScreenを表示開始
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(true);
    }, 750); // ページアクセスから2秒後

    return () => clearTimeout(splashTimer);
  }, []);

  // SplashScreen表示開始後、6.5秒でメインコンテンツをフェードイン
  useEffect(() => {
    if (showSplash) {
      const contentTimer = setTimeout(() => {
        setShowContent(true);
        setFadeIn(true);
      }, 3500); // SplashScreen表示開始から6.5秒後（SplashScreenの4.5秒 + 2秒）

      return () => clearTimeout(contentTimer);
    }
  }, [showSplash]);

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(to bottom, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      }}
    >
      {/* メインコンテンツ */}
      <motion.div
        className="relative z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: fadeIn ? 1 : 0 }}
        transition={{ duration: 2, ease: "easeIn" }}
      >
        {children}
      </motion.div>

      {/* スプラッシュスクリーン */}
      <AnimatePresence>
        {showSplash && status === "loading" && (
          <SplashScreen onComplete={handleSplashComplete} />
        )}
      </AnimatePresence>
    </div>
  );
}
