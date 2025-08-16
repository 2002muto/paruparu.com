"use client";

import { useContext, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SplashScreen from "@/components/animation/SplashScreen";
import { TransitionContext } from "@/contexts/TransitionContext";
import { useRouterEvents } from "@/hooks/useRouterEvents";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = useContext(TransitionContext);

  if (!context) {
    return <>{children}</>;
  }

  const { splashCompleted, setSplashCompleted } = context;
  const [isClient, setIsClient] = useState(false);

  // ページ遷移イベントを監視
  useRouterEvents();

  // クライアントサイドの準備ができるまで待機
  useEffect(() => {
    setIsClient(true);
  }, []);

  // サーバーサイドレンダリング中はメインコンテンツを表示
  if (!isClient) {
    return <>{children}</>;
  }

  const handleSplashComplete = () => {
    if (setSplashCompleted) {
      setSplashCompleted(true);
    }
  };

  return (
    <div className="min-h-screen">
      {/* メインコンテンツ */}
      <div className="relative z-30">{children}</div>

      {/* スプラッシュスクリーン - 初回訪問時のみ表示 */}
      <AnimatePresence>
        {!splashCompleted && isClient && (
          <SplashScreen onComplete={handleSplashComplete} />
        )}
      </AnimatePresence>
    </div>
  );
}
