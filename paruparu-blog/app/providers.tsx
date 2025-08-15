'use client';

import { TransitionProvider } from "@/contexts/TransitionContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <TransitionProvider>{children}</TransitionProvider>;
}
