'use client';

import { useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SplashScreen from '@/components/animation/SplashScreen';
import { TransitionContext } from '@/contexts/TransitionContext';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const context = useContext(TransitionContext);

  if (!context) {
    return <>{children}</>;
  }

  const { splashCompleted, setSplashCompleted } = context;

  const handleSplashComplete = () => {
    if (setSplashCompleted) {
      setSplashCompleted(true);
    }
  };

  return (
    <div className="min-h-screen">
      {/* メインコンテンツ */}
      <motion.div
        className="relative z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: splashCompleted ? 1 : 0 }}
        transition={{ duration: 1, ease: 'easeIn' }}
      >
        {children}
      </motion.div>

      {/* スプラッシュスクリーン */}
      <AnimatePresence>
        {!splashCompleted && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>
    </div>
  );
}
