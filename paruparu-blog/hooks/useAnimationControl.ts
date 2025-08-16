import { useState, useEffect } from "react";

interface UseAnimationControlProps {
  delay?: number;
  autoStart?: boolean;
}

export const useAnimationControl = ({
  delay = 0,
  autoStart = true,
}: UseAnimationControlProps = {}) => {
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (autoStart) {
      const timer = setTimeout(() => {
        setIsStarted(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [delay, autoStart]);

  const startAnimation = () => setIsStarted(true);
  const stopAnimation = () => setIsStarted(false);
  const resetAnimation = () => setIsStarted(false);

  return {
    isStarted,
    startAnimation,
    stopAnimation,
    resetAnimation,
  };
};
