"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface RectResult {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface TransitionContextProps {
  originRect: RectResult | null;
  setOriginRect: Dispatch<SetStateAction<RectResult | null>>;
  splashCompleted: boolean;
  setSplashCompleted: Dispatch<SetStateAction<boolean>>;
  handlePageTransition: () => void;
}

export const TransitionContext = createContext<
  TransitionContextProps | undefined
>(undefined);

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const [originRect, setOriginRect] = useState<RectResult | null>(null);
  const [splashCompleted, setSplashCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isPageTransition, setIsPageTransition] = useState(false);

  // クライアントサイドでのみローカルストレージを確認
  useEffect(() => {
    setIsClient(true);
    
    // リロード時かどうかを判定
    const isReload = performance.navigation.type === 1 || 
                    (window.performance && window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)?.type === 'reload';
    
    if (isReload) {
      // リロード時はスプラッシュスクリーンを表示
      setSplashCompleted(false);
      localStorage.removeItem("splashCompleted");
    } else {
      // 通常のページ遷移時はローカルストレージを確認
      const stored = localStorage.getItem("splashCompleted");
      if (stored === "true") {
        setSplashCompleted(true);
      }
    }
  }, []);

  const handleSetSplashCompleted = (
    value: boolean | ((prev: boolean) => boolean)
  ) => {
    const newValue =
      typeof value === "function" ? value(splashCompleted) : value;
    setSplashCompleted(newValue);
    
    // ページ遷移時のみローカルストレージに保存
    if (typeof window !== "undefined" && !isPageTransition) {
      localStorage.setItem("splashCompleted", newValue.toString());
    }
  };

  const handlePageTransition = () => {
    setIsPageTransition(true);
    setSplashCompleted(true);
  };

      return (
      <TransitionContext.Provider
        value={{
          originRect,
          setOriginRect,
          splashCompleted,
          setSplashCompleted: handleSetSplashCompleted,
          handlePageTransition,
        }}
      >
        {children}
      </TransitionContext.Provider>
    );
};
