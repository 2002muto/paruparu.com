"use client";

import { useEffect, useRef } from "react";

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
  particles: Particle[];
  createdAt: number;
  isSpecial?: boolean; // 特別な花火かどうか
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

interface FireworksEffectProps {
  isActive?: boolean;
  showSpecialFirework?: boolean; // 特別な花火を表示するかどうか
}

const FireworksEffect = ({
  isActive = true,
  showSpecialFirework = false,
}: FireworksEffectProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fireworksRef = useRef<Firework[]>([]);
  const animationIdRef = useRef<number>();
  const specialFireworkShownRef = useRef(false);

  const colors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
    "#ff8800",
    "#8800ff",
    "#0088ff",
    "#ff0088",
    "#88ff00",
    "#0088ff",
  ];

  const createFirework = (
    x: number,
    y: number,
    isSpecial = false
  ): Firework => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const particles: Particle[] = [];

    // 特別な花火はより多くのパーティクルと大きなサイズ
    const particleCount = isSpecial
      ? 150 + Math.floor(Math.random() * 100)
      : 50 + Math.floor(Math.random() * 50);

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = isSpecial
        ? 4 + Math.random() * 4
        : 2 + Math.random() * 3;
      const life = isSpecial
        ? 120 + Math.floor(Math.random() * 60)
        : 60 + Math.floor(Math.random() * 60);

      particles.push({
        x: 0,
        y: 0,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: life,
        maxLife: life,
        color: color,
      });
    }

    return {
      id: Date.now() + Math.random(),
      x,
      y,
      color,
      particles,
      createdAt: Date.now(),
      isSpecial,
    };
  };

  const updateParticles = (particles: Particle[]) => {
    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.1; // 重力
      particle.life--;
    });
  };

  const drawFirework = (ctx: CanvasRenderingContext2D, firework: Firework) => {
    const { x, y, particles, isSpecial } = firework;

    particles.forEach((particle) => {
      if (particle.life <= 0) return;

      const alpha = particle.life / particle.maxLife;
      const baseSize = isSpecial ? 4 : 2; // 特別な花火は大きい
      const size =
        baseSize + (particle.life / particle.maxLife) * (isSpecial ? 6 : 3);

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(x + particle.x, y + particle.y, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // キャンバスサイズを設定
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 背景をクリア（半透明で軌跡効果）
    ctx.fillStyle = "rgba(26, 26, 46, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // アクティブな場合のみ新しい花火を生成
    if (isActive && Math.random() < 0.05) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height * 0.5;
      fireworksRef.current.push(createFirework(x, y));
    }

    // 特別な花火を表示
    if (showSpecialFirework && !specialFireworkShownRef.current) {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      fireworksRef.current.push(createFirework(centerX, centerY, true));
      specialFireworkShownRef.current = true;
    }

    // 花火を更新・描画
    fireworksRef.current = fireworksRef.current.filter((firework) => {
      updateParticles(firework.particles);
      drawFirework(ctx, firework);

      // すべてのパーティクルが消えたら削除
      return firework.particles.some((particle) => particle.life > 0);
    });

    animationIdRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animate();

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [isActive, showSpecialFirework]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-40 pointer-events-none"
      style={{
        background: "transparent",
      }}
    />
  );
};

export default FireworksEffect;
