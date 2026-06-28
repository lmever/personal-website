'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface MousePosition {
  x: number;
  y: number;
}

export default function ParallaxBlobs() {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate parallax offset: 1/20 of mouse movement
  const parallaxX = mousePos.x * 0.05;
  const parallaxY = mousePos.y * 0.05;

  const sharedTransition = 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';

  return (
    <div className="ambient" aria-hidden="true">
      <motion.span
        className="ambient-orb ambient-orb-a"
        style={{
          transform: `translate(${parallaxX}px, ${parallaxY}px)`,
          transition: sharedTransition,
        }}
      />
      <motion.span
        className="ambient-orb ambient-orb-b"
        style={{
          transform: `translate(${-parallaxX * 0.8}px, ${-parallaxY * 0.7}px)`,
          transition: sharedTransition,
        }}
      />
      <motion.span
        className="ambient-orb ambient-orb-c"
        style={{
          transform: `translate(${parallaxX * 0.6}px, ${-parallaxY * 0.5}px)`,
          transition: sharedTransition,
        }}
      />
      <span className="ambient-grid" />
    </div>
  );
}
