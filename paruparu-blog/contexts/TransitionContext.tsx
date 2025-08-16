'use client';

import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

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
}

export const TransitionContext = createContext<TransitionContextProps | undefined>(undefined);

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const [originRect, setOriginRect] = useState<RectResult | null>(null);
  const [splashCompleted, setSplashCompleted] = useState(false);

  return (
    <TransitionContext.Provider value={{ originRect, setOriginRect, splashCompleted, setSplashCompleted }}>
      {children}
    </TransitionContext.Provider>
  );
};
