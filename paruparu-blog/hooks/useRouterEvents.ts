"use client";

import { useEffect, useContext, useRef } from "react";
import { usePathname } from "next/navigation";
import { TransitionContext } from "@/contexts/TransitionContext";

export function useRouterEvents() {
  const pathname = usePathname();
  const context = useContext(TransitionContext);
  const prevPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    if (!context) return;

    const { handlePageTransition } = context;

    // 初回レンダリング時は何もしない
    if (prevPathnameRef.current === null) {
      prevPathnameRef.current = pathname;
      return;
    }

    // パスが変更された場合（ページ遷移）
    if (prevPathnameRef.current !== pathname) {
      // ページ遷移時はスプラッシュスクリーンを非表示にする
      handlePageTransition();
      prevPathnameRef.current = pathname;
    }
  }, [pathname, context]);

  // リロード時の検知
  useEffect(() => {
    if (!context) return;

    const { setSplashCompleted } = context;

    const handleBeforeUnload = () => {
      // リロード時はスプラッシュスクリーンを表示するため、何もしない
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [context]);
}
