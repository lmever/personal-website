'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface FocusRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const focusRevealVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: 'blur(2px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  },
};

export default function FocusReveal({ children, className = '', delay = 0 }: FocusRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px 0px -100px 0px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={focusRevealVariants}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.15, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
