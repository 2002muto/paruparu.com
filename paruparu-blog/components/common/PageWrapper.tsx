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

  // スプラッシュスクリーンのフェードアウトと同時にTOPページのフェードイン開始
  useEffect(() => {
    const contentTimer = setTimeout(() => {
      setShowContent(true);
      setFadeIn(true);
    }, 2500); // スプラッシュスクリーンフェードアウト開始と同時

    return () => clearTimeout(contentTimer);
  }, []);

  return (
    <div>
      {/* TOPページコンテンツを常に表示（背景として） */}
      <motion.div
        className="relative z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: fadeIn ? 1 : 0 }}
        transition={{ duration: 2, ease: "easeIn" }}
      >
        {children}
      </motion.div>

      {/* スプラッシュスクリーンを重ねて表示 */}
      <AnimatePresence>
        {status === "loading" && (
          <SplashScreen onComplete={handleSplashComplete} />
        )}
      </AnimatePresence>
    </div>
  );
}
