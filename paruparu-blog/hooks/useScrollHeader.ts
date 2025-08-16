import { useState, useEffect } from "react";

export const useScrollHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    // スクロールイベントリスナーを追加
    window.addEventListener("scroll", handleScroll, { passive: true });

    // クリーンアップ関数
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { isScrolled };
};
