"use client";

import { useTypingEffect } from "../../hooks/useTypingEffect";

interface TypingTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  showCursor?: boolean;
}

const TypingText = ({
  text,
  className = "",
  speed = 100,
  delay = 0,
  showCursor = true,
}: TypingTextProps) => {
  const { displayText, isComplete } = useTypingEffect(text, speed, delay);

  return (
    <div className={`${className}`}>
      <span>{displayText}</span>
      {showCursor && (
        <span
          className={`inline-block w-0.5 h-6 bg-current ml-1 ${
            isComplete ? "opacity-0" : "opacity-100"
          } animate-pulse`}
        />
      )}
    </div>
  );
};

export default TypingText;
